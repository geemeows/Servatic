import Cookies from 'vue-cookies'
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
      if(serverRes.model.company_id) return getCompanyName(serverRes.model.company_id, serverRes.access_token, serverRes.model.type)
      else updateRoute(serverRes.model.type)

      // Start the Expiration Timer
      autoLogout(serverRes.expires_in)
    })
}

const getCompanyName = (payload, token, accountType) => {
  return serverHttp.get(`companies/${payload}/`, {
    params: {
      token
    }
  })
  .then(res => {
    Cookies.set('companyName', res.data[0].name)
    // Update Route
    updateRoute(accountType)
  })
  .catch(err => console.log(err))
}

const updateRoute = (accountType) => {
    // Update The Route
    if (accountType === 'admin') router.replace('/view-companies')
    else if (accountType === 'moderator') router.replace('/dashboard')
    else router.replace('/agent-chat')
}
