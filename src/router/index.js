import { createRouter, createWebHashHistory } from 'vue-router'

import Homepage from '@/views/HomePage.vue'
import MoviesCatalog from '@/views/MoviesCatalog.vue'
import MoviesCatalogFiltered from '@/views/MoviesCatalogFiltered.vue'
import MovieDetails from '@/views/MovieDetails.vue'

import UserRegister from '@/views/auth/UserRegister.vue'
import UserLogin from '@/views/auth/UserLogin.vue'

import AdminMoviesList from '@/views/admin/AdminMoviesList.vue'
import AdminMovieAdd from '@/views/admin/AdminMovieAdd.vue'
import AdminMovieEdit from '@/views/admin/AdminMovieEdit.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Homepage
  },
  {
    path: '/movies',
    name: 'moviesCatalog',
    component: MoviesCatalog
  },
  {
    path: '/movies/:id',
    name: 'moviesCatalogFiltered',
    component: MoviesCatalogFiltered
  },
  {
    path: '/movies/details/:id',
    name: 'movieDetails',
    component: MovieDetails
  },

  // User auth routes
  {
    path: '/register',
    name:'register',
    component: UserRegister
  },
  {
    path: '/login',
    name: 'login',
    component: UserLogin
  },

  // Admin routes
  {
    path: '/admin/movies',
    name: 'adminMoviesList',
    component: AdminMoviesList
  },
  {
    path: '/admin/movies/add',
    name: 'adminMovieAdd',
    component: AdminMovieAdd
  },
  {
    path: '/admin/movies/edit/:id',
    name: 'adminMovieEdit',
    component: AdminMovieEdit
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
