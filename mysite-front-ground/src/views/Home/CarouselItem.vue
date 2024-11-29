<template>
  <div
    class="carousel-item-container"
    @mousemove="handleMove"
    ref="carousel"
    @mouseleave="setCenter"
  >
    <div class="img" ref="img" :style="position">
      <ImageLoader
        @originShowed="showText"
        :src="carousel.bigImg"
        :placeholder="carousel.midImg"
      />
    </div>
    <div class="title" ref="title">{{ carousel.title }}</div>
    <div class="desc" ref="desc">{{ carousel.description }}</div>
  </div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader";
export default {
  props: ["carousel"],
  components: {
    ImageLoader,
  },
  data() {
    return {
      titleWidth: 0,
      descWidth: 0,
      mouseX: 0,
      mouseY: 0,
      containerSize: null,
      imgSize: null,
    };
  },
  mounted() {
    this.titleWidth = this.$refs.title.clientWidth + "px";
    this.descWidth = this.$refs.desc.clientWidth + "px";
    this.resize();
    window.addEventListener("resize", this.resize);
  },
  destroyed() {
    window.removeEventListener("resize", this.resize);
  },
  computed: {
    position() {
      let left = 0 + "px";
      let top = 0 + "px";
      if (this.containerSize) {
        const extralX = this.imgSize.width - this.containerSize.width;
        const extralY = this.imgSize.height - this.containerSize.height;
        left = (-extralX / this.containerSize.width) * this.mouseX + "px";
        top = (-extralY / this.containerSize.height) * this.mouseY + "px";
      }
      return {
        left,
        top,
      };
    },
  },
  methods: {
    showText() {
      this.$refs.title.style.opacity = 1;
      this.$refs.title.style.width = 0;
      this.$refs.title.clientWidth;
      this.$refs.title.style.transition = "1s";
      this.$refs.title.style.width = this.titleWidth;

      this.$refs.desc.style.opacity = 1;
      this.$refs.desc.style.width = 0;
      this.$refs.desc.clientWidth;
      this.$refs.desc.style.transition = "2s 1s";
      this.$refs.desc.style.width = this.descWidth;
    },
    handleMove(e) {
      this.rect = this.$refs.carousel.getBoundingClientRect();
      this.mouseX = e.clientX - this.rect.left;
      this.mouseY = e.clientY - this.rect.top;
    },
    resize() {
      this.rect = this.$refs.carousel.getBoundingClientRect();
      this.containerSize = {
        width: this.$refs.carousel.clientWidth,
        height: this.$refs.carousel.clientHeight,
      };
      this.imgSize = {
        width: this.$refs.img.clientWidth,
        height: this.$refs.img.clientHeight,
      };
      this.setCenter();
    },
    setCenter() {
      this.$refs.img.style.transition = ".5s";
      this.mouseX = this.containerSize.width / 2;
      this.mouseY = this.containerSize.height / 2;
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.carousel-item-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  .img {
    width: 110%;
    height: 110%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }

  .title,
  .desc {
    position: absolute;
    left: 25px;
    color: #fff;
    letter-spacing: 3px;
    text-shadow: -1px 0 0 rgba(0, 0, 0, 0.5), 1px 0 0 rgba(0, 0, 0, 0.5),
      0 -1px 0 rgba(0, 0, 0, 0.5), 0 1px 0 rgba(0, 0, 0, 0.5);
    opacity: 0;
    white-space: nowrap;
    overflow: hidden;
  }
  .title {
    top: calc(50% - 40px);
    font-size: 2em;
  }
  .desc {
    top: calc(50% + 20px);
    font-size: 1.2em;
    color: lighten(@gray, 10%);
  }
}
</style>