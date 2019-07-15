<template>
  <a-card :title="`Open New Ticket #${roomData.ticketID ? roomData.ticketID : ''}`">
    <a-form class="ticket-form" :form="form">
      <a-form-item>
        <a-input disabled placeholder="Client Name" :value="roomData.clientName">
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input disabled placeholder="Client Email" :value="roomData.clientEmail">
          <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input disabled placeholder="Ticket Date" :value="roomData.createdAt">
          <a-icon slot="prefix" type="calendar" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="['complaint', {rules: [{ required: true, message: 'Please, enter the complaint title!' }]}]"
          placeholder="Complaint"
        >
          <a-icon slot="prefix" type="info-circle" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="['action', {rules: [{ required: true, message: 'Please, enter the action taken for this the complaint!' }]}]"
          placeholder="Action"
        >
          <a-icon slot="prefix" type="form" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-textarea
          v-decorator="['complaintSummary', {rules: [{ required: true, message: 'Please, enter the summary of the complaint!' }]}]"
          placeholder="Complaint Summary"
          :rows="5"
        />
      </a-form-item>
      <a-form-item>
        <a-popconfirm
          placement="rightBottom"
          title="Chat with another client?"
          @confirm="confirm"
          @cancel="cancel"
          okText="Yes"
          cancelText="No"
        >
          <a-button
            type="primary"
            html-type="submit"
            class="login-form-button"
            block
            :disabled="roomInfo === ''"
            :loading="isLoading"
          >Submit Complaint</a-button>
        </a-popconfirm>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import { updateTicket } from '../../../core/Agent/agent.services'
export default {
  props: ['roomInfo'],
  watch: {
    'roomInfo': {
      handler (payload) {
        // Do Accuracy
        this.roomData = payload
      },
      immediate: true
    }
  },
  data () {
    return {
      form: this.$form.createForm(this),
      isLoading: false,
      ticket: {
        complaint: '',
        action: '',
        summary: ''
      },
      roomData: ''
    }
  },
  methods: {
    submitComplaint () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.ticket.complaint = values.complaint
          this.ticket.action = values.action
          this.ticket.summary = values.complaintSummary
          this.isLoading = true
          updateTicket({
            ticketID: this.roomInfo.ticketID,
            action: this.ticket.action,
            complaint: this.ticket.complaint
          })
            .then(res => {
              this.$message.success('Complaint submitted successfully!') // Success Message
              this.isLoading = false

              // Clearing the fields
              this.form.resetFields()

              // Clear room info
              this.roomData = ''
            })
            .catch(err => console.log(err))
        }
      })
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
