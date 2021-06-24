<template>
  <div id="app">
    <router-view />
    <el-backtop
      :bottom="80"
      :right="60"
      :visibility-height="200"
    >
      <svg
        class="icon"
        aria-hidden="true"
      >
        <use xlink:href="#icon-huojian" />
      </svg>
    </el-backtop>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="scss" scoped>
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
  box-shadow: 0 0 6px rgba(0, 0, 0, .2);
}
</style>
