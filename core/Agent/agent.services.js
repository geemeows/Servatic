import { serverHttp } from '../httpClient'
import Cookies from 'vue-cookies'
import qs from 'querystring'

const token = Cookies.get('token')

export const updateTicket = (payload) => {
  const data = {
    action: payload.action,
    complaint: payload.complaint,
    token: token
  }
  console.log(data)
  const options = {
    url: `/tickets/update/${payload.ticketID}`,
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    data: qs.stringify(data)
  }

  return serverHttp(options)
  // return serverHttp
  //   .post(
  //   .then(res => {
  //     console.log(res)
  //   })
}
