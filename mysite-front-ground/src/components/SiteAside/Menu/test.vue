<template>
  <div class="test-container">
    <Menu />
  </div>
</template>

<script>
import Menu from "./";
export default {
  components: {
    Menu,
  },
};
</script>

<style lang="less">
@import "~@/styles/global.less";
.test-container {
  width: 300px;
  height: 100vh;
  margin: 0 auto;
  background-color: #eee;
  outline: 1px solid;
  overflow: hidden;
}
</style>