<template>
  <el-card>
    <el-button type="primary" plain @click="addClick">添加角色</el-button>
    <el-table
      :data="tableData"
      height="500"
      stripe
      :row-style="{height:50+'px'}"
      :cell-style="{padding:0+'px'}"
    >
      <el-table-column
        type="index"
        label="序号"
        width="50"
        header-align="center"
        align="center"
      />
      <el-table-column
        prop="name"
        label="角色名称"
        show-overflow-tooltip
        width="200"
        header-align="center"
        align="center"
      />
      <el-table-column
        prop="description"
        label="角色描述"
        min-width="200"
        show-overflow-tooltip
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
        label="是否启用"
        header-align="center"
        align="center"
      >
        <el-switch
          v-model="scope.row.state"
          active-color="#13ce66"
          :disabled="scope.row.id===1"
          @change="changeState(scope.row)"
        />
      </el-table-column>
      <el-table-column
        v-slot="scope"
        label="操作"
        width="180"
        header-align="center"
        align="center"
      >
        <el-button
          type="primary"
          :disabled="scope.row.id===1"
          round
          plain
          size="small"
          @click="editClick(scope.row.id)"
        >编辑
        </el-button>
        <el-popconfirm
          confirm-button-text="确定"
          cancel-button-text="取消"
          icon="el-icon-info"
          icon-color="red"
          title="你真的确定删除这个角色吗？"
          @onConfirm="deleteClick(scope.row.id)"
        >
          <el-button slot="reference" :disabled="scope.row.id===1" type="danger" round plain size="small">删除
          </el-button>
        </el-popconfirm>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="roleVisible"
      width="35%"
      class="dialog"
    >
      <el-form ref="roleForm" :model="roleForm" :rules="roleFormRules">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" />
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input
            v-model="roleForm.description"
            type="textarea"
            autosize
          />
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch
            v-model="roleForm.state"
            active-color="#13ce66"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button round plain type="danger" @click="roleVisible = false">取 消</el-button>
        <el-button v-if="dialogTitle!=='编辑角色'" round plain type="primary" @click="addRole">确 定</el-button>
        <el-button v-if="dialogTitle==='编辑角色'" round plain type="primary" @click="editRole">确定修改</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
import { addRole, deleteRole, getRoleDetail, getRolesList, updateRole } from '@/api/role'

export default {
  name: 'Index',
  data() {
    return {
      tableData: [],
      // 添加、修改角色弹框
      roleVisible: false,
      dialogTitle: '',
      roleForm: {
        name: '',
        description: '',
        state: false
      },
      roleFormRules: {
        name: [{
          required: true,
          message: '请输入角色名称',
          trigger: 'blur'
        }],
        description: [{
          required: true,
          message: '请输入角色描述',
          trigger: 'blur'
        }]
      },
      // 被编辑角色ID
      editId: ''
    }
  },
  // created() {
  //   this.getRolesList()
  // },
  // 每次进入路有前，重新获取数据
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getRolesList()
    })
  },
  methods: {
    // 获取角色列表
    getRolesList() {
      getRolesList().then(response => {
        const res = response.data
        if (res.status === 200) {
          this.tableData = res.data.rolesList
        } else {
          this.$message.error('获取角色列表失败')
        }
      })
    },
    // 是否启用角色
    changeState(data) {
      updateRole(data.id, { state: data.state }).then(response => {
        const res = response.data
        if (res.status === 200) {
          this.$message.success('修改状态成功')
          this.getRolesList()
        } else {
          this.$message.error(res.msg)
          this.getRolesList()
        }
      })
    },
    // 添加角色
    addRole() {
      this.dialogTitle = '添加角色'
      this.$refs.roleForm.validate((valid) => {
        if (valid) {
          addRole(this.roleForm).then(response => {
            const res = response.data
            if (res.status === 200) {
              this.roleForm = {}
              this.$message.success(res.msg)
              this.getRolesList()
              this.roleVisible = false
            } else {
              this.$message.error('添加角色失败')
              this.roleForm = {}
              this.roleVisible = false
            }
          })
        }
      })
    },
    addClick() {
      this.dialogTitle = '添加角色'
      this.roleVisible = true
    },
    // 点击编辑角色按钮
    editClick(id) {
      this.dialogTitle = '编辑角色'
      this.editId = id
      this.roleVisible = true
      getRoleDetail(id).then(response => {
        const res = response.data
        if (res.status === 200) {
          this.roleForm = {
            name: res.data.roleDetail.name,
            description: res.data.roleDetail.description,
            state: res.data.roleDetail.state
          }
        } else {
          this.roleVisible = false
          this.$message.error(res.msg)
          this.roleForm = {}
        }
      })
    },
    editRole() {
      updateRole(this.editId, this.roleForm).then(response => {
        const res = response.data
        if (res.status === 200) {
          this.getRolesList()
          this.roleVisible = false
          this.roleForm = {}
          this.$message.success(res.msg)
        } else {
          this.$message.error('修改角色信息失败')
          this.roleForm = {}
          this.roleVisible = false
        }
      })
    },
    // 删除角色信息
    deleteClick(id) {
      deleteRole(id).then(response => {
        const res = response.data
        if (res.status === 200) {
          this.$message.success(res.msg)
          this.getRolesList()
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

.el-popover__reference {
  margin-left: 20px;
}

.dialog {
  ::v-deep {
    .el-form-item:nth-child(3){
      margin-left: 10px;
    }
    .el-form-item:nth-child(3) .el-form-item__content {
      margin-left: 10px;
      display: flex;
      align-items: center;
    }
  }
}
</style>
