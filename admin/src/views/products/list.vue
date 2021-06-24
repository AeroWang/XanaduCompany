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
        label="产品名称"
        width="150"
        show-overflow-tooltip
        header-align="center"
        align="center"
        sortable
      />
      <el-table-column
        prop="description"
        label="产品简要描述"
        width="200"
        show-overflow-tooltip
        header-align="center"
        align="center"
      />
      <el-table-column
        prop="subDescription"
        label="产品详细描述"
        min-width="200"
        show-overflow-tooltip
        header-align="center"
        align="center"
      />
      <el-table-column
        prop="link"
        label="产品链接"
        width="150"
        show-overflow-tooltip
        header-align="center"
        align="center"
      />
      <el-table-column
        v-slot="scope"
        label="logo"
        width="150"
        header-align="center"
        align="center"
      >
        <el-image
          :src="scope.row.logo"
          style="width: 50px; height: 50px "
          fit="cover"
        />
      </el-table-column>
      <el-table-column
        v-slot="scope"
        label="操作"
        width="180"
        header-align="center"
        align="center"
      >
        <el-button type="primary" round plain size="small" @click="editClick(scope.row.id)">编辑</el-button>
        <el-popconfirm
          confirm-button-text="确定"
          cancel-button-text="不用了"
          icon="el-icon-info"
          icon-color="red"
          title="确定删除这个产品吗？"
          @onConfirm="deleteClick(scope.row.id)"
        >
          <el-button slot="reference" type="danger" round plain size="small">删除</el-button>
        </el-popconfirm>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { deleteProduct, getProductList } from '@/api/product'

export default {
  name: 'ProductList',
  components: {},
  data() {
    return {
      tableData: []
    }
  },
  // 每次进入路有前，重新获取数据
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getProductList()
    })
  },
  methods: {
    getProductList() {
      getProductList().then(response => {
        const res = response.data
        if (res.status === 200) {
          this.tableData = res.data.list
          // this.$message.success('获取产品列表成功')
        } else {
          this.$message.error('获取产品列表失败')
        }
      })
    },
    // // 点击编辑产品按钮
    editClick(value) {
      this.$router.push({ path: `edit/${value}` })
    },
    deleteClick(id) {
      deleteProduct(id).then(response => {
        const res = response.data
        if (res.status === 200) {
          this.$message.success(res.msg)
          this.getProductList()
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang = "scss" scoped>
.el-card{
  margin: 20px;
}
.el-popover__reference {
  margin-left: 20px;
}
</style>
