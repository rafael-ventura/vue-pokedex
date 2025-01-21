<template>
  <Tag :value="type" :severity="null" :class="['pokemon-type', type]">
    {{ capitalizedType }}
  </Tag>
</template>

<script setup>
import { computed } from 'vue'
import Tag from 'primevue/tag'

const props = defineProps({
  type: {
    type: String,
    required: true
  }
})

const capitalizedType = computed(() => {
  return props.type.charAt(0).toUpperCase() + props.type.slice(1)
})
</script>

<style scoped>
.pokemon-type {
  text-transform: capitalize;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  font-weight: 600;
  margin: 0.25rem;
  border: none;
}

/* Importando estilos de tipos do arquivo pokemon-types.css */
:deep(.pokemon-type) {
  background-color: var(--type-color);
  color: white;
}
</style> 