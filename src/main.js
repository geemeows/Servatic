import Vue from 'vue'
// Ant Design UI Library Import
import Antd from 'ant-design-vue'
import App from './App.vue'
// Ant Design CSS Import
import 'ant-design-vue/dist/antd.css'

import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(Antd)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
