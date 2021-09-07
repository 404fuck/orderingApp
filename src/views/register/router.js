import Vue from 'vue'
import Router from 'vue-router'
import Register from './pages/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'register',
      component: Register,
      meta: {
        title: '注册',
        requireAuth: true
      }
    },
    
   
  ]
})
