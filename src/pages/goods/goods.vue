<template>
  <div>
    <el-button type="primary">添加</el-button>
    <v-list></v-list>
    <v-add :popup="popup"></v-add>
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
        isshow: true,
        isadd: true
      }
    };
  }
};
</script>

<style scoped>
.el-button--primary {
  margin: 20px;
}
</style>