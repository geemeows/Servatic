export default {
  changeSuccessNotification (state, payload) {
    state.successNotification = payload
  },
  changeErrorNotification (state, payload) {
    state.errorNotification = payload
  }
}
