import { COMMON } from '../../constants/Common';
import * as ApiUrl from '../../constants/Routes';

const loginURL =  ApiUrl.ROOT + ApiUrl.LOCALIZATION;

export const getCurrentLocalization = (localizationType = 'eng') => {
    console.log('localizationType is ', localizationType);

    const requestHeader =  new Headers(COMMON.DEFAULT_HEADERS);
    const fetchOptions = {
        method: 'GET',
        headers: requestHeader,
        mode: 'cors'
    };
    return fetch(loginURL, fetchOptions)
};