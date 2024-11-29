<template>
  <div class="comments-container">
    <el-table :data="data" border style="width: 100%">
      <el-table-column label="序号" width="50" align="center">
        <template slot-scope="scope">
          {{ ((curPageLoaded - 1) % eachPage) * eachPage + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column label="头像" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px"
            :src="scope.row.avatar"
            fit="contain"
          ></el-image>
        </template>
      </el-table-column>

      <el-table-column prop="nickname" label="昵称" align="center">
      </el-table-column>

      <el-table-column prop="blog.title" label="评论文章" align="center">
      </el-table-column>

      <el-table-column prop="content" label="评论内容" align="center">
      </el-table-column>

      <el-table-column
        prop="createDate"
        label="评论日期"
        width="200"
        align="center"
      >
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
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
              @click="deleteComment(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      background
      layout="prev, pager, next,->,sizes,jumper,total"
      :total="count"
      :page-size="eachPage"
      :page-sizes="[5, 10, 15, 20]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @prev-click="handlePrevClick"
      @next-click="handleNextClick"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getComments, delComments } from "@/api/comment";
import { transDate } from "@/utils/transDate";
import { SERVER_URL } from "@/serverUrl";

export default {
  created() {
    this.fetchData();
  },
  data() {
    return {
      data: [],
      eachPage: 5,
      curPage: 1,
      totalPages: 0,
      count: 0,
      curPageLoaded: 1,
    };
  },
  methods: {
    async fetchData() {
      getComments(this.curPage, this.eachPage).then(({ data }) => {
        this.data = data.rows;
        for (const item of this.data) {
          item.createDate = transDate(item.createDate);
          // item.avatar = SERVER_URL + item.avatar;
        }
        this.count = data.total;
        this.totalPages = Math.ceil(this.count / this.eachPage);
        this.curPageLoaded = this.curPage;
      });
    },
    deleteComment(commentInfo) {
      this.$confirm("该评论将被永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delComments(commentInfo.id).then((res) => {
            // console.log(res);
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
    handleSizeChange(eachPage) {
      this.eachPage = eachPage;
      this.fetchData();
    },
    handleCurrentChange(cur) {
      this.curPage = cur;
      this.fetchData();
    },
    handlePrevClick() {
      this.curPage--;
    },
    handleNextClick() {
      this.curPage++;
    },
  },
};
</script>

<style scoped lang="less">
.comments-container {
  width: 90%;
  margin: 20px auto;
}
</style>
