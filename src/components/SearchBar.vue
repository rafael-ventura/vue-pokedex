<template>
  <div class="search-container" :class="{ 'is-focused': isFocused }">
    <span class="search-icon">
      <i class="pi pi-search"></i>
    </span>
    <input
      type="text"
      :value="modelValue"
      @input="handleInput"
      @focus="isFocused = true"
      @blur="isFocused = false"
      :placeholder="placeholder"
      class="search-input"
      :class="size"
      ref="inputRef"
    />
    <span 
      v-if="modelValue" 
      class="clear-icon"
      @click="clearSearch"
    >
      <i class="pi pi-times"></i>
    </span>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Buscar...'
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  debounceTime: {
    type: Number,
    default: 300
  }
})

const emit = defineEmits(['update:modelValue', 'search'])
const isFocused = ref(false)
const inputRef = ref(null)
let debounceTimeout = null

const handleInput = (event) => {
  const value = event.target.value
  emit('update:modelValue', value)
  
  // Debounce the search event
  clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    emit('search', value)
  }, props.debounceTime)
}

const clearSearch = () => {
  emit('update:modelValue', '')
  emit('search', '')
  inputRef.value?.focus()
}

// Cleanup on component unmount
onUnmounted(() => {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout)
  }
})
</script>

<style scoped>
.search-container {
  position: relative;
  display: inline-flex;
  align-items: center;
  background: white;
  border-radius: 2rem;
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.search-container.is-focused {
  box-shadow: 0 0 0 2px rgba(239, 83, 80, 0.2);
  border-color: #ef5350;
}

.search-icon,
.clear-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  transition: color 0.2s ease;
}

.search-icon {
  padding-left: 1rem;
}

.clear-icon {
  padding-right: 1rem;
  cursor: pointer;
}

.clear-icon:hover {
  color: #ef5350;
}

.search-input {
  border: none;
  background: transparent;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  color: #333;
  width: 100%;
}

.search-input:focus {
  outline: none;
}

.search-input::placeholder {
  color: #999;
}

/* Sizes */
.search-input.small {
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
}

.search-input.large {
  padding: 1rem 1.25rem;
  font-size: 1.1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .search-container {
    width: 100%;
  }
  
  .search-input {
    width: 100%;
  }
}
</style> 