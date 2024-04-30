<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Netflox</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- Left Side Of Navbar -->
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Accueil</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Catalogue de films
            </a>
            <ul class="dropdown-menu">
              <li v-for="category in categories" :key="category.id">
                <router-link :to="'/movies/' + category.id" class="dropdown-item">{{ category.name }}</router-link>
              </li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li>
                <router-link to="/movies" class="dropdown-item">Tous les films</router-link>
              </li>
            </ul>
          </li>
        </ul>
        <!-- Right Side Of Navbar -->
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/admin/movies" class="btn btn-dark">Admin</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="btn btn-link">Connexion</router-link>
          </li>
          <li class="nav-item">
            <a @click="logout" class="btn btn-link">Déconnexion</a>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="btn btn-primary">Inscription</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import categoriesService from '@/services/categoriesService';
import userService from '@/services/userService';

export default {
  name: 'NavBar',
  props: {
  },
  data() {
    return {
      categories: []
    }
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await categoriesService.getCategories()
        this.categories = response.data;
        // console.log(response.data);
      } catch (error) {
        console.log('Erreur pendant la récupération des catégories : ' + error);
      }
    },
    async logout() {
      try {
        await userService.logout();
        this.$router.push('/');
      } catch (error) {
        console.log('Erreur pendant la déconnexion : ', error);
      }
    }
  },
  created() {
    this.fetchCategories();
  }
}
</script>

<style scoped>

ul:first-child a.router-link-exact-active {
  color: rgb(10, 116, 238);
  font-weight: bold;
}
</style>
