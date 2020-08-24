import {
    FETCH_USER_ERROR,
    FETCH_USER_FULFILLED,
    FETCH_PATIENT_ERROR,
    FETCH_PATIENT_FULFILLED,
    SET_INITIAL_PATIENT_DATA,
    LOGOUT
} from '../constants'


export default function appReducer(state={
    user: null,
    patient: null,
    user_fetching: false,
    user_fetched: false,
    user_error: null,

    initial_patient_data: null
}, action) {

    switch (action.type) {

        case FETCH_USER_ERROR: {
            return {
                ...state,
                user_fetching: false,
                user_fetch_error: action.payload
            }
        }
        case FETCH_USER_FULFILLED: {
            return {
                ...state,
                user_fetching: false,
                user_fetched: true,
                user: action.payload
            }
        }

        case FETCH_PATIENT_ERROR: {
            return {
                ...state,
                patient_fetching: false,
                patient_fetch_error: action.payload
            }
        }
        case FETCH_PATIENT_FULFILLED: {
            return {
                ...state,
                patient_fetching: false,
                patient_fetched: true,
                patient: action.payload
            }
        }

        case SET_INITIAL_PATIENT_DATA: {
            return {
                ...state,
                initial_patient_data: action.payload
            }
        }

        case LOGOUT: {
            return {
                ...state,
                user: null,
                patient: null
            }
        }

    }

    return state
}