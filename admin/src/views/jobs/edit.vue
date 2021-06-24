<template>
  <el-card>
    <el-form ref="jobForm" :model="jobForm" :rules="ruleJobForm">
      <el-form-item label="职位名称" prop="title">
        <el-input v-model="jobForm.title" />
      </el-form-item>
      <el-form-item required>
        <el-form-item label="职位所在分类" class="option" prop="jobCategory">
          <el-cascader
            ref="jobCategory"
            v-model="jobForm.jobCategory"
            :options="jobCategory"
            :props="{ checkStrictly: true }"
            clearable
          />
        </el-form-item>
        <el-form-item label="职位所在城市" class="option" prop="city">
          <el-select
            v-model="jobForm.city"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in city"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
      </el-form-item>
      <el-form-item label="职位描述" prop="description">
        <!--<markdown ref="descriptionMd" v-model="jobForm.description" />-->
        <mavon-editor
          ref="descriptionMd"
          v-model="jobForm.description"
          class="markdown"
          @imgAdd="imgAdd1"
          @imgDel="imgDel1"
        />
      </el-form-item>
      <el-form-item label="职位要求" prop="requirement">
        <!--<markdown ref="requirementMd" v-model="jobForm.requirement" />-->
        <mavon-editor
          ref="requirementMd"
          v-model="jobForm.requirement"
          class="markdown"
          @imgAdd="imgAdd2"
          @imgDel="imgDel2"
        />
      </el-form-item>
      <el-form-item>
        <el-popconfirm
          confirm-button-text="确定修改"
          cancel-button-text="不用了"
          icon="el-icon-info"
          icon-color="red"
          title="确认修改该职位信息吗？"
          @onConfirm="editJob"
        >
          <el-button slot="reference" type="primary" round plain>修改职位</el-button>
        </el-popconfirm>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { updateJob, getJobDetail, getJobCategory, getCity } from '@/api/job'
import { deleteFile, uploadFile } from '@/api/file'

export default {
  name: 'EditJob',
  data() {
    return {
      jobForm: {
        title: '',
        jobCategory: '',
        city: '',
        description: '',
        requirement: ''
      },
      ruleJobForm: {
        title: [{
          required: true,
          message: '请填写职位名称',
          trigger: 'blur'
        }],
        jobCategory: [{
          required: true,
          message: '请选择职位所属分类',
          trigger: 'change'
        }],
        city: [{
          required: true,
          message: '请选择职位所在城市',
          trigger: 'change'
        }],
        description: [{
          required: true,
          message: '请填写职位描述',
          trigger: 'blur'
        }],
        requirement: [{
          required: true,
          message: '请填写职位要求',
          trigger: 'blur'
        }]
      },
      jobCategory: [],
      city: []
    }
  },
  computed: {
    editJobId() {
      return this.$route.params && this.$route.params.id
    }
  },
  // 每次进入路有前，重新获取数据
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getJobCategory()
      vm.getCity()
      vm.getJobDetail()
    })
  },
  methods: {
    transformData(data) {
      // 把扁平数据转成树形数据
      const cloneData = JSON.parse(JSON.stringify(data)) // 对源数据深度克隆
      return cloneData.filter(father => {
        const branchArr = cloneData.filter(child => father.value === child.parent) // 返回每一项的子级数组
        branchArr.length > 0 ? father.children = branchArr : '' // 如果存在子级，则给父级添加一个children属性，并赋值
        return father.parent === null // 返回第一层
      })
    },
    imgAdd1(index, file) {
      const formData = new FormData()
      formData.append('file', file)
      uploadFile(formData).then(response => {
        const res = response.data
        const url = res.data.fileUrl
        this.$refs.descriptionMd.$img2Url(index, url)
      })
    },
    /**
     * 删除图片
     * @param {Array} index index[0]为图片 URL，index[1]为该文件对象
     */
    imgDel1(index) {
      // index[0]: http://localhost:3000/upload/20210521/16215627399857247.png
      // delete this.img_file[index]
      const imgUrl = index[0].substring(29)
      deleteFile(imgUrl).then(response => {
        const res = response.data
        if (res.status === 200) {
          this.$message.success(res.msg)
        } else {
          this.$message.warning(res.msg)
        }
      })
    },
    imgAdd2(index, file) {
      const formData = new FormData()
      formData.append('file', file)
      uploadFile(formData).then(response => {
        const res = response.data
        const url = res.data.fileUrl
        this.$refs.requirementMd.$img2Url(index, url)
      })
    },
    /**
     * 删除图片
     * @param {Array} index index[0]为图片 URL，index[1]为该文件对象
     */
    imgDel2(index) {
      // index[0]: http://localhost:3000/upload/20210521/16215627399857247.png
      // delete this.img_file[index]
      const imgUrl = index[0].substring(29)
      deleteFile(imgUrl).then(response => {
        const res = response.data
        if (res.status === 200) {
          this.$message.success(res.msg)
        } else {
          this.$message.warning(res.msg)
        }
      })
    },
    getJobCategory() {
      getJobCategory().then(response => {
        const res = response.data
        if (res.status === 200) {
          const tmpArr = this.transformData(res.data)
          for (const item of tmpArr) {
            this.jobCategory.push(item)
          }
        }
      })
    },
    getCity() {
      getCity().then(response => {
        const res = response.data
        if (res.status === 200) {
          this.city = res.data
        }
      })
    },
    getJobDetail() {
      getJobDetail(this.editJobId).then(response => {
        const res = response.data
        if (res.status === 200) {
          const data = res.data
          if (!data.aw_job_category.parent) {
            this.jobForm = {
              title: data.title,
              jobCategory: data.aw_job_category.id,
              city: data.city,
              description: data.description,
              requirement: data.requirement
            }
          } else {
            this.jobForm = {
              title: data.title,
              jobCategory: [
                data.aw_job_category.parent,
                data.aw_job_category.id
              ],
              city: data.city,
              description: data.description,
              requirement: data.requirement
            }
          }

          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    editJob() {
      this.$refs.jobForm.validate((valid) => {
        if (valid) {
          if (this.jobForm.jobCategory.length > 1) {
            this.jobForm.jobCategory = this.jobForm.jobCategory[1]
          } else {
            this.jobForm.jobCategory = this.jobForm.jobCategory[0]
          }
          updateJob(this.editJobId, this.jobForm).then(response => {
            const res = response.data
            if (res.status === 200) {
              this.$message.success(res.msg)
              this.jobForm = {}
              this.$router.push('/job/list')
            } else {
              this.$message.error(res.msg)
              this.getJobDetail()
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
.el-card {
  margin: 20px;
}

.el-form {
  width: 100%;
}

::v-deep {
  .el-form-item__content{
    height: auto;
  }
  .el-form-item:nth-child(1) .el-form-item__content,
  .el-form-item:nth-child(3) .el-form-item__content,
  .el-form-item:nth-child(4) .el-form-item__content {
    margin-left: 28px;
  }

  .el-form-item:nth-child(5) {
    margin-left: 105px;
  }

  .el-input__inner {
    width: 200px;
  }
}

.option {
  margin-right: 20px;

  ::v-deep .el-form-item__content {
    margin-left: 0 !important;
  }

}

.markdown {
  max-height: 500px;
  width: 1100px;
}
</style>
