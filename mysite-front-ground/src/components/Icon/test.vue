<template>
  <div class="test-container">
    <div class="item" v-for="item in icons" :key="item">
      <Icon :type="item" />{{ item }}
    </div>
  </div>
</template>
    
    <script>
import Icon, { icons } from "./";

export default {
  components: {
    Icon,
  },
  data() {
    return {
      icons,
    };
  },
};
</script>
    
    <style scoped lang="less">
.test-container {
  .item {
    .icon-container {
      margin: 0 5px;
    }
    display: inline-block;
    padding: 10px 20px;
  }
}
</style>