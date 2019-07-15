import { serverHttp } from '../httpClient'
import { formatCompanies } from './admin.model'
import Cookies from 'vue-cookies'

export const addCompany = (payload) => {
  const token = Cookies.get('token')
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
  const token = Cookies.get('token')
  return serverHttp
    .delete(`/companies/${id}`, {
      params: {
        token
      }
    })
}

const addModerator = (payload, companyID) => {
  const token = Cookies.get('token')
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
  const token = Cookies.get('token')
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
