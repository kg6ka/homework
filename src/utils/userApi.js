import * as ApiUrl from '../constants/Routes';

export const getCurrentUser = (params) => {
    let loginURl = ApiUrl.ROOT_API + ApiUrl.LOGIN_API;
    let requestHeader =  new Headers({
        // 'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8'
        // 'Access-Control-Allow-Headers': 'origin, content-type, accept, access-control-allow-origin',

    });
    let fetchOptions = {
        method: 'POST',
        headers: requestHeader,
        mode: 'cors',
        body: JSON.stringify(params)
    };
    return fetch(loginURl, fetchOptions)
};