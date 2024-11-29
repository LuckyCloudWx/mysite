<template>
  <div class="projects-add-container">
    <el-form :model="form" class="project-form">
      <!-- 项目名称 -->
      <el-form-item label="项目名称">
        <el-input v-model="form.name" class="project-name"></el-input>
      </el-form-item>

      <!-- 项目描述（不同描述以英文逗号隔开） -->
      <el-form-item label="项目描述（不同描述以英文逗号隔开）">
        <el-input v-model="form.description"></el-input>
      </el-form-item>

      <!-- 项目Link -->
      <el-form-item label="项目链接">
        <el-input v-model="form.url"></el-input>
      </el-form-item>

      <!-- Github -->
      <el-form-item label="Github地址">
        <el-input v-model="form.github"></el-input>
      </el-form-item>

      <!-- 预览图 -->
      <el-form-item label="项目预览图">
        <imgUpload v-model="form.thumb" />
      </el-form-item>

      <!-- 项目排序 -->
      <el-form-item label="项目排序">
        <el-select v-model="form.order" placeholder="请选择">
          <el-option label="1" :value="1"></el-option>
          <el-option label="2" :value="2"></el-option>
          <el-option label="3" :value="3"></el-option>
          <el-option label="4" :value="4"></el-option>
          <el-option label="5" :value="5"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <div class="handle">
      <el-button type="primary" @click="handleAddProject">添加项目</el-button>
    </div>
  </div>
</template>

<script>
import imgUpload from "@/components/Imgupload";
import { addProject } from "@/api/project";
export default {
  components: {
    imgUpload,
  },
  data() {
    return {
      form: {
        name: "",
        description: "",
        url: "",
        github: "",
        thumb: "",
        order: 1,
      },
    };
  },
  methods: {
    handleAddProject() {
      const obj = { ...this.form };
      obj.description = obj.description.split(",");
      addProject(obj).then(() => {
        this.$router.push("/projects/list");
      });
    },
  },
};
</script>

<style scoped lang="less">
.project-form {
  margin: 20px 25px;
}
.handle {
  float: right;
  margin-right: 25px;
}
</style>
