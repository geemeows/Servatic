<template>
  <a-layout-content :style="{'height': '90.47vh' }">
    <analytics-card></analytics-card>
    <agents-status></agents-status>
  </a-layout-content>
</template>
<script>
import AnalyticsCard from '../../components/Moderator/AnalyticsCards'
import AgentsStatus from '../../components/Moderator/AgentsStatus'
export default {
  components: {
    AnalyticsCard,
    AgentsStatus
  }
}
</script>
