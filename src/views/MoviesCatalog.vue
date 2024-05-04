<template>
    <main>
        <div class="container">
            <h1 class="h1 my-5">Liste des films</h1>
            <form @submit.prevent="" class="mb-4">
                <label for="catalog-search" class="me-2">Filtrer par nom :</label>
                <input v-model="searchQuery" id="catalog-search" name="search" type="search" placeholder="Nom du film" class="form-control w-50" style="display: inline-block;" />
            </form>
            <div class="row row-gap-3">
                <div v-for="movie in filteredMovies" :key="movie.id" class="col">
                    <div class="card position-relative" style="width: 18rem;">
                        <span class="position-absolute end-0 badge text-bg-light mt-2 me-2">
                            {{ movie.likes.length }} {{ movie.likes.length > 1 ? 'likes' : 'like' }}
                        </span>
                        <router-link :to="{ name: 'movieDetails', params: { id: movie.id } }">
                            <img :src="generateImgUrl(movie)" class="card-img-top object-fit-cover" :alt="movie.title"
                                style="height: 200px;">
                        </router-link>
                        <div class="card-body">
                            <span v-for="(categ, index) in movie.categories" :key="index">
                                <span class="badge text-bg-secondary mb-3 mx-1">{{ categ.name }}</span>
                            </span>
                            <h5 class="card-title">{{ movie.title }}</h5>
                            <p class="card-text">{{ movie.description }}</p>
                            <router-link :to="{ name: 'movieDetails', params: { id: movie.id } }"
                                class="btn btn-primary">Voir la fiche</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import moviesService from '@/services/moviesService';

export default {
    data() {
        return {
            movies: [],
            categories: [],
            searchQuery: '',
        }
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

<style></style>