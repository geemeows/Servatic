import Vue from 'vue'
// Ant Design UI Library Import
import Antd from 'ant-design-vue'
import App from './App.vue'
// Ant Design CSS Import
import 'ant-design-vue/dist/antd.css'
// Axios HTTP Client
import axios from 'axios'

import router from './router'
import store from './store/store'

Vue.config.productionTip = false

// API Base URL
axios.defaults.baseURL = 'https://cors-anywhere.herokuapp.com/https://servatica.herokuapp.com/api'

Vue.use(Antd)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
