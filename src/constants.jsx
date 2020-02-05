// Configuration for backend API
// Todo: have a DEV_API_URL as well
const API = 'http://silo:5001/v0';

export const API_URL = API;
export const UNVERSIONED_API_URL = API.replace('/v0', '');

/*                */
/*    Endpoints   */
/*                */
// export const LOGIN_ENDPOINT = '/login/';
export const LOGIN_ENDPOINT = '/api-token-auth/';
export const FILES_ENDPOINT = '/fs/files/';
export const PIPELINES_ENDPOINT = '/run/pipelines';
export const RUNS_ENDPOINT = '/run/runs';

/*                */
/*    Actions     */
/*                */

// App Actions
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';
export const FETCH_USER_FULFILLED = 'FETCH_USER_FULFILLED';
export const FETCH_PATIENT_ERROR = 'FETCH_PATIENT_ERROR';
export const FETCH_PATIENT_FULFILLED = 'FETCH_PATIENT_FULFILLED';
export const SET_INITIAL_PATIENT_DATA = 'SET_INITIAL_PATIENT_DATA';

export const LOGIN = 'LOGIN';
export const LOGIN_FULFILLED = 'LOGIN_FULFILLED';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';

// Files Actions
export const FETCH_FILES_LIST = 'FETCH_FILES_LIST';
export const FILES_LIST_FULFILLED = 'FILES_LIST_FULFILLED';
export const FILES_LIST_ERROR = 'FILES_LIST_ERROR';

// Pipelines Actions
export const FETCH_PIPELINES = 'FETCH_PIPELINES';
export const FETCH_PIPELINES_FULFILLED = 'FETCH_PIPELINES_FULFILLED';
export const FETCH_PIPELINES_ERROR = 'FETCH_PIPELINES_ERROR';

// Runs Actions
export const FETCH_RUNS_LIST = 'FETCH_RUNS_LIST';
export const FETCH_RUNS_FULFILLED = 'FETCH_RUNS_FULFILLED';
export const FETCH_RUNS_ERROR = 'FETCH_RUNS_ERROR';
