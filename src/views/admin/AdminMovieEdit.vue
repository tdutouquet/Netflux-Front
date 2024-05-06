<template>
    <main>
        <div class="container">
            <h1 class="h1 my-5">Modification du film "{{ newMovie.title }}"</h1>
            <form @submit.prevent="submitMovie">
                <div class="form-floating mb-3">
                    <input v-model="newMovie.title" type="text" class="form-control" id="title"
                        placeholder="Titre du film" required>
                    <label for="title">Titre</label>
                </div>
                <div class="form-floating mb-3">
                    <textarea v-model="newMovie.description" class="form-control" id="description"
                        style="height: 100px"></textarea>
                    <label for="description">Description</label>
                </div>
                <div class="form-floating mb-3">
                    <input v-model="newMovie.date" type="number" class="form-control" id="date"
                        placeholder="Date du film" required>
                    <label for="date">Date de publication</label>
                </div>
                <div class="form-floating mb-3">
                    <input v-model="newMovie.director" type="text" class="form-control" id="director"
                        placeholder="Nom du réalisateur" required>
                    <label for="director">Réalisateur</label>
                </div>
                <div class="form-floating mb-3">
                    <select v-model="cat1" class="form-select" id="categories" aria-label="Label categories" required>
                        <option v-for="category in categories" :key="category.id" :value="category.id">
                            {{ category.name }}
                        </option>
                    </select>
                    <label for="categories">Catégorie 1</label>
                </div>
                <div class="form-floating mb-3">
                    <select v-model="cat2" class="form-select" id="categories" aria-label="Label categories">
                        <option value="0">Aucune catégorie secondaire</option>
                        <option v-for="category in categories" :key="category.id" :value="category.id">
                            {{ category.name }}
                        </option>
                    </select>
                    <label for="categories">Catégorie 2</label>
                </div>
                <button type="submit" class="btn btn-dark">Mettre à jour le film</button>
                <a @click="cancelSubmit" class="btn btn-secondary ms-2">Annuler</a>
            </form>
        </div>
    </main>
</template>

<script>
import categoriesService from '@/services/categoriesService';
import moviesService from '@/services/moviesService';
import { useToast } from "vue-toastification";

export default {
    data() {
        return {
            movieId: this.$route.params.id,
            categories: [],
            cat1: 0,
            cat2: 0,
            newMovie: {
                title: '',
                description: '',
                date: 1900,
                director: '',
                categories: [],
            },
        }
    },
    setup() {
        const toast = useToast();
        return { toast }
    },
    methods: {
        async fetchCategories() {
            try {
                const response = await categoriesService.getCategories()
                this.categories = response.data;
            } catch (error) {
                console.log('Erreur pendant la récupération des catégories : ' + error);
            }
        },
        fetchMovie() {
            moviesService.getMovie(this.movieId)
                .then(response => {
                    let prevData = response.data;

                    this.newMovie.title = prevData.title;
                    this.newMovie.description = prevData.description;
                    this.newMovie.date = prevData.date;
                    this.newMovie.director = prevData.director;
                    this.cat1 = prevData.categories[0].id;
                    if (prevData.categories.length > 1) {
                        this.cat2 = prevData.categories[1].id;
                    }
                })
                .catch(error => {
                    console.log('Erreur pendant la récupération du film : ', error);
                })
        },
        submitMovie() {
            this.newMovie.categories = [];
            this.newMovie.categories.push(this.cat1);
            if (this.cat2 !== 0 && this.cat2 !== this.cat1) {
                this.newMovie.categories.push(this.cat2);
            }

            moviesService.udpateMovie(this.movieId, this.newMovie)
                .then(() => {
                    this.toast.success("Informations de film mises à jour.");
                    this.$router.push({ name: 'adminMoviesList' });
                })
                .catch(error => {
                    this.toast.error('Une erreur est survenue : ' + error);
                    console.log('Erreur pendant la mise à jour du film : ', error);
                });
        },
        cancelSubmit() {
            if (confirm('Êtes-vous sûr de vouloir annuler ?')) {
                this.$router.go(-1);
            }
        }
    },
    created() {
        this.fetchMovie();
        this.fetchCategories();
    }
}
</script>