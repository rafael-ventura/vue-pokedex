<template>
  <div class="container">
    <div class="row">
      <h1 class="center-align title">Pokedex</h1>
    </div>
    <div class="input-field col s8">
      <input type="text" v-model="search" />
      <a
        class="btn-floating btn-large waves-effect waves-light red"
        v-on:click="pokeSearch(this.search)"
        ><i class="material-icons">search</i>
      </a>
      <label for="last_name">Search a Pokemon:</label>
    </div>
    <div class="row">
      <PokeCard
        v-for="pokemon in filteredPokemons"
        :key="pokemon.id"
        v-bind:pokemon="pokemon"
      />
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
      filteredPokemons: [],
      search: '',
    };
  },
  methods: {
    getAllPoke: async function() {
      await axios
        .get(this.url)
        .then((response) => {
          return response.data.results;
        })
        .then((results) => {
          return Promise.all(results.map((res) => axios.get(res.url)));
        })
        .then((results) => {
          this.pokemons = results.map((res) => res.data);
          this.filteredPokemons = this.pokemons;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    pokeSearch(search) {
      this.filteredPokemons = this.pokemons;
      if (search == '' || search == ' ') {
        this.filteredPokemons = this.pokemons;
      } else {
        this.filteredPokemons = this.pokemons.filter((pokemon) => {
          pokemon.name == search;
        });
      }
    },
  },
  mounted() {
    M.AutoInit();
  },
  created() {
    this.getAllPoke();
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
