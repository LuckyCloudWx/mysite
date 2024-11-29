<template>
  <ul class="right-list-container">
    <li v-for="(item, i) in list" :key="i">
      <span
        class="name"
        :class="{ selected: item.selected }"
        @click="handleClick(item)"
        >{{ item.name }}</span
      >
      <span
        v-if="item.aside"
        class="aside"
        :class="{ selected: item.selected }"
        @click="handleClick(item)"
        >{{ item.aside }}篇</span
      >
      <RightList :list="item.children" @selected="handleClick($event)" />
    </li>
    <!-- 自嵌套，形成列表层级结构 -->
  </ul>
</template>

<script>
export default {
  name: "RightList",
  props: {
    // 每个项目是一个对象，包含name selected children属性
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleClick(item) {
      if (!item.selected) {
        this.$emit("selected", item);
      }
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.right-list-container {
  padding: 0;
  list-style: none;
  margin: 0;
  @textHeight: 40px;
  span {
    height: @textHeight;
    line-height: @textHeight;
    cursor: pointer;
  }
  .aside {
    margin-left: 10px;
    font-size: 12px;
    color: @gray;
  }
  .right-list-container {
    margin-left: 10px;
  }
  .selected {
    color: @warn;
    font-weight: bold;
  }
}
</style>