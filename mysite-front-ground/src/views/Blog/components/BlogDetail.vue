<template>
  <div class="blog-detail-container">
    <h2 class="title">{{ blog.title }}</h2>
    <div class="aside">
      <span>创建日期：{{ blog.createDate }}</span>
      <span>浏览量：{{ blog.scanNumber }}</span>
      <a href="#blog-comment">评论：{{ blog.commentNumber }}条</a>
      <RouterLink
        :to="{
          name: '/category',
          params: {
            categoryId: blog.category.id,
          },
        }"
        >{{ blog.category.name }}</RouterLink
      >
    </div>
    <div class="markdown-body" v-html="blog.htmlContent"></div>
  </div>
</template>

<script>
import "highlight.js/styles/github.css";
export default {
  props: {
    blog: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
@import "~@/styles/markdown.css";
.title {
  margin-bottom: 15px;
}
.aside {
  font-size: 12px;
  color: @gray;
  span,
  a {
    margin-right: 15px;
  }
}
.markdown-body {
  margin-top: 20px;
}
</style>