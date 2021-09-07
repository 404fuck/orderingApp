
import Vue from 'vue'
import Router from 'vue-router'
import i18n from '../../utils/i18n'
import Main from './pages/main'
import {getUrlStr} from "../../utils/getUrlStr"

Vue.use(Router)

export default new Router({
	base: '/qrmenu/',   //ipay88用qrmenu 
	mode:'history',
	routes: [
		{
			path: '/'+getUrlStr.getUrl(),
			name: getUrlStr.getUrl(),
			component: Main,
			meta: {
				title: i18n.t('storeMenu'),
				requireAuth: true
			}
		},
		
	]
})