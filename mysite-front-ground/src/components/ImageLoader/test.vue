<template>
  <div class="test-container">
    <ImageLoader
      :src="url"
      :placeholder="placeholder"
      @originShowed="handleShowed()"
      :duration="1000"
    />
  </div>
</template>

<script>
import ImageLoader from "./";
export default {
  components: {
    ImageLoader,
  },
  data() {
    return {
      url: "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?fit=crop&crop=entropy&w=3456&h=2304",
      placeholder:
        "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?w=100",
    };
  },
  methods: {
    handleShowed() {
      console.log("原图已完全显示");
    },
  },
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>