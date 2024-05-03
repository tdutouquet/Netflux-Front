<template>
    <main>
        <div class="container">
            <h1 class="h1 mt-5 mb-3 fw-bold">{{ movie.title }}</h1>
            <div>
                <span v-for="categ in movie.categories" :key="categ.id" class="badge bg-secondary mb-3 mx-1">{{
                categ.name }}</span>
            </div>
            <figure>
                <img :src="generateImgUrl(movie)" class="card-img-top object-fit-cover rounded" :alt="movie.title"
                    style="height: 500px;">
            </figure>
            <p><strong>Description : </strong>{{ movie.description }}</p>
            <p><strong>Date de sortie : </strong>{{ movie.date }}</p>
            <p><strong>Réalisateur : </strong>{{ movie.director }}</p>
        </div>
        <hr class="mt-5 mb-5">
        <div class="container">
            <section>
                <h2 class="fw-bold">Avis ({{ numberOfComments }})</h2>
                <h3 class="h4 mt-4 mb-3">Ajouter un commentaire</h3>
                <form v-if="isLoggedIn" @submit.prevent="submitComment">
                    <div>
                        <textarea v-model="newComment.content" class="form-control" placeholder="Laissez un commentaire"
                            id="comment" maxlength="500" style="height: 100px"></textarea>
                        <label for="comment"></label>
                    </div>
                    <button type="submit" class="btn btn-primary">Envoyer</button>
                </form>
                <p v-else>
                    <RouterLink :to="{ name: login }">Connectez-vous</RouterLink> pour pouvoir ajouter un commentaire.
                </p>
                <h3 class="h4 mt-5 mb-3">Commentaires d'autres utilisateurs</h3>
                <div v-for="comment in movie.comments" :key="comment.id" class="card p-3 mb-3 bg-light">
                    <h4 class="h5">Commentaire de "{{ truncate(comment.user.email) }}"</h4>
                    <p>{{ comment.content }}</p>
                </div>
            </section>
        </div>
    </main>
</template>

<script>
import moviesService from '@/services/moviesService';
import commentsService from '@/services/commentsService';
import { useToast } from "vue-toastification";
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            movieId: null,
            movie: [],
            numberOfComments: 0,
            newComment: {
                content: 'Ceci est un exemple de commentaire, prêt à être envoyé ;)',
                userEmail: '',
                movieId: this.movieId,
            }
        }
    },
    setup() {
        const toast = useToast();
        return { toast }
    },
    methods: {
        async fetchMovie(id) {
            try {
                const response = await moviesService.getMovie(id)
                this.movie = response.data;
                this.numberOfComments = this.movie.comments.length;
            } catch (error) {
                console.log('Erreur pendant la récupération du film : ' + error);
            }
        },
        async submitComment() {
            try {
                this.newComment.userEmail = this.$store.state.userEmail;
                this.newComment.movieId = this.movieId;

                await commentsService.addComment(this.newComment);

                this.toast.success("Commentaire ajouté avec succès");
                this.fetchMovie(this.movieId);
                this.newComment.content = '';
            } catch (error) {
                this.toast.error('Erreur pendant l\'envoi du commentaire : ' + error);
                console.log('Erreur pendant l\'envoi du commentaire : ' + error);
            }
        },
        generateImgUrl(movie) {
            return `https://source.unsplash.com/random/?movie&${movie.title}`;
        },
        truncate(email) {
            return email.split('@')[0];
        }
    },
    computed: {
        ...mapGetters(['isLoggedIn', 'userEmail']),
    },
    created() {
        this.movieId = parseInt(this.$route.params.id);
        this.fetchMovie(this.movieId);
    }
}
</script>