import * as ApiUrl from '../../constants/Routes';

const rolesUrl = ApiUrl.ROOT_API + ApiUrl.ROLES;

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
    return fetch(rolesUrl, fetchOptions)
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
    return fetch(`${rolesUrl}?id=${param}`, fetchOptions)
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
    return fetch(rolesUrl, fetchOptions)
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
    return fetch(rolesUrl, fetchOptions)
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
        mode: 'cors',
        body: JSON.stringify(params)
    };
    return fetch(rolesUrl, fetchOptions)
};