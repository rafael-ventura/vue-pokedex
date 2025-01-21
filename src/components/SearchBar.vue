<template>
  <div class="input-field col s8">
    <input class="white-text" type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
    <label for="last_name">Search a Pokemon:</label>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    modelValue: String
  },
  emits: ['update:modelValue']
}
</script>
