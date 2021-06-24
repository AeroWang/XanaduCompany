<template>
  <div class = "index">
    <AwHeader :class = "index_header"></AwHeader>
    <div class = "banner-wrap">
      <Banner :BannerHeight = "BannerHeight"></Banner>
      <over-lay></over-lay>
      <scroll-hint
        v-scroll-to = "{ element: '.wrap-block',duration: 300, easing: 'ease',offset: 1  }"></scroll-hint>
    </div>
    <index-service></index-service>
    <AwFooter></AwFooter>
  </div>
</template>

<script>
import Banner from '../../components/web/Banner'
import ScrollHint from '../../components/web/scrollHint'
import OverLay from '../../components/web/overLayText'
import AwHeader from '../../components/web/public/Header'
import AwFooter from '../../components/web/public/Footer'
import IndexService from '../../components/web/IndexService'

export default {
  name: 'index',
  components: {
    IndexService,
    Banner,
    ScrollHint,
    OverLay,
    AwFooter,
    AwHeader
  },
  data () {
    return {
      BannerHeight: '',
      index_header: ''
    }
  },
  methods: {
    // 设置 Banner 高度
    setBannerHeight () {
      this.BannerHeight = window.innerHeight
      // 接管组件公用数据
      // index 与 Header 组件 共用 BannerHeight
      this.$store.commit('setBannerHeight', {
        bannerHeight: this.BannerHeight
      })
    },
    scrollHandle () {
      this.scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop
      if (this.scrollTop <= this.BannerHeight - 35) {
        this.$store.commit('setHeaderLogo', {
          headerLogoShow: true
        })
        this.$store.commit('setShadowActive', {
          headerShadowActive: false
        })
        this.$store.commit('setNavDarkActive', {
          navDarkActive: false
        })
      } else {
        this.$store.commit('setHeaderLogo', {
          headerLogoShow: false
        })
        this.$store.commit('setShadowActive', {
          headerShadowActive: true
        })
        this.$store.commit('setNavDarkActive', {
          navDarkActive: true
        })
      }
      // 滚动条滚动的距离
      const scrollStep = this.scrollTop - this.oldScrollTop
      // 更新——滚动前，滚动条距文档顶部的距离
      this.oldScrollTop = this.scrollTop
      if (scrollStep >= 0) {
        this.$store.commit('setHeaderShow', {
          headerShow: true
        })
      } else {
        this.$store.commit('setHeaderShow', {
          headerShow: false
        })
      }
    }
  },
  mounted () {
    // 页面创建时执行一次getHeight进行赋值，顺道绑定resize事件
    window.addEventListener('resize', this.setBannerHeight)
    this.setBannerHeight()
    window.addEventListener('scroll', this.scrollHandle) // 绑定页面的滚动事件
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.scrollHandle)
  }
}
</script>

<style lang = "less" scoped>
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
