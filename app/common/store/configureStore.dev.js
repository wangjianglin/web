import {applyMiddleware, compose, createStore,combineReducers} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import { composeWithDevTools } from 'redux-devtools-extension';

import { createBrowserHistory } from 'history';
import { routerMiddleware,routerReducer } from 'react-router-redux';
import immutableStateInvariant from 'redux-immutable-state-invariant';
// import makeRootReducer from './makeRootReducer';

const history = createBrowserHistory();
const router = routerMiddleware(history);
const immutable = immutableStateInvariant();

const middleware =
  process.env.NODE_ENV !== 'production'
    ? [immutable,router, thunk]
    : [router, thunk];

const composeEnhancers =
  process.env.NODE_ENV === 'development' ? composeWithDevTools : compose;


// const enhancer = composeWithDevTools(applyMiddleware(...middleware));
const enhancer = composeWithDevTools(applyMiddleware(immutable,router,thunk));

export default function configureStore(initialState) {
    // const store = createStore(
    //     rootReducer,
    //     initialState,
    //     compose(
    //       applyMiddleware(router,thunk),        )
    // )

    const routeMiddleware = routerMiddleware(history);

const store = createStore(
    combineReducers({
        rootReducer,
        router: routerReducer
    }),
    composeWithDevTools(applyMiddleware(routeMiddleware))
)

    // const store = createStore(rootReducer, initialState, enhancer);
// var store;
// if(!(window.__REDUX_DEVTOOLS_EXTENSION__ || window.__REDUX_DEVTOOLS_EXTENSION__)){
//     store = createStore(
//         combineReducers(reducers),
//         applyMiddleware(thunk)
//     );
// }else{
//     store = createStore(
//         combineReducers(rootReducer),
//         compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) //插件调试，未安装会报错
//     );
// }

    store.asyncReducers = {};

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers')

            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}
