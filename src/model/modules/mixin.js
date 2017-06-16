/**
 * 杂项数据
 */
const state = {
    reset:true,
    load:false,
}

const mutations = {
    UPDATE_RESET:function(state,bool){//配置详情页的信息是否重置
        state.reset = bool;
    }
}

export default {
    state,
    mutations
}