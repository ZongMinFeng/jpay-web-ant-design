import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../static/css/common.css'
import 'amfe-flexible' // 引入rem自适应

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
