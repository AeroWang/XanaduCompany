<template>
  <div>
    <!--<el-form ref="postForm" :model="postForm" :rules="rules" label-width="100px" class="form-container">-->
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <el-form-item label="标 题 " prop="title">
        <el-input v-model="postForm.title" />
      </el-form-item>
      <el-form-item label="摘 要" prop="description">
        <el-input
          v-model="postForm.description"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 8}"
        />
      </el-form-item>
      <el-form-item label="类 别" prop="category">
        <el-select v-model="postForm.category">
          <el-option
            v-for="item in category"
            :key="item.type_id"
            :label="item.type_name"
            :value="item.type_id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="内 容" prop="content">
        <wang-editor
          ref="weditor"
          v-model="postForm.content"
          @change="getEditor"
        />
      </el-form-item>
      <el-form-item label="封面图片" prop="coverImg">
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
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <span v-if="isEdit" class="warning">注意：</span>
        <span v-if="isEdit">封面图片若不修改，则使用原封面图片</span>
      </el-form-item>
      <el-form-item>
        <!--<el-button type="primary" @click="submitForm">仅保存</el-button>-->
        <el-button v-if="!isEdit" type="primary" round plain @click="submitForm">发布</el-button>
        <el-button v-if="isEdit" type="primary" round plain @click="updateForm">确认修改</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import wangEditor from '@/components/WangEditor'
import { uploadFile } from '@/api/file'
import { createArticle, getCategory, getArticleDetail, updateArticle } from '@/api/article'

export default {
  name: 'ArticleDetail',
  components: { wangEditor },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      postForm: {
        title: '', // 文章标题
        description: '', // 文章摘要
        category: '', // 文章类别ID
        coverImg: '', // 文章封面图片
        content: ''
        // state: '0'
      },
      rules: {
        title: [{
          required: true,
          message: '请输入标题',
          trigger: 'blur'
        }],
        description: [{
          required: true,
          message: '请输入文章概要',
          trigger: 'blur'
        }],
        category: [{
          required: true,
          message: '请选择分类',
          trigger: 'blur'
        }],
        content: [{
          required: true,
          message: '请输入内容',
          trigger: 'blur'
        }],
        coverImg: [{
          required: !this.isEdit,
          message: '请上传封面图片',
          trigger: 'change'
        }]
      },
      category: [],
      path: '', // 新闻保存路径
      saved: true, // 新闻是否保存
      // 封面图片默认提交地址，未使用。
      action: '',
      // 封面图片弹窗
      dialogImageUrl: '',
      dialogVisible: false,
      // 是否禁用上传
      uploadDisabled: false,
      // 上传文件列表
      fileList: []
    }
  },
  computed: {
    headers() {
      return {
        'Authorization': 'Bearer ' + this.$store.getters.token // 直接从本地获取token就行
      }
    }
  },
  created() {
    if (this.isEdit) {
      const path = this.$route.params && this.$route.params.id
      this.path = path
      getArticleDetail(path).then(response => {
        const res = response.data
        if (res.status === 200) {
          this.postForm = {
            title: res.data.articleDetail.news_title,
            description: res.data.articleDetail.news_desc,
            category: res.data.articleDetail.type,
            coverImg: res.data.articleDetail.cover_img,
            content: res.data.articleDetail.news_content,
            state: res.data.articleDetail.state
          }
        } else {
          this.$message.error('获取文章数据失败')
        }
      })
    }
    this.getCategory()
  },
  methods: {
    // 获取分类数据
    getCategory() {
      getCategory().then(response => {
        const res = response.data
        if (res.status === 200) {
          this.category = res.data.category
        } else {
          this.$message.error('获取分类数据失败')
        }
      })
    },
    // 获取富文本内容
    getEditor(value) {
      this.content = value
    },
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
          this.postForm.coverImg = res.data.fileUrl
          param.onSuccess()
          this.uploadDisabled = true
        } else {
          this.postForm.coverImg = ''
          this.$message.error('上传失败,请联系管理员！')
          param.onError()
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
      // deleteFile(imgUrl).then(response => {
      //   const res = response.data
      //   if (res.status === 200) {
      //     this.$message.success(res.msg)
      //   } else {
      //     this.$message.warning(res.msg)
      //   }
      // })
    },
    // 查看封面图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 发布
    submitForm() {
      this.postForm.state = '1'
      this.$refs.postForm.validate((valid) => {
        if (valid) {
          createArticle(this.postForm).then(response => {
            const res = response.data
            if (res.status === 200) {
              this.path = res.data.path
              this.$message.success('发布成功！')
              this.postForm = {}
              this.$refs.uploadImg.clearFiles()
              this.uploadDisabled = false
              this.$router.push('list')
            } else {
              console.log(`err---${res}`)
              this.$message.error('发布失败,请联系管理员！')
            }
          })
        } else {
          this.$message.error('发布失败，请检查内容是否填写完整！')
          return false
        }
      })
    },
    updateForm() {
      this.$refs.postForm.validate((valid) => {
        if (valid) {
          if (this.postForm.coverImg === '') {
            delete this.postForm.coverImg
          }
          updateArticle(this.path, this.postForm).then(response => {
            const res = response.data
            if (res.status === 200) {
              this.$message.success('修改成功！')
              this.$router.push('/article/list')
            } else {
              console.log(`err---${res}`)
              this.$message.error('修改失败,请联系管理员！')
            }
          })
        } else {
          this.$message.error('修改失败，请检查内容是否填写完整！')
          return false
        }
      })
    }
  }
}
</script>

<style lang = "scss" scoped>
// .el-upload--picture-card 控制加号部分
::v-deep .disabled .el-upload--picture-card {
  display: none !important;
}

.el-form {
  width: 100%;
}

::v-deep {
  .el-form-item:nth-child(1) .el-form-item__content,
  .el-form-item:nth-child(2) .el-form-item__content,
  .el-form-item:nth-child(3) .el-form-item__content,
  .el-form-item:nth-child(4) .el-form-item__content {
    margin-left: 28px;
  }

  .el-form-item:nth-child(5) .el-form-item__content {
    margin-left: 10px;
  }

  .el-form-item:nth-child(6) .el-form-item__content {
    margin-left: 77px;
  }

  .el-input__inner {
    width: 500px;
  }

  .el-textarea__inner {
    width: 500px;
  }

  .el-form-item:nth-child(4) .el-form-item__content {
    width: 100%;
  }
}

.el-form-item:nth-child(4) .editor {
  //max-width: 1100px;
  z-index: 200;
}

.el-form-item:nth-child(5) span {
  line-height: 28px;
  margin-top: 120px;
}

.el-form-item:nth-child(5) .warning {
  color: #ff461f
}

</style>
