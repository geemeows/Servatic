<template>
  <a-card class="chat-window" title="Chatting Area">
    <div class="chat-box">
      <scrolly class="vertical-scrollbar-demo" :passive-scroll="true" :style="{height: '304px' }">
        <scrolly-viewport class="test">
          <div class="chat-messages">
            <!-- sent / received are the classes of the sent and received messages -->
            <div v-for="message in sentMessagesArray" :key="message.id">
              <div :class="message.type">
                <div class="content">{{message.message}}</div>
                <div class="time">
                  <a-icon style="color: #00c610;" v-if="message.type==='sent'" type="check" />
                  <a-icon
                    style="margin-left:-8px; color: #00c610;"
                    v-if="message.type==='sent'"
                    type="check"
                  />
                  {{message.time}}
                </div>
              </div>
              <div class="clearfix"></div>
            </div>
          </div>
        </scrolly-viewport>
        <scrolly-bar axis="y"></scrolly-bar>
      </scrolly>
    </div>
    <span class="is-typing">{{isTypingIndicator}}</span>
    <div class="chat-toolbox">
      <div class="suggestions">
        <a-collapse defaultActiveKey="0" :bordered="false">
          <a-collapse-panel header="Need help? Click to show some suggestions" key="1">
            <div class="first" @click="setMessage(firstAns)">{{firstAns}}</div>
            <div class="second" @click="setMessage(secondAns)">{{secondAns}}</div>
            <div class="third" @click="setMessage(thirdAns)">{{thirdAns}}</div>
          </a-collapse-panel>
        </a-collapse>
      </div>
      <a-form :form="form" class="message-form" @submit.prevent>
        <a-row :gutter="16">
          <a-col :span="22">
            <a-form-item>
              <a-input
                type="text"
                placeholder="Write your message here...."
                v-model="message"
                @keydown.enter.exact.prevent
                @keyup.enter.exact="insertMessage"
                @change="startedTyping"
                :disabled="startChat"
              >
                <a-icon slot="prefix" type="message" style="color: rgba(0,0,0,.25)" />
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="2">
            <a-form-item>
              <a-button
                type="primary"
                shape="circle"
                icon="arrow-right"
                html-type="submit"
                @click="insertMessage"
                :disabled="startChat"
              ></a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </a-card>
</template>

<script>
import { Scrolly, ScrollyViewport, ScrollyBar } from 'vue-scrolly'
import { mlHttp } from '../../../core/httpClient'
import { initChatManager } from '../../../core/Chat/chat.services'
import Cookies from 'vue-cookies'

