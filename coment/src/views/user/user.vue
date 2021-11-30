<template>
  <div class="us">
    <div class="us_sep">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="user">
      <div class="ipt">
        <el-input
          placeholder="请输入内容"
          v-model="input"
          clearable
          class="ipt-t"
        >
        </el-input>
        <button class="sch-but" @click="sech">搜索</button>

        <!-- 添加 -->
        <el-button type="text" @click="dialogFormVisible = true" class="add-but"
          >添加</el-button
        >
        <!-- Form -->
        <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="用户名" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input v-model="form.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
              <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机" :label-width="formLabelWidth">
              <el-input v-model="form.shmobile" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="fn">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <!-- 表单内容 -->
      <template>
        <el-table :data="tableData" style="width: 100%" class="user-rim">
          <el-table-column prop="scope.$index" label="*" width="80" class="rim">
          </el-table-column>
          <el-table-column prop="username" label="姓名" width="140">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="180">
          </el-table-column>
          <el-table-column prop="mobile" label="电话" width="160">
          </el-table-column>
          <el-table-column prop="create_time" label="角色" width="160">
          </el-table-column>
          <el-table-column prop="mg_state" label="状态" width="160">
            <template slot-scope="scope">
              <!-- 开 关 -->
              <el-switch
                v-model="scope.row.mg_state"
                @change="stateChanged(scope.row.id, scope.row.mg_state)"
              >
              </el-switch>
            </template>
          </el-table-column>

          <!-- 操作 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- 修改 -->

              <el-button
                size="mini"
                type="primary"
                @click="hand(scope.$index, scope.row)"
                >修改</el-button
              >
              <el-dialog
                title="提示"
                :visible.sync="centerDialogVisible"
                width="50%"
              >
                <el-form :model="amend">
                  <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input
                      v-model="amend.name"
                      autocomplete="off"
                      :disabled="true"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input
                      v-model="amend.email"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="手机" :label-width="formLabelWidth">
                    <el-input
                      v-model="amend.shmobile"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                </el-form>

                <span slot="footer" class="dialog-footer">
                  <el-button @click="centerDialogVisible = false"
                    >取 消</el-button
                  >
                  <el-button type="primary" @click="showEditDialog()"
                    >确定</el-button
                  >
                </span>
              </el-dialog>

              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
              <!-- 分配角色 -->
              <el-button
                type="primary"
                size="mini"
                @click="Delete(scope.$index, scope.row)"
                >分配</el-button
              >
              <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
                <div>当前的用户: {{ userName }}</div>
                <div>当前的角色: {{ role_name }}</div>
                <div>
                  <span>分配新角色: </span>
                  <el-select v-model="val" placeholder="请选择">
                    <el-option
                      v-for="item in role"
                      :key="item.id"
                      :label="item.roleName"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </div>

                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="hate()">确 定</el-button>
                </span>
              </el-dialog>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <!--分液器 -->

      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          :hide-on-single-page="false"
        >
        </el-pagination>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import http from "../../http/index";
