<template>
  <div class="register-container">
    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="registerRules"
      class="register-form"
      auto-complete="off"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">
          用户注册
        </h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="registerForm.username"
          placeholder="请输入账号"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="off"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="registerForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="off"
        />
        <span
          class="show-pwd"
          @click="showPwd"
        >
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item prop="rePassword">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="rePassword"
          v-model="registerForm.rePassword"
          :type="passwordType"
          placeholder="请再次输入密码"
          name="rePassword"
          tabindex="2"
          auto-complete="off"
          @keyup.enter.native="handleRegister"
        />
        <span
          class="show-pwd"
          @click="showPwd"
        >
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleRegister"
      >
        注册
      </el-button>

      <!--<div class="tips">-->
      <!--  <span style="margin-right:20px;">username: admin</span>-->
      <!--</div>-->
    </el-form>
  </div>
</template>

<script>
import { register } from '@/api/user'

export default {
  name: 'Register',
  data () {
    const validateUsername = (rule, value, callback) => {
      const reg = /^[a-zA-Z0-9]{4,9}$/
      if (!reg.test(value)) {
        callback(new Error('账号必须是由4-9位数字或字母'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      const reg = /^(?![0-9]*$)(?![a-zA-Z]*$)[a-zA-Z0-9]{4,12}$/
      if (!reg.test(value)) {
        callback(new Error('密码必须是由4-12位数字和字母组合'))
      } else {
        callback()
      }
    }

    const validatePassword2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
        // password 是表单上绑定的字段
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        username: '',
        password: '',
        rePassword:''
      },
      registerRules: {
        username: [{
          required: true,
          trigger: 'blur',
          validator: validateUsername
        }],
        password: [{
          required: true,
          trigger: 'blur',
          validator: validatePassword
        }],
        rePassword: [{
          required: true,
          trigger: 'blur',
          validator: validatePassword2
        }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleRegister () {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          delete this.registerForm.rePassword
          register(this.registerForm).then(response => {
            const res = response.data
            if (res.status === 200) {
              this.$message.success('注册成功,跳转至登录页！')
              this.$router.push('/login')
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang = "scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .register-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.register-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  .el-form-item__content {
    width: 100%;
  }
}
</style>

<style lang = "scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.register-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .register-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
