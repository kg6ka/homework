import {
    PERMISSION_REQUEST,
    PERMISSION_FAIL,
    PERMISSION_SUCCESS,
    CURRENT_PERMISSION_REQUEST,
    CURRENT_PERMISSION_SUCCESS,
    CURRENT_PERMISSION_FAIL
} from '../../constants/Permissions';

export function permissions_request() {
    return {
        type: PERMISSION_REQUEST
    }
}

export function permissions_success(payload) {
    return {
        type: PERMISSION_SUCCESS,
        payload
    }
}

export function permissions_fail() {
    return {
        type: PERMISSION_FAIL
    }
}

export function current_permissions_request() {
    return {
        type: CURRENT_PERMISSION_REQUEST
    }
}

export function current_permissions_success(payload) {
    return {
        type: CURRENT_PERMISSION_SUCCESS,
        payload
    }
}

export function current_permissions_fail() {
    return {
        type: CURRENT_PERMISSION_FAIL
    }
}