<template>
    <h1 class="mt-5 mb-4 fw-bold">Admin - {{ sectionTitle }}</h1>
    <nav class="mb-4">
        <ul class="nav">
            <li class="nav-item">
                <router-link :to="{ name: 'adminDashboard' }" class="nav-link text-dark"
                    aria-current="page">
                    <i class="bi bi-speedometer2"></i>
                    Dashboard
                </router-link>
            </li>
            <li class="nav-item">
                <RouterLink :to="{ name: 'adminUsersList' }" class="nav-link text-dark">
                    <i class="bi bi-people"></i>
                    Utilisateurs
                </RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink :to="{ name: 'adminMoviesList' }" class="nav-link text-dark">
                    <i class="bi bi-film"></i>
                    Films
                </RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink :to="{ name: 'adminCategoriesList' }" class="nav-link text-dark">
                    <i class="bi bi-tags"></i>
                    Catégories
                </RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink :to="{ name: 'adminCommentsList' }" class="nav-link text-dark">
                    <i class="bi bi-chat-dots"></i>
                    Commentaires
                </RouterLink>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    props: {
        sectionTitle: {
            type: String,
            default: ''
        }
    },
}

</script>

<style scoped>
a.router-link-exact-active {
    color: var(--clr-primary) !important;
    font-weight: bold;
    border-bottom: 2px solid var(--clr-primary);
}
</style>