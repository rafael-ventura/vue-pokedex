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
  }
} 