import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 导入全局样式表
import './assets/css/global.css'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1'
// 配置请求的根路径,这是本机地址
Vue.prototype.$http = axios
// 当我们挂载完这个原型的属性之后,每一个vue组件都可以通过this访问$http,从而发起ajax请求

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount('#app')
