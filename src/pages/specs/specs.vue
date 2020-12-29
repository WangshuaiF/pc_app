<template>
  <div>
    <el-button type="primary" @click="specsadd">添加</el-button>
    <v-list @specsedit="specsedit($event)"></v-list>
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
    specsadd() {
      this.popup.isshow = true;
      this.popup.isadd = true;
    },
    specsedit(id) {
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