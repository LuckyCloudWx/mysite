<template>
  <div id="blog-comment" class="blog-comment-container">
    <Comment
      v-if="data"
      :title="title"
      :subtitle="data.total"
      :data="data.rows"
      :isDataLoaded="loaded"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import Comment from '@/components/Comments'
import fetchData from '@/mixin/fetchData'
import { getComments, postComment } from '@/api/blog'
export default {
  mixins: [fetchData({ total: 0, rows: [] })],
  data() {
    return {
      title: '评论列表',
      page: 1,
    }
  },
  components: {
    Comment,
  },
  mounted() {
    window.eventBus.$on('mainScroll', this.handleScroll)
  },
  methods: {
    async fetchedData() {
      const result = await getComments(this.page)
      return result
    },
    async fetchMore() {
      // console.log(this.data.rows.length, this.data.total)
      if (!this.loaded || this.data.rows.length >= this.data.total) {
        return
      }
      this.loaded = false
      this.page++
      const newComments = await getComments(this.page)
      this.data.rows = this.data.rows.concat(newComments.rows)
      this.loaded = true
    },
    async handleSubmit(comment, callback) {
      const data = { ...comment, blogId: this.$route.params.id }
      // console.log(data)
      // 提交昵称和内容并处理响应
      const resp = await postComment(data)
      // console.log(data)
      // console.log('resp', resp)
      if (resp) {
        console.log('success')
        this.data.rows.unshift(resp)
        this.data.total++
        // 成功提交时，执行回调函数
        callback('评论成功', 'success')
      } else {
        // 提交失败时，执行回调函数
        // callback('评论次数过多，请稍后再试', 'warn')
        return
      }
    },
    handleScroll(container) {
      if (!container) {
        return
      }
      const range = 100
      const dis = Math.abs(
        container.clientHeight + container.scrollTop - container.scrollHeight
      )
      if (dis < range) {
        this.fetchMore()
      }
    },
  },
}
</script>

<style scoped lang="less">
.blog-comment-container {
  position: relative;
  padding-left: 20px;
}
</style>
