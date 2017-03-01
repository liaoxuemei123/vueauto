import Vue from 'vue';
import Router from 'vue-router';
import Index from 'pages/Index';
import Store from 'pages/Store';
import MaintainSet from 'pages/MaintainSet';
import SetDetail from 'pages/SetDetail';
import PersonInfo from 'pages/PersonInfo';
import ConfirmOrder from "pages/ConfirmOrder";
import OrderPay from 'pages/OrderPay';
import MyOrder from 'pages/MyOrder';
import OrderDetail from 'pages/OrderDetail';
import SelectPlate from 'pages/SelectPlate';
import OrderHistory from 'pages/OrderHistory';

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
    {
      path:'/myorder',
      name:'myorder',
      component:MyOrder,
    },
    {
      path:'/orderdetail/:id',
      name:'orderdetail',
      component:OrderDetail,
    },
    {
      path:'/selectplate',
      name:'selectplate',
      component:SelectPlate,
    },
    {
      path:'/orderhistory',
      name:'orderhistory',
      component:OrderHistory,
    }
  ]
})
