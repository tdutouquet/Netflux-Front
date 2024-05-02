<template>
    <main>
        <div class="container">
            <h1 class="h1 my-5">Modification de l'utilisateur' "{{ newUser.email }}"</h1>
            <form @submit.prevent="submitUser">
                <div class="form-floating mb-3">
                    <input v-model="newUser.email" type="email" class="form-control" id="email"
                        placeholder="Nom de la catégorie" required>
                    <label for="email">Email</label>
                </div>
                <div class="row align-items-center my-4 px-3">
                    <h2 class="h4 px-0">Permissions</h2>
                    <div class="col form-check form-switch">
                        <input v-model="newUser.isBanned" class="form-check-input" type="checkbox" role="switch" id="ban">
                        <label class="form-check-label" for="ban">Bannir l'utilisateur</label>
                    </div>
                    <div class="col my-4 form-check">
                        <input v-model="newUser.isAdmin" type="checkbox" class="form-check-input" id="admin">
                        <label class="form-check-label" for="admin">Donner le statut Administrateur</label>
                    </div>
                </div>
                <button type="submit" class="btn btn-dark">Mettre à jour l'utilisateur</button>
                <a @click="cancelSubmit" class="btn btn-secondary ms-2">Annuler</a>
            </form>
        </div>
    </main>
</template>

<script>
import userService from "@/services/userService"
import { useToast } from "vue-toastification";

export default {
    data() {
        return {
            userId: this.$route.params.id,
            categories: [],
            newUser: {
                email: 'a@a.com',
                isBanned: false,
                isAdmin: false,
            },
        }
    },
    setup() {
        const toast = useToast();
        return { toast }
    },
    methods: {
        fetchUser() {
            userService.getUser(this.userId)
                .then(response => {
                    let prevData = response.data;
                    this.newUser.email = prevData.email;
                    this.newUser.isBanned = prevData.isBanned;
                    prevData.roles.includes('ROLE_ADMIN') ? this.newUser.isAdmin = true : this.newUser.isAdmin = false;
                })
                .catch(error => {
                    console.log('Erreur pendant la récupération de la catégorie : ', error);
                })
        },
        submitUser() {
            userService.editUser(this.userId, this.newUser)
                .then(() => {
                    console.log(this.newUser.isBanned)
                    this.toast.success("Informations de l'utilisateur mises à jour.");
                    this.$router.push({ name: 'adminUsersList' });
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
        this.fetchUser();
    }
}
</script>