<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <router-view name="sidebar"></router-view>
    <a-layout>
      <router-view name="navbar"></router-view>
      <router-view/>
      <!-- <a-layout-footer style="textAlign: center">&copy; 2019 Servatic | All Rights Reserved</a-layout-footer> -->
    </a-layout>
  </a-layout>
</template>

<script>
// import Sidebar from './components/Mutual/Sidebar'
// import Navbar from './components/Mutual/Navbar'
export default {
  // components: {
  //   Sidebar,
  //   Navbar
  // }
}
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
  margin: 16px;
}
.ant-dropdown-link.ant-dropdown-trigger {
  float: right;
  padding-right: 30px;
  font-size: 14px;
  color: #000;
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
.ant-layout-header {
  border-bottom: 1px solid #ebebeb !important;
}
.corps-name {
  margin-left: 30px;
}
</style>
