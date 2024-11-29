<template>
  <div v-show="show" class="to-top-container" @click="handleClick">top</div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  created() {
    window.eventBus.$on("mainScroll", (dom) => {
      if (!dom) {
        this.show = false;
        return;
      }
      this.show = dom.scrollTop > 500;
    });
  },
  methods: {
    handleClick() {
      window.eventBus.$emit("setScroll", 0);
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.to-top-container {
  position: fixed;
  right: 50px;
  bottom: 50px;
  background-color: @primary;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: #fff;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
}
</style>