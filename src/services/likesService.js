import axios from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

export default {
    addLike(likeData) {
        return client.post('/likes', likeData);
    },
    removeLike(id) {
        return client.delete(`/likes/${id}`);
    }
}