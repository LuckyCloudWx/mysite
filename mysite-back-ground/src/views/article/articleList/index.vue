<template>
  <div class="article-list-container">
    <!-- 文章列表 -->
    <el-table :data="data" border style="width: 100%">
      <el-table-column label="序号" width="50" align="center">
        <template slot-scope="scope">
          {{ ((curPageLoaded - 1) % eachPage) * eachPage + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column label="文章名称" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title="文章图片"
            width="200"
            trigger="hover"
          >
            <div class="img-title">图片标题</div>

            <el-image
              style="width: 100px"
              :src="scope.row.thumb"
              fit="contain"
              :preview-src-list="thumbList"
            ></el-image>
            <a
              href="#"
              target="_blank"
              @click.prevent="skipToTarget(scope.row)"
              slot="reference"
              >{{ scope.row.title }}</a
            >
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column prop="description" label="文章描述"> </el-table-column>

      <el-table-column prop="scanNumber" label="浏览数"> </el-table-column>

      <el-table-column prop="commentNumber" label="评论量"> </el-table-column>

      <el-table-column label="所属分类">
        <template slot-scope="scope">
          {{ scope.row.category ? scope.row.category.name : "未分类" }}
        </template>
      </el-table-column>

      <el-table-column prop="createDate" label="创建日期" width="200">
      </el-table-column>

      <el-table-column label="操作">
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
              @click="editTable(scope.row)"
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
              @click="deleteArticle(scope.row)"
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
import { getBlogs, delBlog } from "@/api/blog";
import { transDate } from "@/utils/transDate";
// import { SERVER_URL, FRONT_END_URL } from "@/serverUrl";

export default {
  data() {
    return {
      data: [],
      thumbList: [],
      eachPage: 5,
      curPage: 1,
      totalPages: 0,
      count: 0,
      curPageLoaded: 1,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const resp = await getBlogs(this.curPage, this.eachPage);
      this.data = resp.data.rows;
      for (const item of this.data) {
        item.createDate = transDate(item.createDate);
        // item.thumb = SERVER_URL + item.thumb;
        this.thumbList.push(item.thumb);
      }
      this.count = resp.data.total;
      this.totalPages = Math.ceil(this.count / this.eachPage);
      this.curPageLoaded = this.curPage;
    },
    skipToTarget(articleInfo) {
      window.open(FRONT_END_URL + "/article/" + articleInfo.id);
    },
    editTable({ id }) {
      this.$router.push({
        path: "/article/edit",
        query: {
          id,
        },
      });
    },
    deleteArticle(articleInfo) {
      this.$confirm("该文章及其评论将一并删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delBlog(articleInfo.id).then((res) => {
            console.log(res);
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

<style></style>
