<template>
  <div class="about-container">
    <div class="title">关于我</div>
    <el-input :disabled="isDisabled" v-model="input"></el-input>
    <el-button type="primary" plain @click="handleClick" class="button">{{
      btnName
    }}</el-button>
  </div>
</template>

<script>
import { getAbout, setAbout } from "@/api/about";

export default {
  created() {
    this.fetchData();
  },
  data() {
    return {
      isDisabled: true,
      btnName: "编辑",
      input: "",
    };
  },
  methods: {
    fetchData() {
      getAbout().then(({ data }) => {
        this.input = data;
      });
    },
    handleClick() {
      if (this.isDisabled) {
        this.isDisabled = false;
        this.btnName = "完成";
      } else {
        setAbout({ url: this.input })
          .then((res) => {
            // console.log(res);
            this.$message.success("编辑成功");
            this.isDisabled = true;
            this.btnName = "编辑";
          })
          .catch((err) => {
            this.$message.error(err);
          });
      }
    },
  },
};
</script>

<style scoped lang="less">
.about-container {
  width: 95%;
  margin: 20px auto;
  .title {
    margin-top: 30px;
    font-size: 18px;
    margin-bottom: 10px;
    color: #999;
  }
  .button {
    margin-top: 15px;
  }
}
</style>
