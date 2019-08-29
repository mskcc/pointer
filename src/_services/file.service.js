import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';

export const fileService = {
    getFirst,
    getPage,
    getFile,
    getFileTypes,
    updateFile,
    getPageSearch
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

function parseResponse(files) {
    const results = {}
    results['count'] = files.count
    results['next'] = files.next
    results['previous'] = files.previous
    results['results'] = []
    files.results.forEach(function (item, index) {
        const file = {}
        file['id'] = item.id
        file['file_name'] = item.file_name
        file['size'] = item.size
        file['file_group'] = item.file_group.name
        file['sample_id'] = item.metadata.igoSampleId
        file['request_id'] = item.metadata.requestId
        results['results'].push(file)
    });
    return results;
}

function getPage(page) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    var response = fetch(`${config.apiUrl}/v0/fs/files/?page=${page}`, requestOptions).then(handleResponse).then(parseResponse)
    return response;
}

function getPageSearch(page, file_group, file_type, metadata, file_name, file_name_regex) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    var query_params = ""
    if (file_group != null && file_group != '') {
        query_params += `&file_group=${file_group}`;
    }
    if (file_type != null && file_type != '') {
        query_params += `&file_type=${file_type}`;
    }
    if (metadata != null && metadata != '') {
        query_params += `&metadata=${metadata}`;
    }
    if (file_name != null && file_name != '') {
        query_params += `&filename=${file_name}`;
    }
    if (file_name_regex != null && file_name_regex != '') {
        query_params += `&filename_regex=${file_name_regex}`;
    }
    var response = fetch(`${config.apiUrl}/v0/fs/files/?page=${page}${query_params}`, requestOptions).then(handleResponse).then(parseResponse)
    return response;
}