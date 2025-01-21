import axios from 'axios'

const BASE_URL = 'https://pokeapi.co/api/v2'

export const pokemonService = {
  async getPokemons(limit = 20, offset = 0) {
    try {
      const response = await axios.get(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`)
      return response.data
    } catch (error) {
      console.error('Error fetching pokemons:', error)
      throw error
    }
  },

  async getPokemonDetails(id) {
    try {
      const response = await axios.get(`${BASE_URL}/pokemon/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching pokemon details:', error)
      throw error
    }
  },

  async getAbilityDetails(abilityName) {
    try {
      const response = await axios.get(`${BASE_URL}/ability/${abilityName}`)
      return response.data
    } catch (error) {
      console.error('Error fetching ability details:', error)
      throw error
    }
  },

  // Mapeamento manual de habilidades para tipos, já que a API não fornece diretamente
  getAbilityType(abilityName) {
    const abilityTypes = {
      overgrow: 'grass',
      chlorophyll: 'grass',
      blaze: 'fire',
      'solar-power': 'fire',
      torrent: 'water',
      'rain-dish': 'water',
      shield_dust: 'bug',
      'compound-eyes': 'bug',
      'keen-eye': 'flying',
      'tangled-feet': 'flying',
      'run-away': 'normal',
      'guts': 'normal',
      'static': 'electric',
      'lightning-rod': 'electric',
      'sand-veil': 'ground',
      'arena-trap': 'ground',
      'poison-point': 'poison',
      'rivalry': 'normal',
      'intimidate': 'normal',
      'shed-skin': 'normal',
      'cute-charm': 'fairy',
      'magic-guard': 'psychic',
      'cloud-nine': 'normal',
      'levitate': 'flying',
      'effect-spore': 'grass',
      'dry-skin': 'water',
      'wonder-guard': 'ghost',
      'pressure': 'dark',
      'rock-head': 'rock',
      'sturdy': 'rock',
      'magma-armor': 'fire',
      'water-absorb': 'water',
      'volt-absorb': 'electric',
      'swift-swim': 'water',
      'battle-armor': 'fighting',
      'clear-body': 'psychic',
      'natural-cure': 'grass',
      'serene-grace': 'normal',
      'leaf-guard': 'grass',
      'limber': 'normal',
      'damp': 'water',
      'hyper-cutter': 'normal',
      'shell-armor': 'water',
      'huge-power': 'fighting',
      'inner-focus': 'psychic',
      'magnet-pull': 'electric',
      'soundproof': 'normal',
      'thick-fat': 'ice',
      'early-bird': 'flying',
      'flame-body': 'fire',
      'vital-spirit': 'fighting',
      'white-smoke': 'fire',
      'pure-power': 'fighting',
      'shell-link': 'water',
      'air-lock': 'flying'
    }
    return abilityTypes[abilityName] || 'normal'
  }
} 