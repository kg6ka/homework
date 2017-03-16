import * as ApiUrl from '../../constants/Routes';
import { queryConstructor } from '../queryConstructor';

const rolesURL = ApiUrl.ROOT_API + ApiUrl.ROLES;

export const getAllRoles = (headers) => {
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
    return fetch(rolesURL, fetchOptions)
};

export const getRole = (headers, param) => {
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
    return fetch(`${rolesURL}?id=${param}`, fetchOptions)
};

export const createRole = (headers, params) => {
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
    return fetch(rolesURL, fetchOptions)
};

export const editRole = (headers, params) => {
    let headerOptions = Object.assign({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8'
    }, headers);
    let requestHeader =  new Headers(headerOptions);
    let fetchOptions = {
        method: 'PUT',
        headers: requestHeader,
        mode: 'cors',
        body: JSON.stringify(params)
    };
    return fetch(rolesURL, fetchOptions)
};

export const deleteRole = (headers, params) => {
    let headerOptions = Object.assign({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8'
    }, headers);
    let requestHeader =  new Headers(headerOptions);
    let fetchOptions = {
        method: 'DELETE',
        headers: requestHeader,
        mode: 'cors'
    };
    return fetch(`${rolesURL}${queryConstructor(params)}`, fetchOptions)
};