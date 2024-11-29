<template>
  <div class="comment-list-container">
    <ul>
      <li class="comment-item" v-for="item in list" :key="item.id">
        <Avatar :url="item.avatar" :size="50" />
        <div class="info">
          <div class="nickname">{{ item.nickname }}</div>
          <div class="content">
            {{ item.content }}
          </div>
          <div class="data-time">{{ item.createDate }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import headUrl from "@/assets/head_port.png";
import Avatar from "@/components/Avatar";
export default {
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  components: {
    Avatar,
  },
  data() {
    return {
      headUrl,
    };
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
ul {
  padding-left: 0;
  .comment-item {
    margin-top: 35px;
    list-style: none;
    display: flex;
    position: relative;
    .info {
      padding-left: 20px;
      flex: 1 1 auto;
      position: relative;
      .nickname {
        font-size: 20px;
        font-weight: bold;
        color: @primary;
        font-family: "KaiTi";
        margin-bottom: 10px;
      }
      .content {
        font-size: 14px;
      }
      .data-time {
        position: absolute;
        top: 0;
        right: 0;
        color: @gray;
        font-size: 12px;
        padding-top: 5px;
      }
    }
    &::after {
      content: "";
      position: absolute;
      bottom: -15px;
      width: 100%;
      height: 1px;
      background-color: lighten(@gray, 20%);
    }
  }
}
</style>