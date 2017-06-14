import Vue from 'vue';
import Vuex from 'vuex';
import Tool from '../utils/Tool';
Vue.use(Vuex)

const subscribeDefault = {
    carInfo:{
        plate:'',
        seriesName:'',
        vehicleTypeId:'',
        modelName:'',
        mileage:'',
        vin:'',
        lqsq:'',
    },
    time:'',
    showTime:'',
    fcmc:{
        exchange:[],
        check:[],
    },
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
        pickerModel:'',
        packageInfo:{
            modelInfo:{},
            setInfo:{},
            setDetail:{},
            storeInfo:{},
            userInfo:{},
        },
        reset:true,
        load:false,
        carCasCade:{},
        bisinessType:'',
        bisinessConfig:{},
        pageSetting:[],
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
            state.subscribeInfo.carInfo.lqsq = params.lqsq;
        },
        SET_SUBSTOREINFO:function(state,params){
            state.subscribeInfo.storeInfo.id = params.id;
            state.subscribeInfo.storeInfo.storeName = params.storeName;
        },
        RESET_SUBSCRIBE:function(state){
            Tool.removeObject(state.subscribeInfo);
        },
        SET_PACKAGE_MODEL:function(state,param){
            for(var props in param){
                state.packageInfo.modelInfo[props] = param[props];
            }
        },
        SET_PACKAGE_SETINFO:function(state,param){
            for(var props in param){
                state.packageInfo.setInfo[props] = param[props];
            }
        },
        SET_PACKAGE_SETDETAIL:function(state,param){
            for(var props in param){
                state.packageInfo.setDetail[props] = param[props];
            }
        },
        SET_RESET_FLAS:function(state,bool){
            state.packageInfo.reset = bool;
        },
        SET_PACKAGE_STOREINFO:function(state,param){
            if($.isEmptyObject(param)){
                state.packageInfo.storeInfo = {};
            }else{
                for(var props in param){
                    state.packageInfo.storeInfo[props] = param[props];
                }
            }
        },
        SET_PACKAGE_USERINFO:function(state,param){
            for(var props in param){
                state.packageInfo.userInfo[props] = param[props];
            }
        },
        LOAD_DOWN:function(state){
            state.load = false;
        },
        LOADING:function(state){
            state.load = true;
        },
        UPDATE_CAR_CASECADE(state,param){
            state.carCasCade = param
        },
        UPDATE_PICKERMODEL(state,param){
            state.pickerModel = param;
        },
        SET_BISINESS_TYPE(state,param){
            state.bisinessType = param;
        },
        SET_BISINESS_CONFIG(state,param){
            for(var props in param){
                state.bisinessConfig[props] = param[props];
            }
        },
        SET_PAGE_CONFIG(state,param){
            for(var props in param){
                state.pageSetting[props] = param[props];
            }
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
        },
        packageInfo:function(state,getters){
            return state.packageInfo;
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