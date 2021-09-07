import Vue from 'vue'
import Router from 'vue-router'
import MenuType from './pages/MenuType'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'menutype',
      component: MenuType,
      meta: {
        title: '菜单分类列表',
        requireAuth: true
      }
    },
    
   
  ]
})
