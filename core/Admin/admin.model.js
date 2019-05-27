// Format Servatic clients' data
export const formatCompanies = (payload) => {
  return payload.map(company => {
    return {
      companyName: company.name,
      addedAt: company.created_at,
      key: company.id
    }
  })
}
