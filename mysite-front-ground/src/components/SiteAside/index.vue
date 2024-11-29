<template >
  <div class="site-aside-container">
    <template v-if="data">
      <Avatar :url="data.avatar" :size="200" />
      <div class="nickname">{{ data.siteTitle }}</div>
    </template>
    <Menu />
    <Contact />
  </div>
</template>

<script>
import Avatar from "../Avatar";
import Menu from "./Menu";
import Contact from "./Contact";
import { mapState } from "vuex";

export default {
  components: {
    Avatar,
    Menu,
    Contact,
  },
  computed: {
    ...mapState("setting", ["data"]),
  },
};
</script>

<style lang="less">
@import "~@/styles/var.less";
.site-aside-container {
  overflow: hidden;
  background-color: @dark;
  width: 100%;
  height: 100%;
  overflow-y: auto;

  //   头像和标题
  .avatar-container {
    margin: 20px auto;
    margin-bottom: 25px;
  }
  .nickname {
    text-align: center;
    color: #fff;
    font-size: 20px;
    margin-bottom: 20px;
    margin-top: -10px;
    font-weight: bold;
    font-family: "KaiTi";
  }
  //   个人信息项：
  .info-item {
    .icon-container {
      margin-right: 15px;
      font-size: 25px;
    }
    color: @lightWords;
    padding: 8px 50px;
    cursor: pointer;
    &:hover {
      color: #fff;
      background-color: @words;
    }
    span {
      vertical-align: 3px;
    }
  }

  // 联系方式项
  .connect-item:nth-child(7) {
    margin-top: 100px;
  }
  .connect-item {
    .icon-container {
      font-size: 35px;
      margin-right: 10px;
    }

    padding: 8px 20px;
    color: @lightWords;
    cursor: pointer;
    &:hover {
      color: #fff;
      background-color: @words;
    }
    span {
      vertical-align: 10px;
    }
  }
}
</style>