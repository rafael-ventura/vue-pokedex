<template>
  <div class="app">
    <div v-for="pokemon in pokemons" :key="pokemon.id">
      <li>
        <h2>{{ pokemon.id + ' ' + pokemon.name }}</h2>
      </li>
      <li>
        <img :src="pokemon.sprites.front_default" />
      </li>
    </div>
  </div>
</template>

<script>
import axios from 'axios/dist/axios';
export default {
  name: 'Pokemon',
  data() {
    return {
      pokemons: [],
      url: 'http://pokeapi.co/api/v2/pokemon?limit=151',
    };
  },
  methods: {
    getAllPoke() {
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
          return this.pokemons;
        })
        .catch(() => {});
    },
  },
  created() {
    this.getAllPoke();
  },
};
</script>

<style>

li {
  align-items: center;
  list-style: none;
  orientation: horizontal;
}
</style>
