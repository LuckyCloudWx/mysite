<template>
  <div class="test-container">
    <Contact />
  </div>
</template>

<script>
import Contact from "./";
export default {
  components: {
    Contact,
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.test-container {
  width: 300px;
  height: 100vh;
  margin: 0 auto;
  outline: 1px solid;
  overflow: hidden;
  background-color: #333;
}
</style>