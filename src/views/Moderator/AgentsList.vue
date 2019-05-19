<template>
  <a-layout-content :style="{'height': '90.47vh' }">
    <a-layout-content
      :style="{ margin: '24px 16px', padding: '24px', background: '#fff', boxShadow: '0 2px 5px rgba(0,21,41,.13)'}"
    >
      <h1 style="text-align: center">
        <a-icon type="user"/>&nbsp;Agents List
      </h1>
      <a-button type="primary" @click="showDrawer" style=" margin-bottom: 10px; float:right">
        <a-icon type="plus"/>New account
      </a-button>
      <div class="clearfix"></div>
      <a-drawer
        title="Add a new agent"
        :width="350"
        @close="onClose"
        :visible="visible"
        placement="left"
        :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
      >
        <add-agent @closeDrawer="onClose" @agentData="addNewAgent"></add-agent>
      </a-drawer>

      <a-table bordered :dataSource="dataSource" :columns="columns">
        <template slot="delete" slot-scope="text, record">
          <a-popconfirm
            v-if="dataSource.length"
            title="Sure to delete?"
            @confirm="() => onDelete(record.key)"
          >
            <a href="javascript:;">Delete</a>
          </a-popconfirm>
        </template>
      </a-table>
    </a-layout-content>
  </a-layout-content>
</template>
<script>
import addAgent from '../../components/Moderator/AddAgent'
export default {
  components: {
    addAgent
  },
  data () {
    return {
      visible: false,
      key: 0,
      dataSource: [],
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          width: '30%'
        },
        {
          title: 'Username',
          dataIndex: 'username'
        },
        {
          title: 'Email Address',
          dataIndex: 'email'
        },
        {
          title: 'Delete',
          width: '10%',
          dataIndex: 'actions',
          scopedSlots: { customRender: 'delete' }
        }
      ]
    }
  },
  methods: {
    onDelete (key) {
      const dataSource = [...this.dataSource]
      this.dataSource = dataSource.filter(item => item.key !== key)
    },
    showDrawer () {
      this.visible = true
    },
    onClose () {
      this.visible = false
    },
    addNewAgent (payload) {
      let newAgent = {
        key: this.key,
        name: '',
        username: '',
        email: ''
      }
      newAgent.name = payload.name
      newAgent.username = payload.username
      newAgent.email = payload.email
      this.dataSource.push(newAgent)
      this.key++
    }
  }
}
</script>
<style>
.clearfix {
  clear: both;
}

.ant-form-item {
  margin-bottom: 5px;
}
</style>
