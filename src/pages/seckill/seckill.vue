<template>
  <div>
    <el-button type="primary" @click="seckilladd">添加</el-button>
    <v-list @seckilledit="edit($event)"></v-list>
    <v-add :popup="popup" ref="getOne"></v-add>
  </div>
</template>

<script>
import vList from "./components/list.vue";
import vAdd from "./components/add.vue";
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
      }
    };
  },
  methods: {
    seckilladd() {
      this.popup.isshow = true;
      this.popup.isadd = true;
    },
    edit(id) {
      this.popup.isshow = true;
      this.popup.isadd = false;
      this.$refs.getOne.getOne(id);
    }
  }
};
</script>

<style scoped>
.el-button--primary {
  margin: 20px;
}
</style>