<template>
  <Toolbar class="navbar">
    <template #start>
      <router-link to="/" class="logo-link">
        <img :src="require('@/assets/pokedex-logo.png')" alt="Pokédex" class="navbar-logo" />
      </router-link>
    </template>
    <template #end>
      <SearchBar
        v-model="searchQuery"
        placeholder="Buscar Pokémon..."
        @search="handleSearch"
        size="medium"
        :debounceTime="300"
      />
    </template>
  </Toolbar>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import Toolbar from 'primevue/toolbar'
import SearchBar from './SearchBar.vue'

const searchQuery = ref('')
const emit = defineEmits(['search'])

const handleSearch = (value) => {
  emit('search', value)
}
</script>

<style scoped>
.navbar {
  background-color: #ef5350 !important;
  border: none !important;
  border-radius: 0 !important;
  padding: 0.5rem 2rem !important;
}

.navbar-logo {
  height: 50px;
  width: auto;
  object-fit: contain;
}

:deep(.p-toolbar) {
  background: transparent;
  border: none;
  padding: 0;
}

:deep(.p-toolbar-group-end) {
  margin-right: 8%;
  justify-content: flex-end;
}

@media (max-width: 768px) {
  .navbar {
    padding: 1rem !important;
  }

  :deep(.p-toolbar-group-start),
  :deep(.p-toolbar-group-end) {
    width: 100%;
    justify-content: center;
    margin: 0.5rem 0;
  }

  :deep(.p-toolbar) {
    flex-direction: column;
  }
}

.logo-link {
  display: block;
  transition: transform 0.2s ease;
}

.logo-link:hover {
  transform: scale(1.05);
}
</style>
