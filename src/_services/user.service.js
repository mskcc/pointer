import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';

export const userService = {
    getAll
};

// Todo: this method will ever be needed?
function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}