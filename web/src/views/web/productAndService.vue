<template>
  <div class = "product">
    <AwHeader class = "product_header" ref = "product_header"></AwHeader>
    <div class = "productSider">
      <div class = "productSider-list">
        <div class = "productSider-item productSider-item-active">
          <img class = "productSider-item-img"
               src = "https://sf3-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/icon_circle/toutiao_1577264424770.png"
               alt = "今日头条">
        </div>
      </div>
    </div>
    <div class = "productAndService-list">
      <div class = "productMain fullpage-scroll-element init-show-without-animate">
        <div class = "productMainContent">
          <div class = "img-wrapper" style = "background-image:url('https://sf1-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/toutiao_new_2.png') ;
                "></div>
          <div class = "content-wrapper">
            <div class = "productMain-left">
              <div class = "productMain-squareLogo">
                <img
                  src = "http://sf1-ttcdn-tos.pstatp.com/obj/ttfe/ATSX/mainland/toutiao_square_logo_1577262251819.png"
                  alt = "">
              </div>
              <div class = "productMain-name">今日头条</div>
              <div class = "productMain-desc">
                <p>今日头条是一款个性化资讯推荐引擎产品，致力于连接人与信息，让优质、丰富的信息得到高效、精准的分发，为用户创造价值。<br><br>
                  今日头条目前拥有科技、体育、健康、美食、教育、三农、国风、NBA 等超过 100 个垂直领域，覆盖了图文、图集、小视频、短视频、短内容、直播、小程序等多种信息体裁。
                  <br><br>
                  更多信息，请访问：
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AwFooter></AwFooter>
  </div>
</template>

<script>
import AwHeader from '../../components/web/public/Header'
import AwFooter from '../../components/web/public/Footer'

export default {
  name: 'product',
  components: {
    AwFooter,
    AwHeader
  },
  data () {
    return {
      screenWeight: 0, // 屏幕宽度
      screenHeight: 0, // 屏幕高度
      index: 1, // 用于判断翻页
      curIndex: 1, // 当前页的index
      startTime: 0, // 翻屏起始时间
      endTime: 0, // 上一次翻屏结束时间
      nowTop: 0, // 翻屏后top的位置
      pageNum: 0, // 一共有多少页
      main: Object,
      obj: Object
    }
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
  },
  methods: {}
}
</script>

<style lang = "less" scoped>
.product {
  //height: 100%;
}

.product * {
  box-sizing: border-box;
}

.product_header {
  background-color: rgba(255, 255, 255, .7);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #eff0f1;
}

.box {
  top: 60px;
  position: relative;
  width: 100%;
  height: calc(100vh - 60px);
  min-width: 1024px;
  min-height: 600px;
  overflow-y: hidden;
  overflow-x: hidden;

  .productAndService-list {
    height: 100%;
    margin: 0 auto;
  }

}

.productSider {
  position: absolute;
  //top: calc(4vh - 13.05px);
  top: 4vh;
  //bottom: calc(4vh - 13.05px);
  bottom: 4vh;
  right: 7.3%;
  z-index: 2;

  .productSider-list {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-pack: distribute;
    justify-content: flex-start;
    height: 100%;
  }

  .productSider-item {
    width: 5vh;
    height: 5vh;
    min-width: 30px;
    min-height: 30px;
    border-radius: 50%;
    cursor: pointer;
    transition: all .2s ease-in-out;
  }

  .productSider-item-img {
    width: 100%;
    height: 100%;
  }

  .productSider-item.productSider-item-active, .productSider-item:hover {
    box-shadow: 0 9px 18px 0 rgb(0 0 0 / 15%);
    transform: scale(1.5);
  }
}

.productMain {
  width: 100%;
  height: 100%;

  .productMainContent {
    position: relative;
    height: 100%;
  }

  .img-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-size: cover;
    background-position: 50%;
  }

  .content-wrapper {
    height: 100%;
    padding: 0 6.6%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .productMain-left {
    width: 400px;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .productMain-squareLogo {
    width: 80px;
    height: 80px;
  }

  .productMain-squareLogo img {
    width: 100%;
    height: 100%;
  }
}

.fullpage-scroll-element {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  opacity: 0;
}

.active-page, .init-show-without-animate, .move-in-direction-0, .move-in-direction-1 {
  opacity: 1;
  z-index: 1;
}

.active-page .productMain-squareLogo, .move-in-direction-0 .productMain-squareLogo, .move-in-direction-1 .productMain-squareLogo {
  //-webkit-animation: slideUpIn30 .77s .4s;
  animation: slideUpIn30 .77s .4s;
}

.active-page .productMain-name, .move-in-direction-0 .productMain-name, .move-in-direction-1 .productMain-name {
  //-webkit-animation: slideUpIn150 .77s .4s;
  animation: slideUpIn150 .77s .4s;
}

.active-page .productMain-desc, .move-in-direction-0 .productMain-desc, .move-in-direction-1 .productMain-desc {
  //-webkit-animation: slideUpIn100px .77s .4s;
  animation: slideUpIn100px .77s .4s;
}

.move-out-direction-0, .move-out-direction-1 {
  z-index: 0;
  opacity: 1;
}

.move-in-direction-1 {
  //-webkit-animation: inUp .7s cubic-bezier(.66,0,.34,1);
  animation: inUp .7s cubic-bezier(.66, 0, .34, 1);
  //-webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
}

.move-out-direction-1 {
  //-webkit-animation: outUp .7s cubic-bezier(.66,0,.34,1);
  animation: outUp .7s cubic-bezier(.66, 0, .34, 1);
  //-webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  //-ms-transform: scale(1);
  transform: scale(1);
}
</style>
