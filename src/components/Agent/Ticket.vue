<template>
  <a-card :title="'Ticket No. #' + ticketNo">
    <a-form class="ticket-form" :form="form">
      <a-form-item>
        <a-date-picker
        v-decorator="['complaintDate', {rules: [{ required: true, message: 'Please, enter the date of the complaint!' }]}]"
        style="width: 100% !important;" @change="onChange"/>
      </a-form-item>
      <a-form-item>
        <a-input
        v-decorator="['complaint', {rules: [{ required: true, message: 'Please, enter the complaint title!' }]}]"
        placeholder="Complaint">
          <a-icon slot="prefix" type="info-circle" style="color: rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
        v-decorator="['action', {rules: [{ required: true, message: 'Please, enter the action taken for this the complaint!' }]}]"
        placeholder="Action">
          <a-icon slot="prefix" type="form" style="color: rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-textarea
        v-decorator="['complaintSummary', {rules: [{ required: true, message: 'Please, enter the summary of the complaint!' }]}]"
        placeholder="Complaint Summary" :rows="5"/>
      </a-form-item>
      <a-form-item>
        <a-popconfirm placement="rightBottom" title="Chat with another client?" @confirm="confirm" @cancel="cancel" okText="Yes" cancelText="No">
          <a-button type="primary" html-type="submit" class="login-form-button" block>Submit Complaint</a-button>
        </a-popconfirm>
      </a-form-item>
    </a-form>
  </a-card>
</template>
<style>
.ant-card {
  background: #fff;
  box-shadow: 0 2px 5px rgba(0, 21, 41, 0.13);
  margin-bottom: 10px;
}
.ant-row .ant-form-item {
  margin-bottom: 5px;
}
</style>
<script>
export default {

  data () {
    return {
      form: this.$form.createForm(this),
      ticketNo: '1598745632',
      ticket: {
        date: '',
        complaint: '',
        action: '',
        summary: ''
      }
    }
  },
  methods: {
    submitComplaint () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.ticket.complaint = values.complaint
          this.ticket.action = values.action
          this.ticket.summary = values.complaintSummary
          console.log(this.ticket)

          this.$message.success('Complaint submitted successfully!') // Success Message
          this.$emit('receiveTicketData', this.ticket) // Sending out the information of the ticket

          // Clearing the fields
          this.form.resetFields()
        }
      })
    },
    onChange (date, dateString) {
      this.ticket.date = dateString
    },
    confirm (e) {
      this.submitComplaint()
      // Implement the feature of fetching next client here
    },
    cancel (e) {
      this.submitComplaint()
    }
  }
}
</script>
