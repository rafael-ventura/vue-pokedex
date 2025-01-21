<template>
  <div class="pokemon-list">
    <DataView
      :value="pokemons"
      :paginator="true"
      :rows="12"
      :layout="'grid'"
      paginatorPosition="both"
      class="pokemon-grid"
      :loading="loading"
    >
      <template #grid="slotProps">
        <div class="col-12 sm:col-6 lg:col-4 xl:col-3 p-2">
          <div class="pokemon-card p-4 border-1 surface-border surface-card border-round">
            <div class="flex flex-column align-items-center gap-3">
              <img 
                :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${slotProps.data.id}.png`" 
                :alt="slotProps.data.name"
                class="pokemon-image"
              />
              <div class="text-2xl font-bold text-900 capitalize">{{ slotProps.data.name }}</div>
              <div class="text-sm text-500">#{{ String(slotProps.data.id).padStart(3, '0') }}</div>
              <Button 
                :label="'View Details'" 
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
          Loading Pokémon...
        </div>
      </template>
    </DataView>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { pokemonService } from '../services/pokemonService'
import DataView from 'primevue/dataview'
import Button from 'primevue/button'

const router = useRouter()
const pokemons = ref([])
const loading = ref(true)

const getPokemonId = (url) => {
  const matches = url.match(/\/(\d+)\/$/)
  return matches ? parseInt(matches[1]) : 0
}

const transformPokemonData = (pokemonList) => {
  return pokemonList.map(pokemon => ({
    ...pokemon,
    id: getPokemonId(pokemon.url)
  }))
}

const navigateToPokemon = (id) => {
  router.push(`/pokemon/${id}`)
}

onMounted(async () => {
  try {
    loading.value = true
    const response = await pokemonService.getPokemons(151, 0)
    pokemons.value = transformPokemonData(response.results)
  } catch (error) {
    console.error('Error loading pokemons:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.pokemon-list {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
}

.pokemon-grid {
  margin-top: 2rem;
}

.pokemon-card {
  transition: transform 0.2s, box-shadow 0.2s;
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
</style> 