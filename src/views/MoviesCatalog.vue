<template>
    <main>
        <div class="container">
            <h1 class="h1 mb-5">Liste des films</h1>
            <div class="row row-gap-3">
                <div v-for="movie in movies" :key="movie.id" class="col">
                    <div class="card" style="width: 18rem;">
                        <img :src="generateImgUrl(movie)" class="card-img-top object-fit-cover" :alt="movie.title"
                            style="height: 200px;">
                        <div class="card-body">
                            <span v-for="(categ, index) in movie.categories" :key="index">
                                <span class="badge text-bg-secondary mb-3 mx-1">{{categ.name}}</span>
                            </span>
                            <h5 class="card-title">{{ movie.title }}</h5>
                            <p class="card-text">{{ movie.description }}</p>
                            <router-link :to="'/movies/' + movie.id" class="btn btn-primary">Voir la fiche</router-link>
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
    created() {
        this.fetchMovies();
    }
}
</script>

<style></style>