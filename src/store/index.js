import Vue from 'vue';
import Vuex from 'vuex';
import Tool from '../utils/Tool'
Vue.use(Vuex)

const subscribeDefault = {
    carInfo:{
        plate:'',
        seriesName:'',
        vehicleTypeId:'',
        modelName:'',
        mileage:'',
        vin:'',
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
            address:{
                province:'定位',
                city:'失败'
            }
        },
        packageInfo:{
            modelInfo:{},
            setInfo:{},
            setDetail:{},
            storeInfo:{},
            userInfo:{},
        },
        reset:true,
        load:false,
    },
    mutations:{
        SET_MODE:function(state,mode){
            state.mode = mode;
        },
        PUSH_PAGE:function(state,page){
            state.pageStack.push(page);
        },
        INSERT_PAGE:function(state,page,index){//往栈中插入一个页面。
            state.pageStack.splice(index,0,page);
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
            state.subscribeInfo.carInfo.vin = params.vin;
            state.subscribeInfo.carInfo.mileage = params.mileage;
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
        },
        LOAD_DOWN:function(state){
            state.load = false;
        },
        LOADING:function(state){
            state.load = true;
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
            return state.pageStack[state.pageStack.length - 2];
        }
    },
    actions:{
        loadDown:function({commit,dispatch}){
            commit('LOAD_DOWN');
        },
        loading:function({commit,dispatch}){
            commit('LOADING');
        }
    },
    plugins:[
        (function(){
            return store => {
                store.subscribe(mutation=>{
                    if(mutation.type == 'LOADING'){
                        //console.log('数据加载中');
                    }
                    if(mutation.type == 'LOAD_DOWN'){//监听数据加载是否完成，可以写一些依赖于数据加载的方法
                        //console.log('本页数据加载完成');
                    }
                })
            }
        })()
    ]
})

export default store;