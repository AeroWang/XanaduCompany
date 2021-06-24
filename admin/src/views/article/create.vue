<template>
  <!--<article-detail />-->
  <el-card>
    <article-detail />
  </el-card>
</template>

<script>
import ArticleDetail from '@/views/article/components/ArticleDetail'

export default {
  name: 'CreateArticle',
  components: { ArticleDetail }
}
</script>
<style lang="scss" scoped>
.el-card{
  margin: 20px;
}
</style>
