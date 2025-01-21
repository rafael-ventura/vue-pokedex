<template>
  <div class="pokedex-page">
    <div class="header">
      <h1>Pokédex</h1>
      <div class="controls">
        <Dropdown
          v-model="itemsPerPage"
          :options="itemsPerPageOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Items per page"
          class="p-mr-2"
        />
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText v-model="searchQuery" placeholder="Search Pokémon..." />
        </span>
      </div>
    </div>

    <DataView
      :value="filteredPokemons"
      :paginator="true"
      :rows="itemsPerPage"
      :layout="'grid'"
      paginatorPosition="both"
      class="pokemon-grid"
      :loading="loading"
      :pt="{
        grid: { class: 'custom-grid' }
      }"
    >
      <template #grid="slotProps">
        <div class="col-12 sm:col-6 lg:col-4 xl:col-3 p-2">
          <div class="pokemon-card p-4 border-1 surface-border surface-card border-round">
            <div class="flex flex-column align-items-center gap-3">
              <img 
                :src="slotProps.data.imageUrl" 
                :alt="slotProps.data.name"
                class="pokemon-image"
              />
              <div class="text-2xl font-bold text-900 capitalize">{{ slotProps.data.name }}</div>
              <div class="text-sm text-500">#{{ String(slotProps.data.id).padStart(3, '0') }}</div>
              <Button 
                label="View Details" 
                icon="pi pi-eye"
                class="p-button-rounded p-button-outlined"
                @click="navigateToPokemon(slotProps.data.id)"
              />
            </div>
          </div>
        </div>
      </template>
      <template #empty>
        <div class="flex justify-content-center align-items-center p-4">
          No Pokémon found
        </div>
      </template>
      <template #loading>
        <div class="flex justify-content-center align-items-center p-4">
          <ProgressSpinner />
          <span class="ml-2">Loading Pokémon...</span>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { pokemonService } from '../services/pokemonService'
import DataView from 'primevue/dataview'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import ProgressSpinner from 'primevue/progressspinner'

const router = useRouter()
const pokemons = ref([])
const loading = ref(true)
const searchQuery = ref('')
const itemsPerPage = ref(12)
const itemsPerPageOptions = [
  { label: '12 per page', value: 12 },
  { label: '24 per page', value: 24 },
  { label: '48 per page', value: 48 }
]

const filteredPokemons = computed(() => {
  if (!searchQuery.value) return pokemons.value
  const query = searchQuery.value.toLowerCase()
  return pokemons.value.filter(pokemon => 
    pokemon.name.toLowerCase().includes(query) || 
    String(pokemon.id).includes(query)
  )
})

const getPokemonId = (url) => {
  const matches = url.match(/\/(\d+)\/$/)
  return matches ? parseInt(matches[1]) : 0
}

const transformPokemonData = (pokemonList) => {
  return pokemonList.map(pokemon => {
    const id = getPokemonId(pokemon.url)
    return {
      ...pokemon,
      id,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    }
  }).filter(pokemon => pokemon.id > 0 && pokemon.id <= 151) // Garante apenas primeira geração
}

const navigateToPokemon = (id) => {
  router.push(`/pokemon/${id}`)
}

onMounted(async () => {
  try {
    loading.value = true
    // Pegamos um número maior para garantir que teremos todos os 151 primeiros
    const response = await pokemonService.getPokemons(200, 0)
    const transformedData = transformPokemonData(response.results)
    pokemons.value = transformedData
  } catch (error) {
    console.error('Error loading pokemons:', error)
  } finally {
    loading.value = false
  }
})
</script>

<script>
export default {
  name: 'PokedexPage'
}
</script>

<style scoped>
.pokedex-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.header h1 {
  margin: 0;
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.controls {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.pokemon-grid {
  margin-top: 2rem;
}

.pokemon-card {
  transition: transform 0.2s, box-shadow 0.2s;
  background: white;
}

.pokemon-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.pokemon-image {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

:deep(.p-paginator) {
  padding: 1rem;
}

:deep(.p-dataview-content) {
  background: transparent;
}

:deep(.custom-grid) {
  display: flex;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .controls {
    flex-direction: column;
  }
  
  :deep(.p-dropdown) {
    width: 100%;
  }
  
  :deep(.p-input-icon-left) {
    width: 100%;
  }
  
  :deep(.p-inputtext) {
    width: 100%;
  }
}
</style> 