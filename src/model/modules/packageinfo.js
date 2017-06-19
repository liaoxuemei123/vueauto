/**
 * 套餐信息
 */
const state = {
    modelInfo: {},              //车型信息
    setInfo: {},                //套餐信息
    setDetail: {},              //套餐详情
    storeInfo: {},              //店铺信息
    userInfo: {},               //用户信息
    carList: {},                //车辆列表
    refereeStore: {},           //推荐店铺信息
}

const mutations = {
    SET_STORE_INFO:function(state, params){//设置购买套餐的店铺信息
        if($.isEmptyObject( params )){
            state.storeInfo = {};
        }else{
            for(var props in params){
                state.storeInfo[props] = params[props];
            }
        }
    },
    UPDATE_USER_INFO:function(state, params){//设置购买套餐的用户信息
        if($.isEmptyObject( params )){
            state.userInfo = {};
        }else{
            for(var props in params){
                state.userInfo[props] = params[props];
            }
        }
    },
    SET_CARLIST:function( state, params){//设置可选车型列表
        state.carList = params;
    },
    SET_MODULE_INFO:function(state, params){//设置购买套餐的车型信息
        if($.isEmptyObject( params )){
            state.modelInfo = {};
        }else{
            for(var props in params){
                state.modelInfo[props] = params[props];
            }
        }
    },
    SET_SETINFO:function( state, params ){//设置套餐信息
        if($.isEmptyObject( params )){
            state.setInfo = {};
        }else{
            for(var props in params){
                state.setInfo[props] = params[props];
            }
        }
    },
    SET_SETDETAIL:function( state, params ){//设置套餐详情
        if($.isEmptyObject( params )){
            state.setDetail = {};
        }else{
            for(var props in params){
                state.setDetail[props] = params[props];
            }
        }
    },
    SET_REFEREE_STOREINFO:function( state, params ) {
        if($.isEmptyObject( params )){
            state.refereeStore = {};
        }else{
            for(var props in params){
                state.refereeStore[props] = params[props];
            }
        }
    }
}

export default {
    state,
    mutations
}