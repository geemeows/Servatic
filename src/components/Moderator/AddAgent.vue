<template>
  <a-form
    id="components-form-demo-normal-login"
    :form="form"
    class="add-agents-form"
    @submit="handleSubmit"
  >
    <a-divider>Personal Info</a-divider>
    <a-form-item>
      <a-input
        v-decorator="[
                'agentName',
                { rules: [{ required: true, message: 'Please input agent name!' }] }
              ]"
        placeholder="Agent Name"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
                'agentEmail',
                { rules: [{ required: true, message: 'Please input agent email!' }] }
              ]"
        placeholder="Email Address"
      >
        <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)"/>
      </a-input>
    </a-form-item>
    <a-divider>Login Info</a-divider>
    <a-form-item>
      <a-input
        v-decorator="[
                'agentUsername',
                { rules: [{ required: true, message: 'Please input agent username!' }] }
              ]"
        placeholder="Username"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
                'agentPassword',
                { rules: [{ required: true, message: 'Please input agent Password!' }] }
              ]"
        type="password"
        placeholder="Password"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit" class="login-form-button" block>Add Agent</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
export default {
  data() {
    return {
       form: this.$form.createForm(this),
       agentData: {
         name:'',
         email:'',
         username:'',
         password:''
       }
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.agentData.name = values.agentName
          this.agentData.email = values.agentEmail
          this.agentData.username = values.agentUsername
          this.agentData.password = values.agentPassword
          
          this.$emit('closeDrawer', true)
          this.$emit('agentData', this.agentData)
          this.$message.success('Registeration Completed');
          this.form.resetFields()
        }
      });
    }
  }
};
</script>
<style lang="">
</style>