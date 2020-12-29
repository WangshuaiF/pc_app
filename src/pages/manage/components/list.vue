<template>
  <div>
      
    <el-table :data="managelist" row-key="id" border style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="170"></el-table-column>
      <el-table-column prop="username" label="用户名称" width="250"></el-table-column>
      <el-table-column prop="rolename" label="所属角色" width="250"></el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="190">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <delalter @delbtn="del(scope.row.uid)"></delalter>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { manageDelUrl } from '../../../utils/http'
import { successalter } from '../../../utils/alter'
export default {
  props:["managelist"],
  methods:{
    del(uid){
      manageDelUrl({uid:uid}).then(res=>{
        if(res.data.code===200){
          successalter(res.data.msg);
          this.$emit("init")
        }
      })
    },
  // 编辑
  edit(uid){
    //通知父组件点了编辑
    this.$emit("edit",uid);
  }
  }
};
</script>

<style>
</style>