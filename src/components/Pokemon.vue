<template>
  <div class="container">
    <div class="app">
      <SearchList
        v-for="pokemon in pokemons"
        v-bind:key="pokemon.id"
        v-bind:pokemon="pokemon.name"
      />
      <div class="row">
        <div v-for="pokemon in pokemons" :key="pokemon.id" class="col s1 m2">
          <div class="card">
            <div class="card-image">
              <img class="pokeSprites" :src="pokemon.sprites.front_default" />
            </div>
            <div class="card-content black-text">
              <p>{{ `#${pokemon.id}. ${pokemon.name}` }}</p>
            </div>
            <div class="card-action linkDetails">
              <a href="#"> View Poke Details </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios/dist/axios';
import M from 'materialize-css';
import SearchList from './SearchList';

export default {
  name: 'Pokemon',
  components: {
    SearchList,
  },
  data() {
    return {
      pokemons: [],
      url: 'https://pokeapi.co/api/v2/pokemon?limit=151',
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
  background-color: #333333;
}
.title {
  color: #ef5350;
}
.card {
  padding: 2%;
  height: auto;
  background-color: #ef53506b;
}
.card .card-content {
  text-align: left;
  font-size: 11px;
  display: inline;
}
.card-image {
  height: 60%;
  width: 60%;
  margin: auto;
}
.linkDetails {
  font-size: 10px;
  text-align: center;
}

a {
  font-size: 9px;
  margin: auto;
  color: #ef5350;
  display: inline;
}
</style>
