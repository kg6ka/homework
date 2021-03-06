import * as ApiUrl from '../../constants/Routes';
import { COMMON } from '../../constants/Common';

const rolesURL = ApiUrl.ROOT_API + ApiUrl.PERMISSIONS;

export const getAllPermissions = (headers) => {
    let headerOptions = Object.assign(COMMON.DEFAULT_HEADERS, headers);
    let requestHeader =  new Headers(headerOptions);
    let fetchOptions = {
        method: 'GET',
        headers: requestHeader,
        mode: 'cors'
    };
    return fetch(rolesURL + '/all', fetchOptions)
};

export const getCurrentPermissions = (headers, role_id) => {
    let headerOptions = Object.assign(COMMON.DEFAULT_HEADERS, headers);
    let requestHeader =  new Headers(headerOptions);
    let fetchOptions = {
        method: 'GET',
        headers: requestHeader,
        mode: 'cors'
    };
    return fetch(rolesURL + '?role_id=' + role_id, fetchOptions)
};