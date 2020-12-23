import Vue from 'vue'
import Pokemon from './components/Pokemon.vue'
import 'materialize-css/dist/css/materialize.min.css'
import 'material-design-icons/iconfont/material-icons.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(Pokemon),
}).$mount('#pokemon')
