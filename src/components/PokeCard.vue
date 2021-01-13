<template>
  <div class="col s6 m5 l2">
      <div class="card">
        <div class="card-image">
         <img class="pokeSprites" :src="pokemon.sprites.front_default" />
        </div>
        <div class="card-content black-text">
           <p > {{`#${pokemon.id}.  ${pokemon.name}`}}</p>
        </div>
        <div class="card-action">
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
}

.card-image {
  height: 60%;
  width: 60%;
  margin: auto;
}
a {
  font-size: 9px;
  margin: auto;
  color: #ef5350;
  display: inline;
}
</style>
