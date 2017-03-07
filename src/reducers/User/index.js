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
                token: action.payload.token,
                user_id: action.payload.user_id,
                isAuthenticated: action.payload.isAuthenticated,
                expired: action.payload.expired
            };

        case LOGIN_FAIL:
            // TODO
            return {...state,
                email: action.payload.email,
                token: '',
                user_id: '',
                expired: 0,
                isAuthenticated: action.payload.isAuthenticated
            };

        case LOGOUT_SUCCESS:
            // TODO
            return {...state,
                token: '',
                user_id: '',
                expired: 0,
                isAuthenticated: action.payload.isAuthenticated
            };

        default:
            return state
    }
}
