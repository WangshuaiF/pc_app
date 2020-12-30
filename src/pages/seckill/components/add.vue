<template>
  <div>
    <el-dialog :title="popup.isadd?'秒杀添加':'秒杀编辑'" :visible.sync="popup.isshow" @closed="cancel">
      <el-form :model="user">
        <el-form-item label="活动名称" label-width="100px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" label-width="100px">
          <el-time-picker
            is-range
            arrow-control
            v-model="time"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="time"
          ></el-time-picker>
        </el-form-item>
        {{user}}
        <el-form-item label="一级分类" label-width="100px">
          <el-select v-model="user.first_cateid" @change="secondlist">
            <el-option label="请选择" value disabled></el-option>
            <el-option
              v-for="item in catelist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="100px">
          <el-select v-model="user.second_cateid" @change="secondgooodslist">
            <el-option label="请选择" value disabled></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" label-width="100px">
          <el-select v-model="user.goodsid">
            <el-option label="请选择" value disabled></el-option>
            <el-option
              v-for="item in goodslistname"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="seckilladd">确 定</el-button>
        <el-button type="primary">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { cateListUrl, goodsListUrl, seckillAddUrl } from "../../../utils/http";
import { successalter } from "../../../utils/alter";
export default {
  data() {
    return {
      user: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1
      },
      secondCateList: [],
      goodslistname: [],
      time: [new Date(2020, 12, 30, 16, 20), new Date(2020, 12, 30, 17, 20)]
    };
  },
  props: ["popup"],
  computed: {
    ...mapGetters({
      catelist: "cate/list"
      //   goodslist:"goods/list"
    })
  },
  methods: {
    ...mapActions({
      cateobtainList: "cate/obtainList"
      //   goodsobtainList:"goods/obtainList"
    }),
    cancel() {
      if (!this.popup.isadd) {
        this.usernull;
      }
      this.popup.isshow = false;
    },
    // 二级
    secondlist() {
      this.user.second_cateid = "";
      this.getsecondlist();
    },
    getsecondlist() {
      cateListUrl({ pid: this.user.first_cateid }).then(res => {
        if (res.data.code == 200) {
          this.secondCateList = res.data.list;
        }
      });
    },
    // 商品
    secondgooodslist() {
      this.user.goodsid = "";
      this.getsecondgooodslist();
    },
    getsecondgooodslist() {
      goodsListUrl({ fid: this.user.first_cateid, sid: this.user.second_cateid}).then(res => {
        if (res.data.code === 200) {
          this.goodslistname = res.data.list;
        }
      });
    },
    // 数据置空
    usernull() {
      this.user = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1
      };
      this.secondCateList = [];
      this.goodslistname = [];
    },
    // 验证
    checkProps() {
      return new Promise(resolve => {
        if (this.user.title === "") {
          erroralter("活动名称不能为空");
          return;
        }
        if (this.user.begintime === "" && this.user.endtime === "") {
          erroralter("请设置活动期限");
          return;
        }
        if (this.user.first_cateid === "") {
          erroralter("一级分类不能为空");
          return;
        }
        if (this.user.second_cateid === "") {
          erroralter("二级分类不能为空");
          return;
        }
        if (this.user.goodsid === "") {
          erroralter("商品不能为空");
          return;
        }
        resolve();
      });
    },
    // 添加
    seckilladd() {
      this.checkProps().then(() => {
        seckillAddUrl(this.user).then(res => {
          if (res.data.code === 200) {
            successalter(res.data.msg);
            this.usernull();
            this.cancel();
          }
        });
      });
    }
  },
  mounted() {
    this.cateobtainList();
  }
};
</script>

<style>
</style>