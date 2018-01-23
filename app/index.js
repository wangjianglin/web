import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Provider, connect} from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import {ConnectedRouter} from 'react-router-redux'

const history = createHistory()


import configureStore from './common/store/configureStore'

var store = configureStore(window.REDUX_STATE);

// import Main from './common/components/Main'
import Main from './common/containers/Common'

ReactDOM.render(
    <Provider store={store}>
        {/* ConnectedRouter will use the store from Provider automatically */}
        <ConnectedRouter history={history}>
            <Main/>
        </ConnectedRouter>


    </Provider>,
    document.getElementById('app')
)
