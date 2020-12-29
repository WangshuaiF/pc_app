<template>
  <div class="box">
    <el-dialog title="收货地址" :visible.sync="popup.isshow">
      {{user}}
      <el-form :model="user">
        <el-form-item label="一级分类" label-width="100px">
          <el-select v-model="user.first_cateid" @change="computederji">
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
          <el-select v-model="user.second_cateid">
            <el-option label="请选择" value disabled></el-option>
            <el-option
              v-for="item in erjiList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" label-width="100px">
          <el-input v-model="user.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="100px">
          <el-input v-model="user.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="100px">
          <el-input v-model="user.market_price"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="100px">
          <el-upload class="avatar-uploader" action="#" :show-file-list="false">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="商品规格" label-width="100px">
          <el-select v-model="user.sepcsid" @change="specsshuxing">
            <el-option label="请选择" value disabled></el-option>
            <el-option
              v-for="item in specslist"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性" label-width="100px">
          <el-select v-model="user.sepcsattr">
            <el-option label="请选择" value disabled></el-option>
            <el-option v-for="item in specsAttribute" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" label-width="100px">
          <el-radio v-model="user.isnew" :label="1">是</el-radio>
          <el-radio v-model="user.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="100px">
          <el-radio v-model="user.ishot" :label="1">是</el-radio>
          <el-radio v-model="user.ishot" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <el-form-item label="商品描述" label-width="100px">
          <textarea v-model="user.description" id cols="30" rows="10"></textarea>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { cateListUrl, specsListUrl } from "../../../utils/http";
export default {
  props: ["popup"],
  data() {
    return {
      // 初始化数据
      user: {
        id: "",
        first_cateid: "",
        second_cateid: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        sepcsid: "",
        sepcsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1
      },
      imageUrl: "",
      //   二级列表
      erjiList: [],
      //规格属性
      specsAttribute: []
    };
  },
  computed: {
    ...mapGetters({
      //一级分类
      catelist: "cate/list",
      //   规格
      specslist: "specs/specslist"
    })
  },
  methods: {
    cancel() {
      this.popup.isshow = false;
    },
    //获取一级分类列表
    ...mapActions({
      cateobtainList: "cate/obtainList",
      specsobtainList: "specs/obtainList"
    }),
    // 列表
    geterjilist() {
      cateListUrl({ pid: this.user.first_cateid }).then(res => {
        if (res.data.code === 200) {
          this.erjiList = res.data.list;
        }
      });
    },
    // 属性
    getattribute() {
      let obj = this.specslist.find(item => {
        item.id === this.user.sepcsid;
      });
      this.specsAttribute = obj ? obj : [];
      console.log(specsAttribute);
    },
    // 获取二级列表
    computederji() {
      this.geterjilist();
    },
    // 获取属性
    specsshuxing() {
      this.getattribute();
    }
  },
  mounted() {
    // 判断有没有列表没有就获取
    if (this.catelist.length === 0) {
      this.cateobtainList();
    };
    this.specsobtainList(true);
  }
};
</script>

<style scoped>
.box >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>