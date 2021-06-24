<template>
  <div>
    <AwHeader class = "product_header"></AwHeader>
    <div class = "product">
      <ul class = "product-fullpage-indicator">
        <li
          v-for = "(item, index) in products"
          :key = "item.id"
          class = "product-fullpage-indicator-item"
          :class = "{ active: activeIndex === index }"
          @click = "activeIndex = index"
        >
          <img :src = "item.product_logo" alt/>
        </li>
      </ul>
      <transition :duration = "duration" :name = "transitionName">
        <!-- ... the buttons ... -->
        <div
          :key = "activeIndex"
          class = "view-wrapper"
          v-if = "!loading"
          :style = "`backgroundImage:url(${item.cover_img})`"
        >
          <div class = "content">
            <div class = "logo">
              <img :src = "item.product_logo" width = "100%" height = "100%" alt/>
            </div>
            <h2>{{ item.product_title }}</h2>
            <div class = "description">
              <p>{{ item.product_desc }}</p>
              <p>
                {{ item.product_sub_desc }}
              </p>
              <p>更多信息，请访问：</p><a :href = "item.link" target = "_blank">{{ item.product_link }}</a>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>

</template>
<script>
import AwHeader from '../../components/web/public/Header'

export default {
  name: 'product',
  components: {
    AwHeader
  },
  data () {
    return {
      products: [],
      activeIndex: 0,
      transitionName: '',
      scrolling: false,
      duration: 1000,
      loading: false
    }
  },
  watch: {
    activeIndex (newIndex, oldIndex) {
      if (this.scrolling) {
        return
      }
      // if (this.$route.params.id) {
      //   delete this.$route.params.id
      //   return
      // }
      this.transitionName = newIndex < oldIndex ? 'move-down' : 'move-up'
    }
  },
  async created () {
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
    this.loading = true
    const { data: res } = await this.$http.get('/web/products')
    if (res.status === 200) {
      this.products = res.data.list
      this.loading = false
      // loading.close()
      // if (this.$route.params.id) {
      //   console.log(true)
      //   this.activeIndex = this.products.findIndex(
      //     item => item.id === this.$route.params.id
      //   )
      // }
    }
  },
  mounted () {
    window.addEventListener('mousewheel', this.mousewheelHandler)
    window.addEventListener('DOMMouseScroll', this.mousewheelHandler)
  },
  destroyed () {
    window.removeEventListener('mousewheel', this.mousewheelHandler)
    window.removeEventListener('DOMMouseScroll', this.mousewheelHandler)
  },
  computed: {
    item () {
      return this.products[this.activeIndex] || {}
    }
  },
  methods: {
    mousewheelHandler (e) {
      if (this.scrolling) {
        return
      }
      // e 事件对象
      // console.log(e)
      this.scrolling = true
      if (e.wheelDelta > 0 || e.detail < 0) {
        // 列表向上滚动，即鼠标滚轮向上滚动
        this.transitionName = 'move-down'
        // 第一个向上滑动后滑动直接滑动到最后一项
        this.activeIndex =
          this.activeIndex === 0
            ? this.products.length - 1
            : this.activeIndex - 1
      } else {
        this.transitionName = 'move-up'
        this.activeIndex = (this.activeIndex + 1) % this.products.length
        // console.log(this.activeIndex)
      }
      // 持续滚动滚轮时间 this.duration ，再触发下一页
      setTimeout(() => {
        this.scrolling = false
      }, this.duration)
    }
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    if (from.name === 'product') {
      this.$store.commit('setNavDarkActive', {
        navDarkActive: false
      })
      this.$store.commit('setHeaderLogo', {
        headerLogoShow: true
      })
      next()
    }
  }
}
</script>
<style lang = "less" scoped>
.product_header {
  background-color: rgba(255, 255, 255, .7);
  backdrop-filter: blur(10px);
}

