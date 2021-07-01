<template>
  <div class="container">
    <div class="app">
      <div class="row">
        <div class="col s12 m4 l2"></div>
        <div class="input-field col s8">
          <input
            type="text"
            v-bind="value"
            v-on:input="$emit('input,$events.target.value')"
          />
          <a
            class="btn-floating btn-large waves-effect waves-light red"
            v-on:click="searchPokemon(value)"
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
  name: "SearchList",
  props: {
    pokemons: {
      type: Array,
      required: true
    },
    value: {}
  },
  data: function() {
    return {};
  },
  methods: {
    searchPokemon(value) {
      this.$emit("searchPokemon", value);
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");
</style>
