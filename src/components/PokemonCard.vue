<template>
  <div class="pokemon-card" @click="navigateToDetails">
    <img :src="pokemonImage" :alt="pokemon.name" class="pokemon-image">
    <h3 class="pokemon-name">{{ capitalizedName }}</h3>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  pokemon: {
    type: Object,
    required: true
  }
})

const pokemonId = computed(() => {
  const parts = props.pokemon.url.split('/')
  return parts[parts.length - 2]
})

const pokemonImage = computed(() => 
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId.value}.png`
)

const capitalizedName = computed(() => 
  props.pokemon.name.charAt(0).toUpperCase() + props.pokemon.name.slice(1)
)

const navigateToDetails = () => {
  router.push(`/pokemon/${pokemonId.value}`)
}
</script>

<style scoped>
.pokemon-card {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s;
  cursor: pointer;
}

.pokemon-card:hover {
  transform: translateY(-5px);
}

.pokemon-image {
  width: 120px;
  height: 120px;
}

.pokemon-name {
  margin: 0.5rem 0;
  color: #333;
}
</style>

