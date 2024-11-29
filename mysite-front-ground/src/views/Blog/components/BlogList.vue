<template>
  <div class="blog-list-container" ref="container" v-loading="loaded">
    <ul>
      <li v-for="item in data.rows" :key="item.id" class="blog-item">
        <RouterLink
          v-if="item.thumb"
          :to="{
            name: '/detail',
            params: {
              id: item.id,
            },
          }"
        >
          <img v-lazy="item.thumb" alt="" />
        </RouterLink>
        <div class="blog-text">
          <RouterLink
            class="title"
            :to="{
              name: '/detail',
              params: {
                id: item.id,
              },
            }"
          >
            {{ item.title }}
          </RouterLink>
          <p class="blog-info">
            <span class="data">日期：{{ item.createDate }}</span>
            <span class="scan-number">浏览量：{{ item.scanNumber }}</span>
            <span class="comment">评论:{{ item.commentNumber }}</span>
            <span class="type">分类：{{ item.category.id }}</span>
          </p>
          <p class="discription">
            {{ item.description }}
          </p>
        </div>
      </li>
      <!-- 如果无数据，则显示Empty组件 -->
      <Empty v-if="data.rows.length === 0 && loaded"/>
    </ul>
    <!-- 分页组件 -->
    <Pager
      :current="pathInfo.page"
      :total="data.total"
      :limit="pathInfo.limit"
      @pageChange="handleClick"
    />
  </div>
</template>

<script>
import Pager from "@/components/Pager";
import Empty from "@/components/Empty";
import imgSrc from "@/assets/head_port.png";
import fetchData from "@/mixin/fetchData";
import { getBlogs } from "@/api/blog";
import scrollEvent from "@/mixin/scrollEvent";

export default {
  mixins: [fetchData({total:0,rows:[]}), scrollEvent("container")],
  data() {
    return {
      imgSrc,
    };
  },
  computed: {
    // 给分页组件提供依据：当前页码、总页码数
    pathInfo() {
      return {
        page: +this.$route.query.page || 1,
        limit: +this.$route.query.limit || 20,
        type: +this.$route.params.categoryId || -1,
      };
    },
  },
  components: {
    Pager,
    Empty
  },
  methods: {
    async fetchedData() {
      // 返回结果是一个对象：{total:xxx,rows:[{...},{...},...]}
      return await getBlogs(
        this.pathInfo.page,
        this.pathInfo.limit,
        this.pathInfo.type
      );
    },
    handleClick(newPage) {
      // 点击不同的页码，改变路由
      const categoryId = this.$route.params.categoryId;
      if (categoryId > 0) {
        // 路由格式为分类路由
        this.$router.push({
          name: "/category",
          params: { categoryId },
          query: {
            page: newPage,
            limit: 10,
          },
        });
      } else {
        // 路由格式为总类路由
        this.$router.push({
          name: "/blog",
          query: { page: newPage, limit: 20 },
        });
      }
    },
  },
  watch: {
    async $route(newVal) {
      this.$refs.container.scrollTop = 0;
      this.loaded = false;
      this.data = await getBlogs(
        newVal.query.page,
        newVal.query.limit,
        newVal.params.category || -1
      );
      this.loaded = true;
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.blog-list-container {
  overflow-y: scroll;
  height: 100%;
  scroll-behavior: smooth;
  position: relative;
}
.blog-item {
  //   border: 1px solid #eee;
  display: flex;
  margin: 20px 10px;
  position: relative;
  > a {
    margin-right: 10px;
  }
  img {
    display: block;
    width: 170px;
    height: 170px;
    border-radius: 10px;
    margin-top: 10px;
  }
  .title {
    display: block;
    font-size: 1.5em;
    font-weight: bold;
    margin: 10px 0;
    line-height: 35px;
  }
  .discription {
    line-height: 25px;
    font-size: 14px;
  }
  .blog-info {
    span {
      font-size: 12px;
      color: @gray;
      display: inline-block;
      margin: 0 5px;
    }
  }
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -15px;
    width: 100%;
    height: 1px;
    background-color: @gray;
  }
}
.pager-container {
  margin: 40px auto;
}
</style>