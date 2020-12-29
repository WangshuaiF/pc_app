<template>
  <div class="box">
    <el-dialog
      :title="popup.isadd?'商品添加':'商品修改'"
      :visible.sync="popup.isshow"
      @closed="cancel"
      @opened="opened"
    >
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
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="商品规格" label-width="100px">
          <el-select v-model="user.specsid" @change="specsshuxing">
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
          <el-select v-model="user.specsattr" multiple>
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
          <!-- 富文本编辑器 -->
          <div id="box" v-if="popup.isshow"></div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="goodsadd" v-if="popup.isadd">确 定</el-button>
        <el-button type="primary" @click="edit" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  cateListUrl,
  goodsAddUrl,
  goodsDetailUrl,
  goodsEditUrl
} from "../../../utils/http";
import { successalter } from "../../../utils/alter";
import E from "wangeditor";
export default {
  props: ["popup"],
  data() {
    return {
      // 初始化数据
      user: {
        first_cateid: "",
        second_cateid: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
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
      specslist: "specs/specslist",
      //   goods
      goodslist: "goods/list"
    })
  },
  methods: {
    cancel() {
      if (!this.popup.isadd) {
        this.usernull();
      }
      this.popup.isshow = false;
    },
    //获取一级分类列表
    ...mapActions({
      cateobtainList: "cate/obtainList",
      specsobtainList: "specs/obtainList",
      goodsobtainList: "goods/obtainList",
      goodsobtainTotal: "goods/obtainTotal"
    }),
    // 列表
    geterjilist() {
      this.user.second_cateid = "";

      cateListUrl({ pid: this.user.first_cateid }).then(res => {
        if (res.data.code === 200) {
          this.erjiList = res.data.list;
        }
      });
    },

    // 图片
    changeImg(e) {
      let file = e.raw;
      // 判断
      this.imageUrl = URL.createObjectURL(file);
      this.user.img = file;
    },

    // 属性
    getattribute() {
      let obj = this.specslist.find(item => item.id == this.user.specsid);
      this.specsAttribute = obj ? obj.attrs : [];
    },
    // 获取二级列表
    computederji() {
      this.geterjilist();
    },
    // 获取属性
    specsshuxing() {
      this.user.specsattr = "";
      this.getattribute();
    },
    // 数据清空
    usernull() {
      this.user = {
        first_cateid: "",
        second_cateid: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1
      };
      this.imageUrl = "";
      //   二级列表
      this.erjiList = [];
      //规格属性
      this.specsAttribute = [];
    },
    // 添加
    goodsadd() {
      this.user.description = this.editor.txt.html();

      let data = {
        ...this.user,
        specsattr: JSON.stringify(this.user.specsattr)
      };
      console.log(data);
      goodsAddUrl(data).then(res => {
        if (res.data.code === 200) {
          successalter(res.data.msg);
          //   数据置空
          this.usernull();
          //   清楚弹框
          this.cancel();
          //   获取列表和分页总数
          this.goodsobtainList();
          this.goodsobtainTotal();
        }
      });
    },
    // 获取详情
    getOne(id) {
      goodsDetailUrl({ id: id }).then(res => {
        if (res.data.code === 200) {
          this.user = res.data.list;
          // 重新获取一级分类
          this.getattribute();
          // 重新获取图片
          this.imageUrl = this.$pre + this.user.img;
          // 重新获取属性
          this.getattribute();
          // 字符串转数组
          this.user.specsattr = JSON.parse(this.user.specsattr);
          // 补id
          this.user.id = id;
          //   获取编辑器的内容
          if (this.editor) {
            this.editor.txt.html(this.user.description);
          }
        }
      });
    },
    edit() {
      this.user.description = this.editor.txt.html();
      let data = {
        ...this.user,
        specsattr: JSON.stringify(this.user.specsattr)
      };
      goodsEditUrl(data).then(res => {
        if (res.data.code === 200) {
          successalter(res.data.msg);
          this.cancel();
          this.usernull();
          //   获取列表和分页总数
          this.goodsobtainList();
          this.goodsobtainTotal();
        }
      });
    },
    // 创建编辑器
    opened() {
      // 创建编辑器
      this.editor = new E("#box");
      this.editor.create();
      this.editor.txt.html(this.user.description);
    }
  },
  mounted() {
    // 判断有没有列表没有就获取
    if (this.catelist.length === 0) {
      this.cateobtainList();
    }
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