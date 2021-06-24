<!--<template>-->
<!--  <div class = "login">-->
<!--    <AwHeader class = "login_header" ref = "login_header"></AwHeader>-->
<!--    &lt;!&ndash;<nav :class = "nav_show"></nav>&ndash;&gt;-->
<!--    <div class = "box">-->
<!--      <img :src = "backgroundImg" alt = "" class = "background-img">-->
<!--      <el-card class = "container-login" ref = "loginCard">-->
<!--        <div class = "headerToggle">-->
<!--          <h2>登录</h2>-->
<!--          <span class = "pull-right">没有账号？<router-link to = "/signup">点击注册</router-link></span>-->
<!--        </div>-->
<!--        &lt;!&ndash;  登录表单区域&ndash;&gt;-->
<!--        <el-form ref = "loginFormRef" :model = "loginForm" :rules = "loginFormRules"-->
<!--                 label-width = "0" class = "login_form">-->
<!--          &lt;!&ndash;用户名&ndash;&gt;-->
<!--          <el-form-item prop = "username">-->
<!--            <el-input placeholder = "用户名" v-model = "loginForm.username" prefix-icon = "el-icon-user-solid"></el-input>-->
<!--          </el-form-item>-->
<!--          &lt;!&ndash;密码&ndash;&gt;-->
<!--          <el-form-item prop = "password">-->
<!--            <el-input placeholder = "密码" type = "password" v-model = "loginForm.password"-->
<!--                      prefix-icon = "el-icon-lock"></el-input>-->
<!--          </el-form-item>-->
<!--          &lt;!&ndash;  按钮区域&ndash;&gt;-->
<!--          <el-form-item class = "btns">-->
<!--            <el-button round type = "primary" @click = "login">登录</el-button>-->
<!--            <el-button round type = "info" @click = "resetLoginForm">重置</el-button>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--      </el-card>-->
<!--      <router-view></router-view>-->
<!--    </div>-->
<!--    <AwFooter></AwFooter>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import AwHeader from '../../components/web/public/Header'-->
<!--import AwFooter from '../../components/web/public/Footer'-->
<!--import { mapState } from 'vuex'-->

