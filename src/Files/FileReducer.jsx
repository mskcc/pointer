import {
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


export default function fileReducer(state={
    file: null,
    file_types: [],
    file_fetching: false,
    file_fulfilled: false,
    file_error: null,
    update_file: false,
    update_file_fulfilled: false,
    update_file_error: null,
}, action) {
    switch (action.type) {
        case FILE_GET_FIRST: {
            return {
                ...state,
                files_fetching: true,
            }
        }
        case FILE_GET_FIRST_FULFILLED: {
            return {
                ...state,
                file_fetching: false,
                file_fulfilled: true,
                file: action.payload
            }
        }
        case FILE_GET_FIRST_ERROR: {
            return {
                ...state,
                file_fetching: false,
                file_error: action.payload
            }
        }

        case FILE_GET: {
            return {
                ...state,
                file_fetching: true,
            }
        }
        case FILE_GET_FULFILLED: {
            return {
                ...state,
                file_fetching: false,
                file_fulfilled: true,
                file: action.payload
            }
        }
        case FILE_GET_ERROR: {
            return {
                ...state,
                files_list_fetching: false,
                files_list_error: action.payload
            }
        }

        case FILE_GET_TYPES: {
            return {
                ...state,
                file_types_fetching: true,
            }
        }
        case FILE_GET_TYPES_FULFILLED: {
            return {
                ...state,
                file_types_fetching: false,
                file_types_fulfilled: true,
                file_types: action.payload
            }
        }
        case FILE_GET_TYPES_ERROR: {
            return {
                ...state,
                file_types_fetching: false,
                file_types_error: action.payload
            }
        }

        case UPDATE_FILE: {
            return {
                ...state,
                update_file: true,
            }
        }
        case UPDATE_FILE_FULFILLED: {
            return {
                ...state,
                update_file: false,
                update_file_fulfilled: true,
            }
        }
        case UPDATE_FILE_ERROR: {
            return {
                ...state,
                update_file: false,
                update_file_error: action.payload
            }
        }
    }
    return state
}