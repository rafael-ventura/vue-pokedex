<template>
  <div class="pokemon-details-container">
    <Button 
      icon="pi pi-arrow-left"
      class="back-button p-button-rounded p-button-text"
      @click="goBack"
      v-tooltip.bottom="'Voltar para a Pokédex'"
    />
    
    <div v-if="pokemon" class="pokemon-details">
      <div class="pokemon-header" :class="pokemon.types[0]?.type.name">
        <h2 class="pokemon-name">{{ capitalizedName }}</h2>
        <span class="pokemon-number">#{{ String(pokemon.id).padStart(3, '0') }}</span>
      </div>

      <div class="pokemon-content">
        <div class="pokemon-image-container">
          <img :src="currentPokemonImage" :alt="pokemon.name" class="pokemon-image">
          <img v-if="pokemon.sprites.versions['generation-v']['black-white'].animated?.front_default" 
               :src="currentPokemonGif" 
               :alt="pokemon.name" 
               class="pokemon-gif">
        </div>

        <div class="pokemon-info">
          <div class="stats-container">
            <h3>Informações</h3>
            <div class="info-grid">
              <div class="info-item">
                <span class="label">Altura</span>
                <span class="value">{{ (pokemon.height / 10).toFixed(1) }}m</span>
              </div>
              <div class="info-item">
                <span class="label">Peso</span>
                <span class="value">{{ (pokemon.weight / 10).toFixed(1) }}kg</span>
              </div>
            </div>
          </div>

          <div class="abilities-container">
            <h3>Habilidades</h3>
            <div class="abilities-grid">
              <div v-for="ability in pokemon.abilities" 
                   :key="ability.ability.name" 
                   class="ability-item">
                <span class="ability-name">{{ formatAbilityName(ability.ability.name) }}</span>
                <TypeBadge 
                  v-if="abilityTypes[ability.ability.name]"
                  :type="abilityTypes[ability.ability.name]"
                  class="ability-type"
                />
              </div>
            </div>
          </div>

          <div class="type-advantages-container">
            <h3>Vantagens de Ataque</h3>
            <TypeRelations :types="pokemon.types.map(t => t.type.name)" />
          </div>

          <div class="stats-container">
            <h3>Status Base</h3>
            <div class="stats-grid">
              <div v-for="stat in pokemon.stats" :key="stat.stat.name" class="stat-item">
                <div class="stat-label">{{ formatStatName(stat.stat.name) }}</div>
                <div class="stat-bar-container">
                  <div class="stat-bar" 
                       :style="{ width: `${(stat.base_stat / 154) * 100}%`, background: getStatBarColor(stat.base_stat) }">
                    {{ stat.base_stat }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="moves-container">
            <h3>Movimentos</h3>
            <div class="moves-grid">
              <span v-for="move in pokemon.moves.slice(0, 8)" 
                    :key="move.move.name" 
                    class="move-badge">
                {{ formatMoveName(move.move.name) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="error" class="error-message">
      <Message severity="error">{{ error }}</Message>
    </div>
    <div v-else class="loading-container">
      <ProgressSpinner />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button'
import Message from 'primevue/message'
import ProgressSpinner from 'primevue/progressspinner'
import TypeRelations from './TypeRelations.vue'
import TypeBadge from './TypeBadge.vue'
import { pokemonService } from '../services/pokemonService'

const route = useRoute()
const router = useRouter()
const pokemon = ref(null)
const error = ref(null)
const isShiny = ref(false)
const abilityTypes = ref({})

const currentPokemonImage = computed(() => {
  const baseUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'
  if (isShiny.value) {
    return `${baseUrl}/other/official-artwork/shiny/${route.params.id}.png`
  }
  return `${baseUrl}/other/official-artwork/${route.params.id}.png`
})

const currentPokemonGif = computed(() => {
  if (!pokemon.value) return ''
  const sprites = pokemon.value.sprites.versions['generation-v']['black-white'].animated
  return isShiny.value ? sprites.front_shiny || sprites.front_default : sprites.front_default
})

const capitalizedName = computed(() => 
  pokemon.value ? pokemon.value.name.charAt(0).toUpperCase() + pokemon.value.name.slice(1) : ''
)

const formatStatName = (statName) => {
  const names = {
    'hp': 'HP',
    'attack': 'Ataque',
    'defense': 'Defesa',
    'special-attack': 'Atq. Esp.',
    'special-defense': 'Def. Esp.',
    'speed': 'Velocidade'
  }
  return names[statName] || statName
}

const formatMoveName = (moveName) => {
  return moveName.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

const formatAbilityName = (name) => {
  return name.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

const getStatBarColor = (value) => {
  if (value >= 120) return 'linear-gradient(45deg, #ff4757, #ff6b81)'
  if (value >= 90) return 'linear-gradient(45deg, #2ed573, #7bed9f)'
  if (value >= 60) return 'linear-gradient(45deg, #1e90ff, #70a1ff)'
  return 'linear-gradient(45deg, #747d8c, #a4b0be)'
}

const goBack = () => {
  router.push('/pokedex')
}

const loadAbilityTypes = () => {
  if (!pokemon.value) return
  pokemon.value.abilities.forEach(ability => {
    const abilityName = ability.ability.name
    const type = pokemonService.getAbilityType(abilityName)
    abilityTypes.value[abilityName] = type
    console.log(`Ability: ${abilityName}, Type: ${type}`)
  })
  console.log('All ability types:', abilityTypes.value)
}

onMounted(async () => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${route.params.id}`)
    if (!response.ok) throw new Error('Pokémon não encontrado')
    pokemon.value = await response.json()
    loadAbilityTypes()
  } catch (err) {
    console.error('Erro ao carregar detalhes do Pokémon:', err)
    error.value = 'Falha ao carregar os detalhes do Pokémon. Tente novamente mais tarde.'
  }
})
</script>

<style scoped>
.pokemon-details-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
  position: relative;
}

.back-button {
  position: fixed;
  top: 8rem;
  left: 2rem;
  color: var(--text-secondary);
  transition: all 0.2s;
  width: 3rem !important;
  height: 3rem !important;
  background: var(--card-background) !important;
  box-shadow: var(--shadow-sm) !important;
}

.back-button:hover {
  transform: translateX(-5px);
  box-shadow: var(--shadow-md) !important;
}

.back-button .pi {
  font-size: 1.2rem;
}

.pokemon-details {
  background: var(--card-background);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.pokemon-header {
  padding: 2rem;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pokemon-name {
  font-size: 2rem;
  margin: 0;
}

.pokemon-number {
  font-size: 1.2rem;
  opacity: 0.8;
}

.pokemon-content {
  padding: 2rem;
}

.pokemon-image-container {
  text-align: center;
  margin: -100px 0 2rem;
  position: relative;
}

.pokemon-image {
  width: 250px;
  height: 250px;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.2));
}

.pokemon-gif {
  position: absolute;
  bottom: -30px;
  right: 0;
  width: 80px;
  height: 80px;
  image-rendering: pixelated;
}

.types {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.info-item {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 0.5rem;
}

.label {
  color: #666;
  font-size: 0.9rem;
  display: block;
  margin-bottom: 0.5rem;
}

.value {
  font-weight: 500;
  text-transform: capitalize;
}

.stats-container {
  margin-top: 2rem;
}

.stats-grid {
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
}

.stat-item {
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
  gap: 1rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
}

.stat-bar-container {
  background: #f5f5f5;
  border-radius: 1rem;
  overflow: hidden;
}

.stat-bar {
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.9rem;
  min-width: 30px;
  transition: width 0.3s ease;
  text-align: right;
}

.moves-container {
  margin-top: 2rem;
}

.moves-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.move-badge {
  background: #f5f5f5;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.9rem;
}

.pokemon-header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.shiny-toggle {
  color: white !important;
}

.abilities-container {
  margin-top: 2rem;
}

.abilities-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

.ability-item {
  display: grid;
  grid-template-columns: 1fr 100px;
  border-radius: var(--border-radius);
  overflow: hidden;
  transition: var(--transition-fast);
  min-width: 180px;
}

.ability-name {
  font-weight: 500;
  color: var(--text-primary);
  padding: 0.75rem;
  background: #f5f5f5;
  display: flex;
  align-items: center;
}

.ability-type {
  color: black;
  border: 1px solid black;
  border-radius: 2px;
  margin: 0.8px;
}

:deep(.ability-type .p-tag) {
  flex: 1;
  margin: 0;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
}

/* Removendo estilos não mais necessários */
.hidden-tag {
  display: none;
}

/* Cores dos tipos */
.grass { background: var(--grass-color) !important; }
.fire { background: var(--fire-color) !important; }
.water { background: var(--water-color) !important; }
.bug { background: var(--bug-color) !important; }
.normal { background: var(--normal-color) !important; }
.poison { background: var(--poison-color) !important; }
.electric { background: var(--electric-color) !important; }
.ground { background: var(--ground-color) !important; }
.fairy { background: var(--fairy-color) !important; }
.fighting { background: var(--fighting-color) !important; }
.psychic { background: var(--psychic-color) !important; }
.rock { background: var(--rock-color) !important; }
.ghost { background: var(--ghost-color) !important; }
.ice { background: var(--ice-color) !important; }
.dragon { background: var(--dragon-color) !important; }
.dark { background: var(--dark-color) !important; }
.steel { background: var(--steel-color) !important; }
.flying { background: var(--flying-color) !important; }

.type-advantages-container {
  margin-top: 2rem;
}

@media (max-width: 1400px) {
  .back-button {
    position: absolute;
    top: 1rem;
    left: 2rem;
    transform: none;
  }

  .back-button:hover {
    transform: translateX(-5px);
  }
}

@media (max-width: 768px) {
  .pokemon-details-container {
    padding: 0 1rem;
    margin: 1rem auto;
  }

  .back-button {
    left: 1rem;
  }

  .pokemon-content {
    padding: 1rem;
  }

  .pokemon-image {
    width: 200px;
    height: 200px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .stat-item {
    grid-template-columns: 80px 1fr;
  }
}
</style>


