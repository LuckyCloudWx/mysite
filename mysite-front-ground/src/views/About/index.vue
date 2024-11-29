<template>
  <div class="about-container" v-loading="!loading">
    <iframe class="about-content" :src="src" frameborder="0"></iframe>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  created () {
    this.$store.dispatch('about/fetchData');
  },
  computed: mapState('about', {
    src: 'data',
    loading:'loading'
  })
}
</script>

<style scoped lang="less">
  .about-container{
    height: 100%;
    overflow: hidden;
    position: relative;
    .about-content{
      display: block;
      width: 100%;
      height: 100%;
    }
  }
</style>