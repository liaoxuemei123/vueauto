/**
 * 杂项数据
 */
const state = {
    reset: true,
    load: false,
    orderUnPayCount: 0,//未支付订单的数量
}

const mutations = {
    UPDATE_RESET:function(state,bool){//配置详情页的信息是否重置
        state.reset = bool;
    },
    UPDATE_ORDERCOUNT: function(state,count) {
        state.orderUnPayCount = count;
    }
}

export default {
    state,
    mutations
}