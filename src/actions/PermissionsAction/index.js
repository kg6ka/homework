import {
    PERMISSION_REQUEST,
    PERMISSION_FAIL,
    PERMISSION_SUCCESS
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

export function permissions_fail(payload) {
    return {
        type: PERMISSION_FAIL,
        payload
    }
}