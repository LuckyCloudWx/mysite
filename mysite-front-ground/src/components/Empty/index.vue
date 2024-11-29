<template>
  <div class="Empty-container">
    <i class="iconfont icon-qingkong"></i>
    <p class="text">{{ text }}</p>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "无数据",
    },
  },
};
</script>

<style lang="less" scope>
@import url("//at.alicdn.com/t/c/font_3653554_zjtbrvz4ryi.css");
@import url("~@/styles/var.less");
@import "~@/styles/mixture.less";
.Empty-container {
  text-align: center;
  color: @gray;
  font-size: 100px;
  i {
    font-size: inherit;
  }
  p {
    font-size: 15px;
  }
  .posi-center();
}
</style>