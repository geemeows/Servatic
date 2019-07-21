<template>
  <a-layout-content :style="{'height': '90.47vh' }">
    <a-layout-content
      :style="{ margin: '24px 16px', padding: '24px', background: '#fff', boxShadow: '0 2px 5px rgba(0,21,41,.13)'}"
    >
      <h1 style="text-align: center">
        <a-icon type="file-done"/>&nbsp;Closed Tickets
      </h1>
      <div class="clearfix"></div>
      <tickets-table :loading="isLoading"></tickets-table>
    </a-layout-content>
  </a-layout-content>
</template>
<script>
import ticketsTable from '../../components/Agent/TicketsTable'
export default {
  components: {
    ticketsTable
  },
  created () {

  },
  data () {
    return {
    }
  },
  methods: {
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
