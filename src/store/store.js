import Vue from 'vue'
import Vuex from 'vuex'
import agentModule from './agent/index'
import moderatorModule from './moderator/index'
import chatModule from './chat/index'
import ticketModule from './ticket/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    agentModule,
    moderatorModule,
    chatModule,
    ticketModule
  }
})
