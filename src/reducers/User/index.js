import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS
} from '../../constants/User'

const initialState = JSON.parse(window.localStorage.getItem('currentUser')) || {};

export default function userState(state = initialState, action) {

    switch (action.type) {

        case LOGIN_REQUEST:
            // TODO
            return state;

        case LOGIN_SUCCESS:
            // TODO
            return {...state,
                email: action.payload.email,
                password: action.payload.password,
                isAuthenticated: action.payload.isAuthenticated
            };

        case LOGIN_FAIL:
            // TODO
            return state;

        case LOGOUT_SUCCESS:
            // TODO
            return {...state,
                email: action.payload.email,
                password: action.payload.password,
                isAuthenticated: action.payload.isAuthenticated
            };

        default:
            return state
    }
}
