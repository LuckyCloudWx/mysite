<template>
  <div class="test-container">
    <SiteAside />
  </div>
</template>

<script>
import SiteAside from "./";
export default {
  components: {
    SiteAside,
  },
};
</script>

<style lang="less" >
@import "~@/styles/global.less";

// 容器宽度推荐300px；
.test-container {
  width: 300px;
  height: 100vh;
  background-color: #ccc;
}
</style>