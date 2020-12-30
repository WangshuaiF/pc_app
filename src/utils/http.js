import Vue from 'vue'
import axios from 'axios';
import qs from 'qs';
import { erroralter } from './alter'
//开发环境8080
let baseUrl = "/api";
Vue.prototype.$pre = "http://localhost:3000";
//生产环境  打包
// let baseUrl = "";
// Vue.prototype.$pre = "";

//请求拦截 :回调函数的参数就是本次请求要发送给后端的参数
//在每次请求的时候要做的事，都可以在请求拦截中统一处理，注意，一定要return
//return 内容就是后端收到的请求
// axios.interceptors.request.use(req => {
//     if (req.url != baseUrl + "/api/login") {
//         req.headers.authorization = JSON.parse(localStorage.getItem("userInfo")).token;
//     }
//     return req
// })

//响应拦截
axios.interceptors.response.use(res => {
    //统一处理list是null的情况
    if (!res.data.list) {
        res.data.list = []
    }
    console.group("本次请求地址是" + res.config.url);
    console.log(res);
    console.groupEnd;
    if (res.data.code !== 200) {
        erroralter(res.data.msg)
    }
    return res
})

// 文件传参
function dataFormData(obj) {
    let data = new FormData();
    for (let i in obj) {
        data.append(i, obj[i]);
    }
    return data
}


// ===============================登录======================================

    export const loginUrl=(obj)=>{
        return axios({
            url:baseUrl+"/api/userlogin",
            method:"post",
            data:qs.stringify(obj)
        })
    }

// ===============================end=======================================


// ==============================菜单管理=================================

// 添加
export let menuAddUrl = (user) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: qs.stringify(user)
    })

}
//列表
export const menuListUrl = () => {
    return axios({
        url: baseUrl + "/api/menulist",
        params: {
            istree: true
        }
    })
}
//删除
export const menuDelUrl = (obj) => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: qs.stringify(obj)
    })
}
//菜单获取（一条）
export const menuDetailUrl = (id) => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        params: {
            id: id
        }
    })
}
//编辑
export const menuEditUrl = (obj) => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: qs.stringify(obj)
    })
}
// ================================end====================================

//=================================角色管理================================

//获取列表
export const roleListUrl = () => {
    return axios({
        url: baseUrl + "/api/rolelist",
    })
}
//添加
export const roleAddUrl = (obj) => {
    return axios({
        url: baseUrl + "/api/roleadd",
        method: "post",
        data: qs.stringify(obj)
    })
}
//删除
export const roleDelUrl = (obj) => {
    return axios({
        url: baseUrl + "/api/roledelete",
        method: "post",
        data: qs.stringify(obj)
    })
}
// 获取一条数据
export const roleDetailUrl = (id) => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        params: {
            id: id
        }
    })
}
//修改
export const roleEditUrl = (obj) => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: "post",
        data: qs.stringify(obj)
    })
}

//===================================end==================================

//==================================管理员管理=======================

//列表
export const manageListUrl = (obj) => {
    return axios({
        url: baseUrl + "/api/userlist",
        params: obj
    })
}
//添加
export const manageAddUrl = (obj) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: "post",
        data: qs.stringify(obj)
    })
}
//删除
export const manageDelUrl = (obj) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify(obj)
    })
}
//获取详情
export const manageDetailUrl = (uid) => {
    return axios({
        url: baseUrl + "/api/userinfo",
        params: {
            uid: uid
        }
    })
}
//修改
export const manageEditUrl = (obj) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data: qs.stringify(obj)
    })
}
//获取分页条目总数
export const managePagingUrl = () => {
    return axios({
        url: baseUrl + "/api/usercount",
    })
}
//==================================end=====================
//==================================商品分类=====================
// 添加
export const cateAddUrl = (obj) => {
    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: dataFormData(obj)
    })
}
//列表
export const cateListUrl = (obj) => {
    return axios({
        url: baseUrl + "/api/catelist",
        params: obj
    })
}
//获取一条数据的详情
export const cateDetailUrl = (id) => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        params: {
            id: id
        }
    })
}
//修改
export const cateEditUrl = (obj) => {
    return axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data: dataFormData(obj)
    })
}
//删除
export const cateDelUrl = (obj) => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: qs.stringify(obj)
    })
}
//==================================end=====================


