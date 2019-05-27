import { serverHttp } from '../httpClient'
import router from '../../src/router'
import { expireDate, saveUserInfo, removeUserInfo } from './auth.model'

export const logout = () => {
  // Delete Cookies Items
  removeUserInfo()
  // Update The Route
  router.replace('/login')
}

const autoLogout = (expiresIn) => {
  setTimeout(() => {
    // Call The Logout function
    logout()
  }, expiresIn * 1000)
}

export const login = (payload) => {
  // AJAX Call via Axios
  return serverHttp.post('/login', {
    email: payload.email,
    password: payload.password
  })
    .then(res => {
      const serverRes = res.data
      // Formatting the Expiration Date
      const expiresIn = expireDate(serverRes.expires_in)

      // Saving Token and Expiration Date to the browser local storage
      saveUserInfo(serverRes, payload.email, expiresIn)

      // Update The Route
      if (serverRes.type === 'admin') router.replace('/view-companies')
      else if (serverRes.type === 'moderator') router.replace('/dashboard')
      else router.replace('/agent-chat')

      // Start the Expiration Timer
      autoLogout(serverRes.expires_in)
    })
}
