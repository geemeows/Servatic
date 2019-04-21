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
import addCompany from './views/AdminPanel/AddCompany.vue'

import store from '../src/store/store'

Vue.use(Router)
// const token = localStorage.getItem('token')
// const expireDate = localStorage.getItem('expireDate')
// const now = new Date()

const router = new Router({
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
        sidebar: Sidebar,
        navbar: Navbar
      },
      beforeEnter (to, from, next) {
        store.dispatch('stillLoggedIn')
        if (store.state.accessToken && store.state.accountType === 'moderator') next()
        else next('/404')
      }
    },
    {
      path: '/agents-list',
      name: 'agentsList',
      meta: { title: 'Agents List' },
      components: {
        default: AgentsList,
        sidebar: Sidebar,
        navbar: Navbar
      },
      beforeEnter (to, from, next) {
        store.dispatch('stillLoggedIn')
        if (store.state.accessToken && store.state.accountType === 'moderator') next()
        else next('/404')
      }
    },
    {
      path: '/agent-chat',
      name: 'agentChat',
      meta: { title: 'Agent Chat' },
      components: {
        default: AgentChat,
        sidebar: Sidebar,
        navbar: Navbar
      },
      beforeEnter (to, from, next) {
        store.dispatch('stillLoggedIn')
        if (store.state.accessToken && (store.state.accountType === 'moderator' || store.state.accountType === 'agent')) next()
        else next('/404')
      }
    },
    {
      path: '/closed-tickets',
      name: 'closedTickets',
      components: {
        default: ClosedTickets,
        sidebar: Sidebar,
        navbar: Navbar
      },
      beforeEnter (to, from, next) {
        store.dispatch('stillLoggedIn')
        if (store.state.accessToken && (store.state.accountType === 'moderator' || store.state.accountType === 'agent')) next()
        else next('/404')
      }
    },
    {
      path: '/add-company',
      name: 'addCompany',
      components: {
        default: addCompany,
        sidebar: Sidebar,
        navbar: Navbar
      },
      beforeEnter (to, from, next) {
        store.dispatch('stillLoggedIn')
        if (store.state.accessToken && store.state.accountType === 'admin') next()
        else next('/404')
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
      // beforeEnter (to, from, next) {
      //   store.dispatch('stillLoggedIn')
      //   if (store.state.accessToken) return
      //   else next(from.path)
      // }
    }
  ]
})

export default router
