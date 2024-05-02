<template>
    <main>
        <div class="container">
            <h1 class="h1 my-5">Modification de la catégorie "{{ newCateg.name }}"</h1>
            <form @submit.prevent="submitCategory">
                <div class="form-floating mb-3">
                    <input v-model="newCateg.name" type="text" class="form-control" id="name"
                        placeholder="Nom de la catégorie" required>
                    <label for="name">Nom</label>
                </div>
                <button type="submit" class="btn btn-dark">Mettre à jour la catégorie</button>
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
            categId: this.$route.params.id,
            categories: [],
            newCateg: {
                name: '',
            },
        }
    },
    setup() {
        const toast = useToast();
        return { toast }
    },
    methods: {
        fetchCategory() {
            categoriesService.getCategory(this.categId)
                .then(response => {
                    let prevData = response.data;
                    this.newCateg.name = prevData.name;
                })
                .catch(error => {
                    console.log('Erreur pendant la récupération de la catégorie : ', error);
                })
        },
        submitCategory() {
            categoriesService.updateCategory(this.categId, this.newCateg)
                .then(() => {
                    this.toast.success("Informations de catégorie mises à jour.");
                    this.$router.push({ name: 'adminCategoriesList' });
                })
                .catch(error => {
                    this.toast.error('Une erreur est survenue : ' + error);
                    console.log('Erreur pendant la mise à jour de la catégorie : ', error);
                });
        },
        cancelSubmit() {
            if (confirm('Êtes-vous sûr de vouloir annuler ?')) {
                this.$router.go(-1);
            }
        }
    },
    created() {
        this.fetchCategory();
    }
}
</script>