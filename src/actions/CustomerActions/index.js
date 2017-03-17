/*eslint-disable*/
import {
    CUSTOMERS_REQUEST,
    CUSTOMERS_SUCCESS,
    CUSTOMERS_FAIL
} from '../../constants/Customers';

export function customers_request() {
    return {
        type: CUSTOMERS_REQUEST
    }
}

export function customers_success(payload) {
    return {
        type: CUSTOMERS_SUCCESS,
        payload
    }
}

export function customers_fail() {
    return {
        type: CUSTOMERS_FAIL
    }
}
/*eslint-enable*/
