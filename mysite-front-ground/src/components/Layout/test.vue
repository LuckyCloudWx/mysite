<template>
  <div class="test-container">
    <Layout>
      <template #left>
        <div class="left item">
          <SiteAside />
        </div>
      </template>
      <div class="main item">主区域</div>
    </Layout>
  </div>
</template>

<script>
import Layout from "./";
import SiteAside from "@/components/SiteAside";
export default {
  components: {
    Layout,
    SiteAside,
  },
};
</script>

<style lang="less">
@import "~@/styles/global.less";
</style>

<style scoped lang="less">
.test-container {
  width: 100%;
  height: 100vh;
  .layout-container {
    height: 100%;
    display: flex;
    justify-content: space-between;
  }
  .left {
    width: 350px;
  }
  .main {
    width: 100%;
    white-space: nowrap;
  }
  .item {
    height: 100%;
  }
}
</style>