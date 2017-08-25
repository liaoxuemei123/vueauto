import geolocation from './modules/geolocation';
import mixin from './modules/mixin';
import packageinfo from './modules/packageinfo';
import pageconfig from './modules/pageconfig';
import routes from './modules/routes';
import subscribe from './modules/subscribe';
import Vue from 'vue';
import Vuex from 'vuex';

/**
 * 状态管理，按模块划分
 */
Vue.use(Vuex);
const store = new Vuex.Store({
    modules:{
        geolocation,//定位
        mixin,//杂项
        packageinfo,//套餐信息
        pageconfig,//页面配置
        routes,//路由控制
        subscribe//预约
    }
});
export default store;