<template>
  <div>
    <el-dialog :title="popup.isadd?'秒杀添加':'秒杀编辑'" :visible.sync="popup.isshow" @closed="cancel">
      <el-form :model="user">
        <el-form-item label="活动名称" label-width="100px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" label-width="100px">
          <div class="block">
            <el-date-picker
              v-model="value"
              type="datetimerange"
              @change="changeTime"
              value-format="timestamp"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form-item>
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
        <el-button type="primary" v-if="popup.isadd" @click="seckilladd">确 定</el-button>
        <el-button type="primary" v-else @click="edit">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  cateListUrl,
  goodsListUrl,
  seckillAddUrl,
  seckillDetailUrl,
  seckillEdit,
  seckillEditUrl
} from "../../../utils/http";
import { successalter,erroralter } from "../../../utils/alter";
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
      secondCateList: "",
      goodslistname: "",
      value: []
    };
  },
  props: ["popup"],
  computed: {
    ...mapGetters({
      catelist: "cate/list",
      seckilllist: "seckill/list"
    })
  },
  methods: {
    ...mapActions({
      cateobtainList: "cate/obtainList",
      seckillobtainList: "seckill/obtainList"
    }),
    cancel() {
      if (!this.popup.isadd) {
        this.usernull();
      }
      this.popup.isshow = false;
    },
    // 时间戳
    changeTime() {
      this.user.begintime = this.value[0];
      this.user.endtime = this.value[1];
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
      goodsListUrl({
        fid: this.user.first_cateid,
        sid: this.user.second_cateid
      }).then(res => {
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
      this.value = [];
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
            this.seckillobtainList();
          }
        });
      });
    },
    // 获取详情
    getOne(id) {
      seckillDetailUrl({ id: id }).then(res => {
        if (res.data.code === 200) {
          this.user = res.data.list;
          this.user.id = id;
          this.value = [this.user.begintime, this.user.endtime];
        }
      });
      
    },
    // 编辑
    edit() {
      this.checkProps().then(() => {
        this.changeTime();
        seckillEditUrl(this.user).then(res => {
          if (res.data.code === 200) {
            successalter(res.data.msg);
            this.cancel();
            this.seckillobtainList();
            this.usernull();
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