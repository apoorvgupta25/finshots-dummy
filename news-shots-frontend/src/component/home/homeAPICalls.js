import {API} from '../../backend';

export const getLast3Posts = () => {
    return fetch(`${API}/daily?limit=3&sortBy=createdAt`, { method: "GET" })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};
