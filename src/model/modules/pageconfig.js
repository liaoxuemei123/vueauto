/**
 * 产品配置
 */
const state = {
    type:'',//业务类型
    setting:[],//页面设置
    config:{}//业务配置
}

const mutations = {
    SET_CONFIG:function(state,params){//设置业务配置
        for(var props in params){
            state.config[props] = params[props];
        }
    }
}

export default {
    state,
    mutations
}