<template>
  <div class="home-page">
    <div class="content">
      <img src="../../public/logo.svg" alt="Pokemon Logo" class="logo" />
      <h1>Bem-vindo à Pokédex</h1>
      <p>Explore o mundo dos Pokémon da primeira geração</p>
      <Button 
        label="Entrar na Pokédex" 
        icon="pi pi-arrow-right" 
        class="p-button-rounded p-button-lg custom-button" 
        @click="navigateToPokedex"
        :loading="loading"
      />
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
  // Simular um pequeno delay para mostrar o loading
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
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--background-dark) 0%, #17181c 100%);
  color: var(--text-light);
  padding: 1rem;
}

.content {
  text-align: center;
  max-width: 600px;
  padding: 2rem;
}

.logo {
  width: 300px;
  max-width: 100%;
  margin-bottom: 2rem;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.2));
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #a0a0a0;
}

:deep(.custom-button) {
  background: linear-gradient(45deg, var(--primary-color), #ff6b6b);
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

:deep(.custom-button:hover) {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 61, 61, 0.3);
}

:deep(.custom-button .p-button-icon) {
  margin-left: 1rem;
  margin-right: 1rem;
}
</style>