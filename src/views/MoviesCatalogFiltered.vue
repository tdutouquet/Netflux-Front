<template>
    <main>
        <div class="container">
            <h1 class="h1 my-5">Catégorie "{{ category.name }}" ({{ movies.length }} {{ movies.length > 1 ? 'films' : 'film' }})</h1>
            <div class="row row-gap-3">
                <div v-for="movie in movies" :key="movie.id" class="col">
                    <div class="card" style="width: 18rem;">
                        <span class="position-absolute end-0 badge text-bg-light mt-2 me-2">
                            {{ movie.likes.length }} {{ movie.likes.length > 1 ? 'likes' : 'like' }}
                        </span>
                        <router-link :to="{ name: 'movieDetails', params: { id: movie.id } }">
                            <img :src="generateImgUrl(movie)" class="card-img-top object-fit-cover" :alt="movie.title" style="height: 200px;">
                        </router-link>
                        <div class="card-body">
                            <span v-for="(categ, index) in movie.categories" :key="index">
                                <span class="badge text-bg-secondary mb-3 mx-1">{{ categ.name }}</span>
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
import categoriesService from '@/services/categoriesService';

export default {
    data() {
        return {
            movies: [],
            categId: null,
            category: {},
        }
    },
    methods: {
        async fetchCategory(id) {
            try {
                const response = await categoriesService.getCategory(id)
                this.category = response.data;
                this.movies = this.category.movies;
            } catch (error) {
                console.log('Erreur pendant la récupération de la catégorie : ' + error);
            }
        },
        generateImgUrl(movie) {
            return `https://source.unsplash.com/random/?movie&${movie.title}`;
        },
    },
    watch: {
        $route(to) {
            this.categId = parseInt(to.params.id);
            this.fetchCategory(this.categId);
        }
    },
    created() {
        this.categId = parseInt(this.$route.params.id);
        this.fetchCategory(this.categId);
    },
    // mounted() {
    //     this.categId = parseInt(this.$route.params.id);
    //     console.log(this.categId)
    //     this.fetchCategory(this.categId);
    // }
}
</script>

<style></style>