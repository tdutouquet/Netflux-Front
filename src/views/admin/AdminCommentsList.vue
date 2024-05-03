<template>
    <main>
        <div class="container">
            <AdminNav sectionTitle="Gestion des commentaires" />
            <section>
                <table class="table table-striped table-hover align-middle">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Date</th>
                            <th scope="col">Utilisateur</th>
                            <th scope="col">Film</th>
                            <th scope="col">Commentaire</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="comment in comments" :key="comment.id">
                            <th scope="row">{{ comment.id }}</th>
                            <td>{{ formatDate(comment.createdAt) }}</td>
                            <td>{{ comment.user.email }}</td>
                            <td>{{ comment.movie.title }}</td>
                            <td>{{ comment.content }}</td>
                            <td>
                                <button @click="deleteComment(comment.id)"
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
import commentsService from '@/services/commentsService';
import { useToast } from "vue-toastification";

export default {
    components: {
        AdminNav
    },
    data() {
        return {
            comments: [],
        }
    },
    setup() {
        const toast = useToast();
        return { toast }
    },
    methods: {
        async fetchComments() {
            try {
                const response = await commentsService.getComments()
                this.comments = response.data;
            } catch (error) {
                console.log('Erreur pendant la récupération des commentaires : ' + error);
            }
        },
        deleteComment(id) {
            if (confirm("Êtes-vous sûr de vouloir supprimer ce commentaire ?")) {
                commentsService.deleteComment(id)
                    .then(() => {
                        this.toast.success("Commentaire supprimée");
                        this.fetchComments()
                    })
                    .catch((error) => {
                        this.toast.error('Une erreur est survenue : ' + error);
                        console.log('Erreur pendant la suppression du commentaire : ' + error);
                    })
            }
        },
        formatDate(timestamp) {
            const date = new Date(timestamp);
            return date.toLocaleString();
        }
    },
    created() {
        this.fetchComments();
    }
}
</script>