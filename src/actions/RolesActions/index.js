import {
    ROLES_REQUEST,
    ROLES_FAIL,
    ROLES_SUCCESS,
    DELETE_ROLE_SUCCESS
} from '../../constants/Roles';

export function roles_request() {
    return {
        type: ROLES_REQUEST
    }
}

export function roles_success(payload) {
    return {
        type: ROLES_SUCCESS,
        payload
    }
}

export function roles_fail(payload) {
    return {
        type: ROLES_FAIL,
        payload
    }
}

export function role_delete(payload) {
    return {
        type: DELETE_ROLE_SUCCESS,
        payload
    }
}