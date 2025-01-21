<template>
  <NavBar @search="handleSearch" />
  <router-view :search-query="searchQuery" />
</template>

<script setup>
import { ref } from 'vue'
import NavBar from './components/NavBar.vue'
import './css/base.css'

const searchQuery = ref('')

const handleSearch = (query) => {
  searchQuery.value = query
}
</script>

<style>
:root {
  --primary-color: #ef5350;
  --secondary-color: #ff6b6b;
  --background-color: #f8f9fa;
  --text-color: #333;
  --text-secondary: #666;
  --card-background: #ffffff;
  --border-radius: 1.5rem;
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--background-color);
  color: var(--text-color);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
}

* {
  box-sizing: border-box;
}
</style>
