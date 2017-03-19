import { browserHistory } from 'react-router';
/**
 * Handle Errors
 */
//TODO will create
export const handleErrors = (response) => {
    if (!response.ok || response.status !== 200) {
        throw Error(response.statusText);
    }else if(response.status === 401) {
        localStorage.removeItem('user');
        browserHistory.push('/login');
    }else {
        return response.json();
    }
};