<template>
        <a-layout-sider :trigger="null">
      <div class="logo">
          <img
            src="../../assets/Servatic.Logo.png"
            style="width: 150px; margin: 0 5px"
          >
      </div>
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="[menuActive]">
        <a-menu-item key="1">
          <router-link to="/dashboard">
            <a-icon type="dashboard"/>
            <span>Dashboard</span>
          </router-link>
        </a-menu-item>

        <a-menu-item key="2">
          <router-link to="/closed-tickets">
            <a-icon type="file-done" />
            <span>Closed Tickets</span>
          </router-link>
        </a-menu-item>

        <a-menu-item key="3">
          <router-link to="/agents-list">
            <a-icon type="team"/>
            <span>Agents List</span>
          </router-link>
        </a-menu-item>

        <a-menu-item key="4">
          <router-link to="/agent-chat">
            <a-icon type="message"/>
            <span>Start Chatting</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
</template>
<script>
export default {
      created() {
    if (this.$route.fullPath == "/" || this.$route.fullPath == "/dashboard") this.menuActive = "1";

    if (this.$route.fullPath == "/closed-tickets") this.menuActive = "2";
    if (this.$route.fullPath == "/agents-list") this.menuActive = "3";
    if (this.$route.fullPath == "/agent-chat") this.menuActive = "4";
  },
    data() {
        return {
            menuActive: null
        }
    }
}
</script>
