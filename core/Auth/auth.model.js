import Cookies from 'vue-cookies'
// Calculate Expire Date
export const expireDate = (payload) => {
  const now = new Date()
  const expireDate = new Date(now.getTime() + payload * 1000)
  return expireDate
}

// Save login info in cookies
export const saveUserInfo = (payload, email, expiresIn) => {
  Cookies.set('token', payload.access_token)
  Cookies.set('expireDate', expiresIn)
  Cookies.set('accountType', payload.model.type)
  Cookies.set('userEmail', email)
  if(payload.model.type !== 'admin') Cookies.set('companyID', payload.model.company_id)
}

// Destroy login info from cookies
export const removeUserInfo = () => {
  Cookies.remove('token')
  Cookies.remove('expireDate')
  Cookies.remove('accountType')
  Cookies.remove('userEmail')
  if(Cookies.get('companyID')) Cookies.remove('companyID')
  if(Cookies.get('companyName')) Cookies.remove('companyName')
}
