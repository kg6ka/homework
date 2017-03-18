import * as ApiUrl from '../../constants/Routes';
import { queryConstructor } from '../queryConstructor';

const customersURL = ApiUrl.ROOT_API + ApiUrl.USER;
const createCustomerURL = ApiUrl.ROOT_API + ApiUrl.USER_INVITE;

export const getAllCustomers = (headers) => {
    let headerOptions = Object.assign({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8'
    }, headers);
    let requestHeader =  new Headers(headerOptions);
    let fetchOptions = {
        method: 'GET',
        headers: requestHeader,
        mode: 'cors'
    };
    return fetch(customersURL, fetchOptions);
};

export const createCustomer = (headers, params) => {
    let headerOptions = Object.assign({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8'
    }, headers);
    let requestHeader =  new Headers(headerOptions);
    let fetchOptions = {
        method: 'POST',
        headers: requestHeader,
        mode: 'cors',
        body: JSON.stringify(params)
    };
    return fetch(createCustomerURL, fetchOptions);
};

export const isBlockCustomer = (headers, params, action) => {
    let path = action ? 'unblock' : 'block';
    let headerOptions = Object.assign({
        'Access-Control-Allow-Origin': '*'
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
    let headerOptions = Object.assign({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8'
    }, headers);
    let requestHeader =  new Headers(headerOptions);
    let fetchOptions = {
        method: 'POST',
        headers: requestHeader,
        mode: 'cors',
        body: JSON.stringify(params)
    };
    return fetch(createCustomerURL, fetchOptions);
};
