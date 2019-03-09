import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Moderator/Dashboard.vue'
import AgentsList from './views/Moderator/AgentsList.vue'
import AgentChat from './views/Agent/AgentChat.vue'
import ErrorPage from './views/ErrorPage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/agents-list',
      name: 'addAgents',
      component: AgentsList
    },
    {
      path: '/agent-chat',
      name: 'agentChat',
      component: AgentChat
    },
    {
      path: '*',
      name: 'error',
      component: ErrorPage
    }
    
  ]
})
