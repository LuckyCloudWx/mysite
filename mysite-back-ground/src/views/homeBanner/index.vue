<template>
  <!-- 首页标语 -->
  <div class="home-banner-contaienr">
    <el-table :data="banners" border style="width: 100%">
      <el-table-column prop="date" label="序号" width="50" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="180" align="center">
      </el-table-column>
      <el-table-column prop="description" label="描述" width="250">
      </el-table-column>
      <el-table-column prop="address" label="中图">
        <template slot-scope="scope">
          <el-image
            style="width: 100px"
            :src="scope.row.midImg"
            fit="fill"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="大图">
        <template slot-scope="scope">
          <el-image
            style="width: 100px"
            :src="scope.row.bigImg"
            fit="fill"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" align="center">
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
        </template>
      </el-table-column>
    </el-table>

    <!-- 嵌套表单 -->
    <el-dialog title="编辑表格信息" :visible.sync="dialogFormVisible">
      <el-form :model="bannerForm">
        <el-form-item label="标题">
          <el-input v-model="bannerForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="bannerForm.description"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <Imgupload v-model="bannerForm.midImg" title="中图" />
          </el-col>
          <el-col :span="12">
            <Imgupload v-model="bannerForm.bigImg" title="大图"
          /></el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="formEditConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBanners, setBanners } from "@/api/banner";
// import { SERVER_URL } from "@/serverUrl";
import Imgupload from "@/components/Imgupload";
export default {
  components: {
    Imgupload,
  },
  data() {
    return {
      banners: null,
      bannerForm: {
        midImg: "",
        bigImg: "",
        title: "",
        description: "",
        id: "",
      },
      dialogFormVisible: false,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const resp = await getBanners();
      this.banners = resp.data;
    },
    editTable(row) {
      // 1，弹出表格弹框
      this.dialogFormVisible = true;
      // 同步表格数据时
      this.bannerForm = row;
      // console.log(this.bannerForm)
    },
    fullUrl(imgurl) {
      return SERVER_URL + imgurl;
    },
    async formEditConfirm() {
      this.dialogFormVisible = false;
      // let body = [];
      // for (const key in this.banners) {
      //   body.push(key);
      // }
      // const resp = await setBanners(body);
      const resp = await setBanners(this.banners);
      // console.log(this.banners instanceof Array, resp);
      this.$message.success("修改成功");
    },
  },
};
</script>

<style></style>
