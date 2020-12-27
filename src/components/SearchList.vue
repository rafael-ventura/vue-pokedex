<template>
  <div class="container">
    <div class="app">
      {{ pokemon }}
      <div class="row">
        <div class="col s12 m4 l2"></div>
        <div class="input-field col s8">
          <input type="text" />
          <a
            class="btn-floating btn-large waves-effect waves-light red"
            :href="tomato()"
            ><i class="material-icons">search</i>
          </a>
          <label for="last_name">Search a Pokemon:</label>
        </div>
        <div class="col s12 m4 l2"><p></p></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchList',
  props: ['pokemon'],
  data: function() {
    return {
      pokemons: [],
    };
  },
  methods: {
    tomato: function() {
      console.log(`Voce procurou um pokemon`);
    },
  },
  created: function() {
    this.props.pokemons.forEach((poke, index) => {
      this.pokemon[index].push(this.pokemons[index]);
    });
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
</style>
