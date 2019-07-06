
export const formatAgent = (payload) => {
  return {
    key: payload.id,
    name: payload.name,
    email: payload.email,
    createdAt: payload.created_at
  }
}
