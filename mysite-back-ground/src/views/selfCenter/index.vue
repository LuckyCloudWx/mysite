<template>
  <div class="self-center-container">
    <el-form :model="form" :rules="loginRules" ref="selfForm">
      <!-- 用户名 -->
      <el-form-item label="用户名" :label-width="formLabelWidth" prop="name">
        <el-input
          v-model="form.name"
          autocomplete="off"
          style="width: 400px"
          clearable
        ></el-input>
      </el-form-item>

      <!-- 旧密码 -->
      <el-form-item
        label="旧密码"
        :label-width="formLabelWidth"
        prop="oldLoginPwd"
      >
        <el-input
          v-model="form.oldLoginPwd"
          autocomplete="off"
          style="width: 400px"
          show-password
        ></el-input>
      </el-form-item>

      <!-- 新密码 -->
      <el-form-item
        label="新密码"
        :label-width="formLabelWidth"
        prop="loginPwd"
      >
        <el-input
          v-model="form.loginPwd"
          autocomplete="off"
          style="width: 400px"
          show-password
        ></el-input>
      </el-form-item>

      <!-- 密码确认 -->
      <el-form-item
        label="新密码确认"
        :label-width="formLabelWidth"
        prop="confPwd"
      >
        <el-input
          v-model="form.confPwd"
          autocomplete="off"
          style="width: 400px"
          show-password
        ></el-input>
      </el-form-item>

      <!-- 提交/返回按钮 -->
      <el-form-item class="buttons">
        <el-button
          type="primary"
          class="button"
          :loading="subLoading"
          @click="handleModify('selfForm')"
        >
          修改
        </el-button>
        <el-button type="info" @click="handleReturn">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getAdmin, setAdmin } from "@/api/admin";
export default {
  created() {
    this.fetchData();
  },
  data() {
    var checkPwd = (rule, value, callback) => {
      if (value === "") {
        callback("请输入您的新密码");
      } else {
        if (this.form.confPwd !== "") {
          this.$refs.selfForm.validateField("confPwd");
        }
        callback();
      }
    };
    var checkConfPwd = (rule, value, callback) => {
      if (value === "") {
        callback("请确认您的密码");
      } else if (value !== this.form.loginPwd) {
        callback("两次输入的密码不一致");
      } else {
        callback();
      }
    };
    return {
      form: {
        name: "",
        loginPwd: "",
        oldLoginPwd: "",
        confPwd: "",
      },
      formLabelWidth: "100px",
      loginRules: {
        name: [
          { required: true, trigger: "blur", message: "请输入您的用户名" },
        ],
        loginPwd: [
          {
            trigger: "blur",
            validator: checkPwd,
          },
        ],
        oldLoginPwd: [
          { required: true, trigger: "blur", message: "请输入您的旧密码" },
        ],
        confPwd: [{ trigger: "blur", validator: checkConfPwd }],
      },
      subLoading: false,
    };
  },
  methods: {
    fetchData() {
      getAdmin().then(({ data }) => {
        this.form.name = data.name;
        window.localStorage.setItem("loginId", data.loginId);
      });
    },

    // 点击修改按钮
    handleModify(formName) {
      this.$refs[formName].validate((valid, obj) => {
        if (valid) {
          this.subLoading = true;
          this.$message.success("提交成功，等待响应中...");
          const data = {
            ...this.form,
            loginId: window.localStorage.getItem("loginId"),
          };
          setTimeout(() => {
            setAdmin(data)
              .then((res) => {
                if (typeof res === "string") {
                  const resp = JSON.parse(res);
                  this.$message.error(resp.msg);
                } else {
                  if (res.data) {
                    this.$message.success("信息修改成功！");
                  }
                }
                this.$refs[formName].resetFields();
                this.fetchData();
                this.subLoading = false;
              })
              .catch((err) => {
                console.log(err);
                return;
              });
          }, 500);
        } else {
          this.$message.warning("请完善信息后再提交");
        }
      });
    },

    // 点击返回按钮
    handleReturn() {
      this.$router.push("/dashboard");
    },
  },
};
</script>

<style scoped lang="less">
.self-center-container {
  margin: 20px auto;
  .buttons {
    margin-left: 100px;
    .button {
      margin-right: 20px;
    }
  }
}
</style>
