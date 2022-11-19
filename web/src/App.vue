<template>
  <!-- 一级路由 -->
  <router-view></router-view>
  <el-backtop :bottom="80" :right="60" :visibility-height="280">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-huojian"></use>
    </svg>
  </el-backtop>
</template>

<script>
// 如果使用setup语法糖设置组件的name，还是单独使用一个block更好，
// 具体参考：https://juejin.cn/post/7114155218857623565
export default {
  name: 'App',
  inheritAttrs: false,
  customOptions: {}
}
</script>

<script setup lang="ts"></script>

<style lang="less" scoped>
.icon {
  width: 1.3em;
  height: 1.3em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.el-backtop {
  width: 48px;
  height: 48px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
}
</style>
<style lang="less">
html,
body,
#app{
  margin:0;
  padding:0;
  height:100%;
}
</style>
