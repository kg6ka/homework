const API_ROOT = 'https://api.github.com/';

// const params = {
//     method: 'get',
//     headers: {
//         'Content-type': 'application/json; charset=UTF-8'
//     }
// };

export function getStuff() {

    const fullUrl = API_ROOT + 'repos/Yomguithereal/beobab/issues';
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=UTF-8');

    return fetch(fullUrl, {headers}).then(res => {
            console.log(res.headers.get('Content-Type'));
            if(!res.ok) {
                console.log(`Have a problem. Status code is ${res.status}`);
                return;
            }
            res.json().then(data => console.log(data));
        })
        .catch(err => err);
}