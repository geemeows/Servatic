<template>
  <a-layout-content
    :style="{ margin: '15px 16px 0 16px', padding: '15px 24px 0 24px',
        'height': '88.1vh'}"
  >
    <a-row :gutter="32">
      <!-- Start Client Info and Ticket Section  -->
      <a-col :span="24">
        <a-alert
          message="Queue Status"
          :description="'Be aware that the number of clients waiting in the queue: ' + clientsInQueue"
          type="info"
          class="queue-info"
          showIcon
        />
      </a-col>
      <a-col :span="10">
        <a-row>
          <!-- Start open ticket for the client complaint section -->
          <a-col :span="24">
            <client-ticket :roomInfo="roomInfo"></client-ticket>
          </a-col>
          <!-- End open ticket for the client complaint section -->
        </a-row>
      </a-col>
      <!-- End Client Info and Ticket Section  -->

      <!-- Start Agent Chat Section -->
      <a-col :span="14">
        <chat-window @roomData="setRoomData"></chat-window>
      </a-col>
      <!-- Start Agent Chat Section -->
    </a-row>
  </a-layout-content>
</template>

<script>
import clientTicket from '../../components/Agent/Ticket'
const chatWindow = () => import('../../components/Chat/Chat')
export default {
  components: {
    clientTicket,
    chatWindow
  },
  data () {
    return {
      clientsInQueue: 10,
      roomInfo: ''
    }
  },
  methods: {
    setRoomData (payload) {
      this.roomInfo = payload
    }
  }
}
</script>

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
  margin-left: 20px;
}
.chat-messages {
  height: 266px;
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
