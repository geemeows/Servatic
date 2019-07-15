<template>
  <a-layout-content
    :style="{ margin: '15px 16px 0 16px', padding: '15px 24px 0 24px',
        'height': '88.1vh'}"
  >
    <companies-list :isLoading='isLoading' :companies='companies' @updateCompaniesList='updateCompanies'></companies-list>
  </a-layout-content>
</template>

<script>
import { viewCompanies, removeCompany } from '../../../core/Admin/admin.services'
import companiesList from '../../components/Admin/CompaniesList'
import Cookies from 'vue-cookies'
export default {
  beforeCreate () {
    console.log('beforeCreate (ViewCompanies) lifecycle: ', Cookies.get('token'))
  },
  created () {
    console.log('create lifecycle: ', Cookies.get('token'))
    this.isLoading = true
    viewCompanies()
      .then(res => {
        this.isLoading = false
        this.companies = res
      })
      .catch(err => {
        this.isLoading = false
        this.$notification.open({
          message: 'Somthing Went Wrong',
          description: `${err.message}`,
          icon: <a-icon type="close" style="color:#c10000" />
        })
      })
  },
  components: {
    companiesList
  },
  data () {
    return {
      companies: [],
      isLoading: false
    }
  },
  methods: {
    updateCompanies (payload) {
      this.isLoading = true
      removeCompany(payload.deletedItem)
        .then((res) => {
          this.isLoading = false
          this.companies = payload.updatedList
          this.$notification.open({
            message: 'Companies List Updated',
            description: 'You updated companies successfully!',
            icon: <a-icon type="check" style="color:#00c610" />
          })
        })
        .catch(err => {
          this.$notification.open({
            message: 'Somthing Went Wrong',
            description: `${err.message}`,
            icon: <a-icon type="close" style="color:#c10000" />
          })
        })
    }
  }
}
</script>

<style>
</style>
