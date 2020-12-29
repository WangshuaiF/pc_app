<template>
  <div class="banneradd">
    <el-dialog :title="popup.isadd?'分类添加':'分类编辑'" :visible.sync="popup.isshow">
      <el-form :model="user">
        <el-form-item label="标题" label-width="100px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="100px">
          <!-- js -->
          <!-- <div class="conent">
            <div class="con">+</div>
            <img v-if="temporaryImg" class="urlImg" :src="temporaryImg" alt />
            <input v-if="popup.isshow" class="ipt" type="file" @change="changeImg" />
          </div>-->
          <!-- UI -->
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="temporaryImg" :src="temporaryImg" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
import { bannerAddUrl, bannerDetailUrl, bannerEditUrl } from "../../../utils/http";
export default {
  props: ["popup", "useradd"],
  data() {
    return {
      temporaryImg: "",
      user: {
        title: "",
        img: null,
        status: 1
      }
    };
  },
  methods: {
    cancel() {
      this.popup.isshow = false;
    },
    // user置空
    usernull() {
      this.temporaryImg = "";
      this.user = {
        title: "",
        img: null,
        status: 1
      };
    },
    // 上传文件
    /* changeImg(e) {
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
    }, */
    //ui上传
    changeImg(e) {
      console.log(e);
      let file = e.raw;
       // 判断图片类型
      let suffix = path.extname(file.name);
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
      this.temporaryImg = URL.createObjectURL(file);
      this.user.img = file;
    },
    // 添加
    cateadd() {
      bannerAddUrl(this.user).then(res => {
        if (res.data.code === 200) {
          successalter(res.data.msg);
          this.cancel();
          this.usernull();
          this.$emit("init");
        }
      });
    },
    // 获取详细信息
    getOne(id) {
      bannerDetailUrl(id).then(res => {
        this.user = res.data.list;
        // 补id
        this.user.id = id;
        // 处理图片
        this.temporaryImg = this.$pre + this.user.img;
      });
    },
    edit() {
      bannerEditUrl(this.user).then(res => {
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

<style scoped>
/* .conent {
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
} */
/* ui */
.banneradd >>> .el-upload {
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