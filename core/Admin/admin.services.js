import { serverHttp } from '../httpClient'

const token = localStorage.getItem('token')

export const addCompany = (payload) => {
  return serverHttp
    .post('/companies', {
      name: payload.companyName,
      token
    })
    .then(res => {
      const serverRes = res.data
      addModerator(payload, serverRes.id)
    })
}

const addModerator = (payload, companyID) => {
  serverHttp.post('/moderators', {
    name: payload.moderatorName,
    email: payload.moderatorEmail,
    password: payload.moderatorPassword,
    company_id: companyID,
    token
  })
    .catch(err => console.log(err))
}
