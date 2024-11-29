<template>
  <div class="blog-TOC-container">
    <h2>文章目录</h2>
    <RightList :list="newTOC" @selected="handleSelect($event)" />
  </div>
</template>
  
  <script>
import RightList from "./RightList";
import debounce from "@/utils/debounce";
export default {
  props: {
    TOC: {
      type: Array,
      required: true,
    },
  },
  components: {
    RightList,
  },
  data() {
    return {
      anchor: "article-md-title-1",
    };
  },
  created() {
    this.debounce = debounce(this.handleScroll, 100);
    window.eventBus.$on("wheel", this.debounce);
  },
  destroyed() {
    window.eventBus.$off("wheel", this.debounce);
  },
  computed: {
    newTOC() {
      const transTOC = (toc = []) => {
        return toc.map((t) => {
          return {
            ...t,
            selected: t.anchor === this.anchor,
            children: transTOC(t.children),
          };
        });
      };
      return transTOC(this.TOC);
    },
    doms() {
      const doms = [];
      const searchDoms = (toc = []) => {
        for (const item of toc) {
          // console.log(item);
          doms.push(document.querySelector(`#${item.anchor}`));
          searchDoms(item.children);
        }
      };
      searchDoms(this.TOC);
      return doms;
    },
  },
  methods: {
    handleSelect(item) {
      this.anchor = item.anchor;
      location.hash = item.anchor;
    },
    handleScroll() {
      const range = 100;
      for (const dom of this.doms) {
        const top = dom.getBoundingClientRect().top;
        if (top > 0 && top < range) {
          this.anchor = dom.id;
        } else if (top > range) {
          return;
        } else {
          this.anchor = dom.id;
        }
        if (this.$router.history.current.hash !== "#" + this.anchor) {
          this.$router.push({ hash: "#" + this.anchor });
        }
      }
    },
  },
};
</script>
  
  <style scoped lang="less">
.blog-TOC-container {
  position: relative;
  height: 100%;
}
</style>