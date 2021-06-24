<template>
  <el-card>
    <el-form ref="productForm" :model="productForm" :rules="ruleProductForm">
      <el-form-item label="产品名称" prop="title">
        <el-input v-model="productForm.title" placeholder="请输入产品名称" />
      </el-form-item>
      <el-form-item label="产品简要描述" prop="description">
        <el-input
          v-model="productForm.description"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入产品简要描述"
        />
      </el-form-item>
      <el-form-item label="产品详细描述" prop="subDescription">
        <el-input
          v-model="productForm.subDescription"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5}"
          placeholder="请输入产品详细描述"
        />
      </el-form-item>
      <el-form-item label="产品链接" prop="link">
        <el-input v-model="productForm.link" placeholder="请输入产品详情链接" />
      </el-form-item>
      <el-form-item required>
        <el-form-item label="产品图片" prop="bgImg">
          <el-upload
            ref="uploadImg"
            :action="action"
            class="imgs"
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
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="产品logo" prop="logo">
          <el-upload
            ref="uploadLogo"
            :action="actionLogo"
            :http-request="uploadFileLogo"
            :headers="headers"
            class="imgs"
            list-type="picture-card"
            :file-list="fileListLogo"
            :limit="1"
            :class="{ disabled: uploadDisabledLogo }"
            :before-upload="beforeImgUploadLogo"
            :on-progress="imgOnProgressLogo"
            :on-preview="handlePictureCardPreviewLogo"
            :on-remove="handleRemoveLogo"
          >
            <i class="el-icon-plus" />
          </el-upload>
          <el-dialog :visible.sync="dialogVisibleLogo">
            <img width="100%" :src="dialogImageUrlLogo" alt="">
          </el-dialog>
        </el-form-item>
      </el-form-item>
      <el-form-item>
        <el-popconfirm
          confirm-button-text="确定发布"
          cancel-button-text="不用了"
          icon="el-icon-info"
          icon-color="red"
          title="确认发布该产品吗？"
          @onConfirm="addProduct"
        >
          <el-button slot="reference" type="primary" round plain>发布产品</el-button>
        </el-popconfirm>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { addProduct } from '@/api/product'
import { uploadFile } from '@/api/file'

export default {
  name: 'CreateProduct',
  data() {
    return {
      productForm: {
        title: '',
        description: '',
        subDescription: '',
        link: '',
        bgImg: '',
        logo: ''
      },
      ruleProductForm: {
        title: [{
          required: true,
          message: '请填写产品名称',
          trigger: 'change'
        }],
        description: [{
          required: true,
          message: '请选择产品简要描述',
          trigger: 'change'
        }],
        subDescription: [{
          required: true,
          message: '请选择产品详细描述',
          trigger: 'change'
        }],
        link: [{
          required: true,
          message: '请填写产品详情链接',
          trigger: 'change'
        }],
        bgImg: [{
          required: true,
          message: '请上传产品图片',
          trigger: 'change'
        }],
        logo: [{
          required: true,
          message: '请上传产品logo',
          trigger: 'change'
        }]
      },
      // 封面图片默认提交地址，未使用。
      action: '',
      // 封面图片弹窗
      dialogImageUrl: '',
      dialogVisible: false,
      // 是否禁用上传
      uploadDisabled: false,
      // 上传文件列表
      fileList: [],
      actionLogo: '',
      dialogImageUrlLogo: '',
      dialogVisibleLogo: false,
      uploadDisabledLogo: false,
      fileListLogo: []
    }
  },
  computed: {
    headers() {
      return {
        'Authorization': 'Bearer ' + this.$store.getters.token // 直接从本地获取token就行
      }
    }
  },
  // 每次进入路有前，重新获取数据
  beforeRouteEnter(to, from, next) {
    next(vm => {
    })
  },
  methods: {
    // 上传文件
    uploadFile(param) {
      const formData = new FormData()
      formData.append('file', param.file)
      // formData.append('overwrite', false)
      // 获取添加值
      // console.log(formData.get('file'))
      // 发起请求
      uploadFile(formData).then(response => {
        const res = response.data
        // 上传状态
        if (res.status === 200) {
          this.productForm.bgImg = res.data.fileUrl
          param.onSuccess()
          this.uploadDisabled = true
        } else {
          this.productForm.bgImg = ''
          this.$message.error('上传失败,请联系管理员！')
          param.onError()
          console.log(this.productForm)
          this.uploadDisabled = false
        }
      })
    },
    beforeImgUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (!isLt1M) {
        this.$message.error('上传封面图片大小不能超过 1MB!')
      }
      return isLt1M
    },
    // 上传中
    imgOnProgress(event, file) {
      this.uploadDisabled = true
    },
    // 移除封面图片
    handleRemove(file) {
      this.uploadDisabled = false
    },
    // 查看封面图片
    handlePictureCardPreview(file) {
      console.log(file)
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 上传文件
    uploadFileLogo(param) {
      const formData = new FormData()
      formData.append('file', param.file)
      // formData.append('overwrite', false)
      // 获取添加值
      // console.log(formData.get('file'))
      // 发起请求
      uploadFile(formData).then(response => {
        const res = response.data
        // 上传状态
        if (res.status === 200) {
          this.productForm.logo = res.data.fileUrl
          param.onSuccess()
          this.uploadDisabledLogo = true
        } else {
          this.productForm.logo = ''
          this.$message.error('上传失败,请联系管理员！')
          param.onError()
          console.log(this.productForm)
          this.uploadDisabledLogo = false
        }
      })
    },
    beforeImgUploadLogo(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (!isLt1M) {
        this.$message.error('上传封面图片大小不能超过 1MB!')
      }
      return isLt1M
    },
    // 上传中
    imgOnProgressLogo(event, file) {
      this.uploadDisabledLogo = true
    },
    // 移除封面图片
    handleRemoveLogo(file) {
      this.uploadDisabledLogo = false
    },
    // 查看封面图片
    handlePictureCardPreviewLogo(file) {
      this.dialogImageUrlLogo = file.url
      this.dialogVisibleLogo = true
    },

    addProduct() {
      console.log(this.productForm)
      this.$refs.productForm.validate((valid) => {
        if (valid) {
          addProduct(this.productForm).then(response => {
            const res = response.data
            if (res.status === 200) {
              this.$message.success('产品发布成功')
              this.$router.push('list')
            } else {
              this.$message.error('产品发布失败')
            }
          })
        } else {
          this.$message.error('发布失败，请检查内容是否填写完整！')
          return false
        }
      })
    }
  }
}
</script>
<style lang = "scss" scoped>
.el-card {
  margin: 20px;
}

.el-form {
  width: 80%;
}

// .el-upload--picture-card 控制加号部分
::v-deep .disabled .el-upload--picture-card {
  display: none !important;
}

::v-deep {
  .el-form-item:nth-child(1) .el-form-item__content,
  .el-form-item:nth-child(4) .el-form-item__content {
    margin-left: 28px;
  }
  .el-input__inner {
    width: 500px;
  }
  .el-textarea__inner{
    width: 500px;
  }
  .el-form-item:nth-child(6) .el-form-item__content {
    margin-left: 105px;
  }
}

.imgs {
  margin-right: 120px;
}
</style>
