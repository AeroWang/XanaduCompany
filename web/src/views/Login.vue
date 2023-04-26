<template>
  <div />
</template>
<script lang="ts" setup name="">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

onMounted(() => {
  const prodUrl = process.env.VUE_APP_PRODURL
  window.open(prodUrl, '_blank')
  router.push('/index')
})
</script>
<style lang="less" scoped>

</style>
