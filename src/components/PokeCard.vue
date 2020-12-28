<template>
  <div class="col s1 m2">
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
</template>

<script>
import M from 'materialize-css';

export default {
  name: 'PokeCard',
  props: {
    pokemon: {},
  },
  mounted() {
    M.AutoInit();
  },
  methods: {},
  computed: {},
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
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
