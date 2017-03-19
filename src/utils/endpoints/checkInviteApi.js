import * as ApiUrl from '../../constants/Routes';

export const checkInvite = (hash) => {
    let loginURl = ApiUrl.ROOT_API + ApiUrl.ACTIVATE_USER + hash;
    let requestHeader =  new Headers({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8'
    });
    let fetchOptions = {
        method: 'GET',
        headers: requestHeader,
        mode: 'cors'
    };
    return fetch(loginURl, fetchOptions)
};