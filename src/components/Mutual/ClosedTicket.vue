<template>
  <a-card :title="'Ticket No. #' + '123456'">
    <a-form class="ticket-form" :form="form">
      <a-form-item>
        <a-date-picker
        style="width: 100% !important;" @change="onChange" disabled
        :defaultValue="moment('2015-06-06', dateFormat)"/>
      </a-form-item>
      <a-form-item>
        <a-input
        placeholder="Complaint" disabled>
          <a-icon slot="prefix" type="info-circle" style="color: rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
        disabled
        placeholder="Action">
          <a-icon slot="prefix" type="form" style="color: rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-textarea
        disabled
        placeholder="Complaint Summary" :rows="5"/>
      </a-form-item>
      <a-form-item>
          <span>Submitted by: Gazouly</span>
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
import moment from 'moment'
export default {
  data () {
    this.dateFormat = 'YYYY-MM-DD'
    return {

    }
  },
  methods: {
    moment
  }
}
</script>
