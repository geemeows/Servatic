import { serverHttp } from '../httpClient'
import { formatCompanies } from './admin.model'
import Cookies from 'vue-cookies'

const token = Cookies.get('token')

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

export const removeCompany = (id) => {
  return serverHttp
    .delete('/companies/', {
      token,
      id
    })
    .then(res => console.log(res))
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

export const viewCompanies = () => {
  return serverHttp.get('/companies', {
    params: {
      token
    }
  })
    .then(res => {
      const serverRes = res.data
      return formatCompanies(serverRes)
    })
}
