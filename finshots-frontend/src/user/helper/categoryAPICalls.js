import {API} from '../../backend';

export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const getAllCategories = () => {
    return fetch(`${API}/all/categories`, { method: "GET" })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));
}

export const deleteCategory = (categoryId, userId, token) => {
    return fetch(`${API}/category/${userId}/${categoryId}`,{
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
            }
        })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err));
}

export const updateCategory = (categoryId, userId, token, category) => {
    return fetch(`${API}/category/${userId}/${categoryId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
        })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));
};

export const getCategory = categoryId => {
    return fetch(`${API}/category/${categoryId}`, { method: "GET" })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));
}
