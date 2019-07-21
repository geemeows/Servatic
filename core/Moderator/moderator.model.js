
export const formatAgent = (payload) => {
  return {
    key: payload.id,
    name: payload.name,
    email: payload.email,
    busy: payload.busy ? 'Busy' : 'Available',
    createdAt: payload.created_at
  }
}

export const formatRes = (payload) => {
  const companyStats = {
    companyName: payload[0][0],
    avgWaitingTime: payload[0][1].toPrecision(4),
    avgResTime: payload[0][2].toPrecision(4),
    avgAccuracy: payload[0][3]
  }

  const agentStats = payload[1].map(item => {
    return {
      name: item[0],
      avgResTime: item[1] === null ? 'N/A' : item[1].toPrecision(4),
      clientServed: item[2]
    }
  })

  let dashboardStats = {}
  dashboardStats.companyStats = companyStats
  dashboardStats.agentStats = agentStats

  return dashboardStats
}
