<template>
  <div class="pokemon-list">
    <div class="cards-container">
      <PokemonCard
        v-for="pokemon in pokemons"
        :key="pokemon.name"
        :pokemon="pokemon"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PokemonCard from './PokemonCard.vue'
import { pokemonService } from '../services/pokemonService'

const pokemons = ref([])

onMounted(async () => {
  try {
    const response = await pokemonService.getPokemons()
    pokemons.value = response.results
  } catch (error) {
    console.error('Error loading pokemons:', error)
  }
})
</script>

<style scoped>
.pokemon-list {
  max-width: 1200px;
  margin: 0 auto;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
}
</style> 