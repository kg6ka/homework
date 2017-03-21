import { COMMON } from '../../constants/Common';

export const getCurrentUser = (localizationType = 'eng') => {
    //TODO: change url
    // let loginURl = ApiUrl.ROOT_API + ApiUrl.LOCALIZATION + localizationType;
    console.log('localizationType is ', localizationType)
    let loginURl = 'http://localhost:5010/localization_eng.json';
    let requestHeader =  new Headers(COMMON.DEFAULT_HEADERS);
    let fetchOptions = {
        method: 'GET',
        headers: requestHeader,
        mode: 'cors'
    };
    return fetch(loginURl, fetchOptions)
};