import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/pokedex',
    name: 'pokedex',
    component: () => import('../views/Pokedex.vue')
  },
  {
    path: '/pokemon/:id',
    name: 'pokemon-details',
    component: () => import('../views/PokemonDetails.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 