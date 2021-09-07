
import Vue from 'vue'
import Router from 'vue-router'
import i18n from '../../utils/i18n'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'shopcart',
      component: ()=>import('./pages/shopCart'),
      meta: {
        title: i18n.t('cart'),
        requireAuth: true
      }
    },
    {
      path: '/PlaceOrder',
      name: 'PlaceOrder',
      component: ()=>import('./pages/PlaceOrder'),
      meta: {
        title: i18n.t('dingdan'),
        requireAuth: true
      }
    },
    {
      path: '/payMent',
      name: 'payMent',
      component: ()=>import('./pages/payMent'),
      meta: {
        title: i18n.t('confirmOrder'),
        requireAuth: true
      }
    },
    {
      path: '/ConfirmCheck',
      name: 'ConfirmCheck',
      component: ()=>import('./pages/ConfirmCheck'),
      meta: {
        title: i18n.t('confirmJiezhang'),
        requireAuth: true
      }
    },
    {
      path: '/FinishCheck',
      name: 'FinishCheck',
      component: ()=>import('./pages/FinishCheck'),
      meta: {
        title: i18n.t('shopcart.paySuccess'),
        requireAuth: true
      }
    },
    // {
    //   path: '/Bill',
    //   name: 'Bill',
    //   component: ()=>import('./pages/Bill'),
    //   meta: {
    //     title: i18n.t('orderDetails'),
    //     requireAuth: true
    //   }
    // },
    {
      path: '/Appraise',
      name: 'Appraise',
      component: ()=>import('./pages/Appraise'),
      meta: {
        title: '评价',
        requireAuth: true
      }
    },
    {
      path: '/AppraiseFinish',
      name: 'AppraiseFinish',
      component: ()=>import('./pages/AppraiseFinish'),
      meta: {
        title: '评价完成',
        requireAuth: true
      }
    },
    {
      path: '/couponPage',
      name: 'couponPage',
      component: ()=>import('./pages/couponPage'),
      meta: {
        title: '',
        requireAuth: true
      }
    },
   
  ]
})