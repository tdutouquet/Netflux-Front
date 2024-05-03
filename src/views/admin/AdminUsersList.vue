<template>
    <main>
        <div class="container">
            <AdminNav sectionTitle="Gestion des utilisateurs" />
            <form @submit.prevent="" class="mb-4">
                <label for="catalog-search" class="me-2">Filtrer par adresse :</label>
                <input v-model="searchQuery" id="catalog-search" name="search" type="search" placeholder="Email de l'utilisateur" class="form-control w-50" style="display: inline-block;" />
            </form>
            <section>
                <table class="table table-striped table-hover align-middle">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Email</th>
                            <th scope="col">Rôles</th>
                            <th scope="col">Statut</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in filteredUsers" :key="user.id">
                            <th scope="row">{{ user.id }}</th>
                            <td>{{ user.email }}</td>
                            <td>
                                <span v-for="(role, index) in user.roles" :key="index">
                                    <span v-if="role == 'ROLE_ADMIN'" class="badge text-bg-warning me-2">Admin</span>
                                    <span v-if="role == 'ROLE_USER'" class="badge text-bg-secondary me-2">Utilisateur</span>
                                </span>
                            </td>
                            <td>{{ user.isBanned ? ('🛇 Banni') : '✔ Autorisé' }}</td>
                            <td>
                                <RouterLink :to="{ name: 'adminUserEdit', params: { id: user.id } }"
                                    class="btn btn-dark btn-sm mx-2">Modifier</RouterLink>
                                <button @click="deleteUser(user.id)"
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
import userService from '@/services/userService';
import { useToast } from "vue-toastification";

export default {
    components: {
        AdminNav
    },
    data() {
        return {
            users: [],
            searchQuery: '',
        }
    },
    setup() {
        const toast = useToast();
        return { toast }
    },
    methods: {
        async fetchUsers() {
            try {
                const response = await userService.getUsers()
                this.users = response.data;
            } catch (error) {
                console.log('Erreur pendant la récupération des utilisateurs : ' + error);
            }
        },
        deleteUser(id) {
            if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
                userService.deleteUser(id)
                    .then(() => {
                        this.toast.success("Utilisateur supprimé");
                        this.fetchUsers()
                    })
                    .catch((error) => {
                        this.toast.error('Une erreur est survenue : ' + error);
                        console.log('Erreur pendant la suppression de l\'utilisateur : ' + error);
                    })
            }
        }
    },
    computed: {
        filteredUsers() {
            this.searchQuery ?? this.users;
            let query = this.searchQuery.toLowerCase();
            return this.users.filter(user => {
                return user.email.toLowerCase().includes(query)
            })
        }
    },
    created() {
        this.fetchUsers();
    }
}
</script>