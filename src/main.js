import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import './js/jquery.js';
import 'flex.css';
import 'normalize.css';
import './style/base.css';
import './style/iconfont.less';
Vue.use(MintUI);

import Tool from './utils/Tool'

document.documentElement.style.fontSize = document.documentElement.clientWidth/640*40+"px";
$(window).on("resize",function(){//当窗口发生变化时更新字体大小
  document.documentElement.style.fontSize = document.documentElement.clientWidth/640*40+"px";
})

router.beforeEach((to,from,next)=>{
  const pageStack = store.getters.pageStack;
  const toIndex = getIndex(pageStack, to.path);
  const toPath = to.path;
  Tool.clearRequestPool();//切换页面的时候把上一个页面的请求全部中断掉
  if(toIndex == -1){
    store.commit('SET_MODE','push');
    store.commit('PUSH_PAGE',{path:toPath,index:pageStack.length});
  }else if(toIndex === -2){
    store.commit('SET_MODE','pop');
    store.commit('CLEAR_PAGE');//保证把前面的页面全部弹出页面栈
  }else{
    store.commit('SET_MODE','pop');
    store.commit('POP_PAGE',pageStack.length - toIndex - 1);
  }
  next();
})

function getIndex (list,path){
  if(path == '/' || !path){
    return -2;
  }
  for(var i = 0; i < list.length; i++){
    if(path == list[i].path){
      return i;
    }
  }
  return -1;
}

new Vue({
  el: '#pagecontainer',
  router,
  store,
  template: '<App/>',
  components: { App }
})
