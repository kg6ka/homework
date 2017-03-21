import * as ApiUrl from '../../constants/Routes';
import { COMMON } from '../../constants/Common';

export const checkInvite = (hash) => {
    let loginURl = ApiUrl.ROOT_API + ApiUrl.ACTIVATE_USER + hash;
    let requestHeader =  new Headers(COMMON.DEFAULT_HEADERS);
    let fetchOptions = {
        method: 'GET',
        headers: requestHeader,
        mode: 'cors'
    };
    return fetch(loginURl, fetchOptions)
};