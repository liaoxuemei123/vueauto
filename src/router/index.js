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
import Evaluate from 'pages/Evaluate';
import EvaluateDetail from 'pages/EvaluateDetail';
import Login from 'pages/Login';
import Register from 'pages/Register';
import ViewStore from 'pages/ViewStore';
import Refund from 'pages/Refund';
import TestSwiper from 'pages/TestSwiper';

Vue.use(Router)

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else {
    const position = {}
    // new navigation.
    // scroll to anchor by returning the selector
    if (to.hash) {
      position.selector = to.hash
    }
    // check if any matched route config has meta that requires scrolling to top
    if (to.matched.some(m => m.meta.scrollToTop)) {
      position.x = 0
      position.y = 0
    }
    return position
  }
}

export default new Router({
  scrollBehavior,
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
      path:'/viewstore',
      name:'viewstore',
      component:ViewStore,
    },
    {
      path:'/maintainset',
      name:'maintainset',
      component:MaintainSet,
    },
    {
      path:'/setdetail/:id',
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
      path:'/orderpay/:id',
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
    },
    {
      path:'/evaluate',
      name:'evaluate',
      component:Evaluate,
    },
    {
      path:'/evaluatedetail',
      name:'evaluatedetail',
      component:EvaluateDetail,
    },
    {
      path:'/register',
      name:'register',
      component:Register,
    },
    {
      path:'/login',
      name:'login',
      component:Login,
    },
    {
      path:'/refund/:id',
      name:'refund',
      component:Refund,
    },
    {
      path:'/testswiper',
      name:'testswiper',
      component:TestSwiper,
    }
  ]
})
