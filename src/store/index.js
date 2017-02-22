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
            state.pageStack.push(options.path);
            state.mode = 'push';
            options.vue.$router.push(options.path);
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