<template>
    <main>
        <div class="container">
            <h1 class="my-5">Connexion</h1>
            <form @submit.prevent="submitLogin">
                <div class="mb-3">
                    <label for="email" class="form-label">Adresse mail</label>
                    <input v-model="user.email" type="email" class="form-control" id="email">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Mot de passe</label>
                    <input v-model="user.password" type="password" class="form-control" id="password">
                </div>
                <div>
                    <p class="text-danger">{{ errorMessage }}</p>
                </div>
                <button type="submit" class="btn btn-primary mt-3">Je me connecte</button>
            </form>
        </div>
    </main>
</template>

<script>
import userService from '@/services/userService';
import { useToast } from "vue-toastification";

export default {
    data() {
        return {
            user: {
                email: '',
                password: ''
            },
            errorMessage: ''
        }
    },
    setup() {
        const toast = useToast();
        return { toast }
    },
    methods: {
        async submitLogin() {
            if (this.user.email.length === 0 || this.user.password.length === 0) {
                this.errorMessage = 'Veuillez renseigner tous les champs pour vous connecter.'
                return
            }

            try {
                const response = await userService.login(this.user);
                const userRoles = response.data.user.roles;
                const isBanned = response.data.user.isBanned;

                // Handle user status (admin/banned)
                userRoles.includes('ROLE_ADMIN') && this.$store.commit('setAdmin', true);
                if (isBanned) {
                    this.toast.error('Vous êtes banni de ce site.');
                    return
                }

                // Log user info
                this.$store.commit('setUser', this.user.email);

                this.toast.success("Vous êtes désormais connecté");
                this.$router.push({ name: 'home' })
            } catch (error) {
                this.toast.error('Une erreur est survenue ' + error);
                console.log(error)
            }
        }
    }
}
</script>