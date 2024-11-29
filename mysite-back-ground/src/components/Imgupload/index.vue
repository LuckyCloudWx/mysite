<template>
  <div class="img-upload">
    <!-- 标题 -->
    <div class="title">{{ title }}</div>
    <!-- 上传组件 -->
    <el-upload
      class="avatar-uploader"
      action="/api/upload"
      :show-file-list="true"
      :on-success="handleAvatarSuccess"
      :before-upload="handleBeforeUpload"
      :headers="headers"
    >
      <img v-if="value" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { SERVER_URL } from "@/serverUrl";
export default {
  props: ["title", "value"],
  computed: {
    headers() {
      return {
        Authorization: "Bearer " + localStorage.getItem("authorToken"),
      };
    },
    imageUrl() {
      return this.value
      // return SERVER_URL + this.value;  // 开发阶段需要SERVER_URL
    },
  },
  methods: {
    handleBeforeUpload(file){
      console.log(file.size)
      const sizeInfo = file.size<2000000
      if(!sizeInfo){
        this.$message.error("上传图片大小不能超过2MB")
      }
      return sizeInfo
    },
    handleAvatarSuccess(res) {
      if (res.data) {
        // console.log(res);
        this.$message.success("上传成功");
        this.$emit("input", res.data);
      }
    },
  },
};
</script>

<style>
.title {
  margin-bottom: 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  object-fit: contain;
}
</style>
