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

// Combinations Actions
export const FETCH_FILES_LIST = 'FETCH_FILES_LIST';
export const FILES_LIST_FULFILLED = 'FILES_LIST_FULFILLED';
export const FILES_LIST_ERROR = 'FILES_LIST_ERROR';
export const SET_OPTION = 'SET_OPTION';
