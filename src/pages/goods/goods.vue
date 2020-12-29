<template>
  <div>
    <el-button type="primary" @click="goodsadd">添加</el-button>
    <v-list @goodsedit="edit($event)"></v-list>
    <v-add :popup="popup" ref="add"></v-add>
  </div>
</template>

<script>
import vList from "./components/list.vue";
import vAdd from "./components/add.vue";
export default {
  components: {
    vList,
    vAdd
  },
  data() {
    return {
      popup: {
        isshow: false,
        isadd: true
      }
    };
  },
  methods: {
    goodsadd() {
      this.popup.isshow = true;
    },
    edit(id){
      this.popup.isshow=true
      this.popup.isadd=false
      this.$refs.add.getOne(id);
    }
  }
};
</script>

<style scoped>
.el-button--primary {
  margin: 20px;
}
</style>