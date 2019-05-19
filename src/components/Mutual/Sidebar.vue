<template>
  <a-layout-sider :trigger="null">
    <div class="logo">
      <img src="../../assets/Servatic.Logo.png" style="width: 150px; margin: 0 5px">
    </div>
    <a-menu theme="dark" mode="inline" :defaultSelectedKeys="[menuActive]">
      <a-menu-item key="1" v-if="getAccountType == 'moderator'">
        <router-link to="/dashboard">
          <a-icon type="dashboard"/>
          <span>Dashboard</span>
        </router-link>
      </a-menu-item>

      <a-menu-item key="2" v-if="getAccountType != 'admin'">
        <router-link to="/closed-tickets">
          <a-icon type="file-done"/>
          <span>Closed Tickets</span>
        </router-link>
      </a-menu-item>

      <a-menu-item key="3" v-if="getAccountType == 'moderator'">
        <router-link to="/agents-list">
          <a-icon type="team"/>
          <span>Agents List</span>
        </router-link>
      </a-menu-item>

      <a-menu-item key="4" v-if="getAccountType != 'admin'">
        <router-link to="/agent-chat">
          <a-icon type="message"/>
          <span>Start Chatting</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="5" v-if="getAccountType == 'admin'">
        <router-link to="/add-company">
          <a-icon type="bank"/>
          <span>Add Company</span>
        </router-link>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>
<script>
import Cookies from 'vue-cookies'
export default {
  created () {
    if (this.$route.fullPath === '/' || this.$route.fullPath === '/dashboard') this.menuActive = '1'
    if (this.$route.fullPath === '/closed-tickets') this.menuActive = '2'
    if (this.$route.fullPath === '/agents-list') this.menuActive = '3'
    if (this.$route.fullPath === '/agent-chat') this.menuActive = '4'
    if (this.$route.fullPath === '/add-company') this.menuActive = '5'
  },
  data () {
    return {
      menuActive: null
    }
  },
  computed: {
    getAccountType () {
      return Cookies.get('accountType')
    }
  }
}
</script>
