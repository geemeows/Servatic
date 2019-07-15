<template>
          <a-layout-header style="background: #fff; padding: 0; box-shadow: 0 2px 5px rgba(0,21,41,.13); font-size: 18px">
        <span class="corps-name">{{ getAccType === 'admin'? 'Servatic Admin Panel' : getCompanyName}}</span>
        <a-dropdown>
          <a class="ant-dropdown-link">
            <a-avatar icon="user" size="small"/>&nbsp;{{ getEmail }}
          </a>
          <a-menu slot="overlay" style="margin-right: 15px;">
            <a-menu-item>
              <a href="#">
                <a-icon type="setting"/>&nbsp;Settings
              </a>
            </a-menu-item>
            <a-menu-item>
              <a href="#">
                <a-icon type="dollar"/>&nbsp;Billing Info.
              </a>
            </a-menu-item>
            <a-divider style="padding: 0; margin: 0"/>
            <a-menu-item>
              <a href="#" @click="signOut">
                <a-icon type="logout"/>&nbsp;Logout
              </a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-layout-header>
</template>
<script>
import { logout } from '../../../core/Auth/auth.services'
import Cookies from 'vue-cookies'
export default {
  data () {
    return {

    }
  },
  computed: {
    getAccType () {
      return Cookies.get('accountType')
    },
    getEmail () {
      return Cookies.get('userEmail')
    },
    getCompanyName () {
      return Cookies.get('companyName')
    }
  },
  methods: {
    signOut () {
      logout()
        .then(() => {
          this.$notification.open({
            message: 'Successfully Logged Out',
            description: 'You have logged out successfully. See you Soon',
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
