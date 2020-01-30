import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware, push } from 'react-router-redux'

import { createLogger } from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

import reducer from "./root_reducer.js"


const routeMiddleware = routerMiddleware(browserHistory);

const middleware = applyMiddleware(thunk); //, createLogger(), routeMiddleware);

// Redux Devtools config
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(reducer, {}, middleware) // {}, composeEnhancers(middleware));