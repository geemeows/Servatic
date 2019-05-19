<template>
          <a-layout-header style="background: #fff; padding: 0; box-shadow: 0 2px 5px rgba(0,21,41,.13); font-size: 18px">
        <span class="corps-name">{{ getAccType == 'admin'? 'Servatic Admin Panel' : 'Company Name'}}</span>
        <a-dropdown>
          <a class="ant-dropdown-link">
            <a-avatar icon="user" size="small"/>&nbsp;{{ getAccType == 'admin'? 'Admin' : 'Moderator'}}
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
    }
  },
  methods: {
    signOut () {
      logout()
    }
  }
}
</script>
