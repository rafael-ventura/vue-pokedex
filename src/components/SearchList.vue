<template>
  <div class="container">
    <div class="app">
      <div class="row">
        {{ $props.pokemons }}
        <div class="col s12 m4 l2"></div>
        <div class="input-field col s8">
          <input type="text" />
          <a
            class="btn-floating btn-large waves-effect waves-light red"
            @click="searchPokemon({ name: 'wartortle', id: 8 })"
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
  props: {
    pokemons: {
      type: Array,
      required: true,
    },
  },
  data: function() {
    return {};
  },
  methods: {
    searchPokemon: function(filter) {
      let filtered = this.$props.pokemons.map((element) => {
        if (element.name === filter.name) {
          filtered.push(element);
        } else if (element.id === filter.id) {
          filtered.push(element);
        }
      });
      return filtered;
    },
  },
  computed: {
    show: function() {
      return console.log(this.$props.pokemons);
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
</style>
