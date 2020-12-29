import { specsListUrl, specsPagingUrl } from '../../utils/http'
let state = {
    specslist: [],
    // 当前的页码
    page: 1,
    // 总数
    total: 0,
    // 一页的数量
    size: 2
}

let mutations = {
    changeList(state, arr) {
        state.specslist = arr;
    },
    changeTotal(state, num) {
        state.total = num;
    },
    changePage(state, pag) {
        state.page = pag;
    }
}

let getters = {
    specslist(state) {
        return state.specslist
    },
    total(state) {
        return state.total
    },
    size(state) {
        return state.size
    }
}

let actions = {
    // 获取列表
    obtainList(context, bool) {
        let params = bool ? {} : { page: context.state.page, size: context.state.size }

        specsListUrl(params).then(res => {
            if (res.data.code === 200) {
                if (res.data.list.length === 0 && context.state.page > 1) {
                    context.commit("changePage", context.state.page - 1);
                    context.dispatch("obtainList");
                    return
                }

                let list = res.data.list;
                list.forEach(item => {
                    item.attrs = JSON.parse(item.attrs);
                });
                context.commit("changeList", list)
            }
        })
    },
    // 获取总数
    obtainTotal(context) {
        specsPagingUrl().then(res => {
            if (res.data.code === 200) {
                context.commit("changeTotal", res.data.list[0].total)
            }
        })
    },
    // 修改page
    changePage(context, num) {
        context.commit("changePage", num);
        context.dispatch('obtainList')
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}