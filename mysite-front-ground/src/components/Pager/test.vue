<template>
  <div>
    <h1>This is a Pager assembly</h1>
    <Pager :total="182" :current="current" @pageChange="dealNewPage($event)" />
  </div>
</template>
  
  <script>
import Pager from "./";

export default {
  components: {
    Pager,
  },
  data() {
    return {
      current: 1,
    };
  },
  methods: {
    dealNewPage(newPage) {
      this.current = newPage;
    },
  },
};
</script>
  
  <style scoped>
h1 {
  text-align: center;
}
.iconfont {
  font-size: 50px;
  color: rgb(33, 255, 4);
}
.pager-container {
  margin-top: 100px;
}
</style>