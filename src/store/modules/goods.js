import { goodsListUrl, goodsPagingUrl } from '../../utils/http'
let state = {
    list: [],
    // 分页总数
    total: 0,
    // 当前页数
    page: 1,
    // 每页显示
    size: 2
}

let mutations = {
    changeList(state, arr) {
        state.list = arr
    },
    changePage(state, arr) {
        state.page = arr
    },
    changeTotal(state, arr) {
        state.total = arr
    }
}

let getters = {
    list(state) {
        return state.list;
    },
    total(state) {
        return state.total;
    },
    size(state) {
        return state.size;
    }
}

let actions = {
    obtainList(context, bool) {
        let params = bool ? {} : { page: context.state.page, size: context.state.size }
        goodsListUrl(params).then(res => {
            if (res.data.code == 200) {
                // 删除最后一页的最后一个
                if (res.data.list.length === 0 && context.state.page > 1) {
                    context.commit("changePage", context.state.page - 1)
                    context.dispatch("obtainList")
                    return
                }

                context.commit("changeList", res.data.list);
            }
        })
    },
    // 获取总数
    obtainTotal(context) {
        goodsPagingUrl().then(res => {
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