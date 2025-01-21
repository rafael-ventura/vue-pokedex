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
        <span v-for="type in pokemonTypes" 
              :key="type" 
              class="type-badge"
              :class="type">
          {{ type }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import ProgressSpinner from 'primevue/progressspinner'

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
  background: white;
  border-radius: 1.5rem;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
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
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
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
  color: #666;
  font-size: 0.9rem;
}

.pokemon-name {
  margin: 0.5rem 0;
  color: #333;
  font-size: 1.2rem;
  font-weight: 600;
}

.pokemon-types {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 0.5rem;
}

.type-badge {
  padding: 0.25rem 1rem;
  border-radius: 1rem;
  color: white;
  font-size: 0.85rem;
  text-transform: capitalize;
}

/* Type colors */
.grass, .grass.type-badge { background-color: #78c850; }
.fire, .fire.type-badge { background-color: #f08030; }
.water, .water.type-badge { background-color: #6890f0; }
.bug, .bug.type-badge { background-color: #a8b820; }
.normal, .normal.type-badge { background-color: #a8a878; }
.poison, .poison.type-badge { background-color: #a040a0; }
.electric, .electric.type-badge { background-color: #f8d030; }
.ground, .ground.type-badge { background-color: #e0c068; }
.fairy, .fairy.type-badge { background-color: #ee99ac; }
.fighting, .fighting.type-badge { background-color: #c03028; }
.psychic, .psychic.type-badge { background-color: #f85888; }
.rock, .rock.type-badge { background-color: #b8a038; }
.ghost, .ghost.type-badge { background-color: #705898; }
.ice, .ice.type-badge { background-color: #98d8d8; }
.dragon, .dragon.type-badge { background-color: #7038f8; }
.dark, .dark.type-badge { background-color: #705848; }
.steel, .steel.type-badge { background-color: #b8b8d0; }
.flying, .flying.type-badge { background-color: #a890f0; }

.grass::before { background-color: #78c850; }
.fire::before { background-color: #f08030; }
.water::before { background-color: #6890f0; }
.bug::before { background-color: #a8b820; }
.normal::before { background-color: #a8a878; }
.poison::before { background-color: #a040a0; }
.electric::before { background-color: #f8d030; }
.ground::before { background-color: #e0c068; }
.fairy::before { background-color: #ee99ac; }
.fighting::before { background-color: #c03028; }
.psychic::before { background-color: #f85888; }
.rock::before { background-color: #b8a038; }
.ghost::before { background-color: #705898; }
.ice::before { background-color: #98d8d8; }
.dragon::before { background-color: #7038f8; }
.dark::before { background-color: #705848; }
.steel::before { background-color: #b8b8d0; }
.flying::before { background-color: #a890f0; }
</style>

