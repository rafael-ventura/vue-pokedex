<template>
  <div class="container">
    <router-link to="details"> Pokemon </router-link>
    <router-view />
    <div class="row">
      <h1 class="center-align title">Pokedex</h1>
    </div>
    <div class="input-field col s8">
      <input class="white-text" type="text" v-model="search" />
      <label for="last_name">Search a Pokemon:</label>
    </div>
    <div class="row">
      <PokeCard
        v-for="(pokemon, index) in searchResult"
        :key="index"
        v-bind:pokemon="pokemon"
      />
    </div>
  </div>
</template>

<script>
import PokeCard from "./views/PokeCard.vue";

import M from "materialize-css";
import axios from "axios";

export default {
  name: "App",
  components: {
    PokeCard
  },
  data: function() {
    return {
      pokemons: [],
      url: "https://pokeapi.co/api/v2/pokemon?limit=151",
      search: ""
    };
  },
  methods: {
    filtering: function(search) {
      if (search == "" || search == " ") {
        return this.pokemons;
      } else {
        console.log(search);
        return this.pokemons.filter(pokemon => pokemon.name.includes(search));
      }
    }
  },
  mounted: function() {
    M.AutoInit();
  },
  created: function() {
    axios
      .get(this.url)
      .then(response => {
        return response.data.results;
      })
      .then(results => {
        return Promise.all(results.map(res => axios.get(res.url)));
      })
      .then(results => {
        this.pokemons = results.map(res => res.data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {
    searchResult() {
      return this.filtering(this.search);
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");
body {
  font-family: "Press Start 2P", cursive;
  background-color: #333333;
}
.title {
  color: #ef5350;
}
</style>
