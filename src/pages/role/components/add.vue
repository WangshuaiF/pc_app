<template>
  <div>
    <el-dialog :title="popup.isadd?'添加角色':'编辑角色'" :visible.sync="popup.isshow" @closed="cancel">
      <el-form :model="user">
        <el-form-item label="角色名称" label-width="100px">
          <el-input v-model="user.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" label-width="100px">
          <el-tree
            :data="menulist"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="{children: 'children',label:'title'}"
          ></el-tree>
          <!-- :props="defaultProps" -->
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="roleadd" v-if="popup.isadd">添 加</el-button>
        <el-button type="primary" @click="roleedit" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  roleAddUrl,
  roleDetailUrl,
  menuListUrl,
  roleEditUrl
} from "../../../utils/http";
import { successalter, erroralter } from "../../../utils/alter";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["popup"],
  data() {
    return {
      user: {
        rolename: "",
        menus: "",
        status: 1
      },
      menulist: []
    };
  },
  mounted() {
    menuListUrl().then(res => {
      // console.log(res);
      if (res.data.code === 200) {
        this.menulist = res.data.list;
        console.log(this.menulist);
      }
    });
  },
  computed: {
    ...mapGetters({
      userlist: "userlist"
    })
  },
  methods: {
    ...mapActions({
      obtainuserList: "obtainuserList"
    }),
    cancel() {
      this.popup.isshow = false;
    },
    usernull() {
      this.user = {
        rolename: "",
        menus: "",
        status: 1
      };
      this.$refs.tree.setCheckedKeys([]);
    },
    // 验证
    checkProps() {
      return new Promise(resolve => {
        if (this.user.rolename === "") {
          erroralter("角色名称不能为空");
          return;
        }
        if (this.$refs.tree.getCheckedKeys().length == 0) {
          erroralter("请设置角色权限");
          return;
        }
        resolve();
      });
    },
    // 添加
    roleadd() {
      this.checkProps().then(() => {
        //menus赋值
        this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
        roleAddUrl(this.user).then(res => {
          if (res.data.code === 200) {
            successalter(res.data.msg);
            //取消弹框
            this.cancel();
            //   清空数据
            this.usernull();
            //刷新列表
            this.$emit("init");
          }
        });
      });
    },
    getOne(id) {
      roleDetailUrl(id).then(res => {
        this.user = res.data.list;
        //补id
        this.user.id = id;
        //给树形控件赋值
        this.$refs.tree.setCheckedKeys(JSON.parse(this.user.menus));
      });
    },
    // 修改
    roleedit() {
      this.checkProps().then(() => {
        //先取出树形控件的数据给menus，再发请求
        this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
        // console.log(this.user.menus);
        roleEditUrl(this.user).then(res => {
          if (res.data.code === 200) {
            successalter(res.data.msg);
            if (this.user.id == this.userlist.roleid) {
              this.obtainuserList({});
              this.$router.push("/login");
              return;
            }
            this.cancel();
            this.$emit("init");
            this.usernull();
          }
        });
      });
    }
  }
};
</script>

<style>
</style>