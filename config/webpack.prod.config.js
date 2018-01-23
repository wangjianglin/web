const path = require('path'),
    fs = require('fs'),
    webpack = require('webpack'),
    autoprefixer = require('autoprefixer'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin')
let clientConfig, serverConfig,clientConfig2;

function getExternals() {
    return fs.readdirSync(path.resolve(__dirname, '../node_modules'))
        .filter(filename => !filename.includes('.bin'))
        .reduce((externals, filename) => {
            externals[filename] = `commonjs ${filename}`

            return externals
        }, {})
}

clientConfig = {
    devtool: 'eval-source-map',
    context: path.resolve(__dirname, '..'),
    entry: {
        bundle: './app',
        vendor: [
            'react',
            'react-dom',
            'redux',
            'react-redux',
        ]
    },
    output: {
        path: path.resolve(__dirname, '../dist/client'),
        filename: '[name].[chunkhash:8].js',
        chunkFilename: 'chunk.[name].[chunkhash:8].js',
        publicPath: '/'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react', 'stage-0'],
                plugins: ['transform-runtime', 'add-module-exports'],
                cacheDirectory: true
            }
        }, {
            test: /\.scss$/,
            // loader: ExtractTextPlugin.extract('style-loader', 
            //     'css-loader?modules&camelCase&importLoaders=1&localIdentName=[hash:base64:8]!postcss-loader!sass-loader',
            //     'sass-loader'
            //     )
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [
                    'css-loader?modules&camelCase&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:8]',
                    'sass-loader'
                ]
            })
        }, {
            test: /\.(jpg|png|gif|webp)$/,
            loader: 'url-loader?limit=8000'
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }, {
            test: /\.html$/,
            loader: 'html-loader?minimize=false'
        }]
    },
    // postcss: [autoprefixer({browsers: ['> 5%']})],
    resolve: {extensions: ['jsx', '.js', '.json', '.scss']},
    plugins: [
  //   new ExtractTextPlugin('[name].[contenthash:6].css', {
  //   allChunks : true 
  // }),
  //   new webpack.optimize.CommonsChunkPlugin({
  //   names: ['vendor', 'mainifest'],
  //   minChunks: 1
  // }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {warnings: false},
        //     comments: false
        // }),
        // new webpack.LoaderOptionsPlugin({
          //   options: {
          //     postcss: function () {
          //       // return [precss, autoprefixer];
          //       return [autoprefixer({browsers: ['> 5%']})]
          //     },
          //     // devServer: {
          //     //   contentBase: "./public", //本地服务器所加载的页面所在的目录
          //     //   colors: true, //终端中输出结果为彩色
          //     //   historyApiFallback: true, //不跳转
          //     //   inline: true //实时刷新
          //     // }
          //   }
          // }),
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)}),
        new HtmlWebpackPlugin({
            filename: '../../dist/views/prod/index.html',
            template: './index.html',
            // filename:'index.html',
            // template:'index.html'
            // chunksSortMode: 'none'
        }),
        new ExtractTextPlugin('[name].[contenthash:8].css', {
            allChunks: true,
            splitChunks:true,
            disable: false,
        }),

        // new webpack.optimize.DedupePlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
            filename: '[name].[chunkhash:8].js',
            minChunks: 1
        }),
    ]
}

serverConfig = {
    context: path.resolve(__dirname, '..'),
    entry: {server: './server/app.prod'},
    output: {
        path: path.resolve(__dirname, '../dist/server'),
        filename: '[name].js',
        chunkFilename: 'chunk.[name].js'
    },
    target: 'node',
    node: {
        __filename: true,
        __dirname: true
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react', 'stage-0'],
                plugins: ['transform-runtime', 'add-module-exports'],
                cacheDirectory: true
            }
        }, 
        {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [
                    'css-loader?modules&camelCase&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:8]',
                    'sass-loader'
                ]
            })
            // loader: ExtractTextPlugin.extract('style-loader', 
            //     'css-loader?modules&camelCase&importLoaders=1&localIdentName=[hash:base64:8]',
            //     'sass-loader'
            //     )
        },
        // {
        //     test: /\.scss$/,
        //     // loader: ExtractTextPlugin.extract('style-loader', 
        //     //     'css-loader?modules&camelCase&importLoaders=1&localIdentName=[hash:base64:8]!postcss-loader!sass-loader',
        //     //     'sass-loader'
        //     //     )
        //     fallback: "style-loader",
        //     loaders: [
        //         // 'style-loader',
        //         'css-loader?modules&camelCase&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:8]',
        //         'sass-loader'
        //     ]
        // }, 
        {
            test: /\.(jpg|png|gif|webp)$/,
            loader: 'url-loader?limit=8000'
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }, {
            test: /\.html$/,
            loader: 'html-loader?minimize=false'
        }]
    },
    externals: getExternals(),
    resolve: {extensions: ['jsx', '.js', '.json', '.scss']},
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            comments: false
        }),
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)}),
        new ExtractTextPlugin('[name].[contenthash:8].css', {
            allChunks: true,
            splitChunks:true,
            disable: false,
        })
    ]
}

module.exports = [clientConfig, serverConfig]
