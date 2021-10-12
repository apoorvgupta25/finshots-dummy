import {API} from '../../backend';

export const getDailyPosts = () => {
    return fetch(`${API}/daily`, { method: "GET" })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};
