import React from 'react'
import {
    renderToString
} from 'react-dom/server'
import {
    match,
    RouterContext
} from 'react-router'
import {
    Provider
} from 'react-redux'

import configureStore from '../app/common/store/configureStore.server'
import {
    StaticRouter as Router
} from 'react-router-dom'


import Main from '../app/common/app'

const store = configureStore()

async function clientRoute(ctx, next) {

    //后缀为 js、css 或 发 /__webpack_hmr开头的路径，直接跳过
    if (ctx.url.endsWith(".js") || ctx.url.endsWith(".css") || ctx.url == '/__webpack_hmr') {
        return next();
    }

    const context = {}

    //根据当前url渲染html
    const html = renderToString(
        <Provider store={store}>
            <Router
              location={ctx.request.url}
              context={context}
            >
      <Main/>
    </Router>
    </Provider>
    )

    //如果需要url重定向
    if (context.url) {
        ctx.response.writeHead(301, {
            Location: context.url
        })
        // res.end()
        await next();
        return;
    }

    //能过html模板生成最终html页面
    await ctx.render('index', {
        app: html,
        state: store.getState(),
    })
}

export default clientRoute