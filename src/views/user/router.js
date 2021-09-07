import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
 
  routes: [
    {
      path: '/',
      name: 'main',
      component: ()=>import('./pages/layout/Layout.vue'),
      meta: {
        title: '首页',
        requireAuth: true
      }
    },
   
  ]
})
