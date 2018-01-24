import React from 'react'
import {renderToString} from 'react-dom/server'
import {match, RouterContext} from 'react-router'
import {Provider} from 'react-redux'
// import routes from '../app/routes'
import configureStore from '../app/common/store/configureStore.server'
import {
  StaticRouter as Router
} from 'react-router-dom'
// import App from '../app/app'
import Main from '../app/common/app'

const store = configureStore()

async function clientRoute(ctx, next) {

if(ctx.url.endsWith(".js") || ctx.url.endsWith(".css") || ctx.url == '/__webpack_hmr'){
        return next();
    }

    const context = {}

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

  if (context.url) {
    ctx.response.writeHead(301, {
      Location: context.url
    })
    // res.end()
    await next();
    return;
  } 

  await ctx.render('index',{
    app:html,
    state:store.getState(),
  })
}

export default clientRoute
