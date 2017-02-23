import Vue from 'vue';
import Router from 'vue-router';
import Index from 'pages/Index';
import Store from 'pages/Store';
import MaintainSet from 'pages/MaintainSet';
import SetDetail from 'pages/SetDetail';
import PersonInfo from 'pages/PersonInfo';
import ConfirmOrder from "pages/ConfirmOrder";
import OrderPay from 'pages/OrderPay';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path:'/store',
      name:'store',
      component:Store,
    },
    {
      path:'/maintainset',
      name:'maintainset',
      component:MaintainSet,
    },
    {
      path:'/setdetail',
      name:'setdetail',
      component:SetDetail,
    },
    {
      path:'/personinfo',
      name:'personinfo',
      component:PersonInfo,
    },
    {
      path:'/confirmorder',
      name:'confirmorder',
      component:ConfirmOrder,
    },
    {
      path:'/orderpay',
      name:'orderpay',
      component:OrderPay,
    },
  ]
})
