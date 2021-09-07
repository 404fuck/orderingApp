import Vue from 'vue'
import Router from 'vue-router'
import memberCenter from './pages/memberCenter'
import login from './pages/login'
import memberBill from './pages/memberBill'
import memberIntegral from './pages/memberIntegral'
import memberInfo from './pages/memberInfo'
import allOrder from './pages/allOrder'
import allCoupon from './pages/allCoupon'
import allComments from './pages/allComments'
import i18n from '../../utils/i18n'

Vue.use(Router)

export default new Router({
  base: "/",
  routes: [{
      path: '/index',
      name: 'login',
      component: login,
      meta: {
        title: '会员登录',
        requireAuth: true
      }
    },

    {
      path: '/memberCenter',
      name: 'memberCenter',
      component: memberCenter,
      meta: {
        title: '会员中心',
        requireAuth: true
      }
    },
    {
      path: '/memberBill',
      name: 'memberBill',
      component: memberBill,
      meta: {
        title: '账单',
        requireAuth: true
      }
    },
    {
      path: '/memberIntegral',
      name: 'memberIntegral',
      component: memberIntegral,
      meta: {
        title: '积分详情',
        requireAuth: true
      }
    },
    {
      path: '/memberInfo',
      name: 'memberInfo',
      component: memberInfo,
      meta: {
        title: '会员资料',
        requireAuth: true
      }
    },
    {
      path: '/allComments',
      name: 'allComments',
      component: allComments,
      meta: {
        title: '我的点评',
        requireAuth: true
      }
    },
    {
      path: '/allCoupon',
      name: 'allCoupon',
      component: allCoupon,
      meta: {
        title: '优惠券',
        requireAuth: true
      }
    },
    {
      path: '/allOrder',
      name: 'allOrder',
      component: allOrder,
      meta: {
        title: '我的订单',
        requireAuth: true
      }
    },
  ]
})