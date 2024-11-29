<template>
  <div class="test-container">
    <Empty :text="'数据为空'" />
  </div>
</template>

<script>
import Empty from "./";
export default {
  components: {
    Empty,
  },
};
</script>

<style lang="less" scoped>
.test-container {
  width: 500px;
  height: 500px;
  outline: 1px solid;
  margin: 100px auto;
  position: relative;
}
</style>