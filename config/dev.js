var path = require('path')

module.exports = {
	oauth2:{
	  clientId: 'web_app',
	  clientSecret: '123456',
	  accessTokenUri: 'https://api-t.fcbb.io/oauth/token',
	  authorizationUri: 'https://api-t.fcbb.io/oauth/authorize',
	  logoutUri: 'http://localhost:5555/oauth/logout?redirect=http://localhost:3000',
	  redirectUri: 'http://localhost:3000/oauth2/callback',
	  scopes: ['GOODS'],
	  cookie:'OAUTH2SESSION',
	},
	proxy:'http://localhost:5555',
	build: {
			// sitEnv: require('./sit.env'),
			// prodEnv: require('./prod.env'),
			index: path.resolve(__dirname, '../dist/index.html'),
			assetsRoot: path.resolve(__dirname, '../dist/client'),
			assetsSubDirectory: 'static',
			assetsPublicPath: '/',          //请根据自己路径配置更改
			productionSourceMap: false,
			// Gzip off by default as many popular static hosts such as
			// Surge or Netlify already gzip all static assets for you.
			// Before setting to `true`, make sure to:
			// npm install --save-dev compression-webpack-plugin
			productionGzip: false,
			productionGzipExtensions: ['js', 'css'],
			// Run the build command with an extra argument to
			// View the bundle analyzer report after build finishes:
			// `npm run build --report`
			// Set to `true` or `false` to always turn it on or off
			bundleAnalyzerReport: process.env.npm_config_report
    },
    cssSourceMap:true,
    env:{
	    NODE_ENV: '"production"',
	    ENV_CONFIG: '"prod"',
	    BASE_API: '"https://api-dev"',
	    APP_ORIGIN: '"https://wallstreetcn.com"'
	},
	assetsSubDirectory: 'static',
	assetsPublicPath: '/',		
}