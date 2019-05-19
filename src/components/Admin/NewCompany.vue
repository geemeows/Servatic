<template>
  <a-layout style="margin: 24px; padding: '24px'">
    <a-layout-content
      :style="{ padding: '24px', background: '#fff', boxShadow: '0 2px 5px rgba(0,21,41,.13)'}"
    >
      <h1 style="text-align: center">
        <a-icon type="bank"/>&nbsp;Add New Company
      </h1>
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="add-agents-form"
        @submit="addCompany"
      >
        <a-spin tip="Loading..." :spinning="isLoading">
          <div class="spin-content">
            <a-form-item>
              <a-input
                v-decorator="[
                'companyName',
                { rules: [{ required: true, message: 'Please Input Company Name!' }] }
              ]"
                placeholder="Company Name"
              >
                <a-icon slot="prefix" type="bank" style="color: rgba(0,0,0,.25)"/>
              </a-input>
            </a-form-item>
            <a-divider>Moderator Login Info</a-divider>
            <a-form-item>
              <a-input
                v-decorator="[
                'moderatorName',
                { rules: [{ required: true, message: 'Please Input Moderator Name!' }] }
              ]"
                placeholder="Moderator Name"
              >
                <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                v-decorator="[
                'moderatorEmail',
                { rules: [{ required: true, message: 'Please Input Moderator Email!' }] }
              ]"
                placeholder="Moderator Email"
              >
                <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)"/>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                v-decorator="[
                'moderatorPassword',
                { rules: [{ required: true, message: 'Please Input Moderator Password!' }] }
              ]"
                type="password"
                placeholder="Password"
              >
                <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-button
                type="primary"
                html-type="submit"
                class="login-form-button"
                block
              >Add Company</a-button>
            </a-form-item>
          </div>
        </a-spin>
      </a-form>
    </a-layout-content>
  </a-layout>
</template>

<script>
export default {
  props: ['isLoading'],
  data () {
    return {
      form: this.$form.createForm(this),
      isLodaing: false
    }
  },
  methods: {
    addCompany (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$emit('companyInfo', values)
        }
      })
    }
  }
}
</script>

<style>
</style>
