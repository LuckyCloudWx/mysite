<template>
  <div class="article-types-container">
    <!-- 添加文章类输入框-->
    <el-input
      placeholder="请输入想要添加的分类"
      v-model="input"
      class="input-with-select"
    >
      <el-select
        v-model="select"
        slot="prepend"
        placeholder="请选择"
        class="select"
      >
        <el-option label="1" value="1"></el-option>
        <el-option label="2" value="2"></el-option>
        <el-option label="3" value="3"></el-option>
        <el-option label="4" value="4"></el-option>
        <el-option label="5" value="5"></el-option>
      </el-select>
      <el-button
        slot="append"
        icon="el-icon-circle-plus-outline"
        class="add-type"
        @click="handleTypeAdd"
        >添加</el-button
      >
    </el-input>

    <!-- 文章类别列表 -->
    <el-table :data="data" border style="width: 100%">
      <el-table-column label="序号" width="50" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="name" label="博客类别" align="center">
      </el-table-column>

      <el-table-column prop="articleCount" label="文章数量" align="center">
      </el-table-column>

      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
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
              @click="handleTypeEdit(scope.row)"
            ></el-button>
          </el-tooltip>
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
              @click="handleDelBlogType(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出编辑对话框 -->
    <el-dialog title="编辑类别信息" :visible.sync="dialogFormVisible">
      <el-form :model="typeForm">
        <el-form-item label="分类名称">
          <el-input v-model="typeForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属级别">
          <el-select v-model="typeForm.order" placeholder="请选择">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleTypeEditCancel">取 消</el-button>
        <el-button type="primary" @click="handleTypeEditConfirm()"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getBlogTypes,
  addBlogType,
  delBlogType,
  modifyBlogType,
} from "@/api/blogType";
export default {
  data() {
    return {
      input: "",
      select: "1",
      data: [],
      dialogFormVisible: false,
      typeForm: {
        articleCount: "",
        id: "",
        name: "",
        order: "",
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const resp = await getBlogTypes();
      this.data = resp.data;
    },
    // 添加分类
    async handleTypeAdd() {
      await addBlogType({
        name: this.input,
        order: this.select,
      });
      this.$message.success("类别添加成功！");
      this.input = "";
      this.select = "1";
      this.fetchData();
    },
    // 编辑类别信息
    handleTypeEdit(typeInfo) {
      this.dialogFormVisible = true;
      this.typeForm = typeInfo;
    },
    // 类别信息编辑确认
    handleTypeEditConfirm() {
      this.dialogFormVisible = false;
      modifyBlogType(this.typeForm)
        .then((res) => {
          this.$message.success("修改成功");
          this.fetchData();
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    // 取消类别信息编辑
    handleTypeEditCancel() {
      this.dialogFormVisible = false;
      this.$message.info("已取消编辑");
    },
    handleDelBlogType({ id }) {
      this.$confirm(
        "删除该类别，对应文章所属分类将显示为未分类, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          delBlogType(id).then((res) => {
            this.$message({
              type: "success",
              message: "类别删除成功!",
            });
            this.fetchData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped>
.input-with-select {
  margin: 15px 20px;
  width: 400px;
}
.select {
  width: 60px;
}
/* .add-type {
  background-color: #409eff !important;
  color: #fff !important;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
} */
</style>
