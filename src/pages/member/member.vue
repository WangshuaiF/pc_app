<template>
  <div>
    <v-list :memberlist="memberlist" @memberedit="edit"></v-list>
    <v-add :popup="popup" ref="getOne" @init="init"></v-add>
  </div>
</template>

<script>
import vList from "./components/list.vue";
import vAdd from "./components/add.vue";
import { memberListUrl } from "../../utils/http";
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
      },
      memberlist: []
    };
  },
  methods: {
    init() {
      memberListUrl().then(res => {
        this.memberlist = res.data.list;
      });
    },
    edit(uid) {
      this.popup.isshow = true;
      this.$refs.getOne.getOne(uid);
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