export default {
  props: ['submitTicketFlag'],
  components: {
    Scrolly,
    ScrollyViewport,
    ScrollyBar
  },
  created () {
    const chatManager = initChatManager
    chatManager
      .connect({
        onAddedToRoom: room => {
          console.log(`Added to room ${room.name}`)
          this.room = room
          this.sentMessagesArray = []
          this.listen()
          this.startChat = false
          console.log('Room ID', this.room.id, this.room)

          this.$notification.open({
            message: 'New Client',
            description: 'New Client added to the chatting area',
            icon: <a-icon type="plus" style="color:#00c610" />
          })

          // Setting Cookies
          Cookies.set('accuracy', 0)
          Cookies.set('roomID', this.room.id)
        }
      })
      .then(currentUser => {
        this.currUser = currentUser
        console.log('Successful connection', currentUser)
      })
      .catch(err => {
        console.log('Error on connection', err)
      })
  },
  mounted () {
    // This function makes the chat scrollbar scrolles down instantaneously
    this.$nextTick(function () {
      window.setInterval(() => {
        let scroll = this.$el.querySelector('.test')
        if (scroll.scrollTop !== 0) this.scrollTop()
      }, 0)
    })
  },
  data () {
    return {
      form: this.$form.createForm(this),
      message: '',
      time: '10:30 PM',
      sentMessagesArray: [],
      firstAns: 'The First Answer',
      secondAns: 'The Second Answer',
      thirdAns: 'The Third Answer',
      currUser: null,
      room: null,
      startChat: true,
      accuracy: 0,
      accuracyFlag: false,
      endChat: null,
      isTypingIndicator: ''
    }
  },
  watch: {
    accuracy: {
      handler (payload) {
        // Do Accuracy
        this.calcAccuracy(payload)
      },
      immediate: true
    },
    submitTicketFlag: {
      handler (payload) {
        this.endChat = payload
        this.sentMessagesArray = []
        this.endChat = false
        if (this.currUser) {
          this.currUser.sendSimpleMessage({
            roomId: this.room.id,
            text: 'b31e3b4a279d8922c52e1c675bbe8872'
          })
        }
      },
      immediate: true
    }
  },
  methods: {
    setMessage (payload) {
      this.message = payload
      this.accuracyFlag = true
      // this.accuracy++
    },
    insertMessage () {
      if (this.accuracyFlag) {
        this.accuracy++
        this.accuracyFlag = false
      }
      if (this.message !== '') {
        let time = new Date()
        this.sentMessagesArray.push({
          type: 'sent',
          message: this.message,
          time: `${
            time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
          }:${
            time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
          }`
        })
      }
      this.currUser
        .sendSimpleMessage({
          roomId: this.room.id,
          text: this.message
        })
        .then(messageId => {
          // Do nothing
        })
        .catch(err => {
          console.log(`Error adding message to ${this.room.name}: ${err}`)
        })

      this.scrollTop()
      this.message = ''
    },
    scrollTop () {
      let scrollToBottom = this.$el.querySelector('.test')
      scrollToBottom.scrollTop = scrollToBottom.scrollHeight
    },
    listen () {
      this.currUser.subscribeToRoomMultipart({
        roomId: this.room.id,
        hooks: {
          onMessage: message => {
            const messageContent = message.parts[0].payload.content
            if (messageContent === 'b31e3b4a279d8922c52e1c675bbe8872') {
              if (message.senderId !== this.currUser.id) {
                this.$notification.open({
                  message: 'Client Left',
                  description: 'Your client is just left!',
                  icon: <a-icon type="info-circle" style="color:#5BC0DE" />
                })
              }
              this.sentMessagesArray = []
              return
            }
            mlHttp
              .post('/suggestion?query=' + messageContent)
              .then(res => {
                console.log(res)
                this.firstAns = res.data.suggestions[0]
                this.secondAns = res.data.suggestions[1]
                this.thirdAns = res.data.suggestions[2]
              })
              .catch(err => console.log(err))
            if (message.senderId !== this.currUser.id) {
              let time = new Date()
              this.sentMessagesArray.push({
                id: message.id,
                type: 'received',
                message: messageContent,
                time: `${
                  time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
                }:${
                  time.getMinutes() < 10
                    ? '0' + time.getMinutes()
                    : time.getMinutes()
                }`
              })
            }
            console.log('received message', message)
          },
          onUserStartedTyping: user => {
            this.isTypingIndicator = `${user.name} is typing...`
          },
          onUserStoppedTyping: user => {
            this.isTypingIndicator = ''
          }
        },
        messageLimit: 0
      })
    },
    calcAccuracy (payload) {
      let sum = 0
      let receivedMsgs = []
      receivedMsgs = this.sentMessagesArray.filter(
        item => item.type === 'sent'
      )
      sum = payload / (receivedMsgs.length)
      Cookies.set('accuracy', sum)
    },
    startedTyping () {
      this.currUser.isTypingIn({ roomId: this.room.id })

    }
  }
}
</script>

