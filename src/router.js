import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Moderator/Dashboard.vue'
import AgentsList from './views/Moderator/AgentsList.vue'
import AgentChat from './views/Agent/AgentChat.vue'
import ErrorPage from './views/ErrorPage.vue'
// import MainPage from './views/MainPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: { title: 'Dashboard' },
      component: Dashboard
    },
    {
      path: '/',
      name: 'dashboard',
      meta: { title: 'Dashboard' },
      component: Dashboard
    },
    {
      path: '/agents-list',
      name: 'agentsList',
      meta: { title: 'Agents List' },
      component: AgentsList
    },
    {
      path: '/agent-chat',
      name: 'agentChat',
      meta: { title: 'Agent Chat' },
      component: AgentChat
    },
    {
      path: '*',
      name: 'error',
      meta: { title: '404 - Page Not Found' },
      component: ErrorPage
    }
  ]
})
