import {
    FETCH_FILES_LIST,
    FILES_LIST_FULFILLED,
    FILES_LIST_ERROR,
} from '../constants'


export default function reducer(state={
    files_list: null,
    files_list_fetching: false,
    files_list_fulfilled: false,
    files_list_error: null,
}, action) {
    switch (action.type) {
        case FETCH_FILES_LIST: {
            return {
                ...state,
                files_list_fetching: true,
            }
        }
        case FILES_LIST_FULFILLED: {
            return {
                ...state,
                files_list_fetching: false,
                files_list_fulfilled: true,
                files_list: action.payload
            }
        }
        case FILES_LIST_ERROR: {
            return {
                ...state,
                files_list_fetching: false,
                files_list_error: action.payload
            }
        }
    }
    return state
}