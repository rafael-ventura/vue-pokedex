import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import router from './router'

// Import PrimeVue styles
import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

// Import global styles
import './assets/main.css'

const app = createApp(App)

app.use(PrimeVue, {
    ripple: true,
    inputStyle: "filled"
})
app.use(router)

app.mount('#app')
