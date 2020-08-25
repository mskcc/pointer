import axios from 'axios';

import {
    UNVERSIONED_API_URL,
    LOGIN_ENDPOINT,
    LOGIN,
    LOGIN_FULFILLED,
    LOGIN_ERROR,
} from '../constants';

export function login(username, password) {
    return function (dispatch) {
        dispatch({ type: LOGIN });

        return axios
            .post(UNVERSIONED_API_URL + LOGIN_ENDPOINT, {
                username: username,
                password: password,
            })
            .then((resp) => {
                // Todo: ok to not use currentUserSubject anymore? and only localStorage?
                localStorage.setItem('currentUser', JSON.stringify(resp.data));
                dispatch({ type: LOGIN_FULFILLED, payload: resp.data });
            })
            .catch((err) => {
                dispatch({
                    type: LOGIN_ERROR,
                    payload: err,
                    status: err.response.status,
                });
            });
    };
}
