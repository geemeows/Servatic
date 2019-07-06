
export const formatAgent = (payload) => {
  return {
    key: payload.id,
    name: payload.name,
    email: payload.email,
    busy: payload.busy ? 'Busy' : 'Available',
    createdAt: payload.created_at
  }
}
