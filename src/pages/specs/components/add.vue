<template>
  <div>
    <el-dialog :title="popup.isshow?'规格添加':'规格编辑'" :visible.sync="popup.isshow" @closed="cancel">
      <el-form :model="user">
        <el-form-item label="规格名称" label-width="100px">
          <el-input v-model="user.specsname"></el-input>
        </el-form-item>
        <el-form-item
          label="规格属性"
          label-width="100px"
          v-for="(item ,index) in attrsArr"
          :key="index"
        >
          <div class="btn">
            <el-input class="line-ipt" v-model="item.value"></el-input>
            <el-button type="primary" class="line-btn" v-if="index==0" @click="addAttr">新增规格属性</el-button>
            <el-button type="danger" class="line-btn" v-else @click="delAttr(index)">删除</el-button>
          </div>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <template>
            <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="specsadd" v-if="popup.isadd">添 加</el-button>
        <el-button type="primary" @click="edit" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { specsAddUrl, specsDetailUrl, specsEditUrl } from "../../../utils/http";
import { successalter } from "../../../utils/alter";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["popup"],
  data() {
    return {
      // 初始化数据
      user: {
        specsname: "",
        attrs: [],
        status: 1
      },
      attrsArr: [{ value: "" }]
    };
  },
  methods: {
    ...mapActions({
      obtainList: "specs/obtainList"
    }),
    cancel() {
      if (!this.popup.isadd) {
        this.usernull();
      }
      this.popup.isshow = false;
    },
    // 新增
    addAttr() {
      this.attrsArr.push({ value: "" });
    },
    //删除属性
    delAttr(index) {
      this.attrsArr.splice(index, 1);
    },
    // 数据置空
    usernull() {
      this.user = {
        specsname: "",
        attrs: [],
        status: 1
      };
      this.attrsArr = [{ value: "" }];
    },
    // 添加
    specsadd() {
      this.user.attrs = JSON.stringify(this.attrsArr.map(item => item.value));
      specsAddUrl(this.user).then(res => {
        if (res.data.code === 200) {
          successalter(res.data.msg);
          this.cancel();
          this.usernull();
          this.obtainList();
        }
      });
    },
    // 获取一条详情
    getOne(id) {
      specsDetailUrl({ id: id }).then(res => {
        if (res.data.code === 200) {
          this.user = res.data.list[0];
          this.user.attrs = JSON.parse(this.user.attrs);
          this.attrsArr = this.user.attrs.map(item => ({ value: item }));
        }
      });
    },
    // 编辑修改
    edit() {
      this.user.attrs = JSON.stringify(this.attrsArr.map(item => item.value));
      specsEditUrl(this.user).then(res => {
        if(res.data.code===200){
          successalter(res.data.msg);
          this.cancel();
          this.usernull();
          this.obtainList();
        }
      });
    }
  },
  computed: {
    ...mapGetters({
      specslist: "specs/specslist"
    })
  }
};
</script>

<style scoped>
.btn {
  display: flex;
}
</style>