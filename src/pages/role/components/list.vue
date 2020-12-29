<template>
  <div>
    <el-table :data="rolelist" border style="width: 100%">
      <el-table-column prop="id" label="角色编号" width="180"></el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <delalter @delbtn="del(scope.row.id)"></delalter>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
      <!--  -->
<script>
import { roleDelUrl, roleEditUrl } from "../../../utils/http";
import { successalter } from "../../../utils/alter";
export default {
  props: ["rolelist"],
  data() {
    return {};
  },
  methods: {
    del(id) {
      roleDelUrl({id:id}).then(res=>{
        if(res.data.code==200){
          successalter(res.data.msg);
          this.$emit("init")
        }
      })
    },
    edit(id){
      this.$emit("edit",id)
    }
  }
};
</script>

<style>
</style>