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
    getMovies() {
        return client.get('/movies');
    },
    getMovie(id) {
        return client.get(`/movies/${id}`);
    },
    addMovie(movieData) {
        return client.post('/movies', movieData);
    },
    udpateMovie(id, movieData) {
        return client.put(`/movies/${id}`, movieData);
    },
    deleteMovie(id) {
        return client.delete(`/movies/${id}`);
    }
}