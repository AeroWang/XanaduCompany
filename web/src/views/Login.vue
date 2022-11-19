<template>
  <div />
</template>
<script lang="ts" setup name="">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

onMounted(() => {
  const prodUrl = 'https://xanadu.aerowang.cn/admin/#/login'
  window.open(prodUrl, '_blank')
  router.push('/index')
})
</script>
<style lang="less" scoped>

</style>
