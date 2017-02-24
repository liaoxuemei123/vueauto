import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        pageStack:['/'],
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
        pushPage:function(state,options){
            state.pageStack.push(options.name);
            state.mode = 'push';
            if(options.params){
                options.vue.$router.push({name:options.name,params:options.params});
            }else{
                options.vue.$router.push({name:options.name});
            }
           
        },
        popPage:function(state,vue){
            state.pageStack.pop();
            state.mode = 'pop';
            if(state.pageStack.length >= 0){
                vue.$router.go(-1);
            }
        },
        updateSubscribeInfo:function(state,params){
            var keys = Object.keys(params)
            for(var i = 1; i < keys.length; i ++){
                state.subscribeInfo[keys[i]] = keys[keys[i]];//把params中可枚举的属性复制给state;
            }
        }
    },

})

export default store;