<template>
  <!-- 只有最大页码数大于1时才显示:v-if -->
  <div class="pager-container" v-if="pageNumber > 1">
    <a :class="{ disabled: current === 1 }" @click="sendPageChange(1)"
      >|&lt;&lt;</a
    >
    <a :class="{ disabled: current === 1 }" @click="sendPageChange(current - 1)"
      >&lt;&lt;</a
    >
    <a
      v-for="(n, i) in visiblePage"
      :key="i"
      :class="{ active: n === current }"
      @click="sendPageChange(n)"
      >{{ n }}</a
    >
    <a
      :class="{ disabled: current === pageNumber }"
      @click="sendPageChange(current + 1)"
      >&gt;&gt;</a
    >
    <a
      :class="{ disabled: current === pageNumber }"
      @click="sendPageChange(pageNumber)"
      >&gt;&gt;|</a
    >
  </div>
</template>

<script>
export default {
  props: {
    current: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
    },
    limit: {
      type: Number,
      default: 10,
    },
    visibleNumber: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    pageNumber() {
      return Math.ceil(this.total / this.limit);
    },
    visibleMin() {
      let min = this.current - Math.floor(this.visibleNumber / 2);
      if (min < 1) {
        min = 1;
      }
      return min;
    },
    visibleMax() {
      let max = this.visibleMin + this.visibleNumber - 1;
      if (max > this.pageNumber) {
        max = this.pageNumber;
      }
      return max;
    },
    visiblePage() {
      let page = [];
      for (let i = this.visibleMin; i <= this.visibleMax; i++) {
        page.push(i);
      }
      return page;
    },
  },
  methods: {
    sendPageChange(newPage) {
      if (
        newPage === this.current ||
        newPage < 1 ||
        newPage > this.pageNumbers
      ) {
        return;
      }
      this.$emit("pageChange", newPage);
    },
  },
};
</script>

<style lang="less" scope>
@import url("~@/styles/var.less");
.pager-container {
  display: flex;
  justify-content: center;
  color: @primary;
  a {
    margin: 0 5px;
    user-select: none;
    cursor: pointer;
    &.disabled {
      color: @lightWords;
      cursor: not-allowed;
    }
    &.active {
      color: @words;
      cursor: text;
    }
  }
}
</style>