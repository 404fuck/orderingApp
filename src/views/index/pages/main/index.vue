<!--
 * @Author: zzt
 * @Date: 2021-04-01 19:19:32
 * @LastEditTime: 2021-06-28 11:48:23
 * @LastEditors: Please set LastEditors
 * @Description: 配合ipay88生成 'http://epayment.mjoyapp.com/门店名称'地址 两套环境需分别打包
 * @FilePath: \sjoyOrderingApp\src\views\index\pages\main\index.vue
-->
<template>
    <div>
		<StoreHome ></StoreHome>
    </div>
</template>

<script>
export default {
    name: "index",
    components: {
		StoreHome: (resolve) =>  require(["../../../start/pages/StoreHome"], resolve),
	},
	computed:{
		dinersNum() {
            return function () {
                return this.$store.getters.dinersNum;
            };
        },
		scan_language() {
            return function () {
                return this.$store.getters.scan_language;
            };
        },
        language: {
            get() {
                return this.$store.getters.language;
            },
            set(val) {},
		},
		curentStore() {
            return this.$store.getters.curentStore;
		},
        qrcode(){
            return this.$store.getters.qrcode;
        },
        
	},
    data() {
        return {
			propEnd:'', //获取路由最后一个值
			getSerUrl:'',//得到当前的环境url
			//拉取scan接口
            requestData:{
                str_param:'',
                table_key: null,
                token: 'enjoyyourdinner'
			},
			dishInfo: {}, //门店信息
			languageList: "",
			token: "",
        };
    },
	methods: {
		saveLang() {
            let language = "en_US";
            if (this.$route.query.lang != undefined) {
                this.$store.dispatch("setLanguage", this.$route.query.lang);
                this.$i18n.locale = this.$route.query.lang;
                this.$Local(this.$route.query.lang);
                language = this.$route.query.lang;
            } else {
                if (this.language != undefined && this.language.length > 0) {
                    if (this.$store.getters.scan_language == "1") {
                        this.$store.dispatch("setLanguage", "en_US");
                        this.$i18n.locale = "en_US";
                        this.$Local("en_US");
                        language = "en_US";
                    } else if (this.$store.getters.scan_language == "2") {
                        this.$store.dispatch("setLanguage", "zh_CN");
                        this.$i18n.locale = "zh_CN";
                        this.$Local("zh_CN");
                        language = "zh_CN";
                    } else if (this.$store.getters.scan_language == "3") {
                        this.$store.dispatch("setLanguage", "ms_MY");
                        this.$i18n.locale = "en_US";
                        this.$Local("en_US");
                        language = "ms_MY";
                    } else {
                        this.$store.dispatch("setLanguage", "en_US");
                        this.$i18n.locale = "en_US";
                        this.$Local("en_US");
                        language = "en_US";
                    }
                }
            }
            this.$refs.changeLang.changeLang(this.language);
        },
		//18000端口拉取返回的 serverUrl
		getServerUrl() {
            let that = this;
            let data = {
                qr_code: this.propEnd
            };
            this.$http({
                method: "post",
                url: this.baseUrl.getBaseUrlLogin()+'/api/consumer/scan/upgradeInfo',
                data: data,
            }).then((res) => {
                if (res.data.code == "1") {
					let serverUrl = res.data.data.serverUrl;
					that.getSerUrl = serverUrl;
                    that.$store.dispatch("setServerUrl", serverUrl);
                    that.getCurentStoreInfo(null);
                } else {
                    that.toast.error(res.data.msg);
                }
            }).catch((err) => {
                // that.toast.error(err);
            });
            
		},
		getCurentStoreInfo(tablekey) {
            this.requestData.table_key = tablekey;
			this.requestData.str_param = this.getUrlStr.getUrl();
            let that = this;
            this.$http({
                method: "post",
                url: this.getSerUrl+':18081/capis/order/scan',
                data: this.requestData,
            }).then((ress) => {
                var res = ress.data;
                if (res.code == 1) {
                    that.fixtoken = that.$store.getters.token;
                    that.tbBefore = that.$store.getters.tb_id;
                    that.token = res.data.token;
                    that.$store.dispatch(
                        "setfixToken",
                        that.$store.getters.token
                    );
                    if (
                        that.token !== null &&
                        that.token !== "" &&
                        typeof that.token !== "undefined"
                    ) {
                        //token不为空将token存储起来;
                        //toast.error('token不为空将token存储起来')
                        that.$store.dispatch("setToken", that.token);
                    }
                    that.$route.query.token = that.token;
                    //存储当前门店信息
                    that.dishInfo = res.data;
                    // this.$store.getters.language

                    that.scanType = that.dishInfo.scan_type; //返回扫码状态，0：桌码和店码，1：为扫桌码，2：为扫店码 ,
                    that.scanOrder = that.dishInfo.scan_order; // 扫码点餐开关，0为关，1为开
                    that.$store.dispatch("setCurentStore", res.data);
                    // that.curentStore = that.$store.getters.curentStore;
                    that.$store.dispatch("setDinersNum", res.data.diner_num);
                    that.$store.dispatch("setorder_mode", res.data.order_mode);
                    that.$store.dispatch("settb_id", res.data.tb_id);
                    that.$store.dispatch(
                        "setscan_language",
                        res.data.scan_language
                    );

                    that.$store.dispatch(
                        "setorder_source",
                        res.data.order_source
                    );
                    that.saveLang();
                    // alert('改单前-------'+res.data.tb_id)
                    //cookie save order_mode
                    document.cookie =
                        "order_mode = " + that.dishInfo.order_mode;
                    //如果选过人数 就跳转到门店页面 不用重新选择人数
                } else if (res.code == -666) {
                    that.token = res.data.token;
                    if (
                        that.token !== null &&
                        that.token !== "" &&
                        typeof that.token !== "undefined"
                    ) {
                        that.$store.dispatch("setToken", that.token);
                    }
                   
                    //存储当前门店信息
                    that.dishInfo = res.data;
                    that.$store.dispatch(
                        "setscan_language",
                        res.data.scan_language
                    );
                    that.$store.dispatch(
                        "setorder_source",
                        res.data.order_source
                    );
                    // alert(res.data.order_source)
                    that.saveLang();
                    that.languageList = that.dishInfo.scan_language;
                    that.$store.dispatch("setCurentStore", res.data);
                    // that.curentStore = that.$store.getters.curentStore;

                    that.$store.dispatch("setDinersNum", res.data.diner_num);
                    //如果选过人数 就跳转到门店页面 不用重新选择人数
                    // that.showSafetyCode = false;
                } else if (res.code == -1) {
                    that.msg = res.msg;
                    that.dishInfo = res.data;
                    that.$store.dispatch(
                        "setscan_language",
                        res.data.scan_language
                    );
                    that.$store.dispatch(
                        "setorder_source",
                        res.data.order_source
                    );
                    // alert(res.data.order_source)
                    that.saveLang();
                } else if (res.code == -667) {
                    //  -667:不在营业时间范围内
                    that.dishInfo = res.data;
                    that.$store.dispatch(
                        "setscan_language",
                        res.data.scan_language
                    );
                    that.$store.dispatch(
                        "setorder_source",
                        res.data.order_source
                    );
                    that.saveLang();
                } else if (res.code == 4) {
                    //  alert(res.data.order_id_show)
                    //  跳转至订单页
                    that.token = res.data.token;
                    if (
                        that.token !== null &&
                        that.token !== "" &&
                        typeof that.token !== "undefined"
                    ) {
                        that.$store.dispatch("setToken", that.token);
                    }
                    window.location.href =
                        "./shopcart.html#/PlaceOrder?order_id=" +
                        res.data.order_id_show;
                    that.dishInfo = res.data;
                    that.$store.dispatch(
                        "setscan_language",
                        res.data.scan_language
                    );
                    that.$store.dispatch(
                        "setorder_source",
                        res.data.order_source
                    );
                    that.saveLang();
                } else if (res.code == -3) {
                    //  跳转至订单详情页
                    that.token = res.data.token;
                    if (
                        res.data.token !== null &&
                        res.data.token !== "" &&
                        typeof res.data.token !== "undefined"
                    ) {
                        that.$store.dispatch("setToken", res.data.token);
                    }
                    let strUrl = `./orderDetails.html#/?order_id=${res.data.order_id_show}&token=${res.data.token}&dep_id=${that.curentStore.dep_id}qr_code=${that.qrcode}&lang=${res.data.scan_language}`;
                    strUrl = strUrl.replace(/\s+/g, "");
                    window.location.href = strUrl;
                    that.dishInfo = res.data;
                    that.$store.dispatch(
                        "setscan_language",
                        res.data.scan_language
                    );
                    that.$store.dispatch(
                        "setorder_source",
                        res.data.order_source
                    );
                    that.saveLang();
                }
            }).catch((err) => {
                // console.log('error');
            });
        },
	},
	mounted(){
		document.title = this.curentStore.dep_comp_name + this.$t("start.menu");
    },
	created(){
		this.propEnd = this.getUrlStr.getUrl();
		if(!this.serverUrl){
			this.getServerUrl();
		}
	},
	
	
};
</script>
<style scoped>

</style>