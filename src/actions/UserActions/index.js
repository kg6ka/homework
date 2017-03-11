/*eslint-disable*/
import {
  pendingTask,
  begin,
  end
} from 'react-redux-spinner';
import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS
} from '../../constants/User';

export function login_request() {
  return {
    type: LOGIN_REQUEST,
    [ pendingTask ]: begin
  }
}

export function login_success(payload) {
  return {
    type: LOGIN_SUCCESS,
    payload,
    [ pendingTask ]: end
  }
}

export function login_fail(payload) {
  return {
    type: LOGIN_FAIL,
    payload,
    [ pendingTask ]: end
  }
}

export function logout_success() {
  return {
    type: LOGOUT_SUCCESS
  }
}
/*eslint-enable*/