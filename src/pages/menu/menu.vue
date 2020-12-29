<template>
  <div>
    <el-button type="primary" @click="adddisplay">主要按钮</el-button>
    <v-list :menulist="menulist" @init='init' @edit="edit"></v-list>
    <v-add :tan="tan" :menulist="menulist" @init="init" ref="getdetail"></v-add>
  </div>
</template>

<script>
import vAdd from "./components/add.vue";
import vList from "./components/list.vue";
import { menuListUrl } from "../../utils/http";
export default {
  data() {
    return {
      tan: {
        isshow: false,
        //41.用来判断是添加还是编辑打开的摊弹框
        isadd:true
      },
      menulist: []
    };
  },
  components: {
    vAdd,
    vList
  },
  methods: {
    // 弹框
    adddisplay() {
      this.tan.isshow = true;
      this.tan.isadd=true
    },
    //菜单列表
    init() {
      menuListUrl().then(res => {
        this.menulist = res.data.list;
      });
    },
    //编辑
    edit(id){
      this.tan.isshow=true;
      this.tan.isadd=false
      //调用子组件add的方法
      this.$refs.getdetail.getdetail(id);
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
</style>