<template>
  <div v-if="pokemon" class="pokemon-details">
    <img :src="pokemonImage" :alt="pokemon.name" class="pokemon-image">
    <h2>{{ capitalizedName }}</h2>
    <div class="stats">
      <div class="stat-item">
        <p>Altura: {{ pokemon.height / 10 }}m</p>
        <p>Peso: {{ pokemon.weight / 10 }}kg</p>
      </div>
      <div class="types">
        <span v-for="type in pokemon.types" :key="type.slot" class="type-badge">
          {{ type.type.name }}
        </span>
      </div>
    </div>
  </div>
  <div v-else>Carregando...</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const pokemon = ref(null)

const pokemonImage = computed(() => 
  pokemon.value ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${route.params.id}.png` : ''
)

const capitalizedName = computed(() => 
  pokemon.value ? pokemon.value.name.charAt(0).toUpperCase() + pokemon.value.name.slice(1) : ''
)

onMounted(async () => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${route.params.id}`)
    pokemon.value = await response.json()
  } catch (error) {
    console.error('Erro ao carregar detalhes do Pokémon:', error)
  }
})
</script>

<style scoped>
.pokemon-details {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 12px;
  text-align: center;
}

.pokemon-image {
  width: 200px;
  height: 200px;
}

.stats {
  margin-top: 2rem;
}

.type-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  border-radius: 20px;
  background-color: #4a90e2;
  color: white;
  font-weight: bold;
}

.stat-item {
  margin: 1rem 0;
}
</style> 