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
    methods: {
        submitLogin() {
            if (this.user.email.length === 0 || this.user.password.length === 0) {
                this.errorMessage = 'Veuillez renseigner tous les champs pour vous connecter.'
                return
            }

            userService.login(this.user)
                .then(() => {
                    alert('Connexion réussie')
                    this.$router.push('/')
                })
                .catch(error => {
                    alert('Une erreur est survenue' + error)
                    console.log(error)
                })
        }
    }
}
</script>