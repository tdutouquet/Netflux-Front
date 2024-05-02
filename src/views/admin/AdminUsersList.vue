<template>
    <main>
        <div class="container">
            <AdminNav sectionTitle="Gestion des utilisateurs" />
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
                        <tr v-for="user in users" :key="user.id">
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
    created() {
        this.fetchUsers();
    }
}
</script>