<!--export default {-->
<!--  name: 'index',-->
<!--  components: {-->
<!--    AwFooter,-->
<!--    AwHeader-->
<!--  },-->
<!--  data () {-->
<!--    return {-->
<!--      nav_show: '',-->
<!--      backgroundImg: require('../../assets/img/banner1.jpg'),-->
<!--      // 这是登录表单-->
<!--      loginForm: {-->
<!--        username: '',-->
<!--        password: ''-->
<!--      },-->
<!--      // 这是表单的验证规则对象-->
<!--      loginFormRules: {-->
<!--        // 验证用户名名是否合法-->
<!--        username: [-->
<!--          {-->
<!--            required: true,-->
<!--            message: '请输入登录名称',-->
<!--            trigger: 'blur'-->
<!--          },-->
<!--          {-->
<!--            min: 3,-->
<!--            max: 10,-->
<!--            message: '长度在 3 到 10 个字符',-->
<!--            trigger: 'blur'-->
<!--          }-->
<!--        ],-->
<!--        // 验证密码是狗合法-->
<!--        password: [-->
<!--          {-->
<!--            required: true,-->
<!--            message: '请输入密码',-->
<!--            trigger: 'blur'-->
<!--          },-->
<!--          {-->
<!--            min: 6,-->
<!--            max: 15,-->
<!--            message: '长度在 6 到 15 个字符',-->
<!--            trigger: 'blur'-->
<!--          }-->
<!--        ]-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  computed: mapState(['BannerHeight']),-->
<!--  methods: {-->
<!--    // 点击重置按钮，重置登录表单-->
<!--    resetLoginForm () {-->
<!--      // console.log(this)-->
<!--      this.$refs.loginFormRef.resetFields()-->
<!--    },-->
<!--    login () {-->
<!--      this.$refs.loginFormRef.validate(async (valid) => {-->
<!--        // console.log(this.loginForm)-->
<!--        if (!valid) return-->
<!--        const { data: res } = await this.$http.post('/web/login', this.loginForm)-->
<!--        console.log(res)-->
<!--        if (res.status !== 200) {-->
<!--          return this.$message.error('登录失败')-->
<!--        } else {-->
<!--          this.$message.success('登录成功')-->
<!--          // console.log(res)-->
<!--          // 1、保存 token 到 sessionStorage 中-->
<!--          window.sessionStorage.setItem('token', res.data.token)-->

<!--          // 2、编程式导航：页面跳转-->
<!--          await this.$router.push('/admin')-->
<!--          // this.$store.commit('setNavDarkActive', {-->
<!--          //   navDarkActive: false-->
<!--          // })-->
<!--        }-->
<!--      })-->
<!--    }-->
<!--  },-->
<!--  mounted () {-->
<!--    this.$store.commit('setHeaderLogo', {-->
<!--      headerLogoShow: false-->
<!--    })-->
<!--    this.$store.commit('setShadowActive', {-->
<!--      headerShadowActive: false-->
<!--    })-->
<!--    this.$store.commit('setNavDarkActive', {-->
<!--      navDarkActive: true-->
<!--    })-->
<!--    this.$store.commit('setHeaderShow', {-->
<!--      headerShow: false-->
<!--    })-->
<!--  },-->
<!--  beforeRouteLeave (to, from, next) {-->
<!--    // 导航离开该组件的对应路由时调用-->
<!--    // 可以访问组件实例 `this`-->
<!--    if (from.name === 'login') {-->
<!--      this.$store.commit('setNavDarkActive', {-->
<!--        navDarkActive: false-->
<!--      })-->
<!--      this.$store.commit('setHeaderLogo', {-->
<!--        headerLogoShow: true-->
<!--      })-->
<!--      next()-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style lang = "less" scoped>-->
<!--.login {-->
<!--  //min-height: 800px;-->
<!--  position: relative;-->
<!--}-->

<!--.login_header {-->
<!--  background-color: rgba(255, 255, 255, .3);-->
<!--  backdrop-filter: blur(10px);-->
<!--  //border-bottom: 1px solid #f8f8f8;-->
<!--}-->

<!--.box {-->
<!--  //padding-top: 60px;-->
<!--  width: 100%;-->
<!--  height: 763px;-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--  position: relative;-->
<!--}-->

<!--.background-img {-->
<!--  height: 100%;-->
<!--  width: 100%;-->
<!--  object-fit: cover;-->
<!--  position: absolute;-->
<!--  z-index: -1;-->
<!--}-->

<!--.container-login {-->
<!--  min-width: 480px;-->
<!--  margin-bottom: 50px;-->
<!--  padding: 35px;-->
<!--  background-color: rgba(255, 255, 255, .1);-->
<!--  backdrop-filter: blur(5px);-->
<!--  border: none;-->

<!--  .headerToggle {-->
<!--    display: flex;-->
<!--    justify-content: space-between;-->
<!--    align-items: flex-end;-->
<!--    margin-bottom: 24px;-->
<!--  }-->

<!--  h2 {-->
<!--    font-size: 24px;-->
<!--    font-weight: 600;-->
<!--  }-->

<!--  /deep/ .el-form-item__content {-->
<!--    display: flex;-->
<!--    justify-content: space-between;-->
<!--    margin: 0 auto;-->

<!--    .el-button {-->
<!--      //margin-right: 80px;-->
<!--    }-->

<!--    .el-input__inner {-->
<!--      background-color: rgba(255, 255, 255, .5);-->
<!--      border: none;-->
<!--    }-->

<!--    input::placeholder {-->
<!--      color: #818181;-->
<!--    }-->
<!--  }-->

<!--  .pull-right {-->
<!--  }-->
<!--}-->
<!--</style>-->
<template>
  <div></div>
</template>
<script>
export default {
  name: 'login',
  mounted () {
    // const devUrl = 'http://localhost:9000/admin/#/login'
    const prodUrl = 'https://xanadu.aerowang.cn/admin/#/login'
    window.open(prodUrl, '_blank')
    this.$router.push('/index')
  }
}
</script>
