<template>
  <div>
    <el-table
      :data="specslist"
      border
      row-key="id"
      :tree-props="{children: 'children'}"
      style="width: 100%;margin-bottom: 20px;"
    >
      <el-table-column prop="id" label="规格编号" width="180"></el-table-column>
      <el-table-column prop="specsname" label="规格名称"></el-table-column>
      <el-table-column prop="attrs" label="规格属性">
        <template slot-scope="scope">
          <el-tag v-for="(item,index) in scope.row.attrs" :key="index">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="specsedit(scope.row.id)">编辑</el-button>
          <delalter @delbtn="specsdel(scope.row.id)"></delalter>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="right">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="size"
        @current-change="changePage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { specsDelUrl } from "../../../utils/http";
import { successalter } from "../../../utils/alter";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      // 列表
      specslist: "specs/specslist",
      // 总数
      total: "specs/total",
      // 一页的数量
      size: "specs/size"
    })
  },
  methods: {
    ...mapActions({
      // 获取
      obtainList: "specs/obtainList",
      obtainTotal: "specs/obtainTotal",
      changePage: "specs/changePage"
    }),
    // 删除
    specsdel(id) {
      specsDelUrl({ id: id }).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          successalter(res.data.msg);
          this.obtainList();
          this.obtainTotal()
        }
      });
    },
    specsedit(id) {
      this.$emit("specsedit", id);
    }
  },
  mounted() {
    this.obtainList();
    this.obtainTotal()
  }
};
</script>

<style scoped>
.right{
  float: right;
}
</style>