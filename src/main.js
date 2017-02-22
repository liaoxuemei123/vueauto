import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import './js/jquery.js';
import 'flex.css';
import 'normalize.css';
import './style/iconfont.less';

document.documentElement.style.fontSize = document.documentElement.clientWidth/640*40+"px";
$(window).on("resize",function(){//当窗口发生变化时更新字体大小
  document.documentElement.style.fontSize = document.documentElement.clientWidth/640*40+"px";
})

new Vue({
  el: '#pagecontainer',
  router,
  store,
  template: '<App/>',
  components: { App }
})
