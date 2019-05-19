<template>
  <a-layout style="margin: 24px; padding: '24px'">
    <a-layout-content
      :style="{ padding: '24px', background: '#fff', boxShadow: '0 2px 5px rgba(0,21,41,.13)'}"
    >
      <h1 style="text-align: center">
        <a-icon type="project" />&nbsp;Agents Status
      </h1>

      <a-table bordered :dataSource="dataSource" :columns="columns">
        <template slot="delete" slot-scope="text, record">
            <span :style="[record.status == 'Online'? {'color': '#52c41a'} : {'color': '#c41919'}]">
                <a-icon v-if="record.status == 'Online'" type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                <a-icon v-if="record.status == 'Offline'" type="close-circle" theme="twoTone" twoToneColor="#c41919" />
                {{record.status}}
            </span>
        </template>
      </a-table>
    </a-layout-content>
  </a-layout>
</template>
<script>
export default {
  data () {
    return {
      dataSource: [
        {
          name: 'Gazouly',
          status: 'Offline',
          nClients: '32'
        },
        {
          name: 'Hossam',
          status: 'Online',
          nClients: '10'
        },
        {
          name: 'Dawoud',
          status: 'Online',
          nClients: '42'
        },
        {
          name: 'Asmaa',
          status: 'Offline',
          nClients: '12'
        }
      ],
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          width: '33.3%'
        },
        {
          title: 'Status',
          width: '33.3%',
          dataIndex: 'actions',
          scopedSlots: { customRender: 'delete' }
        },
        {
          title: '#Clients served',
          width: '33.3%',
          dataIndex: 'nClients'
        }
      ]
    }
  },
  methods: {
    onDelete (key) {
      const dataSource = [...this.dataSource]
      this.dataSource = dataSource.filter(item => item.key !== key)
    }
  }
}
</script>
