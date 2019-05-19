<template>
  <a-layout-content :style="{ margin: '15px 16px 0 16px', padding: '15px 24px 0 24px', 'height': '88.1vh'}">
      <a-row :gutter="16">
          <a-col :span="8" v-for= "i in 3" :key= "i">
              <closed-ticket></closed-ticket>
          </a-col>
      </a-row>
  </a-layout-content>
</template>
<script>
import ClosedTicket from '../../components/Mutual/ClosedTicket'
export default {
  components: {
    ClosedTicket
  }
}
</script>
