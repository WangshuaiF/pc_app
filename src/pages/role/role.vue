<template>
  <div>
    <el-button type="primary" @click="adddisplay">添加</el-button>
    <v-list :rolelist="rolelist" @init="init" @edit="edit"></v-list>
    <v-add :popup="popup" @init="init" ref="edit"></v-add>
  </div>
</template>

<script>
import vList from "./components/list.vue";
import vAdd from "./components/add.vue";
import { roleListUrl } from "../../utils/http";
export default {
  components: {
    vAdd,
    vList
  },
  data() {
    return {
      popup: {
        isshow: false,
        isadd: true
      },
      rolelist: []
    };
  },
  methods: {
    adddisplay() {
      this.popup.isshow = true;
      // console.log('11');
      this.popup.isadd = true;
    },
    // 获取列表
    init() {
      roleListUrl().then(res => {
        this.rolelist = res.data.list;
      });
    },
    //编辑
    edit(id) {
      //弹框出现
      this.popup.isshow = true;
      this.popup.isadd = false;
      this.$refs.edit.getOne(id);
    }
  },
  mounted() {
    //获取列表
    this.init();
  }
};
</script>

<style scoped>
.el-button--primary {
  margin: 20px;
}
</style>