<template>
  <div class="contact-container">
    <div
      class="contact-item"
      v-for="(item, i) in contactInfo"
      :key="i"
      @click="handleClick(item.icon)"
    >
      <Icon :type="item.icon" />
      <span>{{ item.text }}</span>
      <div v-if="i === 2 || i === 3" :class="'qrcode' + i + ' qrcode'">
        <img
          :src="
            i === 3
              ? data
                ? data.weixinQrCode
                : ''
              : data
              ? data.qqQrCode
              : ''
          "
          alt="wechat_qrcode"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
import { mapState } from "vuex";
import myIcon from "@/assets/favicon3.webp";

export default {
  components: {
    Icon,
  },
  watch: {
    data: function callback(data) {
      this.contactInfo = [
        { icon: "github", text: data.githubName },
        { icon: "mail", text: data.mail },
        { icon: "qq", text: data.qq },
        { icon: "weixin", text: data.weixin },
      ];
      // this.addFavIcon();
    },
  },
  data() {
    return {
      contactInfo: [
        { icon: "github", text: "" },
        { icon: "mail", text: "" },
        { icon: "qq", text: "" },
        { icon: "weixin", text: "" },
      ],
    };
  },
  computed: {
    ...mapState("setting", ["data"]),
  },
  methods: {
    handleClick(icon) {
      if (icon === "mail") {
        window.location = "mailto:18919877413@163.com";
      } else if (icon === "qq") {
        window.location =
          "tencent://message/?Menu=yes&uin=1665422775&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45";
      } else if (icon === "github") {
        window.location = this.data.github;
      } else return;
    },
    addFavIcon() {
      if (document.querySelector("link[rel=icon]")) {
        return;
      }
      const head = document.querySelector("head");
      const icon = document.createElement("link");
      icon.rel = "icon";
      icon.href = myIcon;
      head.appendChild(icon);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.contact-container {
  margin-top: 200px;
  width: 100%;
  color: @gray;
  background-color: transparent;
  .contact-item {
    position: relative;
    padding: 8px 20px;
    cursor: pointer;
    .icon-container {
      font-size: 35px;
      margin-right: 15px;
    }
    span {
      vertical-align: 10px;
    }
    &:hover {
      color: #fff;
    }

    @size: 200px;
    .qrcode {
      position: absolute;
      bottom: 50px;
      left: 20px;
      width: @size;
      height: @size;
      transform: scaleY(0);
      transform-origin: center bottom;
      outline: 1px solid;
      border-radius: 10px;
      transition: 0.2s;
      background-color: #fff;
      &::after {
        content: "";
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
        width: 20px;
        height: 20px;
        background-color: #fff;
      }
    }

    &:hover {
      .qrcode {
        transform: scaleY(1);
      }
    }
    .qrcode2,.qrcode3 {
      img {
        position: absolute;
        border: 1px solid #0003;
        border-radius: 10px;
        width: 200px;
      }
    }
  }
}
</style>