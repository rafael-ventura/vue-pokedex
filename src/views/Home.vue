<template>
  <div class="home-page">
    <div class="content-grid">
      <div class="images-column">
        <img :src="require('@/assets/logo.svg')" alt="Pokemon Logo" class="pokemon-logo" />
        <img :src="require('@/assets/pikachu.svg')" alt="Pikachu" class="pikachu-image" />
      </div>
      
      <div class="text-column">
        <div class="text-content">
          <h1 class="text-gradient">Bem-vindo à Pokédex</h1>
          <p>Explore o mundo dos Pokémon da primeira geração</p>
          <Button 
            label="Entrar na Pokédex" 
            icon="pi pi-arrow-right" 
            class="p-button-rounded p-button-lg btn-primary" 
            @click="navigateToPokedex"
            :loading="loading"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'

const router = useRouter()
const loading = ref(false)

const navigateToPokedex = async () => {
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 800))
  router.push('/pokedex')
}
</script>

<script>
export default {
  name: 'HomePage'
}
</script>

<style scoped>
.home-page {
  height: 100vh;
  min-height: 100vh;
  display: flex;
  background-color: var(--background-color);
  padding: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.content-grid {
  width: 100%;
  height: 100%;
  max-width: 1600px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(350px, 500px) 150px minmax(350px, 500px);
  align-items: center;
  justify-content: center;
  gap: var(--spacing-lg);
  position: relative;
  overflow: hidden;
}

.images-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  margin-top: -15vh;
}

.pokemon-logo {
  width: 100%;
  max-width: 350px;
  height: auto;
  filter: drop-shadow(0 0 15px rgba(0, 0, 0, 0.1));
}

.pikachu-image {
  width: 100%;
  max-width: 380px;
  height: auto;
  filter: drop-shadow(0 0 25px rgba(0, 0, 0, 0.15));
  animation: float 6s ease-in-out infinite;
  margin-top: -2rem;
}

.text-column {
  grid-column: 3;
  align-self: center;
  height: 100%;
  display: flex;
  align-items: center;
}

.text-content {
  text-align: left;
  animation: fadeInOut 8s ease-in-out infinite;
}

h1 {
  font-size: 3.5rem;
  margin-bottom: var(--spacing-lg);
}

p {
  font-size: 1.5rem;
  margin-bottom: var(--spacing-xl);
  color: var(--text-secondary);
  line-height: 1.6;
}

:deep(.btn-primary) {
  padding: var(--spacing-lg) var(--spacing-xl);
  font-size: 1.2rem;
}

@media (max-width: 1400px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 0;
    height: 100%;
    padding: var(--spacing-md);
  }

  .images-column {
    margin-top: var(--spacing-lg);
    gap: 0;
  }

  .text-column {
    height: auto;
    margin-top: -4rem;
  }

  .images-column, .text-column {
    grid-column: 1;
  }

  .text-content {
    text-align: center;
  }

  .pokemon-logo {
    max-width: 300px;
  }

  .pikachu-image {
    max-width: 320px;
    margin-top: var(--spacing-sm);
  }
}

@media (max-width: 768px) {
  .home-page {
    position: fixed;
    height: 100vh;
    overflow: hidden;
  }

  .content-grid {
    padding: var(--spacing-md);
  }

  .images-column {
    margin-top: var(--spacing-md);
  }

  .pokemon-logo {
    max-width: 250px;
  }

  .pikachu-image {
    max-width: 280px;
  }

  .text-column {
    margin-top: 0;
  }

  h1 {
    font-size: 2.2rem;
  }

  p {
    font-size: 1.1rem;
    margin-bottom: var(--spacing-lg);
  }

  :deep(.btn-primary) {
    padding: var(--spacing-md) var(--spacing-lg);
    font-size: 1rem;
  }
}
</style> 