<template>
  <div class="pokemon-card" @click="navigateToDetails" :class="pokemonType">
    <div class="pokemon-image-wrapper">
      <img :src="pokemonImage" :alt="pokemon.name" class="pokemon-image" @load="handleImageLoad" v-show="imageLoaded">
      <ProgressSpinner v-if="!imageLoaded" class="loading-spinner" />
    </div>
    <div class="pokemon-info">
      <span class="pokemon-number">#{{ String(pokemonId).padStart(3, '0') }}</span>
      <h3 class="pokemon-name">{{ capitalizedName }}</h3>
      <div v-if="pokemonTypes.length" class="pokemon-types">
        <TypeBadge 
          v-for="type in pokemonTypes" 
          :key="type" 
          :type="type"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ProgressSpinner from 'primevue/progressspinner'
import TypeBadge from './TypeBadge.vue'

const props = defineProps({
  pokemon: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const imageLoaded = ref(false)
const pokemonType = ref('')
const pokemonTypes = ref([])

const pokemonId = computed(() => {
  const parts = props.pokemon.url.split('/')
  return parts[parts.length - 2]
})

const pokemonImage = computed(() => 
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId.value}.png`
)

const capitalizedName = computed(() => 
  props.pokemon.name.charAt(0).toUpperCase() + props.pokemon.name.slice(1)
)

const handleImageLoad = () => {
  imageLoaded.value = true
}

const navigateToDetails = () => {
  router.push(`/pokemon/${pokemonId.value}`)
}

onMounted(async () => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId.value}`)
    const data = await response.json()
    pokemonType.value = data.types[0].type.name
    pokemonTypes.value = data.types.map(t => t.type.name)
  } catch (error) {
    console.error('Error fetching pokemon type:', error)
  }
})
</script>

<style scoped>
.pokemon-card {
  background: var(--card-background);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  text-align: center;
  box-shadow: var(--shadow-sm);
  transition: var(--transition-fast);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.pokemon-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 40%;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.pokemon-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.pokemon-card:hover::before {
  opacity: 1;
}

.pokemon-image-wrapper {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto;
  z-index: 1;
}

.pokemon-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
  transition: transform 0.2s;
}

.pokemon-card:hover .pokemon-image {
  transform: scale(1.1);
}

.loading-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.pokemon-info {
  position: relative;
  z-index: 1;
  margin-top: 1rem;
}

.pokemon-number {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.pokemon-name {
  margin: 0.5rem 0;
  color: var(--text-primary);
  font-size: 1.2rem;
  font-weight: 600;
}

.pokemon-types {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 0.5rem;
}
</style>

