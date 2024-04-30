<template>
    <main>
        <div class="container">
            <h1 class="h1 my-5">Administration - Ajouter un film</h1>
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
                        <option v-for="category in categories" :key="category.id" :value="category.id">
                            {{ category.name }}
                        </option>
                    </select>
                    <label for="categories">Catégorie 2</label>
                </div>
                <button type="submit" class="btn btn-dark">Ajouter le film</button>
                <a @click="cancelSubmit" class="btn btn-secondary ms-2">Annuler</a>
            </form>
        </div>
    </main>
</template>

<script>
import categoriesService from '@/services/categoriesService';
import moviesService from '@/services/moviesService';

export default {
    data() {
        return {
            categories: [],
            cat1: '',
            cat2: '',
            newMovie: {
                title: '',
                description: '',
                date: 1900,
                director: '',
                categories: [],
            },
        }
    },
    methods: {
        async fetchCategories() {
            try {
                const response = await categoriesService.getCategories()
                this.categories = response.data;
                // console.log(response.data);
            } catch (error) {
                console.log('Error while fetching categories: ' + error);
            }
        },
        submitMovie() {
            this.newMovie.categories.push(this.cat1);
            if (this.cat2 && this.cat2 !== this.cat1) {
                this.newMovie.categories.push(this.cat2);
            }
            
            moviesService.addMovie(this.newMovie)
                .then(response => {
                    console.log(response.data);
                    this.$router.push('/admin/movies');
                })
                .catch(error => {
                    console.log('Error while adding movie: ', error);
                });
        },
        cancelSubmit() {
            if (confirm('Êtes-vous sûr de vouloir annuler ?')) {
                this.$router.go(-1);
            }
        }
    },
    created() {
        this.fetchCategories();
    }
}

</script>