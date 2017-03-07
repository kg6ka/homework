/*eslint-disable*/
import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS
} from '../../constants/User';

export function login_request() {
  return {
    type: LOGIN_REQUEST
  }
}

export function login_success(payload) {
  return {
    type: LOGIN_SUCCESS,
    payload
  }
}

export function login_fail(payload) {
  return {
    type: LOGIN_FAIL,
    payload
  }
}

// export function logout(payload) {
//     return (dispatch) => {

//         setTimeout(() => {
//             dispatch({
//                 type: LOGOUT_SUCCESS,
//                 payload: {
//                     email: payload.email,
//                     password: payload.password,
//                     isAuthenticated: false
//                 }
//             });

//             window.localStorage.clear();

//             dispatch({
//                 type: ROUTING,
//                 payload: {
//                     method: 'replace',
//                     nextUrl: '/login'
//                 }
//             });
//         }, 1500)
//     }
// }
/*eslint-enable*/