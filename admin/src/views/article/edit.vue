<template>
  <el-card>
    <article-detail :is-edit="true" />
  </el-card>
</template>

<script>
import ArticleDetail from '@/views/article/components/ArticleDetail'

export default {
  name: 'EditForm',
  components: { ArticleDetail }
}
</script>
<style scoped>
.el-card{
  margin: 20px;
}
</style>
