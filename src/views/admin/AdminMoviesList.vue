<template>
    <main>
        <div class="container">
            <AdminNav sectionTitle="Gestion des films" />
            <form @submit.prevent="" class="mb-4">
                <label for="catalog-search" class="me-2">Filtrer par contenu :</label>
                <input v-model="searchQuery" id="catalog-search" name="search" type="search" placeholder="Recherche" class="form-control w-50" style="display: inline-block;" />
            </form>
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
                            <th scope="col">Commentaires</th>
                            <th scope="col">Likes</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="movie in filteredMovies" :key="movie.id">
                            <th scope="row">{{ movie.id }}</th>
                            <td>{{ movie.title }}</td>
                            <td>
                                <span v-for="(categ, index) in movie.categories" :key="index"
                                    class="badge text-bg-secondary mb-3 mx-1">
                                    {{ categ.name }}
                                </span>
                            </td>
                            <td>{{ movie.comments.length }}</td>
                            <td>{{ movie.likes.length }}</td>
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
            searchQuery: ''
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
    computed: {
        filteredMovies() {
            this.searchQuery ?? this.movies;
            let query = this.searchQuery.toLowerCase();
            return this.movies.filter(movie => {
                return movie.title.toLowerCase().includes(query)
            })
        }
    },
    created() {
        this.fetchMovies();
    }
}
</script>