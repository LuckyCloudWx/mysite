<template>
  <div class="site-setting-container">
    <!-- 网站信息 -->
    <h2>网站信息</h2>
    <div class="sub-title">网站标题</div>
    <el-input disabled v-model="form.siteTitle"></el-input>
    <div class="sub-title">邮箱</div>
    <el-input disabled v-model="form.mail"></el-input>
    <div class="sub-title">备案号</div>
    <el-input disabled v-model="form.icp"></el-input>

    <!-- 网站头像信息 -->
    <h2>网站头像信息</h2>
    <el-avatar
      shape="square"
      :size="100"
      :src="form.avatar"
    ></el-avatar>

    <!-- 网站图标信息 -->
    <h2>网站图标信息</h2>
    <div class="sub-title">网站图标地址</div>
    <el-input disabled v-model="form.favicon"> </el-input>
    <div class="sub-title">网站图标预览</div>
    <el-avatar
      shape="square"
      :size="100"
      :src="form.favicon"
    ></el-avatar>

    <!-- github信息 -->
    <h2>github信息</h2>
    <div class="sub-title">github名字</div>
    <el-input disabled v-model="form.githubName"> </el-input>
    <div class="sub-title">github地址</div>
    <el-input disabled v-model="form.github"> </el-input>

    <!-- QQ信息 -->
    <h2>QQ信息</h2>
    <div class="sub-title">QQ号码</div>
    <el-input disabled v-model="form.qq"> </el-input>
    <div class="sub-title">QQ二维码图片预览</div>
    <el-image :src="form.qqQrCode" fit="contain" style="width: 100px">
    </el-image>

    <!-- 微信信息 -->
    <h2>微信信息</h2>
    <div class="sub-title">微信号</div>
    <el-input disabled v-model="form.weixin"> </el-input>
    <div class="sub-title">微信二维码图片预览</div>
    <el-image
      :src="form.weixinQrCode"
      fit="contain"
      style="width: 100px"
    >
    </el-image>

    <div class="button">
      <el-button type="primary" plain @click="handleEditStart"
        >进入编辑模式</el-button
      >
    </div>

    <!-- 编辑模式对话框 -->
    <el-dialog
      title="请编辑您的设置信息"
      :visible.sync="dialogTableVisible"
      fullscreen
    >
      <!-- 网站信息 -->
      <h2>网站信息</h2>
      <div class="sub-title">网站标题</div>
      <el-input v-model="dialogForm.siteTitle"></el-input>
      <div class="sub-title">邮箱</div>
      <el-input v-model="dialogForm.mail"></el-input>
      <div class="sub-title">备案号</div>
      <el-input v-model="dialogForm.icp"></el-input>

      <!-- 网站头像信息 -->
      <h2>网站头像信息</h2>
      <Imgupload title="网站头像" v-model="dialogForm.avatar" />

      <!-- 网站图标信息 -->
      <h2>网站图标信息</h2>
      <div class="sub-title">网站图标地址</div>
      <el-input v-model="dialogForm.favicon"> </el-input>
      <div class="sub-title">网站图标上传</div>
      <Imgupload title="网站图标" v-model="dialogForm.favicon" />

      <!-- github信息 -->
      <h2>github信息</h2>
      <div class="sub-title">github名字</div>
      <el-input v-model="dialogForm.githubName"> </el-input>
      <div class="sub-title">github地址</div>
      <el-input v-model="dialogForm.github"> </el-input>

      <!-- QQ信息 -->
      <h2>QQ信息</h2>
      <div class="sub-title">QQ号码</div>
      <el-input v-model="dialogForm.qq"> </el-input>
      <div class="sub-title">QQ二维码图片预览</div>
      <Imgupload title="qq二维码" v-model="dialogForm.qqQrCode" />

      <!-- 微信信息 -->
      <h2>微信信息</h2>
      <div class="sub-title">微信号</div>
      <el-input v-model="dialogForm.weixin"> </el-input>
      <div class="sub-title">微信二维码图片上传</div>
      <Imgupload title="微信二维码" v-model="dialogForm.weixinQrCode" />

      <div class="button">
        <el-button type="primary" plain @click="handleEditConf"
          >确认编辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getSetting, putSetting } from "@/api/setting";
import { SERVER_URL } from "@/serverUrl";
import Imgupload from "@/components/Imgupload";

export default {
  created() {
    this.fetchData();
  },
  components: {
    Imgupload,
  },
  data() {
    return {
      form: {
        siteTitle: "",
        mail: "",
        icp: "",
        avatar: "",
        favicon: "",
        githubName: "",
        github: "",
        qq: "",
        qqQrCode: "",
        weixin: "",
        weixinQrCode: "",
      },
      dialogForm: {
        siteTitle: "",
        mail: "",
        icp: "",
        avatar: "",
        favicon: "",
        githubName: "",
        github: "",
        qq: "",
        qqQrCode: "",
        weixin: "",
        weixinQrCode: "",
      },
      dialogTableVisible: false,
    };
  },
  methods: {
    fillPath(url) {
      return SERVER_URL + url;
    },
    fetchData() {
      getSetting().then(({ data }) => {
        this.form = data;
      });
    },
    handleEditStart() {
      this.dialogTableVisible = true;
      this.dialogForm = { ...this.form };
    },
    handleEditConf() {
      putSetting(this.dialogForm)
        .then((res) => {
          // console.log(res);
          this.dialogTableVisible = false;
          this.fetchData();
          this.$message.success("信息编辑成功");
        })
        .catch((err) => {
          console.log("error:", err);
        });
    },
  },
};
</script>

<style scoped lang="less">
.site-setting-container {
  margin: 20px auto;
  width: 95%;
  .sub-title {
    margin: 15px 0;
  }
  h2 {
    font-size: 22px;
    font-weight: normal;
    margin-top: 30px;
  }
  .button {
    margin-top: 30px;
  }
}
</style>
