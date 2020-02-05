import axios from 'axios'

import {
    API_URL,
    PIPELINES_ENDPOINT,

    FETCH_PIPELINES,
    FETCH_PIPELINES_FULFILLED,
    FETCH_PIPELINES_ERROR
} from '../constants'

import { authenticationService } from '@/_services';

import { authHeader } from '@/_helpers';


export function getPage(page) {
    return function (dispatch) {
        return axios.get(API_URL + PIPELINES_ENDPOINT, {
            params: {
                page: unescape(page),
            },
            headers: authHeader()
        }).then((resp) => {
            dispatch({type: FETCH_PIPELINES_FULFILLED, payload: resp.data});
        }).catch((err) => {
            dispatch({
                type: FETCH_PIPELINES_ERROR,
                payload: err,
                status: err.response.status
            });
        });
    }
}
