import {authHeader, handleResponse} from "@/_helpers";

import axios from 'axios'

import {
    API_URL,
    FILES_ENDPOINT,
    FILES_TYPES_ENDPOINT,

    FILE_GET_FIRST,
    FILE_GET_FIRST_FULFILLED,
    FILE_GET_FIRST_ERROR,
    FILE_GET,
    FILE_GET_FULFILLED,
    FILE_GET_ERROR,
    FILE_GET_TYPES,
    FILE_GET_TYPES_FULFILLED,
    FILE_GET_TYPES_ERROR,
    UPDATE_FILE,
    UPDATE_FILE_FULFILLED,
    UPDATE_FILE_ERROR
} from '../constants'


export function getFirstFile() {
    return function (dispatch) {
        dispatch({type: FILE_GET_FIRST});
        axios.get(API_URL + FILES_ENDPOINT, {
            headers: authHeader()
        }).then((resp) => {
            dispatch({type: FILE_GET_FIRST_FULFILLED, payload: resp.data});
        }).catch((err) => {
            dispatch({type: FILE_GET_FIRST_ERROR, payload: err});
        });
    }
}

export function getFile(file_id) {
    return function (dispatch) {
        dispatch({type: FILE_GET});
        axios.get(API_URL + FILES_ENDPOINT + file_id, {
            headers: authHeader()
        }).then((resp) => {
            dispatch({type: FILE_GET_FULFILLED, payload: resp.data});
        }).catch((err) => {
            dispatch({type: FILE_GET_ERROR, payload: err});
        });
    }
}

export function getFileTypes(page) {
    return function (dispatch) {
        dispatch({type: FILE_GET_TYPES});
        axios.get(API_URL + FILES_TYPES_ENDPOINT, {
            params: {},
            headers: authHeader()
        }).then((resp) => {
            dispatch({type: FILE_GET_TYPES_FULFILLED, payload: resp.data});
        }).catch((err) => {
            dispatch({type: FILE_GET_TYPES_ERROR, payload: err});
        });
    }
}

export function updateFile(id, path, size, file_type, metadata) {
    return function (dispatch) {
        dispatch({type: UPDATE_FILE});
        axios.put(API_URL + FILES_ENDPOINT, {
            params: {
                file_id: id
            },
            headers: authHeader(),
            data: JSON.stringify({ path, size, file_type, metadata })
        }).then((resp) => {
            dispatch({type: UPDATE_FILE_FULFILLED, payload: resp.data});
        }).catch((err) => {
            dispatch({type: UPDATE_FILE_ERROR, payload: err});
        });
    }
}
