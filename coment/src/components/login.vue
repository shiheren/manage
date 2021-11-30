<template>
  <div class="logs">
    <img src="./../assets/logo.png" alt="" class="img">
    <div class="log">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        class="demo-ruleForm"
      >
        <el-form-item prop="age" class="por">
          <img src="./../img/用户_填充.png" alt="" class="poa">
          <el-input v-model.number="ruleForm.age"  placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="pass" class="por">
          <img src="./../img/密码.png" alt="" class="poa">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="submitForm()">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
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
        pass: "123456",
        age: "admin",
      },
      rules: {
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 7, message: "长度在 3 到 7 个字符", trigger: "blur" },
        ],
        age: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 7, message: "长度在 3 到 7 个字符", trigger: "blur" },
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
.img{
  position: absolute;
  top: 150px;
  left: 50%;
  transform:translateX(-50%);
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background-color: #eeeeee;
  border: 10px solid #fff;
}
.por{
  position: relative;
   input{
      padding-left:30px;
   }
}
.poa{
  position: absolute;
  width: 15px;
  height: 15px;
  z-index: 2;
  top: 50%;
  transform: translateY(-50%);
  left: 5px;
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
    width: 450px;
    height:300px;
    background-color: #fff;
    border-radius: 3px;
    .el-form-item {
      margin-left: 20px;
      width: 410px;
      text-align: right;
    }
    .el-form-item:nth-child(1){
       margin-top: 110px;
    }
    button{
      width: 70px;
      height: 40px;
      background-color: #409eff;
      color: #fff;
    }
    button:nth-child(2){
      background-color: #909399;
    }
  }
}
</style>;
