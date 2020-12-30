<template>
  <div>
    <el-dialog :title="popup.isadd?'管理员添加':'管理员修改'" :visible.sync="popup.isshow" @closed="cancel">
      <el-form :model="user">
        <el-form-item label="所属角色" label-width="100px">
          <el-select v-model="user.roleid" placeholder="请选择活动区域">
            <el-option label="请选择" value disabled></el-option>
            <el-option
              v-for="item in rolelist"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="user.username" autocomplete="off"></el-input>
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
        <el-button type="primary" @click="manageadd" v-if="popup.isadd">添 加</el-button>
        <el-button type="primary" @click="manageEdit" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  roleListUrl,
  manageAddUrl,
  manageDetailUrl,
  manageEditUrl
} from "../../../utils/http";
import { successalter, erroralter } from "../../../utils/alter";
export default {
  props: ["popup"],
  data() {
    return {
      user: {
        roleid: "",
        username: "",
        password: "",
        status: 1
      },
      rolelist: ""
    };
  },
  mounted() {
    roleListUrl().then(res => {
      this.rolelist = res.data.list;
    });
  },
  methods: {
    cancel() {
      this.popup.isshow = false;
    },
    usernull() {
      this.user = {
        roleid: "",
        username: "",
        password: "",
        status: 1
      };
    },
    // 验证
    checkProps() {
      return new Promise(resolve => {
        if (this.user.roleid === "") {
          erroralter("请选择所属角色");
          return;
        }
        if (this.user.username === "") {
          erroralter("用户名不能为空");
          return;
        }
        if (this.user.password === "") {
          erroralter("密码不能为空");
          return;
        }

        resolve();
      });
    },
    //添加
    manageadd() {
      this.checkProps().then(() => {
        manageAddUrl(this.user).then(res => {
          if (res.data.code === 200) {
            successalter(res.data.msg);
            this.cancel();
            this.usernull();
            this.$emit("init");
          }
        });
      });
    },
    // 获取一条数据详情
    getOne(uid) {
      manageDetailUrl(uid).then(res => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          //密码置空
          this.user.password = "";
        }
      });
    },
    // 修改
    manageEdit() {
      this.checkProps().then(() => {
        manageEditUrl(this.user).then(res => {
          if (res.data.code === 200) {
            successalter(res.data.msg);
            this.usernull();
            this.cancel();
            this.$emit("init");
          }
        });
      });
    }
  }
};
</script>

<style>
</style>