import {
    ROLES_REQUEST,
    ROLES_FAIL,
    ROLES_SUCCESS,
    DELETE_ROLE_REQUEST,
    DELETE_ROLE_SUCCESS,
    DELETE_ROLE_FAIL,
    CURRENT_ROLE_REQUEST,
    CURRENT_ROLE_SUCCESS,
    CREATE_ROLE_REQUEST,
    CREATE_ROLE_SUCCESS,
    CREATE_ROLE_FAIL,
    EDIT_ROLE_REQUEST,
    EDIT_ROLE_SUCCESS,
    EDIT_ROLE_FAIL
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

export function delete_role_request() {
    return {
        type: DELETE_ROLE_REQUEST
    }
}

export function delete_role_success(payload) {
    return {
        type: DELETE_ROLE_SUCCESS,
        payload
    }
}

export function delete_role_fail() {
    return {
        type: DELETE_ROLE_FAIL
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

export function create_role_fail() {
    return {
        type: CREATE_ROLE_FAIL
    }
}

export function edit_role_request() {
    return {
        type: EDIT_ROLE_REQUEST
    }
}

export function edit_role_success(payload) {
    return {
        type: EDIT_ROLE_SUCCESS,
        payload
    }
}

export function edit_role_fail() {
    return {
        type: EDIT_ROLE_FAIL
    }
}