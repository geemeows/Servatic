import Vue from 'vue'
import Vuex from 'vuex'
import agentModule from './agent/index'
import moderatorModule from './moderator/index'
import chatModule from './chat/index'
import ticketModule from './ticket/index'
import adminPanel from './admin/index'
import axios from 'axios'


import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    accessToken: null,
    expireDate: null,
    accountType: null,
    userEmail: null
  },
  mutations: {
    setToken (state, payload) {
      state.accessToken = payload.token
      state.expireDate = payload.expireDate
      state.accountType = payload.accountType
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    destroyToken (state) {
      state.accessToken = null
      state.expireDate = null
      state.accountType = null
    },
    setUserEmail (state, payload) {
      state.userEmail = payload
    }
  },
  actions: {
    login ({ commit, dispatch }, payload) {
      // Show Loading Indicator
      commit('setLoading', true)

      // AJAX Call via Axios
      axios.post('/login?email=' + payload.email + '&password=' + payload.password)
        .then(res => {
          // Hide Loading Indicator
          commit('setLoading', false)

          // Formatting the Expiration Date
          const now = new Date()
          const expireDate = new Date(now.getTime() + res.data.expires_in * 1000)

          // Saving Token and Expiration Date to the browser local storage
          localStorage.setItem('token', res.data.access_token)
          localStorage.setItem('expireDate', expireDate)
          localStorage.setItem('accountType', res.data.type)
          localStorage.setItem('userEmail', payload.email)

          // Commit The Token Mutation
          commit('setToken', {
            token: res.data.access_token,
            expireDate: expireDate,
            accountType: res.data.type
          })

          // Commit the User Email
          commit('setUserEmail', payload.email)

          // Update The Route
          if (res.data.type === 'admin') router.replace('/add-company')
          else if (res.data.type === 'moderator') router.replace('/dashboard')
          else router.replace('/agent-chat')

          // Start the Expiration Timer
          dispatch('autoLogout', res.data.expires_in)
        })
        .catch(err => {
          // Logging The Error to The Console
          console.log(err)

          // Hide Loading Indicator
          commit('setLoading', false)
        })
    },
    logout ({ commit }) {
      // Destroy The Session
      commit('destroyToken')
      // Delete LocalStorage Items
      localStorage.removeItem('token')
      localStorage.removeItem('accountType')
      localStorage.removeItem('expireDate')
      localStorage.removeItem('userEmail')
      // Update The Route
      router.replace('/login')
    },
    stillLoggedIn ({ commit }) {
      const token = localStorage.getItem('token')
      const expireDate = localStorage.getItem('expireDate')
      const accountType = localStorage.getItem('accountType')
      const userEmail = localStorage.getItem('userEmail')
      const now = new Date()

      if (!token || now >= expireDate) return
      else {
        commit('setToken', { token, expireDate, accountType })
        commit('setUserEmail', userEmail)
      }
    },
    autoLogout ({ dispatch }, expireTime) {
      setTimeout(() => {
        // Call The Logout Action
        dispatch('logout')
      }, expireTime * 1000)
    }
  },
  getters: {
    getLoadingIndicator (state) {
      return state.loading
    },
    getAccountType (state) {
      return state.accountType
    },
    getAccessToken (state) {
      return state.accessToken
    }
  },
  modules: {
    agentModule,
    moderatorModule,
    chatModule,
    ticketModule,
    adminPanel
  }
})