.product {
  position: fixed;
  z-index: -1;
  top: 60px;
  right: 0;
  left: 0;
  bottom: 0;
  min-height: 600px;
  min-width: 700px;

  &-fullpage-indicator {
    position: absolute;
    z-index: 333;
    right: 50px;
    top: 50%;
    transform: translateY(-50%);

    &-item {
      margin: 22px 0;
      width: 5vh;
      height: 5vh;
      min-height: 30px;
      min-width: 30px;
      cursor: pointer;
      transition: all 0.3s;
      border-radius: 50%;
      overflow: hidden;

      &:hover,
      &.active {
        transform: scale(1.3);

        box-shadow: 0 0 14px 0 @box-shadow-dark-color;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .view-wrapper {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: absolute;
    height: 100vh;
    width: 100%;
    // padding-top: 100px;
    padding-left: 100px;

    .content {
      width: 300px;
      transform: translateY(-60%);
      position: absolute;
      top: 50%;
      // text-align: center;
      .logo {
        width: 80px;
        height: 80px;
      }

      h2 {
        margin-top: 32px;
        line-height: 32px;
        font-size: 28px;
        color: #1f2329;
      }

      .description {
        margin-top: 24px;
        line-height: 26px;
        font-size: 14px;
        color: #1f2329;

        p + p {
          margin-top: 16px;
        }
      }
    }
  }
}

.move-up-leave-active {
  -webkit-animation: outUp .7s cubic-bezier(.66, 0, .34, 1);
  animation: outUp .7s cubic-bezier(.66, 0, .34, 1);
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  -ms-transform: scale(1);
  transform: scale(1);
}

.move-up-enter-active {
  -webkit-animation: inUp .7s cubic-bezier(.66, 0, .34, 1);
  animation: inUp .7s cubic-bezier(.66, 0, .34, 1);
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
}

.move-down-leave-active {
  -webkit-animation: outDown .7s cubic-bezier(.66, 0, .34, 1);
  animation: outDown .7s cubic-bezier(.66, 0, .34, 1);
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  -ms-transform: translateY(0);
  transform: translateY(0);
}

.move-down-enter-active {
  -webkit-animation: inDown .7s cubic-bezier(.66, 0, .34, 1);
  animation: inDown .7s cubic-bezier(.66, 0, .34, 1);
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  -ms-transform: scale(.6);
  transform: scale(.6);
}

.move-up-enter {
  animation: inUp .7s cubic-bezier(.66, 0, .34, 1);
  animation-fill-mode: forwards;
}

.move-down-leave-to {
  -webkit-animation: outDown .7s cubic-bezier(.66, 0, .34, 1);
  animation: outDown .7s cubic-bezier(.66, 0, .34, 1);
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  -ms-transform: translateY(0);
  transform: translateY(0);
}

.move-up-enter-active, .move-down-enter-active {
  .logo {
    -webkit-animation: slideUpIn30 .77s .4s;
    animation: slideUpIn30 .77s .4s;
  }

  h2 {
    -webkit-animation: slideUpIn150 .77s .4s;
    animation: slideUpIn150 .77s .4s;
  }

  .description {
    -webkit-animation: slideUpIn100px .77s .4s;
    animation: slideUpIn100px .77s .4s;
  }
}

@keyframes inUp {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  60% {
    opacity: 0.1;
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes outUp {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    opacity: 0.1;
  }
  100% {
    transform: translateY(-100%);
    opacity: 0;
  }
}

@keyframes inDown {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  60% {
    opacity: 0.1;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes outDown {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    opacity: 0.1;
  }
  100% {
    opacity: 0;
    transform: translateY(100%);
  }
}

@keyframes slideUpIn30 {
  0% {
    transform: translate3d(0, 30%, 0);
    visibility: hidden;
  }
  100% {
    transform: translateZ(0);
    visibility: visible;
  }
}

@keyframes slideUpIn150 {
  0% {
    transform: translate3d(0, 150%, 0);
    visibility: hidden;
  }
  100% {
    transform: translateZ(0);
    visibility: visible;
  }
}

@keyframes slideUpIn100px {
  0% {
    transform: translate3d(0, 100px, 0);
    visibility: hidden;
  }
  100% {
    transform: translateZ(0);
    visibility: visible;
  }
}
</style>
