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
import { Toast } from 'mint-ui'
Vue.prototype.$message=Toast;
import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);

//ElmentUI
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI)

//自定义总体样式
import '../static/css/common.css'

//axios
import axios from 'axios';
axios.defaults.timeout=10000;
Vue.prototype.$axios=axios;

//sendServer
import sendServer from '@/util/communication.js';
Vue.prototype.$sendServer=sendServer;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
