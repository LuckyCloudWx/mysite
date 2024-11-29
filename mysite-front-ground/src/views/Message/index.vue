<template>
  <div class="message-container" ref="message-container">
    <Comments
      :data="data.rows"
      title="留言列表"
      :subtitle="data.total"
      @submit="handleSubmit"
      :isDataLoaded="loaded"
    />
  </div>
</template>

<script>
import Comments from '@/components/Comments'
import fetchData from '@/mixin/fetchData'
import * as messageApi from '@/api/message'
import scrollEvent from '@/mixin/scrollEvent'

export default {
  data() {
    return {
      page: 1,
      limit: 10,
    }
  },
  mixins: [fetchData({ total: 0, rows: [] }), scrollEvent('message-container')],
  components: {
    Comments,
  },
  mounted() {
    window.eventBus.$on('mainScroll', this.messageScroll)
  },
  methods: {
    async fetchedData() {
      const resp = await messageApi.getMessages(this.page, this.limit)
      // console.log(resp)
      return resp
    },
    async handleSubmit(data, callback) {
      // console.log(data)
      const resp = await messageApi.postMessage(data)
      // console.log(resp)
      if (resp) {
        this.data.rows.unshift(resp)
        this.data.total++
        // 提交成功后的处理：弹出消息（内容：‘感谢您的留言’，类型：‘success’）
        callback('感谢您的留言！', 'success')
      } else {
        callback('您的操作过于频繁，请稍后再试', 'warn')
        return
      }
    },
    async fetchMore() {
      if (!this.loaded || this.data.rows.length >= this.data.total) {
        return
      }
      this.loaded = false
      this.page++
      const newComments = await messageApi.getMessages(this.page, this.limit)
      // console.log('newComments', newComments)
      this.data.rows = this.data.rows.concat(newComments.rows)
      this.loaded = true
    },
    messageScroll(container) {
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
.message-container {
  padding: 20px 0;
  height: 100%;
  overflow: auto;
  scroll-behavior: smooth;
  .comments-container {
    width: 80%;
    margin: 0 auto;
  }
}
</style>
