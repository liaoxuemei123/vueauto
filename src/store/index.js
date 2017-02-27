import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        pageStack:[],
        mode:'push',
        subscribeInfo:{//预约信息
            plate:'',
            time:'',
            storeId:'',
            mile:'',
            contact:'',
            phone:'',
            description:''
        }
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
            console.log(state.subscribeInfo);
            for(var i = 1; i < keys.length; i ++){
                state.subscribeInfo[keys[i]] = keys[keys[i]];//把params中可枚举的属性复制给state;
            }
            console.log(state.subscribeInfo);
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