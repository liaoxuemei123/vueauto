import geolocation from './modules/geolocation';
import mixin from './modules/mixin';
import packageinfo from './modules/packageinfo';
import pageconfig from './modules/pageconfig';
import routes from './modules/routes';
import subscribe from './modules/subscribe';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    modules:{
        geolocation,
        mixin,
        packageinfo,
        pageconfig,
        routes,
        subscribe
    }
});
export default store;