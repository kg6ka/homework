import * as ApiUrl from '../../constants/Routes';

const rolesUrl = ApiUrl.ROOT_API + ApiUrl.PERMISSIONS;

export const getAllPermissions = (headers) => {
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