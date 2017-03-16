export const queryConstructor = (params) => {
    let queryString = '?';
    for(let [key, value] of Object.entries(params)) {
        queryString += `${key}=${value}&`
    }
    return queryString.substring(0, queryString.length - 1);
};