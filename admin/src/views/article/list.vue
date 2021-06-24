<template>
  <div>
    <el-card>
      <el-select
        v-model="pageInfo.category"
        clearable
        placeholder="请选择分类"
        @change="checkedCategory"
      >
        <el-option
          v-for="item in category"
          :key="item.type_id"
          :label="item.type_name"
          :value="item.type_id"
        />
      </el-select>
      <el-table
        :data="tableData"
        height="500"
        stripe
        :row-style="{height:50+'px'}"
        :cell-style="{padding:0+'px'}"
        style="width: 100%"
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
          label="标题"
          show-overflow-tooltip
          width="220"
          header-align="center"
          align="center"
        />
        <el-table-column
          prop="description"
          label="摘要"
          show-overflow-tooltip
          header-align="center"
          align="center"
        />
        <el-table-column
          prop="category"
          width="150"
          label="所属分类"
          header-align="center"
          align="center"
        />
        <el-table-column
          prop="update_time"
          sortable
          width="150"
          label="更新时间"
          header-align="center"
          align="center"
        />
        <el-table-column
          v-slot="scope"
          label="是否发布"
          width="100"
          header-align="center"
          align="center"
        >
          <el-switch
            v-model="scope.row.state"
            active-color="#13ce66"
            @change="changeState(scope.row)"
          />
        </el-table-column>
        <el-table-column
          v-slot="scope"
          label="操作"
          width="120"
          header-align="center"
          align="center"
          fixed="right"
        >
          <el-button type="text" size="small" @click="detailClick(scope.row.path)">详情</el-button>
          <el-button type="text" size="small" @click="editClick(scope.row.path)">编辑</el-button>

          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="不用了"
            icon="el-icon-info"
            icon-color="red"
            title="确定删除这篇文章吗？"
            @onConfirm="deleteClick(scope.row.path)"
          >
            <el-button slot="reference" type="text" size="small">删除</el-button>
          </el-popconfirm>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        :current-page.sync="pageInfo.pagenum"
        :page-size="pageInfo.pagesize"
        layout="prev, pager, next, jumper"
        :total="total"
        :hide-on-single-page="singlePage"
        @current-change="handleCurrentChange"
      />
      <el-dialog
        title="文章详情"
        :visible.sync="previewVisible"
        width="60%"
      >
        <div>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ articleDetail.category }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ articleDetail.title }}</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="content">
            <h1>{{ articleDetail.title }}</h1>
            <span>{{ articleDetail.publish_time }}</span>
            <el-divider><i class="el-icon-view" /></el-divider>
            <article class="article" v-html="articleDetail.content" />
          </div>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getCategory, getArticleList, updateArticle, deleteArticle, getArticleDetail } from '@/api/article'

export default {
  name: 'ArticleList',
  components: {},
  data() {
    return {
      category: [],
      tableData: [],
      // 查询参数
      pageInfo: {
        category: '',
        // 当前页码
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 10
      },
      // 总页数
      total: 0,
      // 单页隐藏
      singlePage: '',
      // 详情预览
      previewVisible: false,
      articleDetail: {}
    }
  },
  // created() {
  //   this.getArticleList()
  //   this.getCategory()
  // },
  // 每次进入路有前，重新获取数据
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getArticleList()
      vm.getCategory()
    })
  },
  methods: {
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
    checkedCategory(value) {
      // value 为选中分类的 ID
      // console.log(this.pageInfo)
      this.getArticleList()
    },
    getArticleList() {
      this.tableData = []
      getArticleList(this.pageInfo).then(response => {
        const res = response.data
        if (res.status === 200) {
          this.total = res.data.total
          for (let i = 0; i < res.data.list.length; i++) {
            const tmpData = {
              title: res.data.list[i].news_title,
              description: res.data.list[i].news_desc,
              category: res.data.list[i].type,
              path: res.data.list[i].news_path,
              update_time: res.data.list[i].update_time,
              state: res.data.list[i].state
            }
            this.tableData.push(tmpData)
          }
        } else {
          this.$message.error('获取文章列表失败')
        }
      })
    },
    // 列表页切换
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.getArticleList()
    },
    // 是否发布
    changeState(data) {
      updateArticle(data.path, { state: data.state }).then(response => {
        const res = response.data
        if (res.status === 200) {
          this.$message.success('修改状态成功')
        }
      })
    },
    // 点击详情
    detailClick(path) {
      getArticleDetail(path).then(response => {
        const res = response.data
        if (res.status === 200) {
          this.articleDetail = {
            title: res.data.articleDetail.news_title,
            description: res.data.articleDetail.news_desc,
            category: res.data.articleDetail.category,
            type: res.data.articleDetail.type,
            content: res.data.articleDetail.news_content,
            publish_time: res.data.articleDetail.publish_time
          }
          this.previewVisible = true
        } else {
          this.$message.error('获取文章数据失败')
        }
      })
    },
    editClick(value) {
      this.$router.push({ path: `edit/${value}` })
    },
    deleteClick(value) {
      deleteArticle(value).then(response => {
        const res = response.data
        if (res.status === 200) {
          this.getArticleList()
          this.$message.success(res.msg)
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
::v-deep .el-select {
  .el-input__inner{
    height: 30px;
  }
  .el-input__suffix {
    top: 5px;
  }
}
::v-deep .el-dialog__body {
  overflow: hidden;

  .el-breadcrumb__item:last-child span {
    color: #f84521;
  }

  h1 {
    font-size: 23px;
    line-height: 30px;
    padding: 20px 0 14px;
    font-weight: 400;
  }

  span {
    color: #606266;
    line-height: 18px;
  }
}
.el-popover__reference{
  margin-left: 10px;
}
</style>
