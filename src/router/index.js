import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import PokemonList from '../components/PokemonList.vue'
import PokemonDetails from '../components/PokemonDetails.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/pokedex',
    name: 'pokedex',
    component: PokemonList
  },
  {
    path: '/pokemon/:id',
    name: 'pokemon-details',
    component: PokemonDetails
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router 