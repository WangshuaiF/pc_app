<template>
  <div>
    <el-button type="primary" @click="adddisplay">添加</el-button>

    <v-list :managelist="managelist" @init="init" @edit="manageedit"></v-list>

    <v-add :popup="popup" @init="init" ref="getOne"></v-add>

    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="paging.total"
      :page-size="paging.pageSize"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script>
import vList from "./components/list.vue";
import vAdd from "./components/add.vue";
import { manageListUrl, managePagingUrl } from "../../utils/http";
import { successalter } from "../../utils/alter";
export default {
  components: {
    vList,
    vAdd
  },
  data() {
    return {
      popup: {
        isshow: false,
        isadd:true
      },
      managelist: [],
      paging: {
        total: 0,
        page: 1,
        pageSize: 2
      }
    };
  },
  methods: {
    //弹框
    adddisplay() {
      this.popup.isshow = true;
    },
    // 获取列表
    getList() {
      manageListUrl({
        page: this.paging.page,
        size: this.paging.pageSize
      }).then(res => {
        if (res.data.code === 200) {
          //删除最后一项
          if (res.data.list.length == 0 && this.paging.page > 1) {
            this.paging.page--;
            this.init();
            return;
          }
          this.managelist = res.data.list;
        }
      });
    },
    //获取条目总数
    getTotal() {
      managePagingUrl().then(res => {
        if (res.data.code === 200) {
          this.paging.total = res.data.list[0].total;
        }
      });
    },
    // 获取列表函数
    init() {
      this.getList();
      this.getTotal();
    },
    // 编辑
    manageedit(uid) {
      //弹框出现
      this.popup.isshow = true;
      //是否编辑
      this.popup.isadd=false
      this.$refs.getOne.getOne(uid);
    },
    // 修改页码
    changePage(e) {
      console.log(e);
      this.paging.page = e;
      //再次取list
      this.getList();
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped>
.el-button--primary {
  margin: 20px;
}
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>