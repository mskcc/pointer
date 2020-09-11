import axios from 'axios';

import { API_URL, RUNS_ENDPOINT, PORTS_ENDPOINT } from '../constants';
import {
    FETCH_RUNS_LIST,
    RUNS_LIST_FULFILLED,
    RUNS_LIST_ERROR,
    START_CREATE_RUN,
    CREATE_RUN_FULFILLED,
    CREATE_RUN_ERROR,
    START_UPDATE_PORT,
    UPDATE_PORT_FULFILLED,
    UPDATE_PORT_ERROR,
    UPDATE_RUN,
    UPDATE_RUN_FULFILLED,
    UPDATE_RUN_ERROR,
} from './RunsPageReducer';

import {
    authHeader,
    handleError,
    handleSingleParam,
    handleSingleBoolParam,
    handleArrayParam,
} from '@/_helpers';

import qs from 'qs';

export function createRun(pipeline_id, request_id) {
    return function (dispatch) {
        dispatch(START_CREATE_RUN());

        return axios(API_URL + RUNS_ENDPOINT, {
            method: 'post',
            headers: authHeader(),
            data: {
                pipeline_id: pipeline_id,
                request_id: request_id,
            },
        })
            .then((resp) => {
                dispatch(CREATE_RUN_FULFILLED({ data: resp.data }));
            })
            .catch((err) => {
                const { data, status } = handleError(err);
                dispatch(
                    CREATE_RUN_ERROR({
                        data: data,
                        status: status,
                    })
                );
            });
    };
}

export function updatePorts(run_id, inputs, status) {
    return function (dispatch) {
        for (const key in inputs) {
            dispatch(START_UPDATE_PORT());

            axios
                .put(API_URL + PORTS_ENDPOINT, {
                    params: {
                        run_ids: handleArrayParam(run_id),
                    },
                    headers: authHeader(),
                    body: JSON.stringify({ values: inputs[key] }),
                })
                .then((resp) => {
                    dispatch(UPDATE_PORT_FULFILLED({ data: resp.data }));
                    // Need to automatically update runs after updating ports
                    // Todo: why?
                    dispatch(
                        UPDATE_RUN({
                            id: run_id,
                            data: resp.data,
                        })
                    );
                })
                .catch((err) => {
                    const { data, status } = handleError(err);
                    dispatch(
                        UPDATE_PORT_ERROR({
                            data: data,
                            status: status,
                        })
                    );
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
