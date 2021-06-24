<template>
  <el-card>
    <el-form ref="jobForm" :model="jobForm" :rules="ruleJobForm">
      <el-form-item label="职位名称" prop="title">
        <el-input v-model="jobForm.title" />
      </el-form-item>
      <el-form-item required>

        <el-form-item label="职位所在分类" class="option" prop="jobCategory" style="display: inline-block">
          <el-cascader
            ref="jobCategory"
            v-model="jobForm.jobCategory"
            :options="jobCategory"
            :props="{ checkStrictly: true }"
            clearable
          />
        </el-form-item>
        <el-form-item label="职位所在城市" class="option" prop="city" style="display: inline-block">
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
        <markdown ref="descriptionMd" v-model="jobForm.description" class="markdown" />
      </el-form-item>
      <el-form-item label="职位要求" prop="requirement">
        <markdown ref="requirementMd" v-model="jobForm.requirement" class="markdown" />
      </el-form-item>
      <el-form-item>
        <el-popconfirm
          confirm-button-text="确定发布"
          cancel-button-text="不用了"
          icon="el-icon-info"
          icon-color="red"
          title="确认发布该职位吗？"
          @onConfirm="addJob"
        >
          <el-button slot="reference" type="primary" round plain>发布职位</el-button>
        </el-popconfirm>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { getJobCategory, getCity, addJob } from '@/api/job'
import Markdown from '@/components/MavonEditor'

export default {
  name: 'CreateJob',
  components: { Markdown },
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
  // 每次进入路有前，重新获取数据
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getJobCategory()
      vm.getCity()
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
    addJob() {
      this.jobForm.description = this.$refs.descriptionMd.content
      this.jobForm.requirement = this.$refs.requirementMd.content
      console.log(this.jobForm)
      this.$refs.jobForm.validate((valid) => {
        if (valid) {
          if (this.jobForm.jobCategory.length > 1) {
            this.jobForm.jobCategory = this.jobForm.jobCategory[1]
          } else {
            this.jobForm.jobCategory = this.jobForm.jobCategory[0]
          }
          addJob(this.jobForm).then(response => {
            const res = response.data
            if (res.status === 200) {
              this.$message.success('职位发布成功')
              this.$router.push('list')
            } else {
              this.$message.error('职位发布失败')
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
  width: 100%;
}

::v-deep {
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
}

.markdown {
  height: 30%;
  width: 1100px;
}
</style>
