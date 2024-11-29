<template>
  <div class="project-container" ref="project-container" v-loading="!loading">
    <div v-for = "item in data" :key="item.id" class="project-item">
      <a :href="item.url">
        <img class="item-img" v-lazy="item.thumb" alt="">
      </a>
      <div class="info">
        <a :href="item.url"><h2>{{item.name}}</h2></a>
        <a :href="item.github" class="github">github</a>
        <div class="discriptions">
          <div v-for="(description,i) in item.description" :key="i" class="discription-item">{{description}}</div>
        </div>
      </div>
    </div>
    <!-- 如果无数据，则显示Empty组件 -->
    <Empty v-if="data.length === 0 && !loading"/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import scrollEvent from '@/mixin/scrollEvent';
import Empty from '@/components/Empty';

export default {
  components: {
    Empty,
  },
  mixins:[scrollEvent('project-container')],
  created () {
    this.$store.dispatch('project/fetchData');
  },
  computed: mapState('project',['data','loading'])
}
</script>

<style lang="less" scoped>
  .project-container{
    height: 100%;
    overflow: auto;
    scroll-behavior: smooth;
    position: relative;
    .project-item{
      width: 90%;
      margin: 20px auto;
      cursor: pointer;
      display:flex;
      border: 1px solid #ccc;
      padding: 10px;

      .item-img{
        width: 150px;
        height: 150px;
        display: block;
        margin-right: 10px;
      }

      .info{
        .github{
          font-size: 12px;
          color:#666;
          &:hover{
            color:#999;
          }
        }
        .discriptions{
          .discription-item{
          margin-top: 10px;
          }
        }
      }
      
      &:hover{
        box-shadow:0 0 5px #999,
      }
    }
  }
</style>