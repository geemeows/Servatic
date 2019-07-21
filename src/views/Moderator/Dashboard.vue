<template>
  <a-layout-content :style="{'height': '90.47vh' }">
    <analytics-card :companyStats="companyStats"></analytics-card>
    <agents-status :agentStats="agentStats"></agents-status>
  </a-layout-content>
</template>
<script>
import AnalyticsCard from '../../components/Moderator/AnalyticsCards'
import AgentsStatus from '../../components/Moderator/AgentsStatus'
import { getStats } from '../../../core/Moderator/moderator.services'
export default {
  components: {
    AnalyticsCard,
    AgentsStatus
  },
  data() {
    return {
      agentStats: null,
      companyStats: null
    }
  },
  created() {
    getStats()
      .then(res => {
        this.agentStats = res.agentStats
        this.companyStats = res.companyStats
      })
  }
}
</script>
