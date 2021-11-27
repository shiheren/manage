<template>
  <div class="home">
    <!-- 头部 --><el-container>
      <el-header>
        <h2>后台登录系统</h2>
        <button>退出登录</button>
      </el-header>
      <el-container>
        <el-aside>
              <!-- 内容 -->
    <el-row class="tac">
      <el-col :span="12">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="istrue"
          
        >
          <el-submenu :index="String(item.id)" v-for="item in list"
          :key="item.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item-group v-for="items in item.children" :key="items.id">
              <router-link :to="items.path"><el-menu-item index="1-1">{{items.authName}}</el-menu-item></router-link>
              
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>

        </el-aside>
        <router-view></router-view>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import http from '../http/index'
export default {
  props: {},
  data() {
    return {
      list:[],
      istrue:true
    };
  },
  mounted() {
    http({
      url:'menus',
    }).then(res=>{
      console.log(res)
      this.list=res.data
    })
  },
  methods: {
    //   头部
    goBack() {
      console.log("go back");
    },
    // 内容

    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  components: {},
};
</script>

<style lang="scss">
body,html{
  width: 100%;
  height: 100%;
}
.home{
  width: 100%;
  height: 100%;
  .el-header{
    background-color: #676e72;
    display: flex;
    justify-content: space-between;
    align-items: center;
     
    h2{
      color: #fff;
    }
    button{
      width: 72px;
      height: 42px;
    }
  }
  .el-container{
    width: 100%;
    height: 100%;
    .el-aside{
      height: 100%;
      width: 200px;
      background-color: rgb(84, 92, 100);
      .el-col{
        width: 100%;
        height: 100%;
         background-color: rgb(84, 92, 100);
      }
    }
  }
}




</style>
