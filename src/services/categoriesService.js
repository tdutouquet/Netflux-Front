import axios from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

export default {
    getCategories() {
        return client.get('/categories', { responseType: 'json' });
    },
    getCategories2() {
        fetch('http://localhost:8000/api/categories')
    }
}