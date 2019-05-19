// Calculate Expire Date
export const expireDate = (payload) => {
  const now = new Date()
  const expireDate = new Date(now.getTime() + payload * 1000)
  return expireDate
}

// Save login info to browser's localStorage
export const saveLoginInfo = (payload, email, expiresIn) => {
  localStorage.setItem('token', payload.access_token)
  localStorage.setItem('expireDate', expiresIn)
  localStorage.setItem('accountType', payload.type)
  localStorage.setItem('userEmail', email)
}
