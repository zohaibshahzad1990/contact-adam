import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import router from './router'
import VCalendar from 'v-calendar';
Vue.config.productionTip = false
Vue.use(VCalendar, {

});
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
