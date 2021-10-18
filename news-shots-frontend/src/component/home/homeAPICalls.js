import {API} from '../../backend';

export const getLast3Posts = () => {
    return fetch(`${API}/daily?limit=3&sortBy=createdAt`, { method: "GET" })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const confirmSubscriber = (subscriberEmail) => {
    return fetch(`${API}/confirm`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(subscriberEmail),
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
};
