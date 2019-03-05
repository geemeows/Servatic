<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed">
      <div class="logo">
        <img
          :src="imgSrc"
          :style="[collapsed? {'width': '40px', 'margin': '-2px 5px'} : {'width': '100px', 'margin': '0 30px'}]"
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
          <router-link to="/add-agents">
            <a-icon type="user-add"/>
            <span>Add Agents</span>
          </router-link>
        </a-menu-item>

        <a-menu-item key="3">
          <router-link to="/agent-chat">
            <a-icon type="message"/>
            <span>Start Chatting</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header
        style="background: #fff; padding: 0; box-shadow: 0 2px 5px rgba(0,21,41,.13); font-size: 18px"
      >
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="collapseMenu"
        />Vodafone
        <a-dropdown>
          <a class="ant-dropdown-link">
            <a-avatar icon="user" size="small"/> Gazouly
          </a>
          <a-menu slot="overlay" style="margin-right: 15px;">
            <a-menu-item>
              <a href="#">
                <a-icon type="setting"/> Settings
              </a>
            </a-menu-item>
            <a-menu-item>
              <a href="#">
                <a-icon type="dollar"/> Billing Info.
              </a>
            </a-menu-item>
            <a-divider style="padding: 0; margin: 0"/>
            <a-menu-item>
              <a href="#">
                <a-icon type="logout"/> Logout
              </a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-layout-header>
        <router-view />
      <!-- <a-layout-footer style="textAlign: center">&copy; 2019 Servatic | All Rights Reserved</a-layout-footer> -->
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
      imgSrc: require("../src/assets/Servatic.Logo.png"),
      menuActive: '1'
    };
  },
  methods: {
    collapseMenu() {
      this.collapsed = !this.collapsed;
      if (this.collapsed)
        this.imgSrc = require("../src/assets/Servatic.Logo_1.png");
      else 
        this.imgSrc = require("../src/assets/Servatic.Logo.png");

    }
  }
};
</script>

<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.ant-dropdown-link.ant-dropdown-trigger {
  float: right;
  padding-right: 30px;
  font-size: 14px;
  color: #000;
}
.logo img {
  width: 100px;
  margin: 0 30px;
}
.ant-card-body {
  padding-bottom: 10px !important;
}
.ant-card-head {
      color: white !important;
    background: #001529 !important;
}
.chat-window .ant-card-body {
  padding-top: 0 !important;
}
</style>
