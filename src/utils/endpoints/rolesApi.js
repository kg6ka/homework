import * as ApiUrl from '../../constants/Routes';
import { queryConstructor } from '../queryConstructor';
import { COMMON } from '../../constants/Common';

const rolesURL = ApiUrl.ROOT_API + ApiUrl.ROLES;

export const getAllRoles = (headers) => {
    let headerOptions = Object.assign(COMMON.DEFAULT_HEADERS, headers);
    let requestHeader =  new Headers(headerOptions);
    let fetchOptions = {
        method: 'GET',
        headers: requestHeader,
        mode: 'cors'
    };
    return fetch(rolesURL, fetchOptions)
};

export const createRole = (headers, params) => {
    let headerOptions = Object.assign(COMMON.DEFAULT_HEADERS, headers);
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
    let headerOptions = Object.assign(COMMON.DEFAULT_HEADERS, headers);
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
    let headerOptions = Object.assign(COMMON.DEFAULT_HEADERS, headers);
    let requestHeader =  new Headers(headerOptions);
    let fetchOptions = {
        method: 'DELETE',
        headers: requestHeader,
        mode: 'cors'
    };
    return fetch(`${rolesURL}${queryConstructor(params)}`, fetchOptions)
};
