<template>
  <div>
    <el-dialog title="会员修改" :visible.sync="popup.isshow">
      <el-form :model="user">
        <el-form-item label="手机号" label-width="100px">
          <el-input v-model="user.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" label-width="100px">
          <el-input v-model="user.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="memberedit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { memberDetailUrl, memberEditUrl } from "../../../utils/http";
import { successalter } from "../../../utils/alter";
export default {
  props: ["popup"],
  data() {
    return {
      user: {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1
      }
    };
  },
  methods: {
    cancel() {
      this.popup.isshow = false;
    },
    getOne(uid) {
      memberDetailUrl({ uid: uid }).then(res => {
        if (res.data.code === 200) {
          this.user = res.data.list;
          //补id
          this.user.uid = uid;
          this.user.password = "";
        }
      });
    },
    usernull() {
      this.user = {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1
      };
    },

    memberedit() {
      memberEditUrl(this.user).then(res => {
        if (res.data.code === 200) {
          successalter(res.data.msg);
          this.cancel();
          this.usernull();
          this.$emit("init");
        }
      });
    }
  }
};
</script>

<style>
</style>