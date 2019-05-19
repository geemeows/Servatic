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
          <a-form class="ticket-form" :form="form" @submit="signIn">
            <a-spin tip="Loading..." :spinning="isLoading">
              <div class="spin-content">
                <a-form-item>
                  <a-input
                    v-decorator="['email', {rules: [{ required: true, message: 'Please, enter a correct Email Address' }]}]"
                    placeholder="Email Address"
                    size="large"
                    type="email"
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
              </div>
            </a-spin>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
  </a-layout-content>
</template>
<script>
import { login } from '../../core/Auth/auth.services'
export default {
  data () {
    return {
      form: this.$form.createForm(this),
      isLoading: false
    }
  },
  methods: {
    signIn (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.isLoading = true
          login({
            email: values.email,
            password: values.password
          }).then(res => {
            this.isLoading = false
          })
        }
      })
    }
  }
}
</script>
<style scoped>
.ant-row .ant-form-item {
  margin-bottom: 10px;
}
</style>
