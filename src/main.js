import Vue from 'vue'
// Ant Design UI Library Import
import Antd from 'ant-design-vue'
import App from './App.vue'
// Ant Design CSS Import
import 'ant-design-vue/dist/antd.css'
// Vue Cookies
import cookies from 'vue-cookies'

import router from './router'

import reactiveStorage from 'vue-reactive-storage'
// Set initial values
Vue.use(reactiveStorage, {
  'token': String,
  'expireDate': Date,
  'accountType': String,
  'userEmail': String,
  'companyName': String,
  'companyID': Number
})
Vue.config.productionTip = false

Vue.use(Antd)
Vue.use(cookies)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
