<template>
  <a-card :title="'Ticket No. #' + ticketNo">
    <a-form class="ticket-form" :form="form">
      <a-form-item>
        <a-date-picker style="width: 100% !important;" @change="onChange"/>
      </a-form-item>
      <a-form-item>
        <a-input placeholder="Complaint" v-model="ticket.complaint">
          <a-icon slot="prefix" type="info-circle" style="color: rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input placeholder="Action" v-model="ticket.action">
          <a-icon slot="prefix" type="form" style="color: rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-textarea placeholder="Complaint Summary" :rows="5" v-model="ticket.summary"/>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" class="login-form-button" block @click="submitComplaint">Submit Complaint</a-button>
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
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  data() {
    return {
      ticketNo: "1598745632",
      ticket: {
          date: '',
          complaint: '',
          action: '',
          summary: ''
        }
    };
  },
  methods: {
    submitComplaint() {
      this.$emit('receiveTicketData', this.ticket)
    },
    onChange(date, dateString) {
      this.ticket.date = dateString
    }
  }
};
</script>