import { serverHttp } from '../httpClient'
import Cookies from 'vue-cookies'

export const addAgent = (payload) => {
  const token = Cookies.get('token')
  const companyID = Cookies.get('companyID')
  return serverHttp.post('/agents', {
    name: payload.name,
    email: payload.email,
    password: payload.password,
    company_id: companyID,
    token
  })
}

export const getCompanyAgents = () => {
  const token = Cookies.get('token')
  const companyID = Cookies.get('companyID')
  return serverHttp.get(`/agents/company/${companyID}`, {
    params: {
      token
    }
  })
}

export const deleteAgent = (id) => {
  const token = Cookies.get('token')
  return serverHttp.delete(`/agents/${id}`, {
    params: {
      token
    }
  })
}
