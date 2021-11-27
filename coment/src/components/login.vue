<template>
  <div class="logs">
    <div class="log">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="age">
          <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="submitForm()">登录</el-button>
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import http from "../http/index";

export default {
  data() {
    return {
      ruleForm: {
        pass: "",
        age: "",
      },
      rules: {
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 7, message: "长度在 3 到 7 个字符", trigger: "blur" },
        ],
        age: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      http({
        url: "login",
        method: "post",
        data: {
          username: this.ruleForm.age,
          password: this.ruleForm.pass,
        },
      }).then((res) => {
        console.log(res);
        if (res.meta.status == 200) {
          sessionStorage.setItem("token", res.data.token);
          this.$message({
            message: res.meta.msg,
            type: "success",
          });
          this.$router.push('/home')
        }else{
           this.$message({
            message: res.meta.msg,
            type: "success",
          });
        }
      });
    },
  },
};
</script>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
}
.logs {
  width: 100%;
  height: 100%;
}
.log {
  width: 100%;
  height: 100%;
  background-color: #2b4b6b;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-form {
    padding-top: 30px;
  }
  .demo-ruleForm {
    width: 500px;
    height: 200px;
    background-color: #fff;
    .el-form-item {
      margin-right: 20px;
      text-align: right;
    }
  }
}
</style>;
