<template>
    <main>
        <section class="container">
            <AdminNav sectionTitle="Dashboard" />
            <div class="alert alert-secondary" role="alert">
                Bienvenue dans votre espace administrateur. Ici, vous pouvez gérer les utilisateurs, les films, catégories de films et les commentaires.
            </div>
            <div class="row">
                <div class="col-sm-6 mb-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title fw-bold">Gestion des utilisateurs</h5>
                            <p class="card-text">Consultez la liste des utilisateurs inscrits, leurs informations
                                personnelles et modifiez leurs autorisations.</p>
                            <RouterLink :to="{ name: 'adminUsersList' }" class="btn btn-primary">Consulter</RouterLink>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 mb-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title fw-bold">Gérer les films</h5>
                            <p class="card-text">Consultez la liste des livres disponibles à l'emprunt, leurs
                                informations et modifiez leurs caractéristiques.</p>
                            <RouterLink :to="{ name: 'adminMoviesList' }" class="btn btn-primary">Consulter</RouterLink>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 mb-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title fw-bold">Gérer les catégories</h5>
                            <p class="card-text">Consultez la liste des catégories, modifiez leurs caractéristiques et ajoutez-en de nouvelles.</p>
                            <RouterLink :to="{ name: 'adminCategoriesList' }" class="btn btn-primary">Consulter</RouterLink>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 mb-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title fw-bold">Gérer les commentaires</h5>
                            <p class="card-text">Consultez les commentaires et modérez leur contenu.</p>
                            <RouterLink :to="{ name: 'adminMoviesList' }" class="btn btn-primary">Consulter</RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import AdminNav from '@/components/AdminNav';

export default {
    components: {
        AdminNav,
    },
}
</script>