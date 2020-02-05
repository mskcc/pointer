import axios from 'axios'

import {
    API_URL,
    RUNS_ENDPOINT,

    FETCH_RUNS_LIST,
    FETCH_RUNS_FULFILLED,
    FETCH_RUNS_ERROR,
} from '../constants'

import { authHeader } from '@/_helpers';


export function getRuns(page) {
    return function (dispatch) {
        dispatch({type: FETCH_RUNS_LIST});
        axios.get(API_URL + RUNS_ENDPOINT, {
            params: {
                page: unescape(page),
            },
            headers: authHeader()
        }).then((resp) => {
            dispatch({type: FETCH_RUNS_FULFILLED, payload: resp.data});
        }).catch((err) => {
            dispatch({type: FETCH_RUNS_ERROR, payload: err});
        });
    }
}
