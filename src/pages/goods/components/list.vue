<template>
  <div>
    <el-table
      :data="list"
      border
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="商品编号" width="80"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="150"></el-table-column>
      <el-table-column prop="price" label="商品价格"></el-table-column>
      <el-table-column prop="market_price" label="市场价格"></el-table-column>
      <el-table-column prop="img" label="图片">
        <template slot-scope="scope">
          <img :src="$pre+scope.row.img" alt />
        </template>
      </el-table-column>
      <el-table-column prop="isnew" label="是否新品">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnew===1">是</el-button>
          <el-button type="info" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="ishot" label="是否热卖">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.ishot===1">是</el-button>
          <el-button type="info" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" @click="goodsedit(scope.row.id)">编辑</el-button>
          <delalter @delbtn="goodsdel(scope.row.id)"></delalter>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { goodsDelUrl } from "../../../utils/http";
import { successalter } from "../../../utils/alter";
export default {
  computed: {
    ...mapGetters({
      list: "goods/list",
      total: "goods/total",
      size: "goods/size"
    })
  },
  methods: {
    ...mapActions({
      obtainList: "goods/obtainList",
      obtainTotal: "goods/obtainTotal",
      changePage: "goods/changePage"
    }),
    // 删除
    goodsdel(id) {
      goodsDelUrl({ id: id }).then(res => {
        if (res.data.code === 200) {
          successalter(res.data.msg);
          this.obtainList();
          this.obtainTotal();
        }
      });
    },
    // 编辑
    goodsedit(id) {
      this.$emit("goodsedit", id);
    },
  },
  mounted() {
    this.obtainList();
    this.obtainTotal();
  }
};
</script>

<style scoped>
img {
  width: 100px;
  height: 100px;
}
</style>