<template>
  <div class="menu-container">
    <router-link
      :exact="item.exact"
      v-for="item in linkInfo"
      :to="{ name: item.name }"
      :key="item.name"
      active-class="selected"
      exact-active-class=""
    >
      <Icon :type="item.icon" />
      <span>{{ item.title }}</span>
    </router-link>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      linkInfo: [
        { title: "首页", name: "/", icon: "home", exact: true },
        { title: "文章", name: "/blog", icon: "blog", exact: false },
        { title: "关于我", name: "/about", icon: "about", exact: true },
        {
          title: "项目&效果",
          name: "/project",
          icon: "code",
          exact: true,
        },
        {
          title: "留言板",
          name: "/message",
          icon: "chat",
          exact: true,
        },
      ],
    };
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/global.less";
@import "~@/styles/var.less";
.menu-container {
  width: 100%;
  color: @gray;
  background-color: @dark;
  a {
    display: block;
    padding: 8px 50px;
    font-size: 18px;

    .icon-container {
      margin-right: 15px;
    }
    &:hover {
      color: #fff;
      background-color: @words;
    }
    span {
      font-size: 15px;
    }
    &.selected {
      background-color: #fff2;
    }
  }
}
</style>