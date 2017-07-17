/**
 * 产品配置
 */
const state = {
    type:'',//业务类型
    setting:[],//页面设置
    config:{},//业务配置
    currentBis:{},//选中的业务
    qd:'',//渠道
}

const mutations = {
    SET_CONFIG:function(state, params){//设置业务配置
        for(var props in params) {
            state.config[props] = params[props];
        }
    },
    SET_CURRENT_BIS:function(state, params){//设置选中的业务
        for(var props in params) {
            state.currentBis[props] = params[props];
        }
    },
    SET_QD:function(state,param){//设置渠道
        state.qd = param
    }
}

export default {
    state,
    mutations
}