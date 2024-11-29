<template>
  <div class="ImageLoader-container">
    <img class="placeholder" :src="placeholder" alt="IMAGE" />
    <img
      class="origin"
      :src="src"
      alt="原图"
      @load="originLoad()"
      :style="{
        opacity: originIsLoad ? 1 : 0,
        transition: `${duration}ms ease-in-out`,
      }"
    />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      originIsLoad: false,
      originIsShowed: false,
    };
  },
  methods: {
    originLoad() {
      // 当图片加载完成，触发此函数：原图恢复透明度，间隔duration时间后，完全恢复，并删除站位图；
      this.originIsLoad = true;
      setTimeout(() => {
        this.originIsShowed = true;
        this.$emit("originShowed");
      }, this.duration);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixture.less";
.ImageLoader-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  img {
    object-fit: cover;
    .posi-fill();
  }
  .placeholder {
    filter: blur(1vw);
  }
}
</style>