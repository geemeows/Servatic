import Cookies from 'vue-cookies'
// Calculate Expire Date
export const expireDate = (payload) => {
  const now = new Date()
  const expireDate = new Date(now.getTime() + payload * 1000)
  return expireDate
}

// Save login info to browser's localStorage
export const saveUserInfo = (payload, email, expiresIn) => {
  // localStorage.setItem('token', payload.access_token)
  // localStorage.setItem('expireDate', expiresIn)
  // localStorage.setItem('accountType', payload.type)
  // localStorage.setItem('userEmail', email)
  Cookies.set('token', payload.access_token)
  Cookies.set('expireDate', expiresIn)
  Cookies.set('accountType', payload.type)
  Cookies.set('userEmail', email)
}

// Save login info to browser's localStorage
export const removeUserInfo = () => {
  // localStorage.setItem('token', payload.access_token)
  // localStorage.setItem('expireDate', expiresIn)
  // localStorage.setItem('accountType', payload.type)
  // localStorage.setItem('userEmail', email)
  Cookies.remove('token')
  Cookies.remove('expireDate')
  Cookies.remove('accountType')
  Cookies.remove('userEmail')
}
