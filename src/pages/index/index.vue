<template>
  <div>
    <el-container class="index">
      <el-aside width="200px">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <!-- 左侧导航 -->
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <div v-for="item in userlist.menus" :key="item.id">
            <el-menu-item v-if="!item.children" :index="item.url">{{item.title}}</el-menu-item>
            <el-submenu :index="item.id+''" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <!-- 下拉列表 -->
              <el-menu-item-group>
                <el-menu-item v-for="i in item.children" :key="i.id" :index="i.url">{{i.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </div>

          <!-- 系统设置 -->
          <!-- <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>系统设置</span>
          </template>-->

          <!-- 下拉列表 -->
          <!--<el-menu-item-group>
              <el-menu-item index="/menu">菜单管理</el-menu-item>
              <el-menu-item index="/role">角色管理</el-menu-item>
              <el-menu-item index="manage">管理员管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>-->

          <!-- 商城管理 -->
          <!-- <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>商城管理</span>
            </template>
            下拉列表
            <el-menu-item-group>
              <el-menu-item index="/cate">商品分类</el-menu-item>
              <el-menu-item index="/specs">商品规格</el-menu-item>
              <el-menu-item index="/goods">商品管理</el-menu-item>
              <el-menu-item index="/member">会员管理</el-menu-item>
              <el-menu-item index="/banner">轮播图管理</el-menu-item>
              <el-menu-item index="/seckill">秒杀活动</el-menu-item>
            </el-menu-item-group>
          </el-submenu>-->
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="head">
            <div @click="outlogin" class="pright">
              <el-button type="danger" icon="el-icon-error" circle></el-button>
            </div>
            <h3 class="right">{{userlist.username}}</h3>
          </div>
        </el-header>
        <el-main>
          <!-- 面包屑导航 -->
          <el-breadcrumb separator-class="el-icon-arrow-right" v-if="$route.name">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 二级路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <!-- 二级路由 -->
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      userlist: "userlist"
    })
  },
  methods: {
    ...mapActions({
      obtainuserList: "obtainuserList"
    }),
    outlogin() {
      this.obtainuserList({});
      this.$router.replace("/login");
    }
  }
};
</script>

<style scoped>
.el-menu-vertical-demo {
  height: 100vh;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.head {
  overflow: hidden;
}
.right {
  float: right;
  margin-right: 10px;
  font-size: 20px;
}
.pright {
  float: right;
}
</style>