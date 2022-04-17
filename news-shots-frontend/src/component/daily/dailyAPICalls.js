import {API} from '../../backend';

export const getDailyPosts = () => {
    return fetch(`${API}/daily`, { method: "GET" })
    .then(response => {
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

export const getPostsByCreated = (dt, l) => {
    return fetch(`${API}/created/daily?limit=${l}&last_result_date=${dt}`, { method: "GET" })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};
