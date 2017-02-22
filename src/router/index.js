import Vue from 'vue'
import Router from 'vue-router'
import Index from 'pages/Index'
import Store from 'pages/Store'
import MaintainSet from 'pages/MaintainSet'

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
  ]
})
