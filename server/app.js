import Koa from 'koa'
import json from 'koa-json'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
// import session from 'koa-session'
import compress from 'koa-compress'
// import convert from 'koa-convert'
var Url = require('url')

//注意这里的引入，一定要用improt from的姿势，不能用require的方法，不然会报错……
import session from "koa2-cookie-session";

import OAuth2Client from './oauth2-client'

var config = require('./../config')

var oauth2 = new OAuth2Client(config.oauth2)

//注意require('koa-router')返回的是函数:
const app = new Koa()
const router = require('koa-router')();

app.keys = ['this is a fucking secret']

//处理 session
app.use(session({
    key: "KOASESSIONID", //default "koa:sid" 
    expires: 3, //default 7 
    path: "/" //default "/" 
}));

app.use(compress())
app.use(bodyParser())
app.use(json())
app.use(logger())


var proxyObj = undefined;

if (process.env.NODE_ENV != 'production') {
    app.use(async (ctx, next) => {
        console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
        await next();
    });
}


//处理token刷新
app.use(async (ctx, next) => {

    var user = ctx.session.oauth2;

    //当session的token过期，则到认证服务重新获取token
    if (user && user.exp && user.exp * 1000 < new Date().getTime()) {

        console.log('oauth2 refresh')

        var token = oauth2.createToken(ctx.session.oauth2);
        token = await token.refresh().catch(error => {
            return undefined;
        });
        ctx.session.oauth2 = token && token.data || undefined;
        proxyObj = undefined;
    }

    await next();
})


//
app.use(async (ctx, next) => {
    var user = ctx.session.oauth2;

    //当无认证信息，且不是认证服务器回调时，重定向到认证服务器进行认证
    if (!user && user != 'undefined' &&
        ctx.request.path != Url.parse(config.oauth2.redirectUri).pathname) {
        console.log('oauth2 redirect')
        //记录当前url，认证完成时重新回到此页面来
        ctx.session.oauth2RedirectUrl = ctx.request.url;
        ctx.response.redirect(oauth2.code.getUri());
        return
    }
    await next();
});

//api代理
router.all('/api/*', async (ctx, next) => {

    if (!proxyObj) {
        //构建proxy对象，并给proxy对象加上认证信息
        proxyObj = proxy(config.proxy, {
            headers: {
                'Authorization': ctx.session.oauth2.token_type + ' ' + ctx.session.oauth2.access_token
            },
            proxyReqPathResolver: function(ctx) {
                return require('url').parse(ctx.url).path.replace('/api', '/');
            }
        })
    }

    await proxyObj(ctx /*,next*/ );

});

//注销
router.get('/oauth2/logout', async (ctx, next) => {
    delete ctx.session.oauth2;
    ctx.cookies.set(config.oauth2.cookie,);
    ctx.response.redirect(config.oauth2.logoutUri || '/');
});
//认证回调
router.get('/oauth2/callback', async function(ctx, next) {

    //通过code和state向认证服务获取token
    await oauth2.code.getToken(ctx.request.url)
        .then(function(user) {

            //把token存储到session中
            user.data.exp = user.data.expires_in - 300;
            user.data.exp += Math.floor(new Date().getTime() / 1000);
            ctx.session.oauth2 = user.data;

            //重定向到认证时的页面
            ctx.response.redirect(ctx.session.oauth2RedirectUrl || '/')
        }, function() {
            //return res.send("error.")
            proxyObj = undefined;
            ctx.response.body = '<h1>ERROR.</h1>';
        })
})

//添加路由
app.use(router.routes());



export default app