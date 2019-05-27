import Cookies from 'vue-cookies'
// Calculate Expire Date
export const expireDate = (payload) => {
  const now = new Date()
  const expireDate = new Date(now.getTime() + payload * 1000)
  return expireDate
}

// Save login info to cookies
export const saveUserInfo = (payload, email, expiresIn) => {
  Cookies.set('token', payload.access_token)
  Cookies.set('expireDate', expiresIn)
  Cookies.set('accountType', payload.type)
  Cookies.set('userEmail', email)
}

// Destroy login info to cookies
export const removeUserInfo = () => {
  Cookies.remove('token')
  Cookies.remove('expireDate')
  Cookies.remove('accountType')
  Cookies.remove('userEmail')
}
