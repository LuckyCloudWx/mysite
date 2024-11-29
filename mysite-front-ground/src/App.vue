<template>
  <div class="app-container">
    <layout>
      <template #left>
        <div class="left">
          <SiteAside />
        </div>
      </template>
      <template #default>
        <Router-view />
      </template>
    </layout>
    <ToTop />
  </div>
</template>

<script>
import SiteAside from "@/components/SiteAside";
import Layout from "@/components/Layout";
import ToTop from "./components/toTop/index.vue";
export default {
  components: {
    SiteAside,
    Layout,
    ToTop,
  },
};
</script>

<style scoped lang="less">
.app-container {
  width: 100%;
  height: 100vh;
  .left {
    width: 300px;
    height: 100vh;
  }
}
</style>

