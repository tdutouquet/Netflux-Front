<template>
    <main>
        <div class="container">
            <h1 class="h1 mt-5 mb-3 fw-bold">{{ movie.title }}</h1>
            <div class="row d-flex justify-content-between">
                <div class="col">
                    <span v-for="categ in movie.categories" :key="categ.id" class="badge bg-secondary mb-3 mx-1">{{ categ.name }}</span>
                </div>
                <div class="col text-end">
                    {{ numberOfLikes }} {{ numberOfLikes > 1 ? 'likes' : 'like' }}
                    <span v-if="isLoggedIn"> -
                        <i v-if="isLiked" @click="removeLike" role="button" class="bi bi-hand-thumbs-up pe-auto">
                            Vous aimez ce film
                        </i>
                        <i v-else @click="submitLike" role="button" class="bi bi-hand-thumbs-up-fill text-primary pe-auto">
                            Liker ce film
                        </i>
                        <!-- bi bi-hand-thumbs-up pe-auto -->
                    </span>
                </div>
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
                    <div class="d-flex justify-content-between fst-italic">
                        <div>Laissé le {{ formatDate(comment.createdAt) }}</div>
                        <div>
                            <span v-if="isLoggedIn && comment.commentLikes.some(commentLike => commentLike.user.email === this.$store.state.userEmail)">
                                <i @click="removeCommentLike(comment.id)" role="button" class="bi bi-x-circle"></i>
                            </span>
                            <span v-else-if="isLoggedIn">
                                <i @click="submitCommentLike(comment.id)" role="button" class="bi bi-plus-circle-fill text-primary"></i>
                            </span>
                            <span class="mx-2">{{ comment.commentLikes.length }} {{ comment.commentLikes.length > 1 ? 'upvotes' : 'upvote' }}</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </main>
</template>

<script>
import moviesService from '@/services/moviesService';
import commentsService from '@/services/commentsService';
import likesService from '@/services/likesService';
import { useToast } from "vue-toastification";
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            movieId: null,
            movie: [],
            numberOfComments: 0,
            numberOfLikes: 0,
            newComment: {
                content: 'Ceci est un exemple de commentaire, prêt à être envoyé ;)',
                userEmail: '',
                movieId: this.movieId,
            },
            isLiked: false,
            newLike: {
                userEmail: '',
                movieId: this.movieId,
            },
            isUpvoted: false,
            newCommentLike: {
                userEmail: '',
                commentId: null,
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
                this.numberOfLikes = this.movie.likes.length;
                this.checkLikeStatus();
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
        checkLikeStatus() {
            this.isLiked = this.movie.likes.some(
                like => like.user.email === this.$store.state.userEmail
            );
        },
        async submitLike() {
            try {
                this.newLike.userEmail = this.$store.state.userEmail;
                this.newLike.movieId = this.movieId;

                await likesService.addLike(this.newLike);
                
                this.toast.success("Like ajouté avec succès");
                this.fetchMovie(this.movieId);
            } catch (error) {
                this.toast.error('Erreur pendant l\'envoi du like :' + error);
                console.log('Erreur pendant l\'envoi du like :' + error);
                console.log(this.newLike);
            }
        },
        async removeLike() {
            try {
                if (confirm('Êtes-vous sûr de vouloir retirer votre like?')) {
                    let existingLike = this.movie.likes.find(
                        like => like.user.email === this.$store.state.userEmail
                    );
                    
                    await likesService.removeLike(existingLike.id);
                    this.toast.success("Like supprimé");
                    this.fetchMovie(this.movieId);
                }
            } catch(error) {
                console.log('Erreur pendant la suppression du like :'+ error);
            }
        },
        async submitCommentLike(commentId) {
            try {
                this.newCommentLike.userEmail = this.$store.state.userEmail;
                this.newCommentLike.commentId = commentId;

                await likesService.addCommentLike(this.newCommentLike);
                this.toast.success("Upvote ajouté");
                this.fetchMovie(this.movieId);
            } catch (error) {
                this.toast.error('Erreur pendant l\'envoi de l\'upvote :' + error);
                console.log('Erreur pendant l\'envoi de l\'upvote :' + error);
                console.log(this.newCommentLike);
            }
        },
        async removeCommentLike(commentId) {
            try {
                if (confirm('Êtes-vous sûr de vouloir retirer votre upvote?')) {
                    let clickedComment = this.movie.comments.find(comment => comment.id === commentId);
                    let existingCommentLike = clickedComment.commentLikes.find(
                        commentLike => commentLike.user.email === this.$store.state.userEmail
                    );
                    
                    console.log(existingCommentLike)
                    await likesService.removeCommentLike(existingCommentLike.id);
                    this.toast.success("Upvote retiré");
                    this.fetchMovie(this.movieId);
                }
            } catch(error) {
                console.log('Erreur pendant la suppression de l\'upvote :'+ error);
            }
        },
        generateImgUrl(movie) {
            return `https://source.unsplash.com/random/?movie&${movie.title}`;
        },
        truncate(email) {
            return email.split('@')[0];
        },
        formatDate(timestamp) {
            const date = new Date(timestamp);
            return date.toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
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