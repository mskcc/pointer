import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Route } from 'react-router'; //browserHistory
import { syncHistoryWithStore, routerReducer, routerMiddleware, push } from 'react-router-redux';

import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { createPromise } from 'redux-promise-middleware';

import reducer from './root_reducer.js'


//const routeMiddleware = routerMiddleware(browserHistory);

const middleware = applyMiddleware(createPromise, thunk, createLogger);//, routeMiddleware);

// Redux Devtools config
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(reducer, {}, middleware);
