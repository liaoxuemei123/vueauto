import Vue from 'vue';
import Vuex from 'vuex';
import Tool from '../utils/Tool'
Vue.use(Vuex)

const subscribeDefault = {
    carInfo:{
        plate:'',
        seriesName:'',
        vehicleTypeId:'',
    },
    time:'',
    showTime:'',
    fcmc:'',
    storeInfo:{
        id:'',
        storeName:'',
    },
    mile:'',
    contact:'',
    phone:'',
    description:''
}

const store = new Vuex.Store({
    state:{
        pageStack:[],
        mode:'push',
        subscribeInfo:subscribeDefault,
        geolocation:{
            point:{
                lat:29.579185,
                lon:106.55419
            },
            address:{}
        },
        packageInfo:{
            modelInfo:{},
            setInfo:{},
            setDetail:{}
        },
    },
    mutations:{
        SET_MODE:function(state,mode){
            state.mode = mode;
        },
        PUSH_PAGE:function(state,page){
            state.pageStack.push(page);
        },
        POP_PAGE:function(state,number = 0){
            for(var i=0;i<number;i++){
                 state.pageStack.pop();
            }
        },
        CLEAR_PAGE:function(state){
            state.pageStack = [{name:'/',index:0}];
        },
        updateSubscribeInfo:function(state,params){
            var keys = Object.keys(params)
            for(var i = 1; i < keys.length; i ++){
                state.subscribeInfo[keys[i]] = keys[keys[i]];//把params中可枚举的属性复制给state;
            }
        },
        SET_LOCATION:function(state,params){
            state.geolocation.address = params.address;
            state.geolocation.point.lat = params.latitude;
            state.geolocation.point.lon = params.longitude;
        },
        SET_SUBCARINFO:function(state,params){
            state.subscribeInfo.carInfo.plate = params.plate;
            state.subscribeInfo.carInfo.seriesName = params.seriesName;
            state.subscribeInfo.carInfo.vehicleTypeId = params.vehicleTypeId;
        },
        SET_SUBSTOREINFO:function(state,params){
            state.subscribeInfo.storeInfo.id = params.id;
            state.subscribeInfo.storeInfo.storeName = params.storeName;
        },
        RESET_SUBSCRIBE:function(state){
            Tool.removeObject(state.subscribeInfo);
        },
        SET_PACKAGE_MODEL:function(state,param){
            state.packageInfo.modelInfo = param;
        },
        SET_PACKAGE_SETINFO:function(state,param){
            state.packageInfo.setInfo = param;
            console.log(state.packageInfo.setInfo)
        },
        SET_PACKAGE_SETINFO:function(state,param){
            state.packageInfo.setDetail = param;
            console.log(state.packageInfo.setDetail)
        }
    },
    getters:{
        pageStack:function(state, getters){
            return state.pageStack;
        },
        subscribeInfo:function(state, getters){
            return state.subscribeInfo;
        }
    }

})

export default store;