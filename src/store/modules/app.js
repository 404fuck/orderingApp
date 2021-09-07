const app = {
	state: {
		showShareCode: localStorage.getItem('showShareCode') || true,
		dishListType: localStorage.getItem('dishListType') || 1,
		language: localStorage.getItem('language') || 'en_US',
		//本地token
		token: localStorage.getItem('token') || '',
		//就餐人数
		dinersNum: localStorage.getItem('dinersNum') || 0,
		//购物车菜品数量
		totalNum: localStorage.getItem('totalNum') || 0,
		take_out: localStorage.getItem('take_out') || 0,
		order_mode: localStorage.getItem('order_mode') || '3',
		scan_language: localStorage.getItem('scan_language') || 1,
		fixToken: localStorage.getItem('fixToken') || '',
		order_id: localStorage.getItem('order_id') || '',
		cartOrder_id: localStorage.getItem('cartOrder_id') || '',
		order_source: localStorage.getItem('order_source') || '',
		tb_id: localStorage.getItem('tb_id') || 0,
		qrcode: localStorage.getItem('qrcode') || '',
		//点餐数量缓存
		dishNums: localStorage.getItem('dishNums') && JSON.parse(localStorage.getItem('dishNums')) || {},
		cartDishNums: localStorage.getItem('cartDishNums') && JSON.parse(localStorage.getItem('cartDishNums')) || {},
		curentStore: localStorage.getItem('curentStore') && JSON.parse(localStorage.getItem('curentStore')) || {},
		//获取18000的serverUrl
		serverUrl : localStorage.getItem('serverUrl') || '',
		//配合ipay88模式 标识
		ipayQrcode: localStorage.getItem('ipayQrcode') || false,
		//就餐类型
		storeTakeOut : localStorage.getItem('storeTakeOut') || '',
		//是否预约点餐
		isYuYue: localStorage.getItem('isYuYue') || false,
		//营业时间
		openTimeJson : localStorage.getItem('openTimeJson') || '',
		//预约时间
		yuYueTime : localStorage.getItem('yuYueTime') || '',
		//填写外送信息
		deliveryInfo: localStorage.getItem('deliveryInfo') || "",
	},
	mutations: {
		//菜品列表展示
		SET_SHOWSHARECODE: (state, showShareCode) => {
			state.showShareCode = showShareCode
			localStorage.setItem('showShareCode', showShareCode)
		},
		SET_DISHLISTTYPE: (state, dishListType) => {
			state.dishListType = dishListType
			localStorage.setItem('dishListType', dishListType)
		},
		// 中英文
		SET_LANGUAGE: (state, language) => {
			state.language = language
			localStorage.setItem('language', language)
		},
		// token
		SET_TOKEN: (state, token) => {
			state.token = token
			localStorage.setItem('token', token)
		},
		// dinersNum
		SET_DinersNum: (state, dinersNum) => {
			state.dinersNum = dinersNum
			localStorage.setItem('dinersNum', dinersNum)
		},
		// totalNum
		SET_TotalNum: (state, totalNum) => {
			state.totalNum = totalNum
			localStorage.setItem('totalNum', totalNum)
		},
		// totalNum
		SET_take_out: (state, take_out) => {
			state.take_out = take_out
			localStorage.setItem('take_out', take_out)
		},
		// order_mode
		SET_order_mode: (state, order_mode) => {
			state.order_mode = order_mode
			localStorage.setItem('order_mode', order_mode)
		},
		// scan_language
		SET_scan_language: (state, scan_language) => {
			state.scan_language = scan_language
			localStorage.setItem('scan_language', scan_language)
		},
		// order_id
		SET_order_id: (state, order_id) => {
			state.order_id = order_id
			localStorage.setItem('order_id', order_id)
		},
		// cartOrder_id
		SET_cartOrder_id: (state, cartOrder_id) => {
			state.cartOrder_id = cartOrder_id
			localStorage.setItem('cartOrder_id', cartOrder_id)
		},
		// fixToken
		SET_fixToken: (state, fixToken) => {
			state.fixToken = fixToken
			localStorage.setItem('fixToken', fixToken)
		},
		// order_source
		SET_order_source: (state, order_source) => {
			state.order_source = order_source
			localStorage.setItem('order_source', order_source)
		},
		// qrcode
		SET_qrcode: (state, qrcode) => {
			state.qrcode = qrcode
			localStorage.setItem('qrcode', qrcode)
		},
		// tb_id
		SET_tb_id: (state, tb_id) => {
			state.tb_id = tb_id
			localStorage.setItem('tb_id', tb_id)
		},
		// dishNum
		SET_DishNums: (state, dishNum) => {
			state.dishNums = dishNum
			localStorage.setItem('dishNums', JSON.stringify(state.dishNums))
		},
		// dishNum
		SET_DISHNULL: (state) => {
			state.dishNums = {}
			localStorage.setItem('dishNums', JSON.stringify({}))
		},
		SET_CartDishNums: (state, [id, num]) => {
			state.cartDishNums[id] = num
			localStorage.setItem('cartDishNums', JSON.stringify(state.cartDishNums))
		},
		SET_CartDishNums_null: (state) => {
			state.cartDishNums = {}
			localStorage.setItem('cartDishNums', JSON.stringify(state.cartDishNums))
		},
		SET_DishNum: (state, data) => {
			localStorage.setItem('dishNums', JSON.stringify(data))
		},
		// curentStore
		SET_CURENTSTORE: (state, curentStore) => {
			state.curentStore = curentStore
			localStorage.setItem('curentStore', JSON.stringify(curentStore))
		},
		//serverUrl
		SET_SERVERURL: (state, serverUrl) => {
			state.serverUrl = serverUrl
			localStorage.setItem('serverUrl', serverUrl)
		},
		//ipayQrcode
		SET_IPAYQRCODE: (state, ipayQrcode) => {
			state.ipayQrcode = ipayQrcode
			localStorage.setItem('ipayQrcode', ipayQrcode)
		},
		//storeTakeOut
		SET_STORETAKEOUT: (state, storeTakeOut) => {
			state.storeTakeOut = storeTakeOut
			localStorage.setItem('storeTakeOut', storeTakeOut)
		},
		//isYuYue
		SET_ISYUYUE: (state, isYuYue) => {
			state.isYuYue = isYuYue
			localStorage.setItem('isYuYue', isYuYue)
		},
		//openTimeJson
		SET_OPENTIMEJSON: (state, openTimeJson) => {
			state.openTimeJson = openTimeJson
			localStorage.setItem('openTimeJson', openTimeJson)
		},
		//yuYueTime
		SET_YUYUETIME: (state, yuYueTime) => {
			state.yuYueTime = yuYueTime
			localStorage.setItem('yuYueTime', yuYueTime)
		},
		//deliveryInfo
		SET_DELIVERYINFO: (state, deliveryInfo) => {
			state.deliveryInfo = deliveryInfo
			localStorage.setItem('deliveryInfo', deliveryInfo)
		},
	},
	actions: {
		setShowShareCode({
			commit
		}, showShareCode) {
			commit('SET_SHOWSHARECODE', showShareCode)
		},
		setShowShopCart({
			commit
		}, ShowShopCart) {
			commit('SET_SHOWSHOPCART', ShowShopCart)
		},
		setShowOrder({
			commit
		}, ShowOrder) {
			commit('SET_SHOWORDER', ShowOrder)
		},
		setDishListType({
			commit
		}, dishListType) {
			commit('SET_DISHLISTTYPE', dishListType)
		},
		// 中英文
		setLanguage({
			commit
		}, language) {
			commit('SET_LANGUAGE', language)
		},
		// token
		setToken({
			commit
		}, token) {
			commit('SET_TOKEN', token)
		},
		// dinersNum
		setDinersNum({
			commit
		}, dinersNum) {
			commit('SET_DinersNum', dinersNum)
		},
		// totalNum
		setTotalNum({
			commit
		}, totalNum) {
			commit('SET_TotalNum', totalNum)
		},
		// totalNum
		settake_out({
			commit
		}, take_out) {
			commit('SET_take_out', take_out)
		},
		// order_mode
		setorder_mode({
			commit
		}, order_mode) {
			commit('SET_order_mode', order_mode)
		},
		// scan_language
		setscan_language({
			commit
		}, scan_language) {
			commit('SET_scan_language', scan_language)
		},
		setorder_id({
			commit
		}, order_id) {
			commit('SET_order_id', order_id)
		},
		setcartOrder_id({
			commit
		}, cartOrder_id) {
			commit('SET_cartOrder_id', cartOrder_id)
		},
		// fixToken
		setfixToken({
			commit
		}, fixToken) {
			commit('SET_fixToken', fixToken)
		},
		// order_source
		setorder_source({
			commit
		}, order_source) {
			commit('SET_order_source', order_source)
		},
		// qrcode
		setqrcode({
			commit
		}, qrcode) {
			commit('SET_qrcode', qrcode)
		},
		// tb_id
		settb_id({
			commit
		}, tb_id) {
			commit('SET_tb_id', tb_id)
		},
		// dishNum
		setDishNumsNull({
			commit
		}) {
			commit('SET_DISHNULL')
		}, // curentStore
		setDishNums({
			commit
		}, dishNum) {
			commit('SET_DishNums', dishNum)
		}, // curentStore
		setCartDishNums({
			commit
		}, [id, num]) {
			commit('SET_CartDishNums', [id, num])
		},
		setCartDishNums_null({
			commit
		}) {
			commit('SET_CartDishNums_null')
		},
		setDishNum({
			commit
		}, data) {
			commit('SET_DishNum', data)
		},
		setCurentStore({
			commit
		}, curentStore) {
			commit('SET_CURENTSTORE', curentStore)
		},
		// serverUrl
		setServerUrl({
			commit
		}, serverUrl) {
			commit('SET_SERVERURL', serverUrl)
		},
		//ipayQrcode
        setIpayQrcode({
			commit
		}, ipayQrcode) {
			commit('SET_IPAYQRCODE', ipayQrcode)
		},
		//storeTakeOut
        setStoreTakeOut({
			commit
		}, storeTakeOut) {
			commit('SET_STORETAKEOUT', storeTakeOut)
		},
		//isYuYue
        setIsYuYue({
			commit
		}, isYuYue) {
			commit('SET_ISYUYUE', isYuYue)
		},
        //openTimeJson
        setOpenTimeJson({
			commit
		}, openTimeJson) {
			commit('SET_OPENTIMEJSON', openTimeJson)
		},
		//yuYueTime
        setYuYueTime({
			commit
		}, yuYueTime) {
			commit('SET_YUYUETIME', yuYueTime)
		},
		//deliveryInfo
		setDeliveryInfo({
			commit
		}, deliveryInfo) {
			commit('SET_DELIVERYINFO', deliveryInfo)
		},
	}

}

export default app