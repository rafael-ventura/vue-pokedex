<template>
  <div class="container">
    <div class="row">
      <h1 class="center-align title">Pokedex</h1>
    </div>
    <div class="input-field col s8">
      <input type="text" v-model="search" />
      <label for="last_name">Search a Pokemon:</label>
    </div>
    <div class="row">
      <div>
        <PokeCard
          v-for="(pokemon, index) in searchResult()"
          :key="index"
          v-bind:pokemon="pokemon"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PokeCard from './components/PokeCard';

import M from 'materialize-css';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    PokeCard,
  },
  data: function() {
    return {
      pokemons: [],
      url: 'https://pokeapi.co/api/v2/pokemon?limit=151',
      search: '',
    };
  },
  methods: {
    searchResult: function() {
      if (this.busca == '' || this.busca == ' ') {
        return this.pokemons;
      } else {
        return this.pokemons.filter((pokemon) => pokemon.name == this.busca);
      }
    },
  },
  mounted: function() {
    M.AutoInit();
  },
  created: function() {
    axios
      .get(this.url)
      .then((response) => {
        return response.data.results;
      })
      .then((results) => {
        return Promise.all(results.map((res) => axios.get(res.url)));
      })
      .then((results) => {
        this.pokemons = results.map((res) => res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  computed: {
    searching: function() {
      return this.searchResult();
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
  font-family: 'Press Start 2P', cursive;
  background-color: #333333;
}
.title {
  color: #ef5350;
}
</style>
