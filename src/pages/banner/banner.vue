<template>
  <div>
      <el-button type="primary" @click="banneradd">添 加</el-button>
      <v-list :bannerlist="bannerlist" @init="init" @cateedit="edit($event)"></v-list>
      <v-add :popup="popup" @init="init" ref="getOne"></v-add>
  </div>
</template>

<script>
import vList from './components/list.vue';
import vAdd from './components/add.vue';
import { bannerListUrl } from '../../utils/http'
export default {
  components:{
    vList,
    vAdd
  },
  data(){
    return {
      popup:{
        isshow:false,
        isadd:true
      },
      bannerlist:[]
    }
  },
  methods:{
    banneradd(){
      this.popup.isshow=true
      this.popup.isadd=true
    },
    init(){
      bannerListUrl().then(res=>{
        this.bannerlist=res.data.list
      })
    },
    edit(id){
      this.popup.isshow=true
      this.popup.isadd=false
      this.$refs.getOne.getOne(id)
    }
  },
  mounted(){
    this.init();
  }
}
</script>

<style scoped>
.el-button--primary{
  margin: 20px;
}

</style>