import {API} from '../../backend';

export const getCategoryPosts = getCategoryPosts => {
    return fetch(`${API}/daily/category/${getCategoryPosts}`, { method: "GET" })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};
