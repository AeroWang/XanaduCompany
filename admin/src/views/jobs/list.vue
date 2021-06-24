<template>
  <el-card>
    <el-table
      :data="tableData"
      height="500"
      stripe
      :row-style="{height:50+'px'}"
      :cell-style="{padding:0+'px'}"
      style="width: 100%"
      :default-sort="{prop: 'username', order: 'ascending'}"
    >
      <el-table-column
        type="index"
        label="序号"
        width="50"
        header-align="center"
        align="center"
      />
      <el-table-column
        prop="title"
        label="职位名称"
        width="260"
        show-overflow-tooltip
        header-align="center"
        align="center"
        sortable
      />
      <el-table-column
        prop="description"
        label="职位描述"
        min-width="200"
        show-overflow-tooltip
        header-align="center"
        align="center"
      />
      <el-table-column
        prop="job_category"
        label="职位所属分类"
        width="150"
        show-overflow-tooltip
        header-align="center"
        align="center"
      />
      <el-table-column
        prop="city"
        label="职位所在城市"
        width="150"
        show-overflow-tooltip
        header-align="center"
        align="center"
      />
      <el-table-column
        v-slot="scope"
        label="操作"
        width="220"
        header-align="center"
        align="center"
      >
        <el-button type="primary" round plain size="small" @click="editClick(scope.row.id)">编辑</el-button>
        <el-popconfirm
          confirm-button-text="确定"
          cancel-button-text="不用了"
          icon="el-icon-info"
          icon-color="red"
          title="确定删除这名账户吗？"
          @onConfirm="deleteClick(scope.row.id)"
        >
          <el-button slot="reference" type="danger" round plain size="small">删除</el-button>
        </el-popconfirm>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      :current-page.sync="pageInfo.pagenum"
      :page-size="pageInfo.pagesize"
      layout="prev, pager, next, jumper"
      :total="total"
      @current-change="handleCurrentChange"
    />

  </el-card>
</template>

<script>
import { deleteJob, getJobList } from '@/api/job'

export default {
  name: 'JobList',
  components: {},
  data() {
    return {
      tableData: [],
      // 查询参数
      pageInfo: {
        // 当前页码
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 10
      },
      // 总页数
      total: 0
    }
  },
  // 每次进入路有前，重新获取数据
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getJobList()
    })
  },
  methods: {
    getJobList() {
      getJobList(this.pageInfo).then(response => {
        const res = response.data
        if (res.status === 200) {
          this.tableData = res.data.list
          // this.$message.success('获取职位列表成功')
        } else {
          this.$message.error('获取职位列表失败')
        }
      })
    },
    // 列表页切换
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.getJobList()
    },
    // // 点击编辑职位按钮
    editClick(value) {
      this.$router.push({ path: `edit/${value}` })
    },
    deleteClick(id) {
      deleteJob(id).then(response => {
        const res = response.data
        if (res.status === 200) {
          this.$message.success(res.msg)
          this.getJobList()
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card{
  margin: 20px;
}
.el-popover__reference {
  margin-left: 20px;
}
</style>
