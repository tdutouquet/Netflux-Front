import { createRouter, createWebHashHistory } from 'vue-router'
import MoviesCatalog from '@/views/MoviesCatalog.vue'
import MoviesCatalogFiltered from '@/views/MoviesCatalogFiltered.vue'
import MovieDetails from '@/views/MovieDetails.vue'
import AdminMoviesList from '@/views/admin/AdminMoviesList.vue'
import AdminMovieAdd from '@/views/admin/AdminMovieAdd.vue'
import AdminMovieEdit from '@/views/admin/AdminMovieEdit.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: MoviesCatalog
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
    path: '/movies/:id',
    name: 'movieDetails',
    component: MovieDetails
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
    path: '/admin/movies/edit',
    name: 'adminMovieEdit',
    component: AdminMovieEdit
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
