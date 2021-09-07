import Vue from 'vue'
import Router from 'vue-router'
import Download from './pages/Download'

Vue.use(Router)

export default new Router({
  base: "/",
  routes: [{
      path: '/Download',
      name: 'Download',
      component: Download,
      meta: {
        title: '下载',
        requireAuth: true
      }
    },



  ]
})