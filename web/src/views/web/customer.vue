<template>
  <div class = "customer">
    <AwHeader class = "customer_header" ref = "customer_header"></AwHeader>
    <div class="box">
      <h1>客户服务</h1>
    </div>

    <AwFooter></AwFooter>
  </div>
</template>

<script>
import AwHeader from '../../components/web/public/Header'
import AwFooter from '../../components/web/public/Footer'
export default {
  name: 'customer',
  components: {
    AwFooter,
    AwHeader
  },
  mounted () {
    this.$store.commit('setHeaderLogo', {
      headerLogoShow: false
    })
    this.$store.commit('setShadowActive', {
      headerShadowActive: false
    })
    this.$store.commit('setNavDarkActive', {
      navDarkActive: true
    })
    this.$store.commit('setHeaderShow', {
      headerShow: false
    })
  }
}
</script>

<style scoped>
.customer_header{
  background-color: rgba(255, 255, 255, .7);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #eff0f1;
}
.box {
  padding-top: 60px;
}
</style>
