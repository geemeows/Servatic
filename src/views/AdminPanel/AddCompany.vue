<template>
<a-layout-content
    :style="{ margin: '15px 16px 0 16px', padding: '15px 24px 0 24px', 
        'height': '88.1vh'}"
  >
    <new-company></new-company>
  </a-layout-content>
</template>

<script>
import newCompany from '../../components/Admin/NewCompany'
export default {
    components: {
        newCompany
    }

}
</script>

<style>

</style>
