import Vue from 'vue'
import Router from 'vue-router'
import Code from './pages/Code'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'code',
      component: Code,
      meta: {
        title: '验证码',
        requireAuth: true
      }
    },
    
   
  ]
})
