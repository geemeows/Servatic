<template>
  <a-layout-content :style="{'height': '100vh' }">
    <a-layout-content
      :style="{padding: '70px', background: '#fff', boxShadow: '0 2px 5px rgba(0,21,41,.13)', 'height': '100vh'}"
    >
      <div class="error-page">
        <a-row>
          <a-col :span="12">
              <div>
                  <h1>Oops!</h1>
                  <span class="error-message">Sorry, the page you visited does not exist</span>
                  <span class="error-code">Error code: 404</span>
              </div>
          </a-col>
          <a-col :span="12">
              <div class="error-img">
                  <img src="../assets/404.gif" alt="">
              </div>
          </a-col>
        </a-row>
      </div>
    </a-layout-content>
  </a-layout-content>
</template>
<script>
export default {

}
</script>
<style scoped>
    .error-page {
        margin-top: 50px;
    }
    .error-page h1 {
        font-size: 130px;
        font-weight: bold;
        margin-bottom: 5px;
        color: #001529;
    }
    .error-page .error-img {
        text-align: center
    }
    .error-page span.error-message {
        font-size: 30px;
        display: block
    }
    .error-page span.error-code {
        display: block;
        margin-top: 10px;
        font-weight: bold;
        color: #001529;
    }
</style>
