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
        <add-agent-form @closeDrawer="onClose" @agentData="addNewAgent" :loading="isLoading"></add-agent-form>
      </a-drawer>

      <a-table bordered :dataSource="dataSource" :columns="columns" :loading="isLoading">
        <template slot="busy" slot-scope="text, record">
            <span :style="[record.busy == 'Available'? {'color': '#52c41a'} : {'color': '#c41919'}]">
                <a-icon v-if="record.busy == 'Available'" type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                <a-icon v-if="record.busy == 'Busy'" type="minus-circle" theme="twoTone" twoToneColor="#c41919" />
                {{record.busy}}
            </span>
        </template>
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
import addAgentForm from '../../components/Moderator/AddAgent'
import { addAgent } from '../../../core/Moderator/moderator.services'
import { getCompanyAgents } from '../../../core/Moderator/moderator.services'
import { formatAgent } from '../../../core/Moderator/moderator.model'
import { deleteAgent } from '../../../core/Moderator/moderator.services'

export default {
  components: {
    addAgentForm
  },
  created() {
    this.isLoading = true
    getCompanyAgents()
      .then(res => {
        const serverRes = res.data
        this.isLoading = false
        this.dataSource = serverRes.map((agent) => {
          return formatAgent(agent)
        })
      })
      .catch(err => {
        this.isLoading = false
        console.log(err)
      })
  },
  data () {
    return {
      visible: false,
      isLoading: false,
      dataSource: [],
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          width: '30%'
        },
        {
          title: 'Email Address',
          dataIndex: 'email'
        },
        {
          title: 'Busy',
          dataIndex: 'busy',
          scopedSlots: { customRender: 'busy' }
        },
        {
          title: 'Created At',
          dataIndex: 'createdAt'
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
      this.isLoading = true
      deleteAgent(key)
        .then(res => {
          console.log(res)
          this.isLoading = false
          this.$message.success("Agent Deleted Successfully!")

          const dataSource = [...this.dataSource]
          this.dataSource = dataSource.filter(item => item.key !== key)
        })
        .catch(err => {
          console.log(err)
          this.isLoading = false
          this.$message.success("Deleting Agent Failed!")
        }) 
      // const dataSource = [...this.dataSource]
      // this.dataSource = dataSource.filter(item => item.key !== key)
    },
    showDrawer () {
      this.visible = true
    },
    onClose () {
      this.visible = false
    },
    addNewAgent (payload) {
      this.isLoading = true

      addAgent(payload)
        .then(res => {
          this.isLoading = false
          this.onClose()

          this.dataSource.push({
            key: res.data.user_id,
            name: payload.name,
            createdAt: res.data.created_at,
            busy: res.data.busy ? 'Busy' : 'Available',
            email: payload.email
          })
          this.$message.success("Registeration Completed!");
        })
        .catch(err => {
          this.isLoading = false
          this.onClose()
          this.$message.error("Registeration Failed!");
          console.log(err)
        })
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
