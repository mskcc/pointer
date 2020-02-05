import {
    FETCH_PIPELINES,
    FETCH_PIPELINES_FULFILLED,
    FETCH_PIPELINES_ERROR,
} from '../constants'


export default function reducer(state={
    pipelines: null,
}, action) {

    switch (action.type) {

        case FETCH_PIPELINES: {
            return {
                ...state,
                pipelines_fetching: true,
                pipelines_fetch_error: null
            }
        }
        case FETCH_PIPELINES_FULFILLED: {
            return {
                ...state,
                pipelines_fetching: false,
                pipelines: action.payload
            }
        }

        case FETCH_PIPELINES_ERROR: {
            return {
                ...state,
                pipelines_fetching: false,
                pipelines_fetch_error: action.payload
            }
        }

    }

    return state
}