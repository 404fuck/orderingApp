import Vue from 'vue'
import user from './user.vue'
import router from './router'
import store from '../../store'

Vue.config.productionTip = false

// Internationalization
import i18n from '../../utils/i18n'

new Vue({
  router,
  store,
  i18n,
  render: h => h(user)
}).$mount('#app')