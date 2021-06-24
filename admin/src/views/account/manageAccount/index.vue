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
        prop="username"
        label="账户名"
        width="200"
        header-align="center"
        align="center"
        sortable
      />
      <el-table-column
        prop="introduction"
        label="介绍"
        show-overflow-tooltip
        header-align="center"
        align="center"
      />
      <el-table-column
        v-slot="scope"
        label="头像"
        width="200"
        header-align="center"
        align="center"
      >
        <el-image
          :src="scope.row.avatar"
          style="width: 50px; height: 50px "
          fit="cover"
        />
      </el-table-column>
      <el-table-column
        v-slot="scope"
        label="所属角色"
        width="150"
        header-align="center"
        align="center"
      >
        <el-tag
          v-if="scope.row.roleName==='管理员'"
          type="danger"
        >
          {{ scope.row.roleName }}
        </el-tag>
        <el-tag
          v-else
          type="success"
        >
          {{ scope.row.roleName }}
        </el-tag>
      </el-table-column>
      <el-table-column
        v-slot="scope"
        label="操作"
        width="300"
        header-align="center"
        align="center"
      >
        <el-button
          type="primary"
          round
          plain
          size="small"
          @click="editClick(scope.row)"
        >
          编辑
        </el-button>
        <el-popconfirm
          confirm-button-text="确定"
          cancel-button-text="不用了"
          icon="el-icon-info"
          icon-color="red"
          title="确定删除这名账户吗？"
          @onConfirm="deleteClick(scope.row.id)"
        >
          <el-button
            slot="reference"
            :disabled="scope.row.id===1"
            type="danger"
            round
            plain
            size="small"
          >
            删除
          </el-button>
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
    <el-dialog
      title="编辑用户"
      :visible.sync="dialogVisible"
      width="35%"
      class="edit-dialog"
    >
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
            autosize
          />
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            v-model="accountForm.password"
            placeholder="修改密码"
            type="password"
          />
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
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          round
          plain
          type="danger"
          @click="dialogVisible = false"
        >取 消</el-button>
        <el-button
          round
          plain
          type="primary"
          @click="editAccount"
        >确定修改</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>

import {getAccountList, updateAccount, deleteAccount} from '@/api/user'
import {getRolesList} from '@/api/role'

export default {
  name: 'Index',
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      accountForm: {
        username: '',
        introduction: '',
        role_id: '',
        password: ''
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
        role_id: [{
          required: true,
          message: '请选择所属角色',
          trigger: 'blur'
        }]
      },
      editId: '',
      // 角色列表
      roles: [],
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
      vm.getAccountList()
      vm.getRolesList()
    })
  },
  methods: {
    getRolesList() {
      getRolesList().then(response => {
        const res = response.data
        if (res.status === 200) {
          this.roles = res.data.rolesList
        } else {
          this.$message.error('获取角色选项失败')
        }
      })
    },
    // 获取账户列表
    getAccountList() {
      this.tableData = []
      getAccountList(this.pageInfo).then(response => {
        const res = response.data
        if (res.status === 200) {
          this.total = res.data.total
          const data = res.data.list
          for (let i = 0; i < data.length; i++) {
            const tmp = {
              id: data[i].id,
              username: data[i].username,
              introduction: data[i].introduction,
              avatar: data[i].avatar,
              roleName: data[i].aw_role.name,
              role_id: data[i].aw_role.id
            }
            this.tableData.push(tmp)
          }
          // this.tableData = res.data.rolesList
        } else {
          this.$message.error('获取账户列表失败')
        }
      })
    },
    // 列表页切换
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.getAccountList()
    },
    // 点击编辑账户按钮
    editClick(value) {
      this.editId = value.id
      this.dialogVisible = true
      this.accountForm = {
        username: value.username,
        introduction: value.introduction,
        role_id: value.role_id
      }
    },
    editAccount() {
      updateAccount(this.editId, this.accountForm).then(response => {
        const res = response.data
        if (res.status === 200) {
          this.getAccountList()
          this.dialogVisible = false
          this.$message.success(res.msg)
          this.accountForm = {}
        } else {
          this.dialogVisible = false
          this.$message.error(res.msg)
          this.getAccountList()
          this.accountForm = {}
        }
      })
    },
    // 删除账户
    deleteClick(id) {
      deleteAccount(id).then(response => {
        const res = response.data
        if (res.status === 200) {
          this.$message.success(res.msg)
          this.getAccountList()
        } else {
          this.$message.error(res.msg)
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

.is-plain {
  margin-left: 20px;
}

.edit-dialog {
  ::v-deep {
    .el-form-item:nth-child(2) .el-form-item__content {
      margin-left: 28px;
    }

    .el-form-item:nth-child(3) {
      margin-left: 10px;
    }

    .el-form-item:nth-child(3) .el-form-item__content {
      margin-left: 28px;
    }
  }
}
</style>
