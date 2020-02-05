import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';

export const fileService = {
    getFirst,
    getFile,
    getFileTypes,
    updateFile,
};

function getFirst() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    var response = fetch(`${config.apiUrl}/v0/fs/files/`, requestOptions).then(handleResponse);
    return response;
}

function getFile(file_id) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    var response = fetch(`${config.apiUrl}/v0/fs/files/${file_id}/`, requestOptions).then(handleResponse);
    return response;
}

function getFileTypes() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    var response = fetch(`${config.apiUrl}/v0/fs/file-types/`, requestOptions).then(handleResponse);
    return response;
}

function updateFile(file_id, path, size, file_type, metadata) {
    const requestOptions = { method: 'PUT', 
                             headers: authHeader(),
                             body: JSON.stringify({ path, size, file_type, metadata })
                            };
    var response = fetch(`${config.apiUrl}/v0/fs/files/${file_id}/`, requestOptions).then(handleResponse);
    return response;
}
