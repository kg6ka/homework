/**
 * Handle Errors
 */
//TODO will create
export const handleErrors = (response) => {
    if (!response.ok || response.status !== 200) {
        throw Error(response.status + ' ' + response.statusText);
    }
    return response.json();
};