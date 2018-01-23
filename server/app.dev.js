
require('babel-polyfill')

require('source-map-support').install()

require('css-modules-require-hook')({
    extensions: ['.scss'],
    preprocessCss: (data, filename) =>{
        return require('node-sass').renderSync({
            data,
            file: filename
        }).css
      },
    camelCase: true,
    generateScopedName: '[name]__[local]__[hash:base64:8]'
})

// Image require hook
require('asset-require-hook')({
    name: '/[hash].[ext]',
    extensions: ['jpg', 'png', 'gif', 'webp'],
    limit: 8000
})

var config = require('./../config/')


const app = require('./app.js');

const webpack = require('webpack');

const koaWebpackMiddleware = require('koa2-webpack-middleware');
const webpackDevMiddleware = koaWebpackMiddleware.devMiddleware;
const webpackHotMiddleware = koaWebpackMiddleware.hotMiddleware;


const webpackConfig = require('../config/webpack.dev.config')

const compiler = webpack(webpackConfig)

const views = require('koa-views')

const path = require('path');
const fs = require('fs');

compiler.plugin('emit', (compilation, callback) => {
    const assets = compilation.assets
    let file, data

    Object.keys(assets).forEach(key => {
        if (key.match(/\.html$/)) {
            file = path.resolve(__dirname, key)
            data = assets[key].source()
            fs.writeFileSync(file, data)
        }
    })
    callback()
})

app.use(views(path.resolve(__dirname, '../dist/views/dev'), {map: {html: 'ejs'}}))

///import clientRoute from './clientRoute'
var clientRoute = require('./clientRoute')
app.use(clientRoute);

const wdm = webpackDevMiddleware(compiler, {
  watchOptions: {
    aggregateTimeout: 300,
    poll: true
  },
  reload: true,
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true
  },
})
app.use(async (ctx, next) => {
  ctx.response.type = 'text/html'
  await next()
    //ctx.response.body = '<h1>Index</h1>';
});
app.use(wdm)
app.use(webpackHotMiddleware(compiler))



//======================  webpack end  ==================

// add router middleware:

// app.use(async (ctx, next) => {
//   ctx.response.type = 'text/html'
//     ctx.response.body = '<h1>error.</h1>';
// });

app.listen(config.port || 3000);


export default app;
