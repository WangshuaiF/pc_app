<template>
  <div>
    <el-table
      :data="list"
      border
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="title" label="活动名称" width="180"></el-table-column>
      <el-table-column prop="status" label="状态" width="180">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="seckilledit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { seckillDelUrl } from "../../../utils/http";
import { successalter } from "../../../utils/alter";
export default {
  computed: {
    ...mapGetters({
      list: "seckill/list"
    })
  },
  methods: {
    ...mapActions({
      obtainList: "seckill/obtainList"
    }),
    del(id) {
      seckillDelUrl({ id: id }).then(res => {
        if (res.data.code===200) {
          successalter(res.data.msg);
          this.obtainList();
        }
      });
    },
    seckilledit(id){
      this.$emit("seckilledit",id)
    }
  },
  mounted() {
    this.obtainList();
  }
};
</script>

<style>
</style>