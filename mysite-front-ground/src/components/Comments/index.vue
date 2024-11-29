<template>
  <div class="comments-container">
    <CommentInput @submit="handleSubmit" />
    <div class="self">
      <h2 class="title">
        {{ title }} <span>({{ subtitle }})</span>
      </h2>
    </div>
    <CommentList :list="data" v-if="data" />
    <div class="more-data" v-loading="isDataLoaded"></div>
  </div>
</template>

<script>
import CommentList from './CommentList'
import CommentInput from './CommentInput'

export default {
  components: {
    CommentList,
    CommentInput,
  },
  props: {
    title: {
      type: String,
      default: '评论列表',
    },
    subtitle: {
      type: Number,
      default: 100,
    },
    data: {
      type: Array,
      required: true,
    },
    isDataLoaded: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    handleSubmit(comment, callback) {
      this.$emit('submit', comment, callback)
    },
  },
}
</script>

<style scoped lang="less">
.more-data {
  position: relative;
  height: 100px;
}
</style>
