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
    getComments() {
        return client.get('/comments');
    },
    addComment(commentData) {
        return client.post('/comments', commentData);
    },
    deleteComment(id) {
        return client.delete(`/comments/${id}`);
    }
}