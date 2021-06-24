<template>
  <el-container>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="user-info">
          <el-avatar
            :size="100"
            :src="basicInfo.avatar"
            fit="scale-down"
          />
          <h3>{{ basicInfo.accountName }}</h3>
          <router-link to="/index">
            <el-button
              type="primary"
              plain
              round
              size="small"
            >
              首页
            </el-button>
          </router-link>
          <ul>
            <li><i class="el-icon-user" />{{ basicInfo.name }}</li>
            <li v-if="basicInfo.sex =='男'">
              <svg-icon icon-class="sex" />
              男
            </li>
            <li v-else-if="basicInfo.sex =='女'">
              <svg-icon icon-class="sex" />
              女
            </li>
            <li v-else>
              <svg-icon icon-class="sex" />
              保密
            </li>
            <li><i class="el-icon-time" />{{ basicInfo.createTime }}</li>
            <li><i class="el-icon-office-building" />{{ basicInfo.department }}</li>
            <li><i class="el-icon-location-outline" />{{ basicInfo.location }}</li>
          </ul>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card>
          <el-tabs
            v-model="activeName"
          >
            <el-tab-pane
              label="基本信息"
              name="first"
            >
              <el-form
                ref="basicInfo"
                label-position="right"
                label-width="80px"
                :model="basicInfo"
              >
                <el-form-item
                  label="姓名"
                >
                  <el-input v-model="basicInfo.name" />
                </el-form-item>
                <el-form-item
                  label="账户名"
                >
                  <el-input v-model="basicInfo.accountName" />
                </el-form-item>
                <el-form-item
                  label="性别"
                >
                  <el-select
                    v-model="basicInfo.sex"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in sexOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="个人简介"
                >
                  <el-input
                    v-model="basicInfo.description"
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                  />
                </el-form-item>
                <el-form-item
                  label="头像"
                >
                  <el-upload
                    ref="uploadImg"
                    :action="action"
                    :http-request="uploadFile"
                    :headers="headers"
                    list-type="picture-card"
                    :file-list="fileList"
                    :limit="1"
                    :class="{ disabled: uploadDisabled }"
                    :before-upload="beforeImgUpload"
                    :on-progress="imgOnProgress"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                  >
                    <i class="el-icon-plus" />
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img
                      width="100%"
                      :src="dialogImageUrl"
                      alt=""
                    >
                  </el-dialog>
                </el-form-item>
                <el-button
                  type="primary"
                  plain
                  round
                  size="small"
                  @click="editAccount"
                >
                  确认修改
                </el-button>
              </el-form>
            </el-tab-pane>
            <el-tab-pane
              label="账号绑定"
              name="second"
            >
              <div
                v-for="(item,index) in bindAccount"
                :key="index"
                class="account-binding"
              >
                <svg-icon
                  :icon-class="item.icon"
                  class-name="binding-icon"
                />
                <div class="account-binding-content">
                  <p>{{ item.desc }}</p>
                  <p v-if="item.accountId">
                    {{ item.accountId }}
                  </p>
                  <p v-else>
                    当前账号未{{ item.desc }}账号
                  </p>
                </div>
                <el-button
                  type="primary"
                  plain
                  round
                  size="small"
                >
                  更换绑定
                </el-button>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import { uploadFile } from '@/api/file'
import { getInfoById, updateAccount } from '@/api/user'

