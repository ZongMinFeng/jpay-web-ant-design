import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入rem自适应
import 'amfe-flexible'

Vue.config.productionTip = false

//MintUI
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

//ElmentUI
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI)

//总体样式
import '../static/css/common.css'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
