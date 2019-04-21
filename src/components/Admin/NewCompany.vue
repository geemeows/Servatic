<template>
  <a-layout style="margin: 24px; padding: '24px'">
    <a-layout-content
      :style="{ padding: '24px', background: '#fff', boxShadow: '0 2px 5px rgba(0,21,41,.13)'}"
    >
      <h1 style="text-align: center">
        <a-icon type="bank"/>&nbsp;Add New Company
      </h1>
      {{ successNotification }}
      {{ errorNotification }}

      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="add-agents-form"
        @submit="addCompany"
      >
        <a-spin tip="Loading..." :spinning="loadingIndicator">
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
  data() {
    return {
      form: this.$form.createForm(this)
    };
  },
  computed: {
    loadingIndicator() {
      return this.$store.getters.getLoadingIndicator;
    },
    successNotification() {
      if (this.$store.getters.getSuccessNotification) {
        this.$notification.open({
          message: "Successfully Added",
          description: "Company and moderator are successfully added.",
          icon: <a-icon type="check" style="color:#00c610" />
        });
      }
    },
    errorNotification() {
      if (this.$store.getters.getErrorNotification) {
        this.$notification.open({
          message: "Somthing Went Wrong",
          description: "Company and moderator are not added.",
          icon: <a-icon type="close" style="color:#c10000" />
        });
      }
    }
  },
  methods: {
    addCompany(e) {
      e.preventDefault();

      this.form.validateFields((err, values) => {
        if (!err) {
          this.$store.dispatch("addCompany", {
            companyName: values.companyName,
            moderatorName: values.moderatorName,
            moderatorEmail: values.moderatorEmail,
            moderatorPassword: values.moderatorPassword
          });
        }
      });
    }
  }
};
</script>

<style>
</style>
