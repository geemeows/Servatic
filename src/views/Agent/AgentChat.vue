<template>
  <a-layout-content
    :style="{ margin: '15px 16px 0 16px', padding: '15px 24px 0 24px',
        'height': '88.1vh'}"
  >
    <a-row :gutter="32">
      <!-- Start Client Info and Ticket Section  -->
      <a-col :span="24">
        <a-row :gutter="32">
          <a-col :span="20">
            <a-alert
              message="Queue Status"
              :description="'Be aware that the number of clients waiting in the queue: ' + clientsInQueue"
              type="info"
              class="queue-info"
              showIcon
            />
          </a-col>
          <a-col :span="4">
            <a-button
              @click="fetchNewClient"
              :loading="fetchLoading"
              style="margin-bottom: 15px;"
              type="primary"
              block
            >
              <a-icon type="redo" />&nbsp;Fetch Client
            </a-button>
            <a-button
              @click="() => showTickets = true"
              style="background:#001529; color: #fff"
              block
            >
              <a-icon type="file-done" />&nbsp;Closed Tickets
            </a-button>
            <a-modal
              title="Closed Tickets"
              style="top: 20px;"
              :visible="showTickets"
              :footer="false"
              :width="900"
              @cancel="() => hideModal(false)"
            >
              <tickets-table></tickets-table>
            </a-modal>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="10">
        <a-row>
          <!-- Start open ticket for the client complaint section -->
          <a-col :span="24">
            <client-ticket :roomInfo="roomInfo" @submitTicket="submitFlag"></client-ticket>
          </a-col>
          <!-- End open ticket for the client complaint section -->
        </a-row>
      </a-col>
      <!-- End Client Info and Ticket Section  -->

      <!-- Start Agent Chat Section -->
      <a-col :span="14">
        <chat-window :submitTicketFlag="submitTicket"></chat-window>
      </a-col>
      <!-- Start Agent Chat Section -->
    </a-row>
  </a-layout-content>
</template>

<script>
import clientTicket from "../../components/Agent/Ticket";
import { getQueue, fetchClient } from "../../../core/Agent/agent.services";
import { setInterval, setTimeout } from "timers";
import TicketsTable from "../../components/Agent/TicketsTable";
const chatWindow = () => import("../../components/Chat/Chat");
export default {
  components: {
    clientTicket,
    chatWindow,
    TicketsTable
  },
  created() {
    getQueue().then(res => {
      this.clientsInQueue = res.data.count;
    });

    setInterval(() => {
      getQueue().then(res => {
        this.clientsInQueue = res.data.count;
      });
    }, 30 * 1000);
  },
  data() {
    return {
      clientsInQueue: 0,
      roomInfo: "",
      showTickets: false,
      submitTicket: false,
      fetchLoading: false
    };
  },
  methods: {
    hideModal(payload) {
      this.showTickets = payload;
    },
    submitFlag(payload) {
      this.submitTicket = payload;
      setTimeout(() => {
        this.submitTicket = false;
      }, 1000);
    },
    fetchNewClient() {
      this.fetchLoading = true;
      fetchClient()
        .then(res => {
          this.fetchLoading = false;
          this.roomInfo = {
            ticketID: res.data.ticket.id,
            createdAt: res.data.ticket.created_at,
            clientName: res.data.client.name,
            clientEmail: res.data.client.email
          };
        })
        .catch(err => {
          if (err.response.status == 404) {
            this.fetchLoading = false;
            this.$notification.open({
              message: "Fetch Client",
              description: "No clients in queue to fetch!",
              icon: <a-icon type="info-circle" style="color:#5BC0DE" />
            });
          }
        });
    }
  }
};
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
