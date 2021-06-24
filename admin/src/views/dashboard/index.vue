<template>
  <div class="welcome">
    <el-row>
      <el-card>
        <el-row>
          <el-col :span="3">
            <el-avatar
              :size="100"
              :src="basicInfo.avatar"
              fit="scale-down"
            />
          </el-col>
          <el-col :span="16">
            <h3>{{ getTimeState().before }} {{ basicInfo.accountName }} ，{{ getTimeState().after }} </h3>
            <p>{{ basicInfo.description }}</p>
          </el-col>
          <el-col
            v-if="!flag"
            :span="4"
          >
            <div class="wxQr">
              <h4>扫码关注公众号</h4>
              <el-image
                style="width: 100px; height: 100px"
                :src="weixinQr"
                contain
              />
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
    <el-row class="product-carousel">
      <el-card>
        <h2>产品预览</h2>
        <el-carousel
          :interval="4000"
          type="card"
        >
          <el-carousel-item
            v-for="(item,index) in productData"
            :key="index"
          >
            <el-image
              :src="item.bgImg"
              fit="cover"
            />
          </el-carousel-item>
        </el-carousel>
      </el-card>
    </el-row>
    <el-row
      v-if="flag"
      class="tongji"
    >
      <el-card>
        <el-col :span="12">
          <h3>用户注册量统计</h3>
          <div
            id="registerChart"
            ref="registerChart"
            style="width:500px;height:300px"
          />
        </el-col>
        <el-col :span="12">
          <h3>访问量统计</h3>
          <div
            id="fwChart"
            ref="fwChart"
            style="width:500px;height:300px"
          />
        </el-col>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {getInfoById} from '@/api/user'
import {getProductList} from '@/api/product'
// import {getTongJiCount} from '@/api/tonji'
import * as echarts from 'echarts/core'
import {
  TooltipComponent,
  GridComponent
} from 'echarts/components'
import {
  BarChart
} from 'echarts/charts'
import {
  CanvasRenderer
} from 'echarts/renderers'

echarts.use(
  [TooltipComponent, GridComponent, BarChart, CanvasRenderer]
)
export default {
  name: 'Dashboard',
  data() {
    return {
      basicInfo: {
        avatar: '',
        name: '',
        accountName: '',
        sex: '',
        description: '',
      },
      flag: true,
      weixinQr: require('../../assets/img/qr_weixin.png'),
      productData: '',
      registerCount: '',
      registerChartOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['05/21', '05/29', '06/01', '06/10', '06/12', '06/13'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '注册量',
            type: 'bar',
            barWidth: '30%',
            data: [10, 9, 10, 15, 8, 25]
          }
        ]
      },
      fwChartOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['05/21', '05/29', '06/01', '06/10', '06/12', '06/13'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '访问量（PV）',
            type: 'bar',
            barWidth: '30%',
            data: [100, 99, 62, 123, 163, 180]
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ]),
    editId() {
      return this.$store.getters.id
    },
    roleName() {
      return JSON.parse(JSON.stringify(this.$store.getters.roles))
    }
  },
  mounted() {
    this.getAccountInfo()
    this.registerChart()
    this.fwChart()
    console.log(this.roleName[0])
    if (this.roleName[0] !== '管理员') {
      this.flag = false
      this.$message({
        showClose: true,
        message: `你当前的角色为 ${this.roleName}，如果需要体验管理员权限，请查看公众号，谢谢`,
        type: 'warning',
        duration: 0
      })
    }
  },
  // 每次进入路有前，重新获取数据
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getAccountInfo()
      vm.getProductList()
      // vm.getTonJi()
    })
  },
  methods: {
    getTimeState() {
      // 获取当前时间
      let timeNow = new Date()
      // 获取当前小时
      let hours = timeNow.getHours()
      // 设置默认文字
      let state = {}
      // 判断当前时间段
      if (hours >= 0 && hours <= 11) {
        state.before = `上午好`
        state.after = `要开心每一天啊。`
      } else if (hours > 11 && hours <= 13) {
        state.before = `中午好`
        state.after = `忙碌了一上午，记得休息一下哦。`
      } else if (hours > 13 && hours <= 18) {
        state.before = `下午好`
        state.after = `你可能有些累了，喝杯咖啡提提神吧 。`
      } else if (hours > 18 && hours <= 24) {
        state.before = `晚上好`
        state.after = `愿你天黑有灯，下雨有伞。`
      }
      return state
    },
    // 获取账户信息
    getAccountInfo() {
      getInfoById(this.editId).then(response => {
        const res = response.data
        if (res.status === 200) {
          this.basicInfo = res.data
        } else {
          this.$message.error('获取账户信息失败')
        }
      })
    },
    getProductList() {
      getProductList().then(response => {
        const res = response.data
        if (res.status === 200) {
          this.productData = res.data.list
          // this.$message.success('获取产品列表成功')
          console.log(this.productData)
        } else {
          this.$message.error('获取产品列表失败')
        }
      })
    },
    registerChart() {
      const registerChart = this.$refs.registerChart  //通过ref获取到DOM节点
      const thisRegisterChart = echarts.init(registerChart)  //利用原型调取Echarts的初始化方法
      thisRegisterChart.setOption(this.registerChartOption)  //将编写好的配置项挂载到Echarts上
      window.addEventListener("resize", function () {
        thisRegisterChart.resize()  //页面大小变化后Echarts也更改大小
      })
    },
    fwChart() {
      const fwChart = this.$refs.fwChart  //通过ref获取到DOM节点
      const thisFwChart = echarts.init(fwChart)  //利用原型调取Echarts的初始化方法
      thisFwChart.setOption(this.fwChartOption)  //将编写好的配置项挂载到Echarts上
      window.addEventListener("resize", function () {
        thisFwChart.resize()  //页面大小变化后Echarts也更改大小
      })
    }
  }

}
</script>

<style lang = "scss" scoped>
.welcome {
  margin: 20px;
  position: relative;
}

.el-row {
  width: 100%;
}

.el-avatar {
  margin-left: 20px;
}

.product-carousel {
  margin-top: 30px;
}

.tongji {
  margin-top: 30px;
}

.wxQr {
  h4 {
    margin: 0;
  }

  text-align: center;
}
</style>
