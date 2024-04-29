<template>
    <main>
        <div class="container">
            <h1 class="h1 mb-3">{{ movie.title }}</h1>
            <div>
                <span v-for="categ in movie.categories" :key="categ.id" class="badge bg-secondary mb-3 mx-1">{{ categ.name }}</span>
            </div>
            <figure>
                <img :src="generateImgUrl(movie)" class="card-img-top object-fit-cover rounded" :alt="movie.title" style="height: 500px;">
            </figure>
            <p><strong>Description : </strong>{{ movie.description }}</p>
            <p><strong>Date de sortie : </strong>{{ movie.date }}</p>
            <p><strong>Réalisateur : </strong>{{ movie.director }}</p>
        </div> 
    </main>
</template>

<script>
import moviesService from '@/services/moviesService';

export default {
    data() {
        return {
            movieId: null,
            movie: [],
        }
    },
    methods: {
        async fetchMovie(id) {
            try {
                const response = await moviesService.getMovie(id)
                this.movie = response.data;
                console.log(this.movie);
            } catch (error) {
                console.log('Error while fetching movies: ' + error);
            }
        },
        generateImgUrl(movie) {
            return `https://source.unsplash.com/random/?movie&${movie.title}`;
        },
    },
    created() {
        this.movieId = parseInt(this.$route.params.id);
        this.fetchMovie(this.movieId);
    }
}
</script>