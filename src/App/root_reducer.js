import { combineReducers } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import appReducer from './app_reducer';
import loginReducer from '../LoginPage/LoginReducer';
import filesPageReducer from '../Files/FilesPageReducer';
import pipelinePageReducer from '../PipelinePage/PipelinePageReducer';
import runsPageReducer from '../Run/RunsPageReducer';


export default combineReducers({
    appReducer,
    loginReducer,
    filesPageReducer,
    pipelinePageReducer,
    runsPageReducer,
    routing: routerReducer
});
