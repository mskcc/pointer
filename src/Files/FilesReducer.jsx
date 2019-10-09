import {
    FETCH_FILES_LIST,
    FILES_LIST_FULFILLED,
    FILES_LIST_ERROR,
    SET_OPTION
} from '../constants'


export default function reducer(state={
    // Global files list
    files_list: [],
    files_list_fetching: false,
    files_list_fulfilled: false,
    files_list_error: null,
}, action) {

    switch (action.type) {

        case FETCH_FILES_LIST: {
            // An action was received to indicate start of fetch from server
            return {
                ...state,
                files_list_fetching: true,
            }
        }

        case FILES_LIST_FULFILLED: {
            // An action was received to indicate success of fetch from server
            return {
                ...state,
                files_list_fetching: false,
                files_list_fulfilled: true,
            }
        }

        case FILES_LIST_ERROR: {
            // An action was received to set an error state based on failed ajax request
            return {
                ...state,
                files_list_fetching: false,
                files_list_error: action.payload
            }
        }

        case SET_OPTION: {
            // An action was received to set some state locally (such as a button press)
            return {
                ...state,
                primary_combination_details_progressing: false,
            }
        }

    }

    return state
}