<template>
  <div class="roles">
    <div class="header">
      <span>首页</span>> <span>权限管理</span>>
      <span>角色管理</span>
    </div>
    <div class="center-b">
      <button @click="add" class="add">添加角色</button>

      <ul class="data_list">
        <li>
          <span></span> <span>#</span><span>角色名称</span>
          <span>角色描述</span> <span>操作</span>
        </li>
        <li v-for="(item, index) in list" :key="item.id">
          <span><img src="./../../img/箭头细.png" alt="" /></span>
          <span>{{ index }}</span>
          <span>{{ item.roleName }}</span>
          <span>{{ item.roleDesc }}</span>
          <span>
            <button class="modify">编辑</button>
            <button class="remove">删除</button>
            <button class="jurisdiction">分配权限</button>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import http from "../../http/index";
export default {
  props: {},
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    http({
      url: "/roles",
    }).then((res) => {
      console.log(res.data);
      this.list = res.data;
    });
  },
  methods: {
    add() {
      http({
        url: "/roles",
        methods:'post',
        
      }).then((res) => {
        console.log(res.data);
        this.list = res.data;
      });
    },
  },
  components: {},
};
</script>

<style scoped lang="scss">
.roles {
  flex: 1;
  background-color: #eaedf1;
  padding: 20px 20px 65px 20px;
  span {
    font-size: 12px;
    margin-right: 10px;
    color: #606266;
  }
  span:nth-child(1) {
    color: #000000;
  }
  .center-b {
    border-radius: 4px;
    margin-top: 15px;
    padding: 20px;
    background-color: #fff;
    .data_list {
      li {
        border-top: 1px solid #ebeef5;
        display: flex;
        span {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 4%;
          height: 47px;
          border-left: 1px solid #ebeef5;
        }
        span:nth-child(1) {
          img {
            width: 10px;
            height: 10px;
          }
        }
        span:nth-child(3) {
          width: 30%;
          height: 47px;
        }
        span:nth-child(4) {
          width: 30%;
          height: 47px;
        }
        span:nth-child(5) {
          width: 27%;
          height: 47px;
          border-right: 1px solid #ebeef5;
          button {
            width: 73px;
            height: 28px;
            margin-left: 10px;
            border: none;
            background-color: #409eff;
            color: #fff;
            border-radius: 3px;
          }
          button:nth-child(2) {
            background-color: #f56c6c;
          }
          button:nth-child(3) {
            width: 97px;
            background-color: #e6a23c;
          }
        }
      }
      li:last-of-type {
        border-bottom: 1px solid #ebeef5;
      }
    }
  }
}
.add {
  background-color: #409eff;
  color: #fff;
  width: 98px;
  height: 40px;
  border: none;
  font-size: 12px;
  border-radius: 4px;
  margin-bottom: 15px;
}
</style>
