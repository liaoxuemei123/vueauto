import Vue from 'vue';
import Router from 'vue-router';
import Index from 'pages/Index';
import Store from 'pages/Store';
import StoreOrder from 'pages/StoreOrder';
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
import Home from 'pages/Home';
import UserCenter from 'pages/UserCenter';
import Referee from 'pages/Referee';
import WechatH5 from 'pages/WechatH5';

Vue.use(Router)

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    const position = {}
    if (to.hash) {
      position.selector = to.hash
    }
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
      path: '/',//预约-首页
      name: 'index',
      component: Index
    },
    {
      path:'/store',//保养-选择4S店
      name:'store',
      component:Store,
    },
    {
      path:'/storeorder',//预约-选择4S店
      name:'storeorder',
      component:StoreOrder,
    },
    {
      path:'/viewstore',//保养-查看4S店
      name:'viewstore',
      component:ViewStore,
    },
    {
      path:'/setdetail/:id',//保养-套餐详情
      name:'setdetail',
      component:SetDetail,
    },
    {
      path:'/personinfo',//保养-用户信息
      name:'personinfo',
      component:PersonInfo,
    },
    {
      path:'/confirmorder',//保养-套餐购买确认
      name:'confirmorder',
      component:ConfirmOrder,
    },
    {
      path:'/orderpay/:id',//保养-订单支付
      name:'orderpay',
      component:OrderPay,
    },
    {
      path:'/myorder',//保养-我的订单
      name:'myorder',
      component:MyOrder,
    },
    {
      path:'/orderdetail/:id',//保养-订单详情
      name:'orderdetail',
      component:OrderDetail,
    },
    {
      path:'/selectplate',//预约-选择车牌
      name:'selectplate',
      component:SelectPlate,
    },
    {
      path:'/orderhistory',//预约-预约历史
      name:'orderhistory',
      component:OrderHistory,
    },
    {
      path:'/evaluate',//保养-评价
      name:'evaluate',
      component:Evaluate,
    },
    {
      path:'/evaluatedetail',//保养-查看评价
      name:'evaluatedetail',
      component:EvaluateDetail,
    },
    {
      path:'/register',//保养-注册
      name:'register',
      component:Register,
    },
    {
      path:'/login',//保养-登录
      name:'login',
      component:Login,
    },
    {
      path:'/refund/:id',//保养-退款
      name:'refund',
      component:Refund,
    },
    {
      path:'/testswiper',//测试页面
      name:'testswiper',
      component:TestSwiper,
    },
    {
      path:'/usercenter',//保养-用户中心
      name:'usercenter',
      component:UserCenter
    },
    {
      path:'/maintainset',//保养-首页
      name:'maintainset',
      component:Home
    },
    {
      path:'/referee',//保养-推荐人
      name:'referee',
      component:Referee
    },
    {
      path:'/wechath5',//保养-h5支付
      name:'wechath5',
      component: WechatH5,
    }
  ]
})
