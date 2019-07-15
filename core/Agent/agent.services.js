import { serverHttp } from '../httpClient'
import Cookies from 'vue-cookies'

export const updateTicket = (payload) => {
  const token = Cookies.get('token')
  const accuracy = Cookies.get('accuracy')
  return serverHttp
    .post(`/tickets/update/${payload.ticketID}`, {
      action: payload.action,
      complaint: payload.complaint,
      token,
      accuracy
    })
    .then(res => {
      console.log(res)
      Cookies.remove('accuracy')
    })
}

export const getQueue = () => {
  const companyID = Cookies.get('companyID')
  return serverHttp.get(`/companies/${companyID}`)
}
