import axios from 'axios'

import {
    API_URL,
    FILES_ENDPOINT,

    FETCH_FILES_LIST,
    FILES_LIST_FULFILLED,
    FILES_LIST_ERROR,
} from '../constants'

import { authHeader } from '@/_helpers';


export function loadFilesList(data_for_request) {
    return function (dispatch) {
        dispatch({type: FETCH_FILES_LIST});
        axios.get(API_URL + FILES_ENDPOINT, {
            params: {
                // param_one: unescape(data_for_request),
            },
            headers: authHeader()
        }).then((resp) => {
            dispatch({type: FILES_LIST_FULFILLED, payload: resp.data});
        }).catch((err) => {
            dispatch({type: FILES_LIST_ERROR, payload: err});
        });
    }
}
