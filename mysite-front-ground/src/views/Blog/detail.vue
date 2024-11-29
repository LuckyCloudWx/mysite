<template>
  <div class="detail-container">
    <Layout>
      <div class="main-container" v-loading="loaded" ref="container">
        <BlogDetail :blog="data" v-if="data" />
        <BlogComment v-if="data" />
      </div>
      <template #right>
        <div class="right-container" v-loading="loaded">
          <BlogTOC :TOC="data.toc" v-if="data" />
        </div>
      </template>
    </Layout>
  </div>
</template>

<script>
import fetchData from '../../mixin/fetchData'
import { getBlog } from '../../api/blog'
import Layout from '@/components/Layout'
import BlogDetail from './components/BlogDetail'
import BlogTOC from './components/BlogTOC'
import BlogComment from './components/BlogComment.vue'
import scrollEvent from '@/mixin/scrollEvent'
import { titleControl } from '@/utils'

export default {
  // 这里的fetchData参数最好为null；若为{}，它的布尔值对应的是true，会误加载dom节点，从而读取不到数据。
  mixins: [fetchData(null), scrollEvent('container')],
  components: {
    Layout,
    BlogDetail,
    BlogTOC,
    BlogComment,
  },
  computed: {
    doms() {
      const doms = []
      const searchDoms = (toc = []) => {
        for (const item of toc) {
          doms.push(document.querySelector(`#${item.anchor}`))
          searchDoms(item.children)
        }
      }
      searchDoms(this.data.toc)
      return doms
    },
  },
  methods: {
    async fetchedData() {
      let resp = await getBlog(this.$route.params.id)
      // resp = null;
      // console.log(resp)
      if (!resp) {
        this.$router.push('/404')
        return
      }
      titleControl.setRouterTitle(resp.title)
      titleControl.setTitle()
      return resp
    },
    // 随滚动条标示目录
    handleWheel() {
      let domsInfo = []
      for (const dom of this.doms) {
        const domInfo = {}
        domInfo.top = dom.getBoundingClientRect().y
        domInfo.id = dom.id
        domsInfo.push(domInfo)
      }
      window.eventBus.$emit('wheel', domsInfo)
    },
    async load() {
      const hash = location.hash
      location.hash = ''
      await this.fetchedData()
      location.hash = hash
    },
  },
  mounted() {
    this.$refs.container.addEventListener('scroll', this.handleWheel)
    window.addEventListener('load', this.load)
  },
  beforeDestroy() {
    this.$refs.container.removeEventListener('scroll', this.handleWheel)
    window.removeEventListener('load', this.load)
  },
}
</script>

<style scoped lang="less">
.main-container {
  height: 100%;
  overflow-y: scroll;
  scroll-behavior: smooth;

  .blog-detail-container {
    padding: 20px;
    position: relative;
  }
}
.right-container {
  width: 300px;
  height: 100%;
  overflow-y: scroll;
  padding: 20px;
  position: relative;
}
</style>
