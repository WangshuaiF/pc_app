<template>
  <div>
    <el-table
      :data="menulist"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="菜单编号" sortable ></el-table-column>
      <el-table-column prop="title" label="菜单名称" sortable ></el-table-column>
      <el-table-column label="菜单图标" >
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址" ></el-table-column>
      <el-table-column label="状态" >
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { menuDelUrl } from "../../../utils/http";
import { successalter } from "../../../utils/alter";
export default {
  props: ["menulist"],
  methods: {
    // 删除
    del(id) {
      this.$confirm("是否确定删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          menuDelUrl({ id: id }).then(res => {
            if (res.data.code === 200) {
              successalter(res.data.msg);
              this.$emit("init");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //编辑
    edit(id){
      this.$emit("edit",id)
    }

  }
};
</script>

<style>
</style>