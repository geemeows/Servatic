import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './components/Moderator/Dashboard.vue'
import AddAgents from './components/Moderator/AddAgents.vue'
import AgentChat from './components/Agent/AgentChat.vue'

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
      path: '/add-agents',
      name: 'addAgents',
      component: AddAgents
    },
    {
      path: '/agent-chat',
      name: 'agentChat',
      component: AgentChat
    },
  ]
})
