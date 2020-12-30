<template>
  <div class="conent">
    <div class="con">
      <h3>登录</h3>
      <div class="inpt">
        <el-input placeholder="请输入内容" v-model="user.username" clearable></el-input>
      </div>
      <div class="inpt">
        <el-input placeholder="请输入密码" v-model="user.password" show-password clearable></el-input>
      </div>
      <div class="btn">
        <el-button type="primary" round @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { loginUrl } from "../../utils/http";
import { successalter } from "../../utils/alter";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions({
      obtainuserList: "obtainuserList"
    }),
    login() {
      loginUrl(this.user).then(res => {
        if (res.data.code === 200) {
          this.obtainuserList(res.data.list);
          successalter(res.data.msg);
          this.$router.push("/");
        }
      });
      // this.$router.push("/")
      //存用户的信息
      //   localStorage.setItem("userInfo", JSON.stringify(res.data.list));
    }
  },
  mounted() {}
};
</script>

<style scoped>
.conent {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #553544, #433a52, #303d60);
}
.con {
  width: 400px;
  height: 300px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 10px;
}
.con h3 {
  font-size: 30px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 10px;
}
.inpt {
  padding: 10px;
}
.btn {
  text-align: center;
  /* width: 100px; */
}
.el-button {
  width: 250px;
}
</style>