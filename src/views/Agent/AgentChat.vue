<template>
  <a-layout-content
    :style="{ margin: '15px 16px 0 16px', padding: '15px 24px 0 24px',
        'height': '88.1vh'}"
  >
    <a-row :gutter="32">
      <!-- Start Client Info and Ticket Section  -->
      <a-col :span="10">
        <a-row>
          <!-- Start client information section  -->
          <a-col :span="24">
            <a-card title="Client Information">
              <h4 class="client-name">
                Name:
                <span style="color: #1890FF;">{{clientInfo.name}}</span>
              </h4>
              <h4 class="client-name">
                Phone Number:
                <span style="color: #1890FF;">{{clientInfo.mobile}}</span>
              </h4>
            </a-card>
          </a-col>
          <!-- End client information section  -->

          <!-- Start open ticket for the client complaint section -->
          <a-col :span="24">
            <client-ticket @receiveTicketData="receiveTicket"></client-ticket>
          </a-col>
          <!-- End open ticket for the client complaint section -->
        </a-row>
      </a-col>
      <!-- End Client Info and Ticket Section  -->

      <!-- Start Agent Chat Section -->
      <a-col :span="14">
        <a-alert
          message="Queue Status"
          :description="'Be aware that the number of clients waiting in the queue: ' + clientsInQueue"
          type="info"
          class="queue-info"
          showIcon
        />
        <chat-window></chat-window>
      </a-col>
      <!-- Start Agent Chat Section -->
    </a-row>
  </a-layout-content>
</template>

<style>
.queue-info {
    margin-bottom: 10px;
}
.ant-alert-with-description .ant-alert-icon {
    font-size: 50px;
    opacity: 0.5;
}
.ant-alert-with-description .ant-alert-message {
    margin-left: 20px;
    margin-bottom: 0;
    font-size: 18px;
    font-weight: 500;
}
.ant-alert-with-description .ant-alert-description {
    margin-left : 20px;
}
.chat-messages {
    height: 300px;
}
.chat-toolbox {
    padding: 0;
    height: 80px;
    border-top: 1px solid;
}
.ant-card {
  background: #fff;
  box-shadow: 0 2px 5px rgba(0, 21, 41, 0.13);
  margin-bottom: 10px;
}
</style>

<script>
import clientTicket from '../../components/Agent/Ticket'
import chatWindow from '../../components/Chat/Chat'
export default {
  components: {
    clientTicket,
    chatWindow
  },
  data () {
    return {
      clientsInQueue: 10,
      clientInfo: {
        name: 'Muhammad El-Gazouly',
        mobile: '+201119383483'
      },
      ticket: {
        date: '',
        complaint: '',
        action: '',
        summary: ''
      }
    }
  },
  methods: {
    receiveTicket (payload) {
      this.ticket.date = payload.date
      this.ticket.complaint = payload.complaint
      this.ticket.action = payload.action
      this.ticket.summary = payload.summary
    }
  }
}
</script>
