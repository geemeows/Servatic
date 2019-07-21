<template>
  <a-layout style="margin: 24px; padding: '24px'">
    <a-layout-content
      :style="{ padding: '24px', background: '#fff', boxShadow: '0 2px 5px rgba(0,21,41,.13)'}"
    >
      <h1 style="text-align: center">
        <a-icon type="project" />&nbsp;Agents Status
      </h1>

      <a-table bordered :dataSource="dataSource" :columns="columns" :loading="!agentStats">
      </a-table>
    </a-layout-content>
  </a-layout>
</template>
<script>
export default {
  props: ['agentStats'],
  watch: {
    agentStats: {
      handler(payload) {
        this.dataSource = payload
      }
    }
  },
  data () {
    return {
      dataSource: [
      ],
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          width: '33.3%'
        },
        {
          title: 'Avg. Response Time',
          width: '33.3%',
          dataIndex: 'avgResTime',
          scopedSlots: { customRender: 'delete' }
        },
        {
          title: '#Clients Served',
          width: '33.3%',
          dataIndex: 'clientServed'
        }
      ]
    }
  },
  methods: {

  }
}
</script>
