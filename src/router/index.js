import { createRouter, createWebHashHistory } from 'vue-router'
import MoviesCatalog from '@/views/MoviesCatalog.vue'

const routes = [
  {
    path: '/',
    name: 'moviesCatalog',
    component: MoviesCatalog
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
