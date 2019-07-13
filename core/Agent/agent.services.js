import { serverHttp } from '../httpClient'
import Cookies from 'vue-cookies'

const token = Cookies.get('token')

export const updateTicket = (payload) => {
  return serverHttp
    .post(`/tickets/update/${payload.ticketID}`, {
      action: payload.action,
      complaint: payload.complaint,
      token
    })
    .then(res => {
      console.log(res)
    })
}
