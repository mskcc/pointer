import axios from 'axios';

import {
    API_URL,
    RUNS_ENDPOINT,
    PORTS_ENDPOINT,
    FETCH_RUNS_LIST,
    FETCH_RUNS_FULFILLED,
    FETCH_RUNS_ERROR,
    START_CREATE_RUN,
    CREATE_RUN_FULFILLED,
    CREATE_RUN_ERROR,
    FETCH_RUN,
    FETCH_RUN_FULFILLED,
    FETCH_RUN_ERROR,
    START_UPDATE_PORT,
    UPDATE_PORT_FULFILLED,
    UPDATE_PORT_ERROR,
    UPDATE_RUN,
    UPDATE_RUN_FULFILLED,
    UPDATE_RUN_ERROR,
} from '../constants';

import { authHeader } from '@/_helpers';

export function getRuns(page) {
    return function (dispatch) {
        dispatch({ type: FETCH_RUNS_LIST });
        axios
            .get(API_URL + RUNS_ENDPOINT, {
                params: {
                    page: unescape(page),
                },
                headers: authHeader(),
            })
            .then((resp) => {
                dispatch({ type: FETCH_RUNS_FULFILLED, payload: resp.data });
            })
            .catch((err) => {
                dispatch({ type: FETCH_RUNS_ERROR, payload: err, status: err.response.status });
            });
    };
}

export function getRun(run_id) {
    return function (dispatch) {
        dispatch({ type: FETCH_RUN });

        return axios
            .get(API_URL + RUNS_ENDPOINT, {
                params: {
                    run_id: unescape(run_id),
                },
                headers: authHeader(),
            })
            .then((resp) => {
                dispatch({ type: FETCH_RUN_FULFILLED, payload: resp.data });
            })
            .catch((err) => {
                dispatch({ type: FETCH_RUN_ERROR, payload: err, status: err.response.status });
            });
    };
}

export function createRun(pipeline_id, request_id) {
    return function (dispatch) {
        dispatch({ type: START_CREATE_RUN });

        return axios(API_URL + RUNS_ENDPOINT, {
            method: 'post',
            headers: authHeader(),
            data: {
                pipeline_id: pipeline_id,
                request_id: request_id,
            },
        })
            .then((resp) => {
                dispatch({ type: CREATE_RUN_FULFILLED, payload: resp.data });
            })
            .catch((err) => {
                dispatch({ type: CREATE_RUN_ERROR, payload: err, status: err.response.status });
            });
    };
}

export function updatePorts(run_id, inputs, status) {
    return function (dispatch) {
        for (const key in inputs) {
            dispatch({ type: START_UPDATE_PORT });

            axios
                .put(API_URL + PORTS_ENDPOINT, {
                    params: {
                        run_id: unescape(run_id),
                    },
                    headers: authHeader(),
                    body: JSON.stringify({ values: inputs[key] }),
                })
                .then((resp) => {
                    dispatch({ type: UPDATE_PORT_FULFILLED, payload: resp.data });
                    // Need to automatically update runs after updating ports
                    // Todo: why?
                    dispatch({
                        type: UPDATE_RUN,
                        id: id,
                        payload: resp.data,
                    });
                })
                .catch((err) => {
                    dispatch({
                        type: UPDATE_PORT_ERROR,
                        payload: err,
                        status: err.response.status,
                    });
                });
        }
    };
}

export function updateRun(id, status) {
    return function (dispatch) {
        return axios
            .put(API_URL + RUNS_ENDPOINT + '/${id}', {
                params: {
                    run_id: unescape(id),
                },
                headers: authHeader(),
            })
            .then((resp) => {
                dispatch({ type: UPDATE_RUN_FULFILLED, payload: resp.data });
            })
            .catch((err) => {
                dispatch({ type: UPDATE_RUN_ERROR, payload: err, status: err.response.status });
            });
    };
}
