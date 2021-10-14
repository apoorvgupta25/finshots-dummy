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

export const getPost = postId => {
    return fetch(`${API}/daily/${postId}`, { method: "GET" })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));
};

export const updatePost = (postId, userId, token, post) => {
    return fetch(`${API}/daily/${userId}/${postId}`,{
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

export const deletePost = (postId, userId, token) => {
    return fetch(`${API}/daily/${userId}/${postId}`,{
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
