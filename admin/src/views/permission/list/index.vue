<template>
  <el-card>
    <el-table :data="tableData">
      <el-table-column
        label="#"
        type="index"
      />
      <el-table-column
        label="权限名称"
        prop="name"
      />
      <el-table-column
        label="路径"
        prop="path"
      />
    </el-table>
  </el-card>
</template>

<script>
import { getPermission } from '@/api/role'

export default {
  name: 'Index',
  data() {
    return {
      tableData: []
    }
  },
  created() {
    getPermission().then(response => {
      const res = response.data
      if (res.status === 200) {
        const permissionList = res.data.permissionList
        for (let i = 0; i < permissionList.length; i++) {
          const tmp = {
            name: permissionList[i].title,
            path: permissionList[i].path
          }
          this.tableData.push(tmp)
        }
      } else {
        this.$message.error(res.msg)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.el-card{
  margin: 20px;
}
</style>
