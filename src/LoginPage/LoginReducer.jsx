import {
    LOGIN,
    LOGIN_FULFILLED,
    LOGIN_ERROR,
} from '../constants'


export default function loginReducer(state={
    current_user: null,
    current_user_fetching: false,
    current_user_fulfilled: false,
    current_user_error: null,
}, action) {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                current_user: true,
            }
        }
        case LOGIN_FULFILLED: {
            return {
                ...state,
                current_user_fetching: false,
                current_user_fulfilled: true,
                current_user: action.payload
            }
        }
        case LOGIN_ERROR: {
            return {
                ...state,
                current_user: null,
                current_user_fetching: false,
                current_user_error: action.payload
            }
        }
    }
    return state
}