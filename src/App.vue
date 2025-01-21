<template>
  <NavBar @search="handleSearch" />
  <router-view :search-query="searchQuery" />
</template>

<script setup>
import { ref } from 'vue'
import NavBar from './components/NavBar.vue'

const searchQuery = ref('')

const handleSearch = (query) => {
  searchQuery.value = query
}
</script>

<style>
.app {
  min-height: 100vh;
  background: #f8f9fa;
}

:root {
  --primary-color: #2196F3;
  --secondary-color: #00BCD4;
}

/* Reset some basic elements */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
