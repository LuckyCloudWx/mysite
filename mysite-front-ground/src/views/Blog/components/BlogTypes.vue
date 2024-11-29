<template>
  <div class="blog-types-container" v-loading="loaded">
    <h2>文章分类</h2>
    <div class="type-list">
      <div class="all selected" @click="handleClick" ref="all">
        <span class="text">全部</span>
        <span class="aside">{{ total }}篇</span>
      </div>
      <RightList :list="data" @selected="handleSelect($event)" />
    </div>
  </div>
</template>

<script>
import RightList from "./RightList.vue";
import { getBlogTypes } from "@/api/blog";
import fetchData from "@/mixin/fetchData";
export default {
  mixins: [fetchData([])],
  components: {
    RightList,
  },
  data() {
    return {
      selected: true,
    };
  },
  computed: {
    total() {
      // 箭头函数箭头后如果加{}，则必须有return；没有return则必须把{}去掉
      const all = this.data.reduce((a, b) => a + b.articleCount, 0);
      return all;
    },
  },
  methods: {
    async fetchedData() {
      const resp = await getBlogTypes();
      resp.map((it, i) => {
        it.aside = it.articleCount;
        it.selected = i === +this.$route.params.categoryId;
      });
      return resp;
    },
    handleClick() {
      // 更改路由为全部格式
      this.$router.push({
        name: "/blog",
        query: {
          page: 1,
          limit: 10,
        },
      });
    },
    handleSelect(item) {
      // 改变路由
      this.$router.push({
        name: "/category",
        params: { categoryId: item.id },
        query: {
          page: 1,
          limit: 10,
        },
      });
    },
  },
  watch: {
    $route(newVal) {
      const categoryId = +newVal.params.categoryId;
      if (categoryId > 0) {
        this.$refs.all.classList.remove("selected");
        this.data.map((it) => {
          it.selected = it.id === categoryId;
        });
      } else {
        this.data.map((it) => {
          it.selected = "";
        });
        this.$refs.all.classList.add("selected");
      }
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.blog-types-container {
  width: 200px;
  padding: 10px 5px;
  position: relative;
  height: 100%;
  overflow-y: scroll;
  h2 {
    margin-bottom: 10px;
  }
  .all {
    line-height: 40px;
    cursor: pointer;
    &.selected {
      color: @warn;
      .aside {
        color: inherit;
      }
    }
    .text {
      font-weight: bold;
    }
    .aside {
      margin-left: 10px;
      font-size: 12px;
      color: @gray;
    }
  }
  .type-list {
    font-size: 16px;
    color: @words;
  }
}
</style>