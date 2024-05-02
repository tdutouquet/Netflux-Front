import { createRouter, createWebHashHistory } from 'vue-router'

import Homepage from '@/views/HomePage.vue'
import MoviesCatalog from '@/views/MoviesCatalog.vue'
import MoviesCatalogFiltered from '@/views/MoviesCatalogFiltered.vue'
import MovieDetails from '@/views/MovieDetails.vue'

import UserRegister from '@/views/auth/UserRegister.vue'
import UserLogin from '@/views/auth/UserLogin.vue'

import AdminDashboard from '@/views/admin/AdminDashboard.vue'
import AdminMoviesList from '@/views/admin/AdminMoviesList.vue'
import AdminMovieAdd from '@/views/admin/AdminMovieAdd.vue'
import AdminMovieEdit from '@/views/admin/AdminMovieEdit.vue'

import { useToast } from "vue-toastification";

function requireAdmin(to, from, next) {
  if (localStorage.getItem('isAdmin')!== 'true') {
    useToast().error('Vous devez être administrateur pour accéder à cette page')
    next({ name: 'home' })
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: Homepage
  },

  // Movies routes
  {
    path: '/movies',

    children: [
      {
        path: '',
        name: 'moviesCatalog',
        component: MoviesCatalog,
      },
      {
        path: 'category/:id',
        name: 'moviesCatalogFiltered',
        component: MoviesCatalogFiltered
      },
      {
        path: 'details/:id',
        name: 'movieDetails',
        component: MovieDetails
      }
    ]
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
    path: '/admin',
    beforeEnter: requireAdmin,

    children: [
      {
        path: '',
        name: 'adminDashboard',
        component: AdminDashboard
      },
      {
        path: 'movies',
        name: 'adminMoviesList',
        component: AdminMoviesList
      },
      {
        path: 'movies/add',
        name: 'adminMovieAdd',
        component: AdminMovieAdd
      },
      {
        path: 'movies/edit/:id',
        name: 'adminMovieEdit',
        component: AdminMovieEdit
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
