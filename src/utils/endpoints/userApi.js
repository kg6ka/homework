import * as ApiUrl from '../../constants/Routes';
import { COMMON } from '../../constants/Common';

export const getCurrentUser = (params) => {
    let loginURl = ApiUrl.ROOT_API + ApiUrl.LOGIN;
    let requestHeader =  new Headers(COMMON.DEFAULT_HEADERS);
    let fetchOptions = {
        method: 'POST',
        headers: requestHeader,
        mode: 'cors',
        body: JSON.stringify(params)
    };
    return fetch(loginURl, fetchOptions)
};
