
import Vue from 'vue'
import Router from 'vue-router'
import i18n from '../../utils/i18n'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Bill',
      component: ()=>import('./pages/Bill'),
      meta: {
        title: i18n.t('orderDetails'),
        requireAuth: true
      }
    },
  ]
})