<template>
  <div class="app">
    <div class="row">
      <h1 class="center-align">Pokedex</h1>
    </div>
    <div class="row">
      <div v-for="pokemon in pokemons" :key="pokemon.id" class="col s1 m2">
        <div class="card">
          <div class="card-image">
            <img class="responsive-img" :src="pokemon.sprites.front_default" />
            <span class="card-title black-text">
              {{ pokemon.name }}
            </span>
          </div>
          <div class="card-content black-text">
            {{ pokemon.id + ' ' + pokemon.name }}
          </div>
          <div class="card-action">
            <a href="#"> View Poke Details</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios/dist/axios';
import M from 'materialize-css';

export default {
  name: 'Pokemon',
  data() {
    return {
      pokemons: [],
      url: 'http://pokeapi.co/api/v2/pokemon?limit=151',
    };
  },
  mounted() {
    M.AutoInit();
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
  computed: {},
  created() {
    this.getAllPoke();
  },
};
</script>

<style></style>
