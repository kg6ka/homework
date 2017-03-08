import * as ApiUrl from '../../constants/Routes';

export const getCurrentUser = (params) => {
    let loginURl = ApiUrl.ROOT_API + ApiUrl.LOGIN;
    let requestHeader =  new Headers({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8'
    });
    let fetchOptions = {
        method: 'POST',
        headers: requestHeader,
        mode: 'cors',
        body: JSON.stringify(params)
    };
    return fetch(loginURl, fetchOptions)
};