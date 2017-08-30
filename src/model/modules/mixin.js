/**
 * 杂项数据
 */
const state = {
    reset: true,
    load: false,
    orderUnPayCount: 0,//未支付订单的数量
    getedVehiche: false,
}

const mutations = {
    UPDATE_RESET:function(state,bool){//配置详情页的信息是否重置
        state.reset = bool;
    },
    UPDATE_ORDERCOUNT: function(state,count) {
        state.orderUnPayCount = count;
    },
    UPDATE_GETEDVEHICHE: function(state,bool) {//是否获取过默认车辆
        state.getedVehiche = bool;
    }
}

export default {
    state,
    mutations
}