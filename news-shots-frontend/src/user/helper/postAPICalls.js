import {API} from '../../backend';

export const createPost = (userId, token, post) => {
    return fetch(`${API}/daily/create/${userId}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));
}

export const getAllPosts = () => {
    return fetch(`${API}/daily`, { method: "GET" })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));
};

export const getPostsCount = () => {
    return fetch(`${API}/count/daily`, { method: "GET" })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const getPostsByIndex = (s, l) => {
    return fetch(`${API}/index/daily?skip=${s}&limit=${l}`, { method: "GET" })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};


export const getPost = postName => {
    return fetch(`${API}/daily/${postName}`, { method: "GET" })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));
};

export const updatePost = (postName, userId, token, post) => {
    return fetch(`${API}/daily/${userId}/${postName}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
        })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));
};

export const deletePost = (postName, userId, token) => {
    return fetch(`${API}/daily/${userId}/${postName}`,{
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
            }
        })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err));
}
