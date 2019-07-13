import { serverHttp } from '../httpClient'
import router from '../../src/router'
import { expireDate, saveUserInfo, removeUserInfo } from './auth.model'

export const logout = () => {
  // Delete Cookies Items
  removeUserInfo()
  // Update The Route
  router.replace('/login')
  // Reload to clear cached Cookies
  location.reload()
}

const autoLogout = (expiresIn) => {
  setTimeout(() => {
    // Call The Logout function
    logout()
  }, expiresIn * 1000)
}

export const login = (payload) => {
  return serverHttp.post('/login', {
    email: payload.email,
    password: payload.password
  })
    .then(res => {
      const serverRes = res.data
      // Formatting the Expiration Date
      const expiresIn = expireDate(serverRes.expires_in)

      // Saving Token and Expiration Date in cookies
      saveUserInfo(serverRes, payload.email, expiresIn)

      // Getting Company Name and update route
      updateRoute(serverRes.model.type)

      // Start the Expiration Timer
      autoLogout(serverRes.expires_in)
    })
}

const updateRoute = (accountType) => {
  // Update The Route
  if (accountType === 'admin') router.replace('/view-companies')
  else if (accountType === 'moderator') router.replace('/dashboard')
  else router.replace('/agent-chat')
}
