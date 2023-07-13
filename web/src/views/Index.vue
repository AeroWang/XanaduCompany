<template>
  <div class="index">
    <AwHeader :class="index_header"></AwHeader>
    <div class="banner-wrap">
      <Banner :banner-height="BannerHeight"></Banner>
      <over-lay></over-lay>
      <scroll-hint v-scroll-to="{ element: '.wrap-block', duration: 300, easing: 'ease', offset: 1 }"></scroll-hint>
    </div>
    <index-service></index-service>
    <AwFooter></AwFooter>
  </div>
</template>
<script lang="ts" setup name="Home">
import AwHeader from '@/components/public/Header.vue'
import AwFooter from '@/components/public/Footer.vue'
import OverLay from '@/components/OverLayText.vue'
import IndexService from '@/components/IndexService.vue'
import Banner from '@/components/Banner.vue'
import ScrollHint from '@/components/ScrollHint.vue'

import { onMounted, onUnmounted, ref } from 'vue'

import mainStore from '@/store'

const index_header = ref('')
const BannerHeight = ref(0)

const scrollTop = ref(0)

onMounted(() => {
  window.addEventListener('resize', setBannerHeight)
  setBannerHeight()
  window.addEventListener('scroll', scrollHandle)
})

onUnmounted(() => {
  window.removeEventListener('resize', setBannerHeight)
  window.removeEventListener('scroll', scrollHandle)
})

function setBannerHeight () {
  BannerHeight.value = window.innerHeight
  mainStore.commit('setBannerHeight', {
    bannerHeight: BannerHeight.value
  })
}

function scrollHandle () {
  scrollTop.value = document.documentElement.scrollTop ||
    window.pageYOffset ||
    document.body.scrollTop
  if (scrollTop.value <= BannerHeight.value - 35) {
    mainStore.commit('setHeaderLogo', {
      headerLogoShow: true
    })
    mainStore.commit('setShadowActive', {
      headerShadowActive: false
    })
    mainStore.commit('setNavDarkActive', {
      navDarkActive: false
    })
  } else {
    mainStore.commit('setHeaderLogo', {
      headerLogoShow: false
    })
    mainStore.commit('setShadowActive', {
      headerShadowActive: true
    })
    mainStore.commit('setNavDarkActive', {
      navDarkActive: true
    })
  }
}
</script>
<style lang="less" scoped>
.banner-wrap {
  overflow: hidden;
  position: relative;
}

.overlay {
  z-index: 666;
}

.wrap-block {
  position: relative;
  padding-top: 54px;
}
</style>