export default {
  name: 'Index',
  data () {
    return {
      activeName: 'first',
      labelPosition: 'right',
      basicInfo: {
        avatar: '',
        name: '',
        accountName: '',
        sex: '',
        description: '',
        location: ''
      },
      sexOptions: [
        {
          label: '男',
          value: '男'
        },
        {
          label: '女',
          value: '女'
        },
        {
          label: '保密',
          value: '保密'
        }
      ],
      bindAccount: [
        {
          icon: 'qq',
          accountId: '2440178177',
          desc: '绑定QQ'
        },
        {
          icon: 'wechat',
          accountId: '',
          desc: '绑定微信'
        },
        {
          icon: 'zhifubao',
          accountId: '',
          desc: '绑定支付宝'
        }
      ],
      oldPassword: '',
      newPassword: '',
      // 图片默认提交地址，未使用。
      action: '',
      // 上传文件列表
      fileList: [],
      // 是否禁用上传
      uploadDisabled: false,
      // 图片弹窗
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  computed: {
    headers () {
      return {
        'Authorization': 'Bearer ' + this.$store.getters.token // 直接从本地获取token就行
      }
    },
    editId () {
      return this.$store.getters.id
    }
  },
  // 每次进入路有前，重新获取数据
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getAccountInfo()
    })
  },
  methods: {
    // 获取账户信息
    getAccountInfo () {
      this.basicInfo = {}
      getInfoById(this.editId).then(response => {
        const res = response.data
        if (res.status === 200) {
          this.basicInfo = res.data
        } else {
          this.$message.error('获取账户信息失败')
        }
      })
    },
    editAccount () {
      const updateData = {
        username: this.basicInfo.accountName,
        name: this.basicInfo.name,
        password: this.basicInfo.password,
        sex: this.basicInfo.sex,
        introduction: this.basicInfo.description,
        avatar: this.basicInfo.avatar
      }
      updateAccount(this.editId, updateData).then(response => {
        const res = response.data
        if (res.status === 200) {
          this.basicInfo = {}
          this.getAccountInfo()
          this.newPassword = this.basicInfo.password
          this.$message.success(res.msg)
        } else {
          this.dialogVisible = false
          this.$message.error(res.msg)
          this.basicInfo = {}
          this.getAccountInfo()

        }
      })
    },
    // 上传文件
    uploadFile (param) {
      const formData = new FormData()
      formData.append('file', param.file)
      uploadFile(formData).then(response => {
        const res = response.data
        // 上传状态
        if (res.status === 200) {
          this.basicInfo.avatar = res.data.fileUrl
          param.onSuccess()
          this.uploadDisabled = true
        } else {
          this.basicInfo.avatar = ''
          this.$message.error('上传失败,请联系管理员！')
          param.onError()
          this.uploadDisabled = false
        }
      })
    },
    beforeImgUpload (file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (!isLt1M) {
        this.$message.error('上传封面图片大小不能超过 1MB!')
      }
      return isLt1M
    },
    // 上传中
    imgOnProgress (event, file) {
      this.uploadDisabled = true
    },
    // 移除头像
    handleRemove (file) {
      this.uploadDisabled = false
    },
    // 查看头像
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style lang = "scss" scoped>
.el-container {
  margin: 20px;
}

.el-row {
  width: 100%;
}

.el-form {
  margin-bottom: 50px;
}

.el-form-item {
  display: block;
}

.user-info {
  text-align: center;

  ul {
    text-align: left;
    list-style: none;
    margin: 0 20px;

    li {
      margin: 10px 0;
    }

    i, {
      margin-right: 10px;
    }

    .svg-icon {
      margin-right: 5px;
    }
  }
}

::v-deep {
  .el-form-item__content {
    margin-left: 0 !important;
  }

  .el-input__inner {
    width: 80%;
  }

  .el-select {
    width: 80%;

    .el-input__inner {
      width: 100%;
    }
  }

  .el-textarea__inner {
    width: 80%;
  }
}

// .el-upload--picture-card 控制加号部分
::v-deep .disabled .el-upload--picture-card {
  display: none !important;
}

.account-binding {
  display: flex;
  align-items: center;
  font-size: 14px;
  width: 100%;
  border-bottom: 1px solid #dfe4ed;
}

.account-binding-content {
  margin-left: 15px;
  width: 100%;

  p {
    margin: 10px 0;
  }
}

.binding-icon {
  font-size: 40px;
}
</style>
