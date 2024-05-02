<template>
    <main>
        <div class="container">
            <AdminNav sectionTitle="Gestion des catégories" />
            <div class="mb-4">
                <router-link :to="{ name: 'adminCategoryAdd' }" class="btn btn-primary">Ajouter une
                    catégorie</router-link>
            </div>
            <section>
                <table class="table table-striped table-hover align-middle">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nom</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="category in categories" :key="category.id">
                            <th scope="row">{{ category.id }}</th>
                            <td>{{ category.name }}</td>
                            <td>
                                <RouterLink :to="{ name: 'adminCategoryEdit', params: { id: category.id } }"
                                    class="btn btn-dark btn-sm mx-2">Modifier</RouterLink>
                                <button @click="deleteCategory(category.id)"
                                    class="btn btn-danger btn-sm mx-2 btn-delete">Supprimer</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    </main>
</template>

<script>
import AdminNav from '@/components/AdminNav';
import categoriesService from '@/services/categoriesService';
import { useToast } from "vue-toastification";

export default {
    components: {
        AdminNav
    },
    data() {
        return {
            categories: [],
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
        deleteCategory(id) {
            if (confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
                categoriesService.deleteCategory(id)
                    .then(() => {
                        this.toast.success("Catégorie supprimée");
                        this.fetchCategories()
                    })
                    .catch((error) => {
                        this.toast.error('Une erreur est survenue : ' + error);
                        console.log('Erreur pendant la suppression de la catégorie : ' + error);
                    })
            }
        }
    },
    created() {
        this.fetchCategories();
    }
}
</script>