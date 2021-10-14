import {API} from '../../backend';

export const getCategoryPosts = categoryId => {
    return fetch(`${API}/daily/category/${categoryId}`, { method: "GET" })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};
