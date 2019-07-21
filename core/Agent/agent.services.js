import { serverHttp } from '../httpClient'
import { formatTickets } from './agent.model'
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

export const getTickets = () => {
  const companyID = Cookies.get('companyID')
  const token = Cookies.get('token')
  return serverHttp.get(`/tickets/${companyID}/`, {
    params: {
      token
    }
  })
    .then(res => {
      const tickets = res.data
      formatTickets(tickets)
    })
}

export const fetchClient = () => {
  const userID = Cookies.get('userID')
  const companyID = Cookies.get('companyID')
  const token = Cookies.get('token')

  return serverHttp.post('/fetchClient', {
    company_id: companyID,
    agent_id: userID,
    startChatTime: new Date(),
    token
  })
}

export const getQueue = () => {
  const companyID = Cookies.get('companyID')
  const token = Cookies.get('token')

  return serverHttp.get(`/numberInQueue/${companyID}`, {
    params: {
      token
    }
  })
}
