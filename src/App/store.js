import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware, push } from 'react-router-redux'

import { createLogger } from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

import reducer from "./root_reducer.js"

import { history } from '@/_helpers';
import { currentUserSubject } from '@/_services';

const routeMiddleware = routerMiddleware(browserHistory);


const authInterceptor = ({ dispatch }) => (next) => (action) => {
    if (action.status === 401) {
        localStorage.removeItem('currentUser');
        currentUserSubject.next(null);
        history.push(`/login`)
        // dispatch(actions.removeJwt());
    } else {
        next(action);
    }
};


const middleware = applyMiddleware(thunk, createLogger(), routeMiddleware, authInterceptor);

// Redux Devtools config
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(reducer, {},  composeEnhancers(middleware));