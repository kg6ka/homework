import {
    ROLES_REQUEST,
    ROLES_FAIL,
    ROLES_SUCCESS,
    DELETE_ROLE_SUCCESS,
    CURRENT_ROLE_REQUEST,
    CURRENT_ROLE_SUCCESS,
    CREATE_ROLE_REQUEST,
    CREATE_ROLE_SUCCESS
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

export function current_role_request() {
    return {
        type: CURRENT_ROLE_REQUEST
    }
}

export function current_role_success(payload) {
    return {
        type: CURRENT_ROLE_SUCCESS,
        payload
    }
}

export function create_role_request() {
    return {
        type: CREATE_ROLE_REQUEST
    }
}

export function create_role_success(payload) {
    return {
        type: CREATE_ROLE_SUCCESS,
        payload
    }
}