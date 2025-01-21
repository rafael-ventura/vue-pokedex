<template>
  <div class="type-relations">
    <div class="relation-section">
      <h3>Forte contra (2x dano)</h3>
      <div class="type-badges">
        <TypeBadge 
          v-for="type in strongAgainst" 
          :key="type" 
          :type="type"
        />
      </div>
    </div>
    <div class="relation-section">
      <h3>Fraco contra (0.5x dano)</h3>
      <div class="type-badges">
        <TypeBadge 
          v-for="type in weakAgainst" 
          :key="type" 
          :type="type"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import TypeBadge from './TypeBadge.vue'

const props = defineProps({
  types: {
    type: Array,
    required: true
  }
})

// Mapeamento de tipos e suas relações
const typeRelations = {
  normal: {
    strongAgainst: [],
    weakAgainst: ['fighting']
  },
  fire: {
    strongAgainst: ['grass', 'ice', 'bug', 'steel'],
    weakAgainst: ['water', 'ground', 'rock']
  },
  water: {
    strongAgainst: ['fire', 'ground', 'rock'],
    weakAgainst: ['electric', 'grass']
  },
  electric: {
    strongAgainst: ['water', 'flying'],
    weakAgainst: ['ground']
  },
  grass: {
    strongAgainst: ['water', 'ground', 'rock'],
    weakAgainst: ['fire', 'ice', 'poison', 'flying', 'bug']
  },
  ice: {
    strongAgainst: ['grass', 'ground', 'flying', 'dragon'],
    weakAgainst: ['fire', 'fighting', 'rock', 'steel']
  },
  fighting: {
    strongAgainst: ['normal', 'ice', 'rock', 'dark', 'steel'],
    weakAgainst: ['flying', 'psychic', 'fairy']
  },
  poison: {
    strongAgainst: ['grass', 'fairy'],
    weakAgainst: ['ground', 'psychic']
  },
  ground: {
    strongAgainst: ['fire', 'electric', 'poison', 'rock', 'steel'],
    weakAgainst: ['water', 'grass', 'ice']
  },
  flying: {
    strongAgainst: ['grass', 'fighting', 'bug'],
    weakAgainst: ['electric', 'ice', 'rock']
  },
  psychic: {
    strongAgainst: ['fighting', 'poison'],
    weakAgainst: ['bug', 'ghost', 'dark']
  },
  bug: {
    strongAgainst: ['grass', 'psychic', 'dark'],
    weakAgainst: ['fire', 'flying', 'rock']
  },
  rock: {
    strongAgainst: ['fire', 'ice', 'flying', 'bug'],
    weakAgainst: ['water', 'grass', 'fighting', 'ground', 'steel']
  },
  ghost: {
    strongAgainst: ['psychic', 'ghost'],
    weakAgainst: ['ghost', 'dark']
  },
  dragon: {
    strongAgainst: ['dragon'],
    weakAgainst: ['ice', 'dragon', 'fairy']
  },
  dark: {
    strongAgainst: ['psychic', 'ghost'],
    weakAgainst: ['fighting', 'bug', 'fairy']
  },
  steel: {
    strongAgainst: ['ice', 'rock', 'fairy'],
    weakAgainst: ['fire', 'fighting', 'ground']
  },
  fairy: {
    strongAgainst: ['fighting', 'dragon', 'dark'],
    weakAgainst: ['poison', 'steel']
  }
}

const strongAgainst = computed(() => {
  const strong = new Set()
  props.types.forEach(type => {
    typeRelations[type.toLowerCase()]?.strongAgainst.forEach(t => strong.add(t))
  })
  return Array.from(strong)
})

const weakAgainst = computed(() => {
  const weak = new Set()
  props.types.forEach(type => {
    typeRelations[type.toLowerCase()]?.weakAgainst.forEach(t => weak.add(t))
  })
  return Array.from(weak)
})
</script>

<style scoped>
.type-relations {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-lg);
  margin: var(--spacing-lg) 0;
  padding: var(--spacing-md);
  background-color: var(--card-background);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
}

.relation-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

h3 {
  color: var(--text-secondary);
  font-size: 1rem;
  margin-bottom: var(--spacing-sm);
}

.type-badges {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

@media (max-width: 768px) {
  .type-relations {
    grid-template-columns: 1fr;
  }
}
</style> 