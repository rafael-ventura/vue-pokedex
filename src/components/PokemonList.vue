<template>
  <div class="pokemon-list">
    <div class="controls">
      <Dropdown
        v-model="itemsPerPage"
        :options="itemsPerPageOptions"
        optionLabel="label"
        optionValue="value"
        placeholder="Items por página"
        class="items-per-page"
      />
    </div>

    <div v-if="error" class="error-message">
      <Message severity="error" :closable="false">{{ error }}</Message>
    </div>

    <div class="pokemon-grid">
      <Paginator
        v-model:first="first"
        :rows="itemsPerPage"
        :totalRecords="filteredPokemons.length"
        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
        class="pokemon-paginator"
      />

      <div class="grid-container">
        <PokemonCard
          v-for="pokemon in displayedPokemons"
          :key="pokemon.id"
          :pokemon="pokemon"
        />
      </div>
    </div>

    <div v-if="loading" class="loading-overlay">
      <ProgressSpinner />
      <span class="ml-2">Loading Pokémon...</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, defineProps, watch } from 'vue'
import { pokemonService } from '../services/pokemonService'
import Dropdown from 'primevue/dropdown'
import ProgressSpinner from 'primevue/progressspinner'
import Message from 'primevue/message'
import Paginator from 'primevue/paginator'
import PokemonCard from './PokemonCard.vue'

const props = defineProps({
  searchQuery: {
    type: String,
    default: ''
  }
})

const pokemons = ref([])
const loading = ref(true)
const error = ref(null)
const itemsPerPage = ref(parseInt(localStorage.getItem('itemsPerPage')) || 12)
const first = ref(parseInt(localStorage.getItem('paginationFirst')) || 0)

const itemsPerPageOptions = [
  { label: '12 por página', value: 12 },
  { label: '24 por página', value: 24 },
  { label: '48 por página', value: 48 }
]

const filteredPokemons = computed(() => {
  if (!props.searchQuery) return pokemons.value
  const query = props.searchQuery.toLowerCase()
  return pokemons.value.filter(pokemon => 
    pokemon.name.toLowerCase().includes(query) || 
    String(pokemon.id).includes(query)
  )
})

const displayedPokemons = computed(() => {
  const start = first.value
  const end = start + itemsPerPage.value
  return filteredPokemons.value.slice(start, end)
})

const transformPokemonData = (pokemonList) => {
  return pokemonList
    .map(pokemon => {
      const id = getPokemonId(pokemon.url)
      if (id <= 0 || id > 151) return null
      return {
        ...pokemon,
        id,
        url: `https://pokeapi.co/api/v2/pokemon/${id}/`
      }
    })
    .filter(pokemon => pokemon !== null)
    .sort((a, b) => a.id - b.id)
}

const getPokemonId = (url) => {
  const matches = url.match(/\/(\d+)\/$/)
  return matches ? parseInt(matches[1]) : 0
}

onMounted(async () => {
  try {
    loading.value = true
    error.value = null
    const response = await pokemonService.getPokemons(151, 0)
    if (response?.results) {
      const transformedData = transformPokemonData(response.results)
      pokemons.value = transformedData
      console.log('Loaded Pokémon:', transformedData.length)
    } else {
      throw new Error('Invalid response from API')
    }
  } catch (err) {
    console.error('Error loading pokemons:', err)
    error.value = 'Failed to load Pokémon. Please try again later.'
  } finally {
    loading.value = false
  }
})

watch(first, (newValue) => {
  localStorage.setItem('paginationFirst', newValue)
})

watch(itemsPerPage, (newValue) => {
  localStorage.setItem('itemsPerPage', newValue)
})
</script>

<style scoped>
.pokemon-list {
  max-width: 1600px;
  margin: 0 auto;
  padding: 1rem;
  position: relative;
}

.controls {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
}

.items-per-page {
  width: 180px;
}

.pokemon-grid {
  margin-top: 2rem;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin: 1.5rem 0;
}

.pokemon-paginator {
  display: flex;
  justify-content: flex-end;
  padding: 1rem 0;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.error-message {
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .controls {
    flex-direction: column;
  }
  
  .items-per-page {
    width: 100%;
  }

  .grid-container {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
}
</style> 