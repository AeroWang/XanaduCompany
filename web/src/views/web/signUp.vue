<template>
  <div class = "signup">
    <AwHeader class = "signup_header" ref = "signup_header"></AwHeader>
    <!--<nav :class = "nav_show"></nav>-->
    <div class = "box">
      <img :src = "backgroundImg" alt = "" class = "background-img">
      <el-card class = "container-signup" ref = "signupCard">
        <div class = "headerToggle">
          <h2>注册</h2>
          <span class = "pull-right">已有账号？<router-link to = "/login">点击登录</router-link></span>
        </div>
        <!--  注册表单区域-->
        <el-form ref = "signupFormRef" :model = "signupForm" :rules = "signupFormRules"
                 label-width = "0" class = "signup_form">
          <!--用户名-->
          <el-form-item prop = "username">
            <el-input placeholder = "用户名" v-model = "signupForm.username" prefix-icon = "el-icon-user-solid"></el-input>
          </el-form-item>
          <!--密码-->
          <el-form-item prop = "password">
            <el-input placeholder = "密码" type = "password" v-model = "signupForm.password"
                      prefix-icon = "el-icon-lock"></el-input>
          </el-form-item>
          <el-form-item prop = "rePassword">
            <el-input placeholder = "重复密码" type = "password" v-model = "signupForm.rePassword"
                      prefix-icon = "el-icon-lock"></el-input>
          </el-form-item>
          <!--  按钮区域-->
          <el-form-item class = "btns">
            <el-button round type = "primary" @click = "signup">注册</el-button>
            <el-button round type = "info" @click = "resetSignUpForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <router-view></router-view>
    </div>
    <AwFooter></AwFooter>
  </div>
</template>

<script>
import AwHeader from '../../components/web/public/Header'
import AwFooter from '../../components/web/public/Footer'
import { mapState } from 'vuex'

export default {
  name: 'index',
  components: {
    AwFooter,
    AwHeader
  },
  data () {
    return {
      nav_show: '',
      backgroundImg: require('../../assets/img/banner1.jpg'),
      // 控制注册注册页面的显示与隐藏
      flag: true,
      // 这是注册表单
      signupForm: {
        username: '',
        password: '',
        rePassword: ''
      },
      // 这是表单的验证规则对象
      signupFormRules: {
        // 验证用户名名是否合法
        username: [
          {
            required: true,
            message: '请输入注册名称',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        // 验证密码是狗合法
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur'
          }
        ],
        rePassword: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: mapState(['BannerHeight']),
  methods: {
    // 点击重置按钮，重置注册表单
    resetSignUpForm () {
      // console.log(this)
      this.$refs.signupFormRef.resetFields()
    },
    signup () {
      this.$refs.signupFormRef.validate(async (valid) => {
        // console.log(this.signupForm)
        if (!valid) return
        const { data: res } = await this.$http.post('/web/signup', this.signupForm)
        // console.log(res)
        if (res.status !== 200) {
          return this.$message.error('注册失败')
        } else {
          this.$message.success('注册成功')
          // 2、编程式导航：页面跳转
          this.$router.push('/login')
        }
      })
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
  }
}
</script>

<style lang = "less" scoped>
.signup {
  //min-height: 800px;
  position: relative;
}

.signup_header {
  background-color: rgba(255, 255, 255, .3);
  backdrop-filter: blur(10px);
  //border-bottom: 1px solid #eff0f1;
}

.box {
  //padding-top: 60px;
  width: 100%;
  height: 763px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.background-img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  position: absolute;
  z-index: -1;
}

.container-signup {
  min-width: 480px;
  margin-bottom: 50px;
  padding: 35px;
  background-color: rgba(255, 255, 255, .1);
  backdrop-filter: blur(5px);
  border: none;

  .headerToggle {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 24px;
  }

  h2 {
    font-size: 24px;
    font-weight: 600;
  }

  /deep/ .el-form-item__content {
    display: flex;
    justify-content: space-between;
    margin: 0 auto;

    .el-button {
      //margin-right: 80px;
    }

    .el-input__inner {
      background-color: rgba(255, 255, 255, .5);
      border: none;
    }
    input::placeholder{
      color: #818181;
    }
  }

  .pull-right {
  }
}
</style>
