import {API} from '../../backend';

export const getPost = postId => {
    return fetch(`${API}/daily/${postId}`, { method: "GET" })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));
}
