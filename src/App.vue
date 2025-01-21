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
/* Estilos específicos do App.vue, se necessário */
</style>
