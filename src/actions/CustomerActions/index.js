/*eslint-disable*/
import {
    CUSTOMERS_REQUEST,
    CUSTOMERS_SUCCESS,
    CUSTOMERS_FAIL,
    BLOCK_CUSTOMER_REQUEST,
    BLOCK_CUSTOMER_SUCCESS,
    BLOCK_CUSTOMER_FAIL,
    REINVITE_CUSTOMER_REQUEST,
    REINVITE_CUSTOMER_SUCCESS,
    REINVITE_CUSTOMER_FAIL,
    CREATE_CUSTOMER_REQUEST,
    CREATE_CUSTOMER_SUCCESS,
    CREATE_CUSTOMER_FAIL,
    UPDATE_CUSTOMER_REQUEST,
    UPDATE_CUSTOMER_SUCCESS,
    UPDATE_CUSTOMER_FAIL
} from '../../constants/Customers';

/**
 * Get all customers
 */
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

/**
 * Block customer
 */
export function block_customer_request() {
    return {
        type: BLOCK_CUSTOMER_REQUEST
    }
}

export function block_customer_success(payload) {
    return {
        type: BLOCK_CUSTOMER_SUCCESS,
        payload
    }
}

export function block_customer_fail() {
    return {
        type: BLOCK_CUSTOMER_FAIL
    }
}


/**
 * ReInvite customer
 */
export function reinvite_customer_request() {
    return {
        type: REINVITE_CUSTOMER_REQUEST
    }
}

export function reinvite_customer_success(payload) {
    return {
        type: REINVITE_CUSTOMER_SUCCESS,
        payload
    }
}

export function reinvite_customer_fail() {
    return {
        type: REINVITE_CUSTOMER_FAIL
    }
}

/**
 * Create new customer
 */
export function create_customer_request() {
    return {
        type: CREATE_CUSTOMER_REQUEST
    }
}

export function create_customer_success(payload) {
    return {
        type: CREATE_CUSTOMER_SUCCESS,
        payload
    }
}

export function create_customer_fail() {
    return {
        type: CREATE_CUSTOMER_FAIL
    }
}

/**
 * Update new customer
 */
export function update_customer_request() {
    return {
        type: UPDATE_CUSTOMER_REQUEST
    }
}

export function update_customer_success(payload) {
    return {
        type: UPDATE_CUSTOMER_SUCCESS,
        payload
    }
}

export function update_customer_fail() {
    return {
        type: UPDATE_CUSTOMER_FAIL
    }
}
/*eslint-enable*/