<style scoped>
.is-typing {
  color: #999;
  font-size: 12px;
  font-style: italic
}
.ant-card {
  background: #fff;
  box-shadow: 0 2px 5px rgba(0, 21, 41, 0.13);
}
.chat-box {
  height: 307px;
}
.chat-box::before {
  content: "";
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAgOCkiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGNpcmNsZSBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIgY3g9IjE3NiIgY3k9IjEyIiByPSI0Ii8+PHBhdGggZD0iTTIwLjUuNWwyMyAxMW0tMjkgODRsLTMuNzkgMTAuMzc3TTI3LjAzNyAxMzEuNGw1Ljg5OCAyLjIwMy0zLjQ2IDUuOTQ3IDYuMDcyIDIuMzkyLTMuOTMzIDUuNzU4bTEyOC43MzMgMzUuMzdsLjY5My05LjMxNiAxMC4yOTIuMDUyLjQxNi05LjIyMiA5LjI3NC4zMzJNLjUgNDguNXM2LjEzMSA2LjQxMyA2Ljg0NyAxNC44MDVjLjcxNSA4LjM5My0yLjUyIDE0LjgwNi0yLjUyIDE0LjgwNk0xMjQuNTU1IDkwcy03LjQ0NCAwLTEzLjY3IDYuMTkyYy02LjIyNyA2LjE5Mi00LjgzOCAxMi4wMTItNC44MzggMTIuMDEybTIuMjQgNjguNjI2cy00LjAyNi05LjAyNS0xOC4xNDUtOS4wMjUtMTguMTQ1IDUuNy0xOC4xNDUgNS43IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTg1LjcxNiAzNi4xNDZsNS4yNDMtOS41MjFoMTEuMDkzbDUuNDE2IDkuNTIxLTUuNDEgOS4xODVIOTAuOTUzbC01LjIzNy05LjE4NXptNjMuOTA5IDE1LjQ3OWgxMC43NXYxMC43NWgtMTAuNzV6IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIvPjxjaXJjbGUgZmlsbD0iIzAwMCIgY3g9IjcxLjUiIGN5PSI3LjUiIHI9IjEuNSIvPjxjaXJjbGUgZmlsbD0iIzAwMCIgY3g9IjE3MC41IiBjeT0iOTUuNSIgcj0iMS41Ii8+PGNpcmNsZSBmaWxsPSIjMDAwIiBjeD0iODEuNSIgY3k9IjEzNC41IiByPSIxLjUiLz48Y2lyY2xlIGZpbGw9IiMwMDAiIGN4PSIxMy41IiBjeT0iMjMuNSIgcj0iMS41Ii8+PHBhdGggZmlsbD0iIzAwMCIgZD0iTTkzIDcxaDN2M2gtM3ptMzMgODRoM3YzaC0zem0tODUgMThoM3YzaC0zeiIvPjxwYXRoIGQ9Ik0zOS4zODQgNTEuMTIybDUuNzU4LTQuNDU0IDYuNDUzIDQuMjA1LTIuMjk0IDcuMzYzaC03Ljc5bC0yLjEyNy03LjExNHpNMTMwLjE5NSA0LjAzbDEzLjgzIDUuMDYyLTEwLjA5IDcuMDQ4LTMuNzQtMTIuMTF6bS04MyA5NWwxNC44MyA1LjQyOS0xMC44MiA3LjU1Ny00LjAxLTEyLjk4N3pNNS4yMTMgMTYxLjQ5NWwxMS4zMjggMjAuODk3TDIuMjY1IDE4MGwyLjk0OC0xOC41MDV6IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIvPjxwYXRoIGQ9Ik0xNDkuMDUgMTI3LjQ2OHMtLjUxIDIuMTgzLjk5NSAzLjM2NmMxLjU2IDEuMjI2IDguNjQyLTEuODk1IDMuOTY3LTcuNzg1LTIuMzY3LTIuNDc3LTYuNS0zLjIyNi05LjMzIDAtNS4yMDggNS45MzYgMCAxNy41MSAxMS42MSAxMy43MyAxMi40NTgtNi4yNTcgNS42MzMtMjEuNjU2LTUuMDczLTIyLjY1NC02LjYwMi0uNjA2LTE0LjA0MyAxLjc1Ni0xNi4xNTcgMTAuMjY4LTEuNzE4IDYuOTIgMS41ODQgMTcuMzg3IDEyLjQ1IDIwLjQ3NiAxMC44NjYgMy4wOSAxOS4zMzEtNC4zMSAxOS4zMzEtNC4zMSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEuMjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvZz48L3N2Zz4=");
  opacity: 0.06;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
}
.chat-toolbox {
  padding: 0;
  height: 30px;
  border-top: 1px solid #e8e8e8;
}
.ant-card-body {
  padding: 0 !important;
}
.message-form {
  padding: 8px 0;
}
.ant-input-affix-wrapper .ant-input:not(:first-child) {
  border-radius: 30px !important;
}
.message-send-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.clearfix {
  clear: both;
}
.sent {
  margin-top: 5px;
  float: right;
  margin-bottom: 5px;
  display: block;
}
.sent .time {
  float: right;
  color: #9e9b9b;
  margin-right: 10px;
  font-size: 12px;
}
.sent .content {
  padding: 5px 15px;
  border-radius: 15px 15px 0 15px;
  background: #1890ff;
  color: white;
}
.received {
  margin-top: 5px;
  float: left;
  margin-bottom: 5px;
  display: block;
  margin-bottom: 5px;
}
.received .content {
  padding: 5px 15px;
  border-radius: 15px 15px 15px 0px;
  background: #ccc;
}
.received .time {
  color: #9e9b9b;
  margin-left: 10px;
  font-size: 12px;
}
.suggestions {
  padding-top: 5px;
}
.suggestions .first,
.suggestions .second,
.suggestions .third {
  padding: 2px 10px;
  /* float: left;
  width: 181px; */
  margin-bottom: 5px;
  border: 1px solid #40a9ff;
  margin-right: 5px;
  border-radius: 10px;
  font-size: 12px;
  transition: background 0.3s ease-in-out;
  position: relative;
  word-wrap: break-word;
  height: 100%;
}
.suggestions .first:hover,
.suggestions .second:hover,
.suggestions .third:hover {
  background: #40a9ff;
  cursor: pointer !important;
  color: white;
}
</style>
