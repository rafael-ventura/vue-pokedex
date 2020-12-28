<template>
  <div class="container">
    <div class="row">
      <h1 class="center-align title">Pokedex</h1>
    </div>
    <SearchList :pokemons="pokemons" />
    <div class="row">
      <PokeCard
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        v-bind:pokemon="pokemon"
      />
    </div>
  </div>
</template>

<script>
import PokeCard from './components/PokeCard';
import SearchList from './components/SearchList';
import M from 'materialize-css';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    PokeCard,
    SearchList,
  },
  data: function() {
    return {
      pokemons: [],
      url: 'https://pokeapi.co/api/v2/pokemon?limit=151',
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
          this.pokemons;
        })
        .catch(() => {});
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
