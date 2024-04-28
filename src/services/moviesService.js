import axios from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

export default {
    getMovies() {
        return client.get('/movies');
    },
    getMovie(id) {
        return client.get(`/movies/${id}`);
    }
}