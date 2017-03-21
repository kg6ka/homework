import * as ApiUrl from '../../constants/Routes';
import { queryConstructor } from '../queryConstructor';
import { COMMON } from '../../constants/Common';

const customersURL = ApiUrl.ROOT_API + ApiUrl.USER;
const createCustomerURL = ApiUrl.ROOT_API + ApiUrl.USER_INVITE;
const reInviteCustomerURL = ApiUrl.ROOT_API + ApiUrl.USER_REINVITE;

export const getAllCustomers = (headers) => {
    let headerOptions = Object.assign(COMMON.DEFAULT_HEADERS, headers);
    let requestHeader =  new Headers(headerOptions);
    let fetchOptions = {
        method: 'GET',
        headers: requestHeader,
        mode: 'cors'
    };
    return fetch(customersURL, fetchOptions);
};

export const createCustomer = (headers, params) => {
    let headerOptions = Object.assign(COMMON.DEFAULT_HEADERS, headers);
    let requestHeader =  new Headers(headerOptions);
    let fetchOptions = {
        method: 'POST',
        headers: requestHeader,
        mode: 'cors',
        body: JSON.stringify(params)
    };
    return fetch(createCustomerURL, fetchOptions);
};

export const updateCustomer = (headers, params) => {
    let headerOptions = Object.assign(COMMON.DEFAULT_HEADERS, headers);
    let requestHeader =  new Headers(headerOptions);
    let fetchOptions = {
        method: 'PUT',
        headers: requestHeader,
        mode: 'cors',
        body: JSON.stringify(params)
    };
    return fetch(customersURL, fetchOptions);
};

export const isBlockCustomer = (headers, params, action) => {
    let path = action ? 'unblock' : 'block';
    let headerOptions = Object.assign({
        'Access-Control-Allow-Origin': COMMON.DEFAULT_HEADERS['Access-Control-Allow-Origin']
    }, headers);
    let requestHeader =  new Headers(headerOptions);
    let fetchOptions = {
        method: 'PUT',
        headers: requestHeader,
        mode: 'cors'
    };
    return fetch(`${customersURL}/${path}${queryConstructor(params)}`, fetchOptions);
};

export const reInviteCustomer = (headers, params) => {
    let headerOptions = Object.assign(COMMON.DEFAULT_HEADERS, headers);
    let requestHeader =  new Headers(headerOptions);
    let fetchOptions = {
        method: 'POST',
        headers: requestHeader,
        mode: 'cors',
        body: JSON.stringify(params)
    };
    return fetch(reInviteCustomerURL, fetchOptions);
};
