import Vue from 'vue'
import index from './index.vue'
import router from './router'
import store from '../../store'
import VueClipboard from 'vue-clipboard2'
import format from 'vue-text-format';
import i18n from '../../utils/i18n'
Vue.use(format);
Vue.use(VueClipboard)
//设置title
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)
import axios from 'axios'
Vue.prototype.$http= axios
//字符工具类
import {
  stringutils
} from '../../utils/stringutils'
Vue.prototype.stringutils = stringutils
import {getUrlStr} from '../../utils/getUrlStr'
Vue.prototype.getUrlStr = getUrlStr
import {
  baseUrl
} from '../../utils/baseUrl'
Vue.prototype.baseUrl = baseUrl
import {
  toast
} from '../../utils/toast'
Vue.prototype.toast = toast

import VueQriously from 'vue-qriously'
Vue.use(VueQriously)

import moment from 'moment/moment'
Vue.prototype.moment = moment

import {
  Popup,
  Picker,
  Swipe,
  SwipeItem,
  Lazyload,
  Field,
  Dialog,
  NumberKeyboard,
  PasswordInput,
  Button,
  Icon,
  Stepper,
  Tag,
  RadioGroup, 
  Radio,
  Checkbox,
  Rate,
  Toast,
  Uploader 
} from 'vant'

Vue.use(Popup)
  .use(Picker)
  .use(Swipe)
  .use(SwipeItem)
  .use(Checkbox)
  .use(Lazyload, {
    loading: require('../../style/images/defaultImg.png'),//加载中图片，一定要有，不然会一直重复加载占位图
    error: require('../../style/images/defaultImg.png')  //加载失败图片
})
  .use(Field)
  .use(Dialog)
  .use(NumberKeyboard)
  .use(PasswordInput)
  .use(Button)
  .use(Icon)
  .use(Stepper)
  .use(Tag)
  .use(RadioGroup)
  .use(Radio)
  .use(Rate)
  .use(Toast)
  .use(Uploader)

Vue.config.productionTip = false


//日期
Vue.filter('moment', function (value, formatString) {
  if (!value) {
    return ''
  }
  formatString = formatString || 'DD/MM/YYYY'
  return moment(value).format(formatString)
})
// 保留一位小数
Vue.filter('nums',function (val) { 
  val = Math.round(val * 10) / 10
  var xsd = val.toString().split('.')
  if (xsd.length === 1) {
    val = val.toString() + '.0'
    return val
  }
  return val
})
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
//字段
Vue.filter('empty', function (value) {
	if (!value) {
		return i18n.t('empty')
	}
	return value;
})



router.afterEach(route => {
  // 从路由的元信息中获取 title 属性
  if (route.meta.title) {
    document.title = route.meta.title;
    // // 如果是 iOS 设备，则使用如下 hack 的写法实现页面标题的更新
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