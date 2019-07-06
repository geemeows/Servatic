import { serverHttp } from '../httpClient'
import Cookies from 'vue-cookies'

const token = Cookies.get('token')
// eslint-disable-next-line camelcase
const companyID = Cookies.get('companyID')

export const addAgent = (payload) => {
  return serverHttp.post('/agents', {
    name: payload.name,
    email: payload.email,
    password: payload.password,
    company_id: companyID,
    token
  })
}

export const getCompanyAgents = () => {
  return serverHttp.get(`agents/company/${companyID}`, {
    params: {
      token
    }
  })
}
