<template>
  <el-card>
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
        width="200"
        label="更新时间"
        header-align="center"
        align="center"
      />
      <el-table-column
        v-slot="scope"
        label="操作"
        width="320"
        header-align="center"
        align="center"
      >
        <el-button
          type="primary"
          :disabled="scope.row.id===1"
          round
          plain
          size="small"
          @click="menuClick(scope.row.id)"
        >分配菜单权限
        </el-button>
        <el-button
          type="primary"
          :disabled="scope.row.id===1"
          round
          plain
          size="small"
          @click="operationClick(scope.row)"
        >分配操作权限
        </el-button>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="35%"
    >
      <el-tree
        ref="tree"
        :data="treeData"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        :default-checked-keys="checkedKeys"
      />
      <span slot="footer" class="dialog-footer">
        <el-button round plain type="danger" @click="dialogVisible = false">取 消</el-button>
        <el-button v-if="dialogTitle==='分配菜单权限'" round plain type="primary" @click="updateMenu">确 定</el-button>
        <el-button
          v-if="dialogTitle==='分配操作权限'"
          round
          plain
          type="primary"
          @click="updateOperation"
        >确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import {
  getMenuList,
  getRoleMenuList,
  getPermission,
  getRolePermission,
  getRolesList,
  updateRoleMenuList,
  updateRolePermissionList
} from '@/api/role'

export default {
  name: 'Index',
  data() {
    return {
      tableData: [],
      dialogTitle: '',
      dialogVisible: false,
      // 被编辑角色ID
      editId: '',
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      treeData: [],
      // 已勾选节点
      checkedKeys: []
    }
  },
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
    transformData(data) {
      // 把扁平数据转成树形数据
      const cloneData = JSON.parse(JSON.stringify(data)) // 对源数据深度克隆
      return cloneData.filter(father => {
        const branchArr = cloneData.filter(child => father.id === child.parent_id) // 返回每一项的子级数组
        branchArr.length > 0 ? father.children = branchArr : '' // 如果存在子级，则给父级添加一个children属性，并赋值
        return father.parent_id === null // 返回第一层
      })
    },
    menuClick(id) {
      this.dialogTitle = '分配菜单权限'
      this.checkedKeys = []
      this.dialogVisible = true
      this.editId = id
      getMenuList().then(response => {
        this.treeData = []
        const res = response.data
        if (res.status === 200) {
          this.treeData = this.transformData(res.data.menu_list)
        }
      })
      getRoleMenuList(id).then(response => {
        const res = response.data
        if (res.status === 200) {
          const roleMenuList = res.data.roleMenuList
          for (let i = 0; i < roleMenuList.length; i++) {
            this.checkedKeys.push(roleMenuList[i].id)
          }
          const newCheckedKeys = JSON.stringify(this.checkedKeys)
          this.checkedKeys = JSON.parse(newCheckedKeys)
        }
      })
    },
    operationClick(params) {
      this.dialogTitle = '分配操作权限'
      this.checkedKeys = []
      this.dialogVisible = true
      this.editId = params.id
      getRolePermission(params.name).then(response => {
        const res = response.data
        if (res.status === 200) {
          const permissionList = res.data.permissionList
          for (let i = 0; i < permissionList.length; i++) {
            this.checkedKeys.push(permissionList[i].id)
          }
        }
        const newCheckedKeys = JSON.stringify(this.checkedKeys)
        this.checkedKeys = JSON.parse(newCheckedKeys)
      })
      getPermission().then(response => {
        const res = response.data
        this.treeData = []
        if (res.status === 200) {
          const permissionList = res.data.permissionList
          for (let i = 0; i < permissionList.length; i++) {
            const tmp = {
              id: permissionList[i].id,
              title: permissionList[i].title
            }
            this.treeData.push(tmp)
          }
        }
      })
    },
    //  更新菜单权限
    updateMenu() {
      const roleMenuIdList = this.$refs.tree.getCheckedKeys()
      updateRoleMenuList(this.editId, roleMenuIdList).then(response => {
        const res = response.data
        if (res.status === 200) {
          this.dialogVisible = false
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    //  更新角色操作权限
    updateOperation() {
      const permissionIdList = this.$refs.tree.getCheckedKeys()
      updateRolePermissionList(this.editId, permissionIdList).then(response => {
        const res = response.data
        if (res.status === 200) {
          this.dialogVisible = false
          this.$message.success(res.msg)
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
</style>
