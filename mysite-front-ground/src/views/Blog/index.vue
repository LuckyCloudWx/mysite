<template>
  <layout>
    <BlogList />
    <template #right>
      <BlogTypes />
    </template>
  </layout>
</template>

<script>
import Layout from "@/components/Layout";
import BlogList from "./components/BlogList.vue";
import BlogTypes from "./components/BlogTypes.vue";
export default {
  components: {
    Layout,
    BlogList,
    BlogTypes,
  },
};
</script>