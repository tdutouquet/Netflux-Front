<template>
    <main>
        <div class="container">
            <h1 class="h1 mb-5">Liste des films</h1>
            <div class="row row-gap-3">
                <div v-for="movie in movies" :key="movie.id" class="col">
                    <div class="card" style="width: 18rem;">
                        <img :src="generateImgUrl(movie)" class="card-img-top object-fit-cover" alt="{{ movie.title }}" style="height: 200px;">
                        <div class="card-body">
                            <h5 class="card-title">{{ movie.title }}</h5>
                            <p class="card-text">{{ movie.description }}</p>
                            <a href="#" class="btn btn-primary">Voir la fiche</a>
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
            movies: []
        }
    },
    methods: {
        async fetchMovies() {
            try {
                const response = await moviesService.getMovies()
                this.movies = response.data;
            } catch(error) {
                console.log('Error while fetching movies: ' + error);
            }
        },
        generateImgUrl(movie) {
            return `https://source.unsplash.com/random/?movie&${movie.title}`;
        }
    },
    created() {
        this.fetchMovies();
    }
}
</script>

<style></style>