export default {
  props: {},
  data() {
    return {
      centerDialogVisible: false,
      input: "",
      pagenum: 1,
      pagesize: 5,
      tableData: [],
      total: null,
      value: true,
      // 添加
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        pass: "",
        email: "",
        shmobile: "",
      },
      formLabelWidth: "100px",

      // 修改
      id: null,
      dialogVisible: false,
      amend: {
        name: "",
        email: "",
        shmobile: "",
      },
      // 分配角色
      role: [],
      val: null,
      val_id: null,
      userName: null,
      role_name: null,
    };
  },
  mounted() {
    http({
      url: "users",
      params: {
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      },
    }).then((res) => {
      console.log(res);
      this.tableData = res.data.users;
    });
  },
  methods: {
    // 状态
    stateChanged(id, newState) {
      http({
        url: `users/${id}/state/${newState}`,
        method: "put",
      }).then((res) => {
        this.$message({
          message: res.meta.msg,
          type: "success",
        });
      });
    },
    // 添加
    fn() {
      http({
        url: "users",
        method: "post",
        data: {
          username: this.form.name,
          password: this.form.pass,
          email: this.form.email,
          mobile: this.form.shmobile,
        },
      }).then((res) => {
        this.$message({
          message: res.meta.msg,
          type: "success",
        });
        this.dialogFormVisible = false;
      });
    },
    // 搜索
    sech() {
      http({
        url: `users/${this.input}`,
      }).then((res) => {
        if (this.input == "") {
          http({
            url: "users",
            params: {
              pagenum: this.pagenum,
              pagesize: this.pagesize,
            },
          }).then((res) => {
            this.tableData = res.data.users;
          });
        } else if (res.meta.status == 200) {
          this.$message({
            message: "搜索成功",
            type: "success",
          });
          this.tableData = [res.data];
        } else {
          this.$message.error(res.meta.msg);
        }
      });
    },
    // 分配
    Delete(index, row) {
      console.log(index, row);
      this.dialogVisible = true;
      this.val_id = row.id;
      this.userName = row.username;
      this.role_name = row.role_name;
      http({
        url: "roles",
      }).then((res) => {
        this.role = res.data;
        console.log(this.role);
      });
    },
    hate() {
      this.dialogVisible = true;
      http({
        url: `users/${this.val_id}/role`,
        method: "put",
        data: {
          rid: this.val,
        },
      }).then((res) => {
        if (res.meta.status == 200) {
          this.dialogVisible = false;
          http({
            url: "users",
            params: {
              pagenum: this.pagenum,
              pagesize: this.pagesize,
            },
          }).then((res) => {
            console.log(res);
            this.tableData = res.data.users;
          });
          this.$message({
            type: "success",
            message: res.meta.msg,
          });
        } else {
          this.$message({
            type: "warning",
            message: res.meta.msg,
          });
        }
      });
    },
    // 编辑
    hand(index, row) {
      console.log(index, row);
      this.centerDialogVisible = true;
      this.amend.name = row.username;
      this.amend.email = row.email;
      this.amend.shmobile = row.mobile;
      this.id = row.id;
    },
    showEditDialog() {
      http({
        url: "users/" + this.id,
        method: "put",
        data: {
          email: this.amend.email,
          mobile: this.amend.shmobile,
        },
      }).then((res) => {
        this.$message({
          type: "success",
          message: res.meta.msg,
        });
        http({
          url: "users",
          params: {
            pagenum: this.pagenum,
            pagesize: this.pagesize,
          },
        }).then((res) => {
          console.log(res);
          this.tableData = res.data.users;
        });
        this.centerDialogVisible = false;
      });
    },
    // 删除
    handleDelete(index, row) {
      let now = parseInt(row.id);
      console.log(now);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          http({
            url: `users/${now}`,
            method: "delete",
          }).then((res) => {
            this.$message({
              type: "success",
              message: res.meta.msg,
            });
            http({
              url: "users",
              params: {
                pagenum: this.pagenum,
                pagesize: this.pagesize,
              },
            }).then((res) => {
              this.tableData = res.data.users;
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 分页器
    handleSizeChange(val) {
      this.pagesize = parseInt(`${val}`);
      http({
        url: "users",
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize,
        },
      }).then((res) => {
        this.tableData = res.data.users;
      });
    },
    handleCurrentChange(val) {
      this.pagenum = parseInt(`${val}`);
      http({
        url: "users",
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize,
        },
      }).then((res) => {
        this.tableData = res.data.users;
        this.total = res.data.total;
      });
    },
  },
  components: {},
};
</script>

<style scoped lang="scss">
// 添加
  .us_sep{
    padding: 20px 0px 0px 30px;
  }
.user-rim {
  border: 1px solid #ccc;
  margin-bottom: 10px;
}

.us {
  width: 100%;
  height: 100%;
  background-color: #e9edf1;
}
.user {
  margin: 30px 30px 0px 30px;
  background-color: #fff;
  padding: 20px 20px;
  .ipt {
    display: flex;
    margin-bottom: 10px;
    .ipt-t {
      width: 300px;
    }
    .sch-but {
      width: 80px;
      border: 0;
      margin-left: 10px;
      border-radius: 3px;
      background-color: #f5f7fb;
    }
    .add-but {
      width: 120px;
      border: 0;
      margin-left: 10px;
      border-radius: 3px;
      background-color: #379aff;
      color: #fff;
    }
  }
}
</style>
