<template>
  <div class="app">
    <div class="row">
      <h1 class="center-align">Pokedex</h1>
    </div>
    <div class="row">
      <div v-for="pokemon in pokemons" :key="pokemon.id" class="col s1 m2">
        <div id="pokeCards" class="card">
          <div class="card-image">
            <img class="responsive-img" :src="pokemon.sprites.front_default" />
          </div>
          <div class="card-content black-text">
            <p>{{ `#${pokemon.id}.  ${pokemon.name}` }}</p>
          </div>
          <div id="linkDetails" class="card-action">
            <a id="pokeDetails" href="#"> View Poke Details </a>
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

<style>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
body {
  font-family: 'Press Start 2P', cursive;
  background-color:#fbe9e7;
}
h1 {
  color: #ef5350;
}
#linkDetails {
  font-size: 10px;
  text-align: center;
}
#pokeDetails {
  color: #607d8b;
}
#pokeDetails:hover {
  color: aqua;
}
#pokeCards {
  font-size: 14px;
  background-color:#90a4ae ;
}
</style>
