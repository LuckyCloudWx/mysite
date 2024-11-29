<template>
  <div class="article-add-container">
    <!-- 文章标题 -->
    <div class="block">文章标题</div>
    <el-input
      v-model="form.title"
      placeholder="请输入文章标题"
      style="width: 200px; margin-bottom: 15px"
    ></el-input>

    <!-- 文章编辑 -->
    <div class="block">编辑文章</div>
    <editor v-model="form.content" height="500px" ref="editor" />

    <!-- 文章描述 -->
    <div class="block">文章描述</div>
    <textarea
      name=""
      id=""
      rows="10"
      style="width: 90%"
      class="textarea"
      v-model="form.description"
    ></textarea>

    <!-- 图片上传 -->
    <div class="block">上传封面图片</div>
    <Imgupload v-model="form.thumb" />

    <!-- 分类 -->
    <div class="block">博客类型</div>
    <div class="select-type">
      <el-select v-model="form.blogType" placeholder="请选择" class="select">
        <el-option
          v-for="item in blogTypes"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </div>

    <!-- 发布 -->
    <el-button type="primary" class="upload-button" @click="handleAddArticle">{{
      mode === "add" ? "发布文章" : "确认编辑"
    }}</el-button>
  </div>
</template>

<script>
// 样式包
import "@toast-ui/editor/dist/toastui-editor.css";

/**
 * 组件包：md编辑器、图片上传组件
 */
import { Editor } from "@toast-ui/vue-editor";
import Imgupload from "@/components/Imgupload";

/**
 * 数据交互API
 */
import { getBlogTypes } from "@/api/blogType";
import { addBlog, modifyBlog, getOneBlog } from "@/api/blog";

// editor语言转换包
import "@toast-ui/editor/dist/i18n/zh-cn";

export default {
  created() {
    this.fetchTypes();
    if (this.mode !== "add") {
      this.id = this.$route.query.id;
      // 数据回填
      getOneBlog(this.id)
        .then(({ data }) => {
          const { title, htmlContent, description, thumb, category } = data;
          this.$refs.editor.invoke("setHTML", htmlContent);
          this.form.title = title;
          this.form.description = description;
          this.form.thumb = thumb;
          this.form.blogType = category.id;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  components: {
    editor: Editor,
    Imgupload,
  },
  props: ["mode"],
  data() {
    return {
      form: {
        title: "",
        content: "",
        description: "",
        thumb: "",
        blogType: "",
      },
      blogTypes: [],
    };
  },
  methods: {
    fetchTypes() {
      getBlogTypes().then(({ data }) => {
        this.blogTypes = data;
      });
    },
    handleAddArticle() {
      // 将文章封装为提交数据所需的格式
      const html = this.$refs.editor.invoke("getHTML");
      const markdown = this.$refs.editor.invoke("getMarkdown");
      const body = {
        title: this.form.title,
        description: this.form.description,
        createDate: new Date().getTime(),
        categoryId: this.form.blogType,
        htmlContent: html,
        thumb: this.form.thumb,
        markdownContent: markdown,
      };
      // 验证表单是否数据完整
      if (!body.title) {
        this.$message.error("请添加文章标题");
      } else if (!body.markdownContent) {
        this.$message.error("请添加文章内容");
      } else if (!body.description) {
        this.$message.error("请添加文章描述");
      } else if (!body.categoryId) {
        this.$message.error("请添加文章所属分类");
      } else {
        if (this.mode === "add") {
          // 提交文章信息，添加文章并跳转至文章列表
          addBlog(body).then((res) => {
            if (res.code === 0) {
              this.$router.push("/article/list");
              this.$message.success("文章添加成功");
            } else {
              this.$message.error("文章添加失败");
            }
          });
        } else {
          // 提交文章信息，添加文章并跳转至文章列表
          modifyBlog(this.id, body).then((res) => {
            if (res.code === 0) {
              this.$router.push("/article/list");
              this.$message.success("文章信息修改成功");
            } else {
              this.$message.error(`文章信息修改失败,失败原因：${res}`);
            }
          });
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
.article-add-container {
  padding: 20px;
}

.block {
  margin: 15px 0;
  font-weight: 100;
  margin-top: 40px;
  font-size: 26px;
}

.textarea {
  width: 90%;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

.select-type {
  margin-bottom: 15px;
}

.upload-button {
  margin-top: 20px;
}
</style>
