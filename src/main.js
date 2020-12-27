import Vue from 'vue';
import app from '../src/App.vue';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-design-icons/iconfont/material-icons.css';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(app),
}).$mount('#app');
