import {API} from '../../backend';

export const getCategoryPosts = getCategoryPosts => {
    return fetch(`${API}/daily/category/${getCategoryPosts}`, { method: "GET" })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const getCategoryPostsCount = categoryName => {
    return fetch(`${API}/count/category/${categoryName}`, { method: "GET" })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const getCategoryPostsByIndex = (categoryName, s, l) => {
    return fetch(`${API}/index/category/${categoryName}?skip=${s}&limit=${l}`, { method: "GET" })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};
