// Configuration for backend API
// Todo: have a DEV_API_URL as well
const API = 'http://10.0.2.2:5000/api/v1';

export const API_URL = API;

/*                */
/*    Endpoints   */
/*                */
export const FILES_ENDPOINT = '/files';

/*                */
/*    Actions     */
/*                */

// App Actions

export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';
export const FETCH_USER_FULFILLED = 'FETCH_USER_FULFILLED';
export const FETCH_PATIENT_ERROR = 'FETCH_PATIENT_ERROR';
export const FETCH_PATIENT_FULFILLED = 'FETCH_PATIENT_FULFILLED';
export const SET_INITIAL_PATIENT_DATA = 'SET_INITIAL_PATIENT_DATA';
export const LOGOUT = 'LOGOUT';

// Files Actions
export const FETCH_FILES_LIST = 'FETCH_FILES_LIST';
export const FILES_LIST_FULFILLED = 'FILES_LIST_FULFILLED';
export const FILES_LIST_ERROR = 'FILES_LIST_ERROR';
export const SET_OPTION = 'SET_OPTION';
