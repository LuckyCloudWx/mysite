<template>
  <div class="projects-list-container">
    <!-- 项目列表 -->
    <el-table :data="data" border>
      <!-- 序号 -->
      <el-table-column label="序号" width="100" align="center">
        <template slot-scope="scope" align="center">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <!-- 项目名称 -->
      <el-table-column label="项目名称" align="center">
        <template slot-scope="scope">
          <a :href="scope.row.url" class="project-link" target="_blank">{{
            scope.row.name
          }}</a>
        </template>
      </el-table-column>

      <!-- 项目描述 -->
      <el-table-column
        label="项目描述"
        prop="description"
        align="center"
      ></el-table-column>

      <!-- 预览图 -->
      <el-table-column label="预览图" prop="thumb" width="150">
        <template slot-scope="scope">
          <el-image
            :src="scope.row.thumb"
            style="width: 120px"
          ></el-image>
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" width="150">
        <template slot-scope="scope" align="center">
          <!-- github -->
          <el-tooltip
            class="item"
            effect="dark"
            content="github"
            placement="top"
            :hide-after="1500"
          >
            <el-button
              type="info"
              class="iconfont icon-github"
              circle
              size="mini"
              @click="handleMoveToGithub(scope.row)"
            ></el-button>
          </el-tooltip>

          <!-- 编辑 -->
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
            :hide-after="1500"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="handleEditProject(scope.row)"
            ></el-button>
          </el-tooltip>

          <!-- 删除 -->
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
            :hide-after="1500"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="handleDelProject(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑项目的对话框 -->
    <el-dialog
      title="编辑您的项目信息"
      :visible.sync="dialogTableVisible"
      fullscreen
    >
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
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div class="handle">
        <el-button type="info" @click="dialogTableVisible = false"
          >取消修改</el-button
        >
        <el-button type="primary" @click="handleConfirmEditProject"
          >确认修改</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getProjects, modifyProject, delProject } from "@/api/project";
import { SERVER_URL } from "@/serverUrl";
import "@/assets/icon/iconfont.css";
import imgUpload from "@/components/Imgupload";

export default {
  components: {
    imgUpload,
  },
  data() {
    return {
      data: [],
      form: {
        name: "",
        description: "",
        url: "",
        github: "",
        thumb: "",
        order: 1,
      },
      dialogTableVisible: false,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getProjects().then(({ data }) => {
        this.data = data;
      });
    },
    handleMoveToGithub(proInfo) {
      window.open(proInfo.github, "_blank");
    },
    handleEditProject(proInfo) {
      this.dialogTableVisible = true;
      proInfo.description = proInfo.description.join(",");
      this.form = proInfo;
    },
    handleConfirmEditProject() {
      this.dialogTableVisible = false;
      /**
       * 以下代码中，obj的参数结构需要调整
       */
      const obj = { ...this.form };
      obj.description = obj.description.split(",");
      modifyProject(obj).then(() => {
        this.fetchData();
      });
    },
    handleDelProject(proInfo) {
      this.$confirm("该项目的所有数据将会一并删除，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delProject(proInfo.id).then((res) => {
            if (res.code === 0 && res.data) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.fetchData();
            } else {
              this.$message({
                type: "warning",
                message: "服务器内部错误，未成功删除",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    fullPath(thumb) {
      return SERVER_URL + thumb;
    },
  },
};
</script>

<style scoped lang="less">
.project-link {
  &:hover {
    color: #999;
  }
}
.project-form {
  margin: 20px 25px;
}
.handle {
  float: right;
  margin-right: 25px;
}
</style>
