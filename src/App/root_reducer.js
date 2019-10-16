import { combineReducers } from 'redux';


import { syncHistoryWithStore, routerReducer } from 'react-router-redux';


import appReducer from './app_reducer';
import filesPageReducer from '../Files/FilesPageReducer';


export default combineReducers({
    appReducer,
    filesPageReducer,
    routing: routerReducer
});
