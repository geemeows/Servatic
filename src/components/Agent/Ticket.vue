<template>
  <a-card :title="`Open New Ticket #${roomInfo.ticketID ? roomInfo.ticketID : ''}`">
    <a-form class="ticket-form" :form="form">
      <a-form-item>
        <a-input
          disabled
          placeholder="Client Name"
          :value="roomInfo.clientName"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          disabled
          placeholder="Client Email"
          :value="roomInfo.clientEmail"
        >
          <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          disabled
          placeholder="Ticket Date"
          :value="roomInfo.createdAt"
        >
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
  data() {
    return {
      form: this.$form.createForm(this),
      ticket: {
        complaint: "",
        action: "",
        summary: ""
      }
    };
  },
  methods: {
    submitComplaint() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.ticket.complaint = values.complaint;
          this.ticket.action = values.action;
          this.ticket.summary = values.complaintSummary;

          updateTicket({
            ticketID: this.roomInfo.ticketID,
            action: this.action,
            complaint: this.complaint
          })
          .then(res => {
            console.log(res)
            this.$message.success("Complaint submitted successfully!"); // Success Message
          })
          .catch(err => console.log(err))

          // Clearing the fields
          this.form.resetFields();
        }
      });
    },

    confirm(e) {
      this.submitComplaint();
      // Implement the feature of fetching next client here
    },
    cancel(e) {
      this.submitComplaint();
    }
  }
};
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
