<template>
  <i class="iconfont icon-container" :class="iconClass"></i>
</template>

<script>
const classMap = {
  home: "icon-zhuye",
  success: "icon-chenggong",
  error: "icon-cuowu",
  close: "icon-close",
  warn: "icon-jinggao",
  info: "icon-changyongxinxi",
  blog: "icon-yongyan",
  code: "icon-daima",
  about: "icon-changyongxinxi",
  weixin: "icon-wechat-fill",
  mail: "icon-xiaoxi",
  github: "icon-github",
  qq: "icon-QQ",
  arrowUp: "icon-xiangshangjiantou",
  arrowDown: "icon-xiajiantou",
  empty: "icon-qingkong",
  chat: "icon-shouye",
};
export const icons = Object.keys(classMap);
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  computed: {
    iconClass() {
      return classMap[this.type];
    },
  },
  data() {
    return {
      classMap,
    };
  },
};
</script>

<style scoped>
@import url("//at.alicdn.com/t/c/font_3653554_zjtbrvz4ryi.css");
.iconfont {
  font-size: inherit;
  color: inherit;
}
</style>