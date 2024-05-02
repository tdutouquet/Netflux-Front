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
    // Auth
    register(userData) {
        return client.post('/register', userData);
    },
    login(credentials) {
        return client.post('/login', credentials);
    },
    logout() {
        return client.post('/logout');
    },

    // User management
    getUsers() {
        return client.get('/users');
    },
    getUser(id) {
        return client.get(`/users/${id}`);
    },
    editUser(id, userData) {
        return client.put(`/users/${id}`, userData);
    },
    deleteUser(id) {
        return client.delete(`/users/${id}`);
    }
}