import Vue from 'vue'
import Pokemon from './components/Pokemon.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(Pokemon),
}).$mount('#pokemon')
