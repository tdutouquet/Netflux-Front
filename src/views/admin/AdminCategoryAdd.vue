<template>
    <main>
        <div class="container">
            <h1 class="h1 my-5">Ajoût d'une catégorie</h1>
            <form @submit.prevent="submitCategory">
                <div class="form-floating mb-3">
                    <input v-model="newCat.name" type="text" class="form-control" id="name"
                        placeholder="Nom de la catégorie" required>
                    <label for="name">Nom</label>
                </div>
                <button type="submit" class="btn btn-dark">Ajouter la catégorie</button>
                <a @click="cancelSubmit" class="btn btn-secondary ms-2">Annuler</a>
            </form>
        </div>
    </main>
</template>

<script>
import categoriesService from '@/services/categoriesService';
import { useToast } from "vue-toastification";

export default {
    data() {
        return {
            categories: [],
            newCat: {
                name: 'Nom catégorie'
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
        submitCategory() {
            categoriesService.addCategory(this.newCat)
                .then(response => {
                    console.log(response.data);
                    this.toast.success("Catégorie ajoutée avec succès");
                    this.$router.push({ name: 'adminCategoriesList' });
                })
                .catch(error => {
                    this.toast.error('Une erreur est survenue : ' + error);
                    console.log('Erreur lors de l\'ajout du film : ', error);
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