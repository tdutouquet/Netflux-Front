<template>
    <main>
        <div class="container">
            <h1 class="h1 my-5">Administration - Gestion des films</h1>
            <AdminNav />
            <div class="mb-4">
                <router-link to="/admin/movies/add" class="btn btn-primary">Ajouter un film</router-link>
            </div>
            <section>
                <table class="table table-striped table-hover align-middle">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Titre</th>
                            <th scope="col">Catégories</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="movie in movies" :key="movie.id">
                            <th scope="row">{{ movie.id }}</th>
                            <td>{{ movie.title }}</td>
                            <td>
                                <span v-for="(categ, index) in movie.categories" :key="index"
                                    class="badge text-bg-secondary mb-3 mx-1">
                                    {{ categ.name }}
                                </span>
                            </td>
                            <td>
                                <RouterLink :to="{ name: 'adminMovieEdit', params: { id: movie.id } }" class="btn btn-dark btn-sm mx-2">Modifier</RouterLink>
                                <button @click="deleteMovie(movie.id)" class="btn btn-danger btn-sm mx-2 btn-delete">Supprimer</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    </main>
</template>

<script>
import AdminNav from '@/components/AdminNav';
import moviesService from '@/services/moviesService';
import { useToast } from "vue-toastification";

export default {
    components: {
        AdminNav
    },
    data() {
        return {
            movies: [],
        }
    },
    setup() {
        const toast = useToast();
        return { toast }
    },
    methods: {
        async fetchMovies() {
            try {
                const response = await moviesService.getMovies()
                this.movies = response.data;
                // console.log(this.movies);
            } catch (error) {
                console.log('Error while fetching movies: ' + error);
            }
        },
        generateImgUrl(movie) {
            return `https://source.unsplash.com/random/?movie&${movie.title}`;
        },
        deleteMovie(id) {
            if (confirm("Êtes-vous sûr de vouloir supprimer ce film?")) {
                moviesService.deleteMovie(id)
                .then(() => {
                    this.toast.success("Film supprimé.");
                    this.fetchMovies()
            })
                .catch((error) => console.log('Error while deleting movie: ', error));
            }
        }
    },
    created() {
        this.fetchMovies();
    }
}
</script>