<template>
  <div id="app">
    <div class="row">
      <h1 class="center-align title">Pokedex</h1>
    </div>

    <Pokemon />
  </div>
</template>

<script>
import Pokemon from './components/Pokemon';
/* import SearchList from './components/SearchList'; */
import M from 'materialize-css';
export default {
  name: 'App',
  components: {
    Pokemon,
    /* SearchList, */
  },
  mounted() {
    M.AutoInit();
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
  font-family: 'Press Start 2P', cursive;
  background-color: #333333;
}
.title {
  color: #ef5350;
}
</style>
