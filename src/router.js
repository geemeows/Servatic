import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Moderator/Dashboard.vue'
import AgentsList from './views/Moderator/AgentsList.vue'
import AgentChat from './views/Agent/AgentChat.vue'
import ClosedTickets from './views/Mutual/ClosedTicketsView.vue'
import ErrorPage from './views/ErrorPage.vue'
import Sidebar from './components/Mutual/Sidebar.vue'
import Navbar from './components/Mutual/Navbar.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      redirect: '/login'
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: { title: 'Dashboard' },
      components: {
        default: Dashboard,
        'sidebar': Sidebar,
        'navbar': Navbar
      }
    },
    {
      path: '/agents-list',
      name: 'agentsList',
      meta: { title: 'Agents List' },
      components: {
        default: AgentsList,
        'sidebar': Sidebar,
        'navbar': Navbar
      }
    },
    {
      path: '/agent-chat',
      name: 'agentChat',
      meta: { title: 'Agent Chat' },
      components: {
        default: AgentChat,
        'sidebar': Sidebar,
        'navbar': Navbar
      }
    },
    {
      path: '/closed-tickets',
      name: 'closedTickets',
      components: {
        default: ClosedTickets,
        'sidebar': Sidebar,
        'navbar': Navbar
      } 
    },
    {
      path: '*',
      name: 'error',
      meta: { title: '404 - Page Not Found' },
      component: ErrorPage
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
