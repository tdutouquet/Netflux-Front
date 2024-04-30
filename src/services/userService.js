import axios from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

export default {
    register(userData) {
        return client.post('/register', userData);
    },
    login(credentials) {
        return client.post('/login', credentials);
    },
    logout() {
        return client.post('/logout');
    }
}