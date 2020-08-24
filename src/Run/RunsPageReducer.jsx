import {
    FETCH_RUNS_LIST,
    FETCH_RUNS_FULFILLED,
    FETCH_RUNS_ERROR,
} from '../constants'


export default function runsPageReducer(state={
    runs_list: null,
    runs_list_fetching: false,
    runs_list_fulfilled: false,
    runs_list_error: null,
}, action) {
    switch (action.type) {
        case FETCH_RUNS_LIST: {
            return {
                ...state,
                runs_list_fetching: true,
            }
        }
        case FETCH_RUNS_FULFILLED: {
            return {
                ...state,
                runs_list_fetching: false,
                runs_list_fulfilled: true,
                runs_list: action.payload
            }
        }
        case FETCH_RUNS_ERROR: {
            return {
                ...state,
                runs_list_fetching: false,
                runs_list_error: action.payload
            }
        }
    }
    return state
}