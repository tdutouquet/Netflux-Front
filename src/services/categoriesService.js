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
    getCategories() {
        return client.get('/categories');
    },
    getCategory(id) {
        return client.get(`/categories/${id}`);
    },
    addCategory(categoryData) {
        return client.post('/categories', categoryData);
    },
    updateCategory(id, categoryData) {
        return client.put(`/categories/${id}`, categoryData);
    },
    deleteCategory(id) {
        return client.delete(`/categories/${id}`);
    }
}