/*eslint-disable*/
import {
    LOGIN_REQUEST,
    LOGIN_FAIL, //eslint-disable-line no-unused-vars
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS
} from '../../constants/User';

import { ROUTING } from '../../constants/Routing';

import { getStuff } from '../../utils/doSmth';

export function login(payload) {
    return (dispatch) => {
        //TODO
        //Promise.resolve([]);
        dispatch({
            type: LOGIN_REQUEST
        });

        //getStuff().theen(res);
        setTimeout(() => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    email: payload.email,
                    password: payload.password,
                    isAuthenticated: true
                }
            });

            dispatch({
                type: ROUTING,
                payload: {
                    method: 'replace',
                    nextUrl: '/'
                }
            });
        }, 1500)
    }
}

export function logout(payload) {
    return (dispatch) => {

        setTimeout(() => {
            dispatch({
                type: LOGOUT_SUCCESS,
                payload: {
                    email: payload.email,
                    password: payload.password,
                    isAuthenticated: false
                }
            });

            window.localStorage.clear();

            dispatch({
                type: ROUTING,
                payload: {
                    method: 'replace',
                    nextUrl: '/login'
                }
            });
        }, 1500)
    }
}
/*eslint-enable*/