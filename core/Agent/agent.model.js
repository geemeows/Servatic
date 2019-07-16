
export const formatTickets = (tickets) => {
  return tickets.map(ticket => {
    return {
    //   key: 'ticket.id',
      complaint: ticket.complaint,
      action: ticket.action,
      client: ticket.client
    }
  })
}