//==================================轮播图=====================

//列表
export const bannerListUrl = () => {
    return axios({
        url: baseUrl + "/api/bannerlist",
    })
}
// 添加
export const bannerAddUrl = (obj) => {
    return axios({
        url: baseUrl + "/api/banneradd",
        method: "post",
        data: dataFormData(obj)
    })
}
// 获取详情
export const bannerDetailUrl = (id) => {
    return axios({
        url: baseUrl + "/api/bannerinfo",
        params: {
            id: id
        }
    })
}
// 删除
export const bannerDelUrl = (obj) => {
    return axios({
        url: baseUrl + "/api/bannerdelete",
        method: "post",
        data: qs.stringify(obj)
    })
}
// 编辑
export const bannerEditUrl = (obj) => {
    return axios({
        url: baseUrl + "/api/banneredit",
        method: "post",
        data: dataFormData(obj)
    })
}

//==================================end=====================



//==================================会员管理=====================

// 获取列表
export const memberListUrl = () => {
    return axios({
        url: baseUrl + "/api/memberlist",
    })
}
//详情
export const memberDetailUrl = (obj) => {
    return axios({
        url: baseUrl + "/api/memberinfo",
        params: obj
    })
}
// 编辑
export const memberEditUrl = (obj) => {
    return axios({
        url: baseUrl + "/api/memberedit",
        method: "post",
        data: qs.stringify(obj)
    })
}
//==================================end=====================


//==================================商品规格=====================

// 添加
export const specsAddUrl = (obj) => {
    return axios({
        url: baseUrl + '/api/specsadd',
        method: "post",
        data: qs.stringify(obj)
    })
}
// 列表
export const specsListUrl = (obj) => {
    return axios({
        url: baseUrl + "/api/specslist",
        params: obj
    })
}
// 获取详情
export const specsDetailUrl = (obj) => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        params: obj
    })
}
// 删除
export const specsDelUrl = (obj) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify(obj)
    })
}
// 编辑
export const specsEditUrl = (obj) => {
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(obj)
    })
}
// 分页总数
export const specsPagingUrl = () => {
    return axios({
        url: baseUrl + "/api/specscount",
    })
}


//==================================end=====================


//==================================商品管理=====================

// 添加
export const goodsAddUrl = (obj) => {
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: dataFormData(obj)
    })
}
// 列表
export const goodsListUrl = (obj) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        params: obj
    })
}
// 分页总数
export const goodsPagingUrl = () => {
    return axios({
        url: baseUrl + "/api/goodscount",
    })
}
// 一条数据详情
export const goodsDetailUrl = (obj) => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        params: obj
    })
}
// 删除
export const goodsDelUrl = (obj) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify(obj)
    })
}
// 修改
export const goodsEditUrl = (obj) => {
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: dataFormData(obj)
    })
}
//==================================end=====================

//==================================秒杀活动=====================

// 添加
export const seckillAddUrl=(obj)=>{
    return axios({
        url:baseUrl+"/api/seckadd",
        method:"post",
        data:qs.stringify(obj)
    })
}
// 列表
export const seckillListUrl=()=>{
    return axios({
        url:baseUrl+"/api/secklist",
    })
}
// 获取详情
export const seckillDetailUrl=(obj)=>{
    return axios({
        url:baseUrl+"/api/seckinfo",
        params:obj
    })
}
// 删除
export const seckillDelUrl=(obj)=>{
    return axios({
        url:baseUrl+"/api/seckdelete",
        method:"post",
        data:qs.stringify(obj)
    })
}
// 编辑
export const seckillEdit=(obj)=>{
    return axios({
        url:baseUrl+"/api/seckedit",
        method:"post",
        data:qs.stringify(obj)
    })
}


//==================================end=====================