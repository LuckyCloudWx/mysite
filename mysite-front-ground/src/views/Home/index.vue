<template>
  <div v-loading="!loading" class="home-container" @wheel="handleWheel($event)">
    <ul
      @transitionend="isWheeling = false"
      class="carousel-container"
      :style="{ marginTop: marginTop }"
      ref="cont"
    >
      <li class="carousel-item" v-for="item in data" :key="item.id">
        <CarouselItem :carousel="item" />
      </li>
    </ul>
    <div
      class="arrow-up arrow"
      @click="indexChange(index - 1)"
      v-show="index > 0"
    >
      <Icon type="arrowUp" />
    </div>
    <div
      class="arrow-down arrow"
      @click="indexChange(index + 1)"
      v-show="index < data.length - 1"
    >
      <Icon type="arrowDown" />
    </div>
    <div class="dots">
      <span
        class="dot"
        v-for="(item, i) in data"
        :key="item.id"
        :class="{ active: i === index }"
        @click="index = i"
      ></span>
    </div>
  </div>
</template>

<script>
import Banner from "@/api/banner/";
import CarouselItem from "./CarouselItem.vue";
import Icon from "@/components/Icon";
import { mapState } from "vuex";
export default {
  created() {
    if (this.$store.state.banner.data.length > 0) {
      return;
    }
    this.$store.dispatch("banner/fetchData");
  },
  data() {
    return {
      index: 0,
      containerHeight: 0,
      isWheeling: false,
    };
  },
  mounted() {
    this.containerHeight = this.$refs.cont.clientHeight;
    window.addEventListener("resize", this.handleResize);
  },
  components: { CarouselItem, Icon },
  computed: {
    marginTop() {
      return -this.index * this.containerHeight + "px";
    },
    ...mapState("banner", ["loading", "data"]),
  },
  methods: {
    indexChange(i) {
      this.index = i;
    },
    handleWheel(e) {
      if (this.isWheeling) {
        return;
      }

      if (e.deltaY < -5 && this.index > 0) {
        this.isWheeling = true;
        this.index--;
      } else if (e.deltaY > 5 && this.index < this.data.length - 1) {
        this.isWheeling = true;
        this.index++;
      }
    },
    handleResize() {
      this.containerHeight = this.$refs.cont.clientHeight;
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>

<style scoped lang="less">
@import "~@/styles/mixture.less";
@import "~@/styles/var.less";
.home-container {
  position: relative;
  overflow: hidden;
  height: 100vh;
  text-align: center;
  .carousel-container {
    width: 100%;
    height: 100%;
    transition: 0.5s;
    .carousel-item {
      width: 100%;
      height: 100%;
      border: 1px solid #000;

      // test
      // width: 80%;
      // height: 60%;
      // overflow: visible;
      // border: 2px solid #0f0;
      // margin: 20px auto;
      // overflow: visible;
    }
  }

  .arrow {
    .posi-center();
    font-size: 30px;
    font-weight: bold;
    color: @gray;
    transform: translateX(-50%);
    cursor: pointer;
    @jumpDis: 15px;
    &.arrow-up {
      top: 25px;
      animation: jumpup 2s infinite;
      @keyframes jumpup {
        0%,
        100% {
          transform: translateY(@jumpDis);
        }
        50% {
          transform: translateY(-@jumpDis);
        }
      }
    }
    &.arrow-down {
      top: auto;
      bottom: 25px;
      animation: jumpdown 2s infinite;

      @keyframes jumpdown {
        0%,
        100% {
          transform: translateY(-@jumpDis);
        }
        50% {
          transform: translateY(@jumpDis);
        }
      }
    }
  }
  .dots {
    .posi-center();
    left: auto;
    right: 25px;
    .dot {
      width: 10px;
      height: 10px;
      display: block;
      border: 1px solid #fff;
      border-radius: 50%;
      background-color: @dark;
      margin-bottom: 7px;
      cursor: pointer;
      &.active {
        background-color: #fff;
      }
    }
  }
}
</style>