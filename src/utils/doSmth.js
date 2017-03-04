const API_ROOT = 'https://api.github.com/';

const params = {
    method: 'get',
    headers: {
        'Content-type': 'application/json; charset=UTF-8'
    }
};

export function doSmth() {

    const fullUrl = API_ROOT + 'smth/path';
    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json; charset=UTF-8');

    return fetch(fullUrl, params).then(res => {
            console.log(res.headers.get('Content-Type'));
            if(!res.ok) {
                console.log(`Have a problem. Status code is ${res.status}`);
                return;
            }
            res.json().then(data => console.log(data));
        })
        .catch(err => err);
}