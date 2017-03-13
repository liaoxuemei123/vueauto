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
            setDetail:{},
            storeInfo:{},
            userInfo:{},
        },
        reset:true,
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
        },
        SET_PACKAGE_SETDETAIL:function(state,param){
            state.packageInfo.setDetail = param;
        },
        SET_RESET_FLAS:function(state,bool){
            state.packageInfo.reset = bool;
        },
        SET_PACKAGE_STOREINFO:function(state,param){
            state.packageInfo.storeInfo = param;
        },
        SET_PACKAGE_USERINFO:function(state,param){
            state.packageInfo.userInfo = param;
        }
    },
    getters:{
        pageStack:function(state, getters){
            return state.pageStack;
        },
        subscribeInfo:function(state, getters){
            return state.subscribeInfo;
        },
        prepage:function(state,getters){
            return state.pageStack;
        }
    }

})

export default store;