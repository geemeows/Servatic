<template>
  <a-layout-content
    :style="{background: '#F0F2F5', margin: '90px auto', 
                               'height': '73.08vh'}"
  >
    <a-row>
      <a-col :span="24" style="text-align: center">
        <img src="../assets/Servatic.Logo_1.png" width="100">
        <span style="color: #35BDB2; font-size: 25px; font-weight: bold">Sign-in to your account</span>
      </a-col>
      <a-col :span="17" :offset="4">
        <a-card>
          <a-form class="ticket-form" :form="form" @submit="Signin">
            <span
              style="display: block; color: #bbb; font-style:italic; margin-bottom: 5px"
            >**username and password are: admin</span>
            <a-form-item>
              <a-input
                v-decorator="['username', {rules: [{ required: true, message: 'Please, enter a correct username' }]}]"
                placeholder="Username"
                size="large"
              >
                <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                v-decorator="['password', {rules: [{ required: true, message: 'Please, enter a correct password' }]}]"
                placeholder="Password"
                type="password"
                size="large"
              >
                <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-button
                type="primary"
                html-type="submit"
                style="margin-top: 10px;"
                size="large"
                block
              >Sign In</a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
  </a-layout-content>
</template>
<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this)
    };
  },
  methods: {
    Signin(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          if (values.username == "admin" && values.password == "admin") {
            this.$message.success("Successfully Signed in, Welcome Back");
            this.$router.push("/dashboard");
          } else {
            this.$message.error("Invalid Username or Password");
          }
        }
      });
    }
  }
};
</script>
<style scoped>
.ant-row .ant-form-item {
  margin-bottom: 10px;
}
</style>