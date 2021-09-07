import Vue from 'vue'
import index from './index.vue'
import router from './router'
import store from '../../store'
import moment from 'moment/moment'
Vue.prototype.moment = moment

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)


//设置title
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)
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
//价格
Vue.filter('price', function (value) {
  if (!value) {
    return '0.00'
  }
  value = Math.round(parseFloat(value) * 100) / 100;
  var xsd = value.toString().split(".");
  if (xsd.length == 1) {
    value = value.toString() + ".00";
    return value;
  }
  if (xsd.length > 1) {
    if (xsd[1].length < 2) {
      value = value.toString() + "0";
    }
    return value;
  }
  return value;
})
//日期
Vue.filter('moment', function (value, formatString) {
  if (!value) {
    return ''
  }
  formatString = formatString || 'DD/MM/YYYY'
  return moment(value).format(formatString)
})

window.console.log('当前运行环境：' + process.env.NODE_ENV)
import {
  Popup,
  Picker,
  Swipe,
  SwipeItem,
  Lazyload,
  Stepper,
  Tag,
  PasswordInput,
  NumberKeyboard,
  Dialog,
  Toast,
  Actionsheet,
  Checkbox,
  Tab, 
  Tabs
} from 'vant';

Vue.use(Popup)
  .use(Picker)
  .use(Swipe)
  .use(SwipeItem)
  .use(Lazyload, {
    loading: require('../../style/images/defaultImg.png'),//加载中图片，一定要有，不然会一直重复加载占位图
    error: require('../../style/images/defaultImg.png')  //加载失败图片
})
  .use(Stepper)
  .use(Tag)
  .use(PasswordInput)
  .use(NumberKeyboard)
  .use(Dialog)
  .use(Toast)
  .use(Actionsheet)
  .use(Checkbox)
  .use(Tab)
  .use(Tabs)

Vue.directive('preventReClick', {
  inserted(el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, binding.value)
      }
    })
  }
})


Vue.config.productionTip = false

router.afterEach(route => {
  // 从路由的元信息中获取 title 属性
  if (route.meta.title) {
    document.title = route.meta.title;
    // 如果是 iOS 设备，则使用如下 hack 的写法实现页面标题的更新
    // if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    //   const hackIframe = document.createElement('iframe');
    //   hackIframe.style.display = 'none';
    //   hackIframe.src = '/static/html/fixIosTitle.html?r=' + Math.random();
    //   document.body.appendChild(hackIframe);
    //   setTimeout(_ => {
    //     document.body.removeChild(hackIframe)
    //   }, 300)
    // }
  }
});

// Internationalization
import i18n from '../../utils/i18n'
import {
  Local
} from "@/utils//vantLocale.js";
Vue.prototype.$Local = Local;

new Vue({
  router,
  store,
  i18n,
  render: h => h(index)
}).$mount('#app')