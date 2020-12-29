import { cateListUrl } from '../../utils/http'
let state = {
    // 初始值
    list: [],
}

let mutations = {
    // 修改catelist
    changeList(state, arr) {
        state.list = arr
    }
}

let getters = {
    // 导处list
    list(state) {
        return state.list
    }
}

let actions = {
    // 处理catelist逻辑
    obtainList(context) {
        cateListUrl({ istree: true }).then(res => {
            // console.log(res);
            if (res.data.code === 200) {
                context.commit("changeList", res.data.list);
            }
        });
    }
}


export default {
    state,
    mutations,
    actions,
    getters,
    //命名空间
    namespaced:true
}