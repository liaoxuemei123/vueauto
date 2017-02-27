import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import './js/jquery.js';
import 'flex.css';
import 'normalize.css';
import './style/iconfont.less';

Vue.use(MintUI);

document.documentElement.style.fontSize = document.documentElement.clientWidth/640*40+"px";
$(window).on("resize",function(){//当窗口发生变化时更新字体大小
  document.documentElement.style.fontSize = document.documentElement.clientWidth/640*40+"px";
})

router.beforeEach((to,from,next)=>{
  const pageStack = store.getters.pageStack;
  const toIndex = getIndex(pageStack, to.path);
  const toPath = to.path;
  if(toIndex < 0){
    store.commit('SET_MODE','push');
    store.commit('PUSH_PAGE',{path:toPath,index:pageStack.length});
  }else{
    store.commit('SET_MODE','pop');
    store.commit('POP_PAGE');
  }
  next();
})

function getIndex (list,path){
  if(path == '/' || !path){
    return 0;
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
