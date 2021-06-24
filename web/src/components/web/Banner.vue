<template>
  <div class = "banner">
    <div class = "Limit">
      <el-carousel :interval = "2000" arrow = "hover" :height = "BannerHeight+ 'px' " :autoplay = "true"
                   ref = "carousel" trigger = "click" indicator-position = "none">
        <el-carousel-item v-for = "item in imgList" :key = "item.id">
          <div class = "img_con">
            <div class = "img_cover"></div>
            <img class = "element-img" alt = "" :src = "item.imgUrl">
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  props: ['BannerHeight'],
  data () {
    return {
      imgList: [
        {
          id: 0,
          imgUrl: 'https://cdn.jsdelivr.net/gh/xanaduwang/aerowang/img/20210604161353.jpg'
        },
        {
          id: 1,
          imgUrl: 'https://cdn.jsdelivr.net/gh/xanaduwang/aerowang/img/20210604161737.jpg'
        },
        {
          id: 2,
          imgUrl: 'https://cdn.jsdelivr.net/gh/xanaduwang/aerowang/img/20210604161757.png'
        },
        {
          id: 3,
          imgUrl: 'https://cdn.jsdelivr.net/gh/xanaduwang/aerowang/img/20210604161818.jpg'
        }, {
          id: 4,
          imgUrl: 'https://cdn.jsdelivr.net/gh/xanaduwang/aerowang/img/20210604161834.jpg'
        }
      ]
    }
  }
}
</script>

<style lang = "less" scoped>
//.img_cover{
//  width: 100%;
//  height: 100%;
//  background: rgba(51,112,255,.2);
//}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.img_con {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  :after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(51, 112, 255, .2);
    height: 100%;
    z-index: 666;
  }
}

.element-img {
  width: 100%;
  height: 100%;
  object-fit: cover;

}

/deep/ .el-carousel__arrow {
  width: 40px;
  height: 40px;
  font-size: 30px;
  background-color: rgba(255, 255, 255, .1);
}

/deep/ .el-carousel__arrow:hover {
  background-color: rgba(255, 255, 255, .3);
}
</style>
