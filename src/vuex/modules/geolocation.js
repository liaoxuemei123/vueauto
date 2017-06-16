/**
 * 定位信息
 */
const state = {
    point:{
        lat:29.579185,
        lon:106.55419
    },
    address:{
        province:'定位',
        city:'失败'
    }
}

const mutations = {
    SET_LOCATION:function(state,params){//设置定位信息
        for(var props in params.address){
            state.address[props] = params.address[props];
        }
        state.point.lat = params.latitude;
        state.point.lon = params.longitude;
    }
}

export default {
    state,
    mutations
}