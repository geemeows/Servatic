import axios from 'axios';
import Store from '../store';
export default {
  addCompany ({ commit }, payload) {
    // Show Loading Indicator
    commit('setLoading', true)
    axios
      .post(
        '/companies?name=' +
          payload.companyName +
          '&token=' +
          Store.getters.getAccessToken
      )
      .then(res => {
        console.log('company success', res)
        // Adding Company Moderator
        axios
          .post(
            '/moderators?name=' +
              payload.moderatorName +
              '&email=' +
              payload.moderatorEmail +
              '&password=' +
              payload.moderatorPassword +
              '&company_id=' +
              res.data.id +
              '&token=' +
              Store.getters.getAccessToken
          )
          .then(res => {
            // Hide Loading Indicator
            commit('setLoading', false)
            // Logging the response to the console
            console.log('moderator success', res)
            // Success Notification
            commit('changeSuccessNotification', true)
          })
          .catch(err => {
            // Hide Loading Indicator
            commit('setLoading', false)
            // Logging the response to the console
            console.log('moderator error', err)
            // Error Notification
            commit('changeSuccessNotification', true)
          })
      })
      .catch(err => {
        // Hide Loading Indicator
        commit('setLoading', false)
        // Logging the response to the console
        console.log('company error', err)
        // Error Notification
        commit('changeErrorNotification', true)
      })
    commit('changeSuccessNotification', false)
    commit('changeErrorNotification', false)
  }
}
