<template>
    <main>
        <div class="container">
            <h1 class="mt-5">Inscription</h1>
            <p class="mb-5 text-secondary">Déjà inscrit ? Connectez-vous 
                <router-link :to="{ name: 'login' }">par ici</router-link>.
            </p>
            <form @submit.prevent="submitRegister">
                <div class="mb-3">
                    <label for="email" class="form-label">Adresse mail</label>
                    <input v-model="newUser.email" type="email" class="form-control" id="email">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Mot de passe</label>
                    <input v-model="newUser.password" type="password" class="form-control" id="password">
                </div>
                <div class="mb-3">
                    <label for="passwordConfirm" class="form-label">Confirmation du mot de passe</label>
                    <input v-model="passwordConfirm" type="password" class="form-control" id="passwordConfirm">
                </div>
                <div class="my-4 form-check">
                    <input v-model="consent" type="checkbox" class="form-check-input" id="consent">
                    <label class="form-check-label" for="consent">J'accepte que Netflox enregistre mes
                        informations</label>
                </div>
                <div>
                    <p class="text-danger">{{ errorMessage }}</p>
                </div>
                <button type="submit" class="btn btn-primary">Je m'inscris</button>
            </form>
        </div>
    </main>
</template>

<script>
import userService from '@/services/userService';

export default {
    data() {
        return {
            newUser: {
                email: '',
                password: ''
            },
            passwordConfirm: '',
            consent: false,
            errorMessage: '',
        }
    },
    methods: {
        submitRegister() {
            if (this.newUser.email.length === 0 || this.newUser.password.length === 0 || this.passwordConfirm.length === 0) {
                this.errorMessage = 'Veuillez renseigner tous les champs pour vous inscrire.'
                return
            }

            let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!this.newUser.email.match(regex)) {
                this.errorMessage = 'Veuillez renseigner une adresse mail valide.'
                return
            }

            if (this.newUser.password !== this.passwordConfirm) {
                this.errorMessage = 'Les mots de passe ne correspondent pas.'
                return
            }

            if (this.newUser.password.length < 4) {
                this.errorMessage = 'Le mot de passe doit contenir au moins 4 caractères'
                return
            }

            if (!this.consent) {
                this.errorMessage = 'Vous devez accepter les conditions d\'utilisation.'
                return
            }

            userService.register(this.newUser)
                .then(() => {
                    let message = 'Inscription réussie'
                    this.$router.push('/login', message)
                })
                .catch(error => {
                    alert('Une erreur est survenue : ' + error)
                    console.log(error)
                })
        }
    }
}
</script>