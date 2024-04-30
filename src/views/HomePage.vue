<template>
    <main>
        <section class="container-fluid p-0">
            <div class="jumbotron jumbotron-fluid d-flex align-items-center text-center text-white bg-dark p-5" style="background-image: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5)), url('https://source.unsplash.com/random/?movies'); background-size: cover; background-position: center; height: 50vh">
                <div class="container">
                    <h1 class="display-4 fw-bold">Netflox</h1>
                    <p class="lead">Un catalogue de films à déguster avec de déclicieux popcorns !</p>
                    <router-link :to="{ name: 'register' }" class="btn btn-primary btn-lg p-3 mt-3 fw-bold">Je m'inscris</router-link>
                </div>
            </div>
        </section>
        <div class="container">
            <h1 class="h1 my-5 text-center">Un aperçu de notre catalogue</h1>
            <div class="row row-gap-3">
                <div v-for="movie in movies.slice(0, 3)" :key="movie.id" class="col">
                    <div class="card" style="width: 18rem;">
                        <router-link :to="{ name: 'movieDetails', params: { id: movie.id } }">
                            <img :src="generateImgUrl(movie)" class="card-img-top object-fit-cover" :alt="movie.title" style="height: 200px;">
                        </router-link>
                        <div class="card-body">
                            <span v-for="(categ, index) in movie.categories" :key="index">
                                <span class="badge text-bg-secondary mb-3 mx-1">{{categ.name}}</span>
                            </span>
                            <h5 class="card-title">{{ movie.title }}</h5>
                            <p class="card-text">{{ movie.description }}</p>
                            <router-link :to="{ name: 'movieDetails', params: { id: movie.id } }" class="btn btn-primary">Voir la fiche</router-link>
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