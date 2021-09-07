import Vue from 'vue'
import index from './index.vue'
import router from './router'
import store from '../../store'

//http请求
import {
  request
} from './config/http'
Vue.prototype.request = request
//字符工具类
import {
  stringutils
} from '../../utils/stringutils'
Vue.prototype.stringutils = stringutils

import {
  toast
} from '../../utils/toast'
Vue.prototype.toast = toast

import {
  Button,
  Cell,
  Tabbar,
  NavBar,
  TabbarItem,
  Swipe,
  SwipeItem,
  Lazyload,
  PullRefresh,
  List,
  NoticeBar,
  Card,
  Collapse,
  CollapseItem,
  Field,
  CellGroup,
  Dialog,
  Notify,
  AddressEdit,
  Icon,
  AddressList
} from 'vant';

Vue.use(Button)
  .use(Cell)
  .use(Tabbar)
  .use(NavBar)
  .use(TabbarItem)
  .use(Swipe)
  .use(SwipeItem)
  .use(Lazyload, {
    loading: require('../../style/images/defaultImg.png'),//加载中图片，一定要有，不然会一直重复加载占位图
    error: require('../../style/images/defaultImg.png')  //加载失败图片
})
  .use(PullRefresh)
  .use(List)
  .use(NoticeBar)
  .use(Card)
  .use(Collapse)
  .use(CollapseItem)
  .use(Field)
  .use(CellGroup)
  .use(Dialog)
  .use(Notify)
  .use(Icon)
  .use(AddressList)
  .use(AddressEdit)
Vue.config.productionTip = false

// Internationalization
import i18n from '../../utils/i18n'

new Vue({
  router,
  store,
  i18n,
  render: h => h(index)
}).$mount('#app')