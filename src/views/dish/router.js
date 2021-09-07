import Vue from 'vue'
import Router from 'vue-router'
import i18n from '../../utils/i18n'

Vue.use(Router)

export default new Router({
  base: "/",
  routes: [{
      path: '/search',
      name: 'search',
      component: ()=>import('./pages/Search'),
      meta: {
        title: i18n.t('dishSeach'),
        requireAuth: true
      }
    },
    {
      path: '/orderhistory',
      name: 'orderhistory',
      component: ()=>import('./pages/OrderHistory'),
      meta: {
        title: i18n.t('dishDianguo'),
        requireAuth: true
      }
    },
    {
      path: '/hotDish',
      name: 'hotDish',
      component: ()=>import('./pages/hotDish'),
      meta: {
        title: i18n.t('dishChangdian'),
        requireAuth: true
      }
    },



  ]
})