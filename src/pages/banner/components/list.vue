<template>
  <div>
    <el-table
      :data="bannerlist"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="编号" width="180"></el-table-column>
      <el-table-column prop="title" label="轮播图标题" width="180"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$pre+scope.row.img" alt />
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="cateedit(scope.row.id)">编 辑</el-button>
          <delalter @delbtn="del(scope.row.id)" ></delalter>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { bannerDelUrl } from "../../../utils/http";
import { successalter } from "../../../utils/alter";
export default {
  props: ["bannerlist"],
  methods: {
    del(id) {
      bannerDelUrl({ id: id }).then(res => {
        if (res.data.code === 200) {
          successalter(res.data.msg);
          this.$emit("init");
        }
      });
    },
    // 编辑
    cateedit(id){
        this.$emit("cateedit",id)
    }
  }
};
</script>

<style scoped>
img {
  width: 100px;
  height: 100px;
}
</style>