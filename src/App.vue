<template>
  <div class="app">
    <NavBar />
    <main class="main-content">
      <PokemonList />
    </main>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import PokemonList from './components/PokemonList.vue'
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
}

.app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.main-content {
  padding: 20px;
}
</style>
