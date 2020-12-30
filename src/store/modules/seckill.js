import { seckillListUrl } from "../../utils/http";

let state = {
    //列表
    list: [],

}
let mutations = {
    changeList(state, arr) {
        state.list = arr;
    },

}
let getters = {
    list(state) {
        return state.list
    },

}
let actions = {
    //获取list
    obtainList(context) {
        seckillListUrl().then(res => {
            if (res.data.code === 200) {
                context.commit("changeList", res.data.list);
            }
        })
    }
}


export default {
    state, mutations, getters, actions,
    namespaced: true
}