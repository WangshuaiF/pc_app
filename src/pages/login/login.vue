<template>
  <div class="conent">
    <div class="con">
      <h3>登录</h3>
      <div class="inpt"><el-input placeholder="请输入内容" v-model="user.name" clearable></el-input></div>
      <div class="inpt"><el-input placeholder="请输入密码" v-model="user.pass" show-password  clearable></el-input></div>
      <div class="btn"> <el-button type="primary" round @click="login">主要按钮</el-button></div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            user:{
                name:"",
                pass:""
            }
        }
    },
    methods:{
        login(){
            this.$router.push("/")
             //存用户的信息
        //   localStorage.setItem("userInfo", JSON.stringify(res.data.list));
        }
    }
};
</script>

<style scoped>
.conent{
    width: 100vw;
    height: 100vh;
    background:linear-gradient(to right,#553544,#433A52,#303D60);
}
.con{
    width: 400px;
    height: 300px;
    position: fixed;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: #fff;
    border-radius: 10px;
}
.con h3{
    font-size: 30px;
    text-align: center;
}
.inpt{
    padding: 10px;
}
.btn{
    text-align: center;
    /* width: 100px; */
}
.el-button{
    width: 250PX;
}
</style>