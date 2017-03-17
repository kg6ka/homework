export const getCurrentUser = (localizationType = 'eng') => {
    //TODO: change url
    // let loginURl = ApiUrl.ROOT_API + ApiUrl.LOCALIZATION + localizationType;
    console.log('localizationType is ', localizationType)
    let loginURl = 'http://localhost:5010/localization.json';
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