<template>
  <div>
    <el-dialog :title="tan.isadd?'菜单添加':'菜单编辑'" :visible.sync="tan.isshow" @closed="cancel">
      <el-form :model="user">
        <el-form-item label="菜单名称" label-width="100px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" label-width="100px">
          <el-select v-model="user.pid" @change="leixing">
            <el-option value label="请选择" disabled></el-option>
            <el-option :value="0" label="顶级菜单"></el-option>
            <el-option v-for="item in menulist" :key="item.id" :value="item.id" :label="item.title"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" label-width="100px">
          <el-radio v-model="user.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="user.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item label="菜单图标" label-width="100px" v-if="user.type===1">
          <el-select v-model="user.icon">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" label-width="100px" v-else>
          <el-select v-model="user.url" placeholder="请选择活动区域">
            <el-option
              v-for="item in urlAggregate"
              :key="item.path"
              :value="'/'+item.path"
              :label="item.name+'-/'+item.path"
            >
              <!-- {{item.name}}--------/{{item.path}} -->
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="tan.isadd">添 加</el-button>
        <el-button type="primary" @click="addedit" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 接口
import { menuAddUrl, menuDetailUrl, menuEditUrl } from "../../../utils/http";
// 成功提示
import { successalter, erroralter } from "../../../utils/alter";
// 二级路由集合
import { urlAggregate } from "../../../router";
export default {
  props: ["tan", "menulist"],
  data() {
    return {
      user: {
        pid: "",
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1
      },
      icons: [
        "el-icon-setting",
        "el-icon-user-solid",
        "el-icon-camera-solid",
        "el-icon-s-platform",
        "el-icon-s-order"
      ],
      // 路由集合
      urlAggregate
    };
  },
  methods: {
    cancel() {
      //编辑完成清空数据
      if (!this.tan.isadd) {
        this.usernull();
      }
      this.tan.isshow = false;
    },
    usernull() {
      this.user = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1
      };
    },
    // 验证
    checkProps() {
      return new Promise(resolve => {
        if (this.user.title === "") {
          erroralter("菜单名称不能为空");
          return;
        }
        if (this.user.pid === "") {
          erroralter("上级菜单不能为空");
          return;
        }
        if (this.user.type == 1) {
          if (this.user.icon === "") {
            erroralter("菜单图标不能为空");
            return;
          }
        }
        if (this.user.type == 2) {
          if (this.user.url === "") {
            erroralter("菜单地址不能为空");
            return;
          }
        }

        resolve();
      });
    },
    //添加
    add() {
      this.checkProps().then(() => {
        menuAddUrl(this.user).then(res => {
          if (res.data.code === 200) {
            //成功
            successalter(res.data.msg);
            //弹框消失
            this.cancel();
            // 清空user
            this.usernull();
            //刷新列表
            this.$emit("init");
          }
        });
      });
    },
    leixing() {
      if (this.user.pid == 0) {
        this.user.type = 1;
      } else {
        this.user.type = 2;
      }
    },
    //获取详情信息
    getdetail(id) {
      // console.log("axios--",id);
      menuDetailUrl(id).then(res => {
        this.user = res.data.list;
        this.user.id = id;
      });
    },
    //修改
    addedit() {
      this.checkProps().then(()=>{
        menuEditUrl(this.user).then(res => {
        if (res.data.code === 200) {
          successalter(res.data.msg);
          //取消弹框
          this.cancel();
          //更新列表
          this.$emit("init");
        }
      });
      })
    }
  }
};
</script>

<style>
</style>