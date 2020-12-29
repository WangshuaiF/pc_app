import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import {actions} from './actions';
import {state,getters,mutations} from './mutations'

import specs from './modules/specs'
import cate from './modules/cate'
import goods from './modules/goods'

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:{
        specs,
        cate,
        goods
    }
})