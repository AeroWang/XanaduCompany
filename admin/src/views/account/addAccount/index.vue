<template>
  <el-card>
    <el-form
      ref="accountForm"
      :model="accountForm"
      :rules="accountFormRules"
    >
      <el-form-item
        label="账户名称"
        prop="username"
      >
        <el-input v-model="accountForm.username" />
      </el-form-item>
      <el-form-item
        label="介绍"
        prop="introduction"
      >
        <el-input
          v-model="accountForm.introduction"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 8}"
        />
      </el-form-item>
      <el-form-item
        label="头像"
        prop="avatar"
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
      <el-form-item
        label="所属角色"
        prop="role_id"
      >
        <el-select
          v-model="accountForm.role_id"
          filterable
        >
          <el-option
            v-for="item in roles"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="账户密码"
        prop="password"
      >
        <el-input v-model="accountForm.password" />
      </el-form-item>
      <el-form-item>
        <el-popconfirm
          confirm-button-text="确定"
          cancel-button-text="不用了"
          icon="el-icon-info"
          icon-color="red"
          title="确认添加该用户吗？"
          @onConfirm="addAccount"
        >
          <el-button
            slot="reference"
            type="primary"
            round
            plain
          >
            添加用户
          </el-button>
        </el-popconfirm>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import { getRolesList } from '@/api/role'
import { addAccount } from '@/api/user'
import { uploadFile } from '@/api/file'

export default {
  name: 'Index',
  data () {
    return {
      accountForm: {
        username: '',
        introduction: '',
        avatar: '',
        role_id: '',
        password: '123456'
      },
      accountFormRules: {
        username: [{
          required: true,
          message: '请输入账户名称',
          trigger: 'blur'
        }],
        introduction: [{
          required: true,
          message: '请输入账户介绍',
          trigger: 'blur'
        }],
        avatar: [{
          required: !this.isEdit,
          message: '请上传账户头像',
          trigger: 'change'
        }],
        role_id: [{
          required: true,
          message: '请选择所属角色',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入该账户密码',
          trigger: 'blur'
        }]
      },
      // 角色列表
      roles: [],
      // 图片默认提交地址，未使用。
      action: '',
      // 上传文件列表
      fileList: [],
      // 是否禁用上传
      uploadDisabled: false,
      // 封面图片弹窗
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  // 每次进入路有前，重新获取数据
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getRolesList()
    })
  },
  computed: {
    headers () {
      return {
        'Authorization': 'Bearer ' + this.$store.getters.token // 直接从本地获取token就行
      }
    }
  },
  methods: {
    getRolesList () {
      getRolesList().then(response => {
        const res = response.data
        if (res.status === 200) {
          this.roles = res.data.rolesList
        } else {
          this.$message.error('获取角色选项失败')
        }
      })
    },
    addAccount () {
      this.$refs.accountForm.validate((valid) => {
        if (valid) {
          addAccount(this.accountForm).then(response => {
            const res = response.data
            if (res.status === 200) {
              this.$message.success('账户添加成功')
              this.$router.push('manage_account')
            } else {
              this.$message.error('账户添加失败')
            }
          })
        } else {
          this.$message.error('添加失败，请检查内容是否填写完整！')
          return false
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
          this.accountForm.avatar = res.data.fileUrl
          param.onSuccess()
          this.uploadDisabled = true
        } else {
          this.accountForm.avatar = ''
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
    // 移除封面图片
    handleRemove (file) {
      this.uploadDisabled = false
    },
    // 查看封面图片
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style lang = "scss" scoped>
.el-card {
  margin: 20px;
}

// .el-upload--picture-card 控制加号部分
::v-deep .disabled .el-upload--picture-card {
  display: none !important;
}

::v-deep {
  .el-form-item__content{
    width: 100%;
  }
  .el-form-item:nth-child(2) .el-form-item__content,
  .el-form-item:nth-child(3) .el-form-item__content,
  {
    margin-left: 28px;
  }

  .el-form-item:nth-child(6) {
    margin-left: 78px;
  }

  .el-input__inner {
    width: 100%;
  }

  .el-textarea__inner {
    width: 100%;
  }
}
</style>
