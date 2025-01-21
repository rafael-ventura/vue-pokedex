<template>
  <Tag :value="type" :severity="null" :class="['pokemon-type', type]" @mounted="logMount">
    {{ capitalizedType }}
  </Tag>
</template>

<script setup>
import { computed, onMounted } from 'vue'
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

const logMount = () => {
  console.log('TypeBadge mounted with type:', props.type, 'classes:', ['pokemon-type', props.type])
}

onMounted(() => {
  console.log('TypeBadge component mounted with type:', props.type)
})
</script>

<style scoped>
.pokemon-type {
  text-transform: capitalize;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
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