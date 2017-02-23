import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        pageStack:['/'],
        mode:'push',
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
        }
    },

})

export default store;