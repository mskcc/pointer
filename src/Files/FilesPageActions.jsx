import axios from 'axios';

import {
    API_URL,
    FILES_ENDPOINT,
    FETCH_FILES_LIST,
    FILES_LIST_FULFILLED,
    FILES_LIST_ERROR,
} from '../constants';

import { authHeader } from '@/_helpers';

export function loadFilesList(page, file_group, file_type, metadata, filename, filename_regex) {
    return function (dispatch) {
        dispatch({ type: FETCH_FILES_LIST });

        let params = {
            page: unescape(page),
        };

        if (file_group != null && file_group !== '') {
            params.file_group = file_group;
        }
        if (file_type != null && file_type !== '') {
            params.file_type = file_type;
        }
        if (metadata != null && metadata !== '') {
            params.metadata = metadata;
        }
        if (filename != null && filename !== '') {
            params.filename = filename;
        }
        if (filename_regex != null && filename_regex !== '') {
            params.filename_regex = filename_regex;
        }

        axios
            .get(API_URL + FILES_ENDPOINT, {
                params: params,
                headers: authHeader(),
            })
            .then((resp) => {
                dispatch({ type: FILES_LIST_FULFILLED, payload: resp.data });
            })
            .catch((err) => {
                dispatch({ type: FILES_LIST_ERROR, payload: err, status: err.response.status });
            });
    };
}
