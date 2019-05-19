<template>
  <a-layout-content
    :style="{ margin: '15px 16px 0 16px', padding: '15px 24px 0 24px',
        'height': '88.1vh'}"
  >
    <new-company :isLoading="isLoading" @companyInfo="addNewCompany"></new-company>
  </a-layout-content>
</template>

<script>
import { addCompany } from '../../../core/Admin/admin.services'
import newCompany from '../../components/Admin/NewCompany'
export default {
  data () {
    return {
      isLoading: false
    }
  },
  components: {
    newCompany
  },
  methods: {
    addNewCompany (payload) {
      this.isLoading = true
      addCompany({
        companyName: payload.companyName,
        moderatorName: payload.moderatorName,
        moderatorEmail: payload.moderatorEmail,
        moderatorPassword: payload.moderatorPassword
      })
        .then(() => {
          this.isLoading = false
          this.$notification.open({
            message: 'Successfully Added',
            description: 'Company and moderator are successfully added.',
            icon: <a-icon type="check" style="color:#00c610" />
          })
        })
        .catch(err => {
          this.isLoading = false
          console.log(err)
          this.$notification.open({
            message: 'Somthing Went Wrong',
            description: 'Company and moderator are not added.',
            icon: <a-icon type="close" style="color:#c10000" />
          })
        })
    }
  }
}
</script>

<style>
</style>
