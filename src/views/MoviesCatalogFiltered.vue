<template>
    <main>
        <div class="container">
            <h1 class="h1 my-5">Catégorie "{{ categories[0].name }}" ({{ movies.length }})</h1>
            <div class="row row-gap-3">
                <div v-for="movie in movies" :key="movie.id" class="col">
                    <div class="card" style="width: 18rem;">
                        <img :src="generateImgUrl(movie)" class="card-img-top object-fit-cover" :alt="movie.title"
                            style="height: 200px;">
                        <div class="card-body">
                            <span v-for="(categ, index) in movie.categories" :key="index">
                                <span class="badge text-bg-secondary mb-3 mx-1">{{ categ.name }}</span>
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
import categoriesService from '@/services/categoriesService';

export default {
    data() {
        return {
            movies: [],
            categId: null,
            categories: [{'name': '...'}],
        }
    },
    methods: {
        async fetchMovies(id) {
            try {
                const response = await moviesService.getMovies()
                this.movies = response.data;

                if (id) {
                    this.movies = this.movies.filter(
                        movie => movie.categories.find(categ => categ.id === id)
                    );
                }
            } catch (error) {
                console.log('Error while fetching movies: ' + error);
            }
        },
        generateImgUrl(movie) {
            return `https://source.unsplash.com/random/?movie&${movie.title}`;
        },
        async fetchCategories(id) {
            try {
                const response = await categoriesService.getCategories()
                this.categories = response.data;
                
                if (id) {
                    this.categories = this.categories.filter(categ => categ.id === id);
                }
                console.log(this.categories);
            } catch (error) {
                console.log('Error while fetching categories: ' + error);
            }
        }
    },
    created() {
        this.categId = parseInt(this.$route.params.id);
        this.fetchMovies(this.categId);
        this.fetchCategories(this.categId);
    },
    beforeRouteUpdate() {
        this.categId = parseInt(this.$route.params.id);
        this.fetchMovies(this.categId);
        this.fetchCategories(this.categId);
    }
}
</script>

<style></style>