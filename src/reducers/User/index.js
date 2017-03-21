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
            return {...state, ...action.payload };

        case LOGIN_FAIL:
            // TODO
            return {...state, ...action.payload};

        case LOGOUT_SUCCESS:
            // TODO
            return {...state, ...action.payload};

        default:
            return state
    }
}
