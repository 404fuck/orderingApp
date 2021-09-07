

import Vue from 'vue'
import Router from 'vue-router'
import Start from './pages/Start'
import StoreHome from './pages/StoreHome'
import i18n from '../../utils/i18n'
import {
	getUrlStr
} from "../../utils/getUrlStr"


Vue.use(Router)

export default new Router({
	base: "/",
	routes: [{
			path: '/index',
			name: 'start',
			component: Start,
			meta: {
				title: i18n.t('start.welcome'),
				requireAuth: true
			}
		},
		//1.店码模式 && 2.dep_id 模式拉取数据
		{
			path: '/index/' + getUrlStr.getUrl(),
			name: getUrlStr.getUrl(),
			component: Start,
			meta: {
				title: i18n.t('start.welcome'),
				requireAuth: true
			}
		},

		{
			path: '/storeHome',
			name: 'StoreHome',
			component: StoreHome,
			meta: {
				title: i18n.t('storeMenu'),
				requireAuth: true
			}
		},
		
		
	]
})