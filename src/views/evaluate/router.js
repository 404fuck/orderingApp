import Vue from 'vue'
import Router from 'vue-router'
import Evaluate from './pages/Evaluate'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'evaluate',
      component: Evaluate,
      meta: {
        title: '评价',
        requireAuth: true
      }
    },
    
   
  ]
})
