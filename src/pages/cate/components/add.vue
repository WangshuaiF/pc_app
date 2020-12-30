<template>
  <div>
    <el-dialog :title="popup.isadd?'分类添加':'分类编辑'" :visible.sync="popup.isshow">
      <el-form :model="user">
        <el-form-item label="上级菜单" label-width="100px">
          <el-select v-model="user.pid">
            <el-option label="请选择" value disabled></el-option>
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" label-width="100px">
          <el-input v-model="user.catename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="100px" v-if="user.pid!==0">
          <div class="conent">
            <div class="con">+</div>
            <img v-if="temporaryImg" class="urlImg" :src="temporaryImg" />
            <input v-if="popup.isshow" class="ipt" type="file" @change="changeImg" />
          </div>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="popup.isadd" @click="cateadd">添 加</el-button>
        <el-button type="primary" v-else @click="edit">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from "path";
import { erroralter, successalter } from "../../../utils/alter";
import { cateAddUrl, cateDetailUrl, cateEditUrl } from "../../../utils/http";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["popup"],
  data() {
    return {
      temporaryImg: "",
      user: {
        pid: "",
        catename: "",
        img: null,
        status: 1
      }
    };
  },
  computed: {
    ...mapGetters({
      list: "cate/list"
    })
  },
  methods: {
    ...mapActions({
      obtainList: "cate/obtainList"
    }),
    cancel() {
      this.popup.isshow = false;
    },
    // user置空
    usernull() {
      this.temporaryImg = "";
      this.user = {
        pid: "",
        catename: "",
        img: null,
        status: 1
      };
    },
    // 上传文件
    changeImg(e) {
      let file = e.target.files[0];
      // 截取后缀名
      // js
      // let suffix=file.name.slice(file.name.lastIndexOf('.'));
      let suffix = path.extname(file.name);
      // 判断图片类型
      let arr = [".png", ".gif", ".jpg", ".jpeg"];
      if (!arr.some(item => item === suffix)) {
        erroralter("请上传图片");
        return;
      }
      // 判断图片大小
      if (file.size > 2 * 1024 * 1024) {
        erroralter("上传的图片不超过2M");
        return;
      }
      // 将文件生成地址
      let Url = URL.createObjectURL(file);
      this.temporaryImg = Url;
      // 赋值给user.img
      this.user.img = file;
    },
    // 验证
    checkProps() {
      return new Promise(resolve => {
        if (this.user.pid === "") {
          erroralter("上级菜单不能为空");
          return;
        }
        if (this.user.catename === "") {
          erroralter("分类名称不能为空");
          return;
        }
        if ((this.temporaryImg = "")) {
          if (!this.user.img) {
            erroralter("图片不能为空");
            return;
          }
        }
        if (!this.user.img) {
          erroralter("图片不能为空");
          return;
        }
        resolve();
      });
    },
    // 添加
    cateadd() {
      this.checkProps().then(() => {
        cateAddUrl(this.user).then(res => {
          if (res.data.code === 200) {
            successalter(res.data.msg);
            this.cancel();
            this.usernull();
            this.obtainList();
          }
        });
      });
    },
    // 获取详细信息
    getOne(id) {
      cateDetailUrl(id).then(res => {
        this.user = res.data.list;
        // 补id
        this.user.id = id;
        // 处理图片
        this.temporaryImg = this.$pre + this.user.img;
      });
    },
    edit() {
      this.checkProps().then(() => {
        cateEditUrl(this.user).then(res => {
          if (res.data.code === 200) {
            successalter(res.data.msg);
            this.cancel();
            this.usernull();
            this.obtainList();
          }
        });
      });
    }
  }
};
</script>

<style scoped>
.conent {
  width: 100px;
  height: 100px;
  background: #e2e2e2;
  border: 1px dashed #666;
  position: relative;
}
.con {
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 50px;
}
.ipt {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
  z-index: 1;
}
.urlImg {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
}
</style>