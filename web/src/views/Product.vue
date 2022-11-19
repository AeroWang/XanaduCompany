<template>
  <div>
    <AwHeader class="product_header"></AwHeader>
    <div class="product">
      <ul class="product-fullpage-indicator">
        <li v-for="(item, index) in products" :key="item.id" class="product-fullpage-indicator-item"
          :class="{ active: activeIndex === index }" @click="activeIndex = index">
          <img :src="item.product_logo" alt="产品 logo" />
        </li>
      </ul>
      <transition :duration="duration" :name="transitionName">
        <!-- ... the buttons ... -->
        <div :key="activeIndex" class="view-wrapper" v-if="!loading" :style="`backgroundImage:url(${item.cover_img})`">
          <div class="content">
            <div class="logo">
              <img :src="item.product_logo" width="100%" height="100%" alt="" />
            </div>
            <h2>{{ item.product_title }}</h2>
            <div class="description">
              <p>{{ item.product_desc }}</p>
              <p>
                {{ item.product_sub_desc }}
              </p>
              <p>更多信息，请访问：</p><a :href="item.link" target="_blank">{{ item.product_link }}</a>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script lang="ts" setup>
import AwHeader from '@/components/public/Header.vue'
import mainStore from '@/store'
import { computed, onBeforeMount, ref, watch } from 'vue'
import { getProductLit } from '@/apis/product'
import { onBeforeRouteLeave } from 'vue-router'

const loading = ref(false)
const products = ref<Array<any>>([])
const activeIndex = ref(0)
const transitionName = ref('')
const scrolling = ref(false)
const duration = ref(1000)

const item = computed(() => products.value[activeIndex.value] || {})

watch(() => activeIndex.value, (newIndex, oldIndex) => {
  if (scrolling.value) {
    return
  }
  transitionName.value = newIndex < oldIndex ? 'move-down' : 'move-up'
})

onBeforeMount(async () => {
  mainStore.commit('setHeaderLogo', {
    headerLogoShow: false
  })
  mainStore.commit('setShadowActive', {
    headerShadowActive: false
  })
  mainStore.commit('setNavDarkActive', {
    navDarkActive: true
  })
  mainStore.commit('setHeaderShow', {
    headerShow: false
  })
  loading.value = true
  const { data: res } = await getProductLit()
  if (res.status === 200) {
    products.value = res.data.list
    loading.value = false
  }
})

function mousewheelHandler (e: Event) {
  if (scrolling.value) {
    return
  }
  scrolling.value = true
  // @ts-ignore
  if (e.wheelDelta > 0 || e.detail < 0) {
    transitionName.value = 'move-down'
    activeIndex.value =
      activeIndex.value === 0
        ? products.value.length - 1
        : activeIndex.value - 1
  } else {
    transitionName.value = 'move-up'
    activeIndex.value = (activeIndex.value + 1) % products.value.length
  }
  setTimeout(() => {
    scrolling.value = false
  }, duration.value)
}

onBeforeRouteLeave((to, from, next) => {
  if (from.name === 'Product') {
    mainStore.commit('setNavDarkActive', {
      navDarkActive: false
    })
    mainStore.commit('setHeaderLogo', {
      headerLogoShow: true
    })
    next()
  }
})
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

        box-shadow: 0 0 14px 0
          /*@box-shadow-dark-color*/
        ;
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

        p+p {
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

.move-up-enter-active,
.move-down-enter-active {
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
