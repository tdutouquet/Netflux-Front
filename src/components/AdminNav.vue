import { RouterLink } from 'vue-router';

import { RouterLink } from 'vue-router';
<template>
    <nav class="mb-4">
        <ul class="nav">
            <li class="nav-item">
                <router-link :to="{ name: 'adminDashboard' }" class="nav-link active"
                    aria-current="page">Dashboard</router-link>
            </li>
            <li class="nav-item">
                <RouterLink :to="{ name: 'adminDashboard' }" class="nav-link">Utilisateurs</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink :to="{ name: 'adminMoviesList' }" class="nav-link">Films</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink :to="{ name: 'adminDashboard' }" class="nav-link">Catégories</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink :to="{ name: 'adminDashboard' }" class="nav-link">Catégories</RouterLink>
            </li>
        </ul>
    </nav>
</template>

<style scoped>
a.router-link-exact-active {
    color: var(--clr-primary);
    font-weight: bold;
    border-bottom: 2px solid var(--clr-primary);
}
</style>