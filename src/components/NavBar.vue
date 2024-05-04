<template>
  <nav class="navbar navbar-expand-lg text-bg-dark">
    <div class="container-fluid">
      <router-link :to="{ name: 'home' }" class="navbar-brand fw-bold" style="color: var(--clr-primary)">
        <i class="bi bi-camera-video-fill"></i>
        {{ siteName }}
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- Left Side Of Navbar -->
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link :to="{ name: 'home' }" class="nav-link text-bg-dark">Accueil</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle text-bg-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Catalogue de films
            </a>
            <ul class="dropdown-menu">
              <li v-for="category in categories" :key="category.id">
                <router-link :to="{ name: 'moviesCatalogFiltered', params: { id: category.id }}" class="dropdown-item">{{ category.name }}</router-link>
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
          <li v-if="isLoggedIn" class="nav-item d-flex align-items-center me-3">
            <span>{{ userEmail }}</span>
          </li>
          <li v-if="isLoggedIn && this.$store.state.isAdmin" class="nav-item">
            <router-link :to="{ name: 'adminDashboard' }" class="btn btn-secondary">Admin</router-link>
          </li>
          <li v-if="!isLoggedIn" class="nav-item">
            <router-link to="/login" class="btn btn-link text-decoration-none text-light">Connexion</router-link>
          </li>
          <li v-if="isLoggedIn" class="nav-item">
            <a @click="logout" class="btn btn-link text-decoration-none text-light">Déconnexion</a>
          </li>
          <li v-if="!isLoggedIn" class="nav-item">
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
import { useToast } from "vue-toastification";
import { mapGetters } from 'vuex';

export default {
  name: 'NavBar',
  props: {
  },
  data() {
    return {
      categories: []
    }
  },
  setup() {
    const toast = useToast();
    return { toast }
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
        this.$store.commit('clearUser');
        this.$store.commit('clearAdmin');
        this.toast.success("Vous avez bien été déconnecté");
        this.$router.push({ name: 'home' });
      } catch (error) {
        console.log('Erreur pendant la déconnexion : ', error);
      }
    },
    checkCookie() {
      const cookie = document.cookie.includes('BEARER');
      console.log('Checked cookie : ' + cookie)
      if (!cookie && this.isLoggedIn) {
        this.toast.warning('Votre session a expiré, veuillez vous reconnecter');
        setTimeout(() => this.logout(), 2000);
      }
    }
  },
  computed: {
    ...mapGetters(['siteName', 'isLoggedIn', 'userEmail']),
  },
  created() {
    this.fetchCategories();
    // this.checkCookie();
  }
}
</script>

<style scoped>
ul:first-child a.router-link-exact-active {
  color: var(--clr-primary);
  font-weight: bold;
}
</style>
