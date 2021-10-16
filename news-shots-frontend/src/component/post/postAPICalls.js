import {API} from '../../backend';

export const getPost = postName => {
    return fetch(`${API}/daily/${postName}`, { method: "GET" })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));
}
