<!-- 悬浮菜单组件 -->
<template>
    <div class="speed-dial speed-dial-opened">
        <div v-if="!show">
            <a class="floating-button" style="opacity: 0">
                <i class="icon icon-plus"></i>
                <i class="icon icon-close"></i>
            </a>
            <div class="speed-dial-buttons">
                <!-- 扫桌码 -->
                <div v-if="TableCode == true">
                    <!-- 首页 -->
                    <div v-if="actionType === 'start'">
                        <!-- 餐前，餐后 -->
                        <div v-if="order_mode == '1' || order_mode == '2'">
                            <a
                                class="row top10"
                                @click="actionClick(2)"
                                style="width: 60px;height: 60px;background: white;box-shadow: 0px 0px 8px rgba(194, 194, 194, 0.5);"
                            >
                                <div class="col-100 center">
                                    <img
                                        src="../style/images/nav.png"
                                        alt
                                        class="posImg"
                                        width="18"
                                    />
                                </div>
                                <div class="col-100 center floatText">
                                    <span class="color-lightbrown font14">{{
                                        $t("nav")
                                    }}</span>
                                </div>
                            </a>
                        </div>
                        <!-- 仅点餐-->
                        <div v-else-if="order_mode=='3'">
                            <a
                                class="row top10"
                                @click="actionClick(8)"
                                style="width: 60px;height: 60px;background: white;box-shadow: 0px 0px 8px rgba(194, 194, 194, 0.5);"
                            >
                                <div class="col-100 center">
                                    <img
                                        src="../style/images/xiadan.png"
                                        alt
                                        class="posImg"
                                        width="20"
                                    />
                                </div>
                                <div class="col-100 center floatText">
                                    <span class="color-lightbrown font14">{{
                                        $t("Yxiadan")
                                    }}</span>
                                </div>
                            </a>
                        </div>
                        <div>
                            <a
                                class="row top10"
                                @click="actionClick(5)"
                                style="width: 60px;height: 60px;background: linear-gradient(to bottom left,#ff8237,#f4257c,#ea3d15);"
                            >
                                <img
                                    src="../style/images/shopping.png"
                                    alt
                                    width="32"
                                />
                            </a>
                            <span v-if="getTotalDishNum > 0" class="iconNum">
                                <span v-if="getTotalDishNum > 99">99+</span>
                                <span v-else>{{ getTotalDishNum }}</span>
                            </span>
                        </div>
                    </div>
                    <!-- 购物车页 -->
                    <div v-else-if="actionType === 'cart'">
                        <!-- 餐前，餐后 -->
                        <div v-if="order_mode == '1' || order_mode == '2'">
                            <a
                                class="row top10"
                                @click="actionClick(2)"
                                style="width: 60px;height: 60px;background: white;box-shadow: 0px 0px 8px rgba(194, 194, 194, 0.5);"
                            >
                                <div class="col-100 center">
                                    <img
                                        src="../style/images/nav.png"
                                        alt
                                        class="posImg"
                                        width="18"
                                    />
                                </div>
                                <div class="col-100 center floatText">
                                    <span class="color-lightbrown font14">{{
                                        $t("nav")
                                    }}</span>
                                </div>
                            </a>
                        </div>
                        <!-- 仅点餐 -->
                        <div v-else-if="showPayOrder && order_mode == '3'">
                            <a
                                class="row top10"
                                @click="actionClick(8)"
                                style="width: 60px;height: 60px;background: white;box-shadow: 0px 0px 8px rgba(194, 194, 194, 0.5);"
                            >
                                <div class="col-100 center">
                                    <img
                                        src="../style/images/xiadan.png"
                                        alt
                                        class="posImg"
                                        width="20"
                                    />
                                </div>
                                <div class="col-100 center floatText">
                                    <span class="color-lightbrown font14">{{
                                        $t("Yxiadan")
                                    }}</span>
                                </div>
                            </a>
                        </div>
                        <!-- 仅点餐,餐后 -->
                        <div
                            v-if="
                                showPayOrder &&
                                (order_mode == '3' || order_mode == '2') 
                                
                            "
                            @click="actionClick(3)"
                        >
                            <a
                                class="row top10"
                                style="width: 60px;height: 60px;background: linear-gradient(to bottom left,#ff8237,#f4257c,#ea3d15);"
                            >
                                <div class="col-100 center">
                                    <img
                                        src="../style/images/bgPay.png"
                                        alt
                                        class="posImg"
                                        width="18"
                                    />
                                </div>
                                <div class="col-100 center floatText">
                                    <span class="color-white font12">{{
                                        $t("xaidan")
                                    }}</span>
                                </div>
                            </a>
                        </div>
                        <!-- 餐前 -->
                        <div
                            v-else-if="
                                getPublicModel() &&
                                showPayOrder &&
                                order_mode == '1'
                            "
                        >
                            <a
                                class="row top10"
                                @click="actionClick(7)"
                                style="width: 60px;height: 60px;background: linear-gradient(to bottom left,#ff8237,#f4257c,#ea3d15);"
                            >
                                <div class="col-100 center">
                                    <img
                                        src="../style/images/ture.png"
                                        alt
                                        class="posImg"
                                        width="25"
                                    />
                                </div>
                                <div class="col-100 center floatText">
                                    <span class="color-white font12">{{
                                        $t('selectOk')
                                    }}</span>
                                </div>
                            </a>
                        </div>
                        <!-- 餐前(订单) -->
                        <div
                            v-else-if="order_mode == '1'"
                            @click="actionClick(7)"
                        >
                            <a
                                class="row top10"
                                style="width: 60px;height: 60px;background: linear-gradient(to bottom left,#ff8237,#f4257c,#ea3d15);"
                            >
                                <div class="col-100 center">
                                    <img
                                        src="../style/images/bgPay.png"
                                        alt
                                        class="posImg"
                                        width="18"
                                    />
                                </div>
                                <div class="col-100 center floatText">
                                    <span class="color-white font12">{{
                                        $t("payOrder")
                                    }}</span>
                                </div>
                            </a>
                        </div>
                        <!-- 餐后(订单) -->
                        <div
                            v-else-if="getPublicModel() && order_mode == '2'"
                            @click="actionClick(7)"
                        >
                            <a
                                class="row top10"
                                style="width: 60px;height: 60px;background: linear-gradient(to bottom left,#ff8237,#f4257c,#ea3d15);"
                            >
                                <div class="col-100 center">
                                    <img
                                        src="../style/images/bgPay.png"
                                        alt
                                        class="posImg"
                                        width="18"
                                    />
                                </div>
                                <div class="col-100 center floatText">
                                    <span class="color-white font14">{{
                                        $t("pay")
                                    }}</span>
                                </div>
                            </a>
                        </div>
                        <div>
                            <a
                                class="row top10"
                                @click="actionClick(4)"
                                style="width: 60px;height: 60px;background: linear-gradient(to bottom left,#ff8237,#f4257c,#ea3d15);"
                            >
                                <div class="col-100 center">
                                    <img
                                        src="../style/images/continue.png"
                                        alt
                                        class="posImg"
                                        width="22"
                                    />
                                </div>
                                <div class="col-100 center floatText">
                                    <span class="color-white font12">{{
                                        $t("continue")
                                    }}</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <!-- 扫店码 -->
                <div v-if="StoreCode == true">
                    <!-- 首页 -->
                    <div v-if="actionType === 'start'">
                        <!-- 店码走餐前 -->
                        <div>
                            <a
                                class="row top10"
                                @click="actionClick(2)"
                                style="
                                    width: 60px;
                                    height: 60px;
                                    background: white;
                                    box-shadow: 0px 0px 8px
                                        rgba(194, 194, 194, 0.5);
                                "
                            >
                                <div class="col-100 center">
                                    <img
                                        src="../style/images/nav.png"
                                        alt
                                        class="posImg"
                                        width="18"
                                    />
                                </div>
                                <div class="col-100 center floatText">
                                    <span class="color-lightbrown font14">{{
                                        $t("nav")
                                    }}</span>
                                </div>
                            </a>
                        </div>
                        <div>
                            <a
                                class="row top10"
                                @click="actionClick(5)"
                                style="width: 60px;height: 60px;background: linear-gradient(to bottom left,#ff8237,#f4257c,#ea3d15);"
                            >
                                <img
                                    src="../style/images/shopping.png"
                                    alt
                                    width="32"
                                />
                            </a>
                            <span v-if="getTotalDishNum > 0" class="iconNum">{{
                                getTotalDishNum
                            }}</span>
                        </div>
                    </div>
                    <!-- 购物车页 -->
                    <div v-else-if="actionType === 'cart'">
                        <!-- 餐前，餐后 -->
                        <div>
                            <a
                                class="row top10"
                                @click="actionClick(2)"
                                style="
                                    width: 60px;
                                    height: 60px;
                                    background: white;
                                    box-shadow: 0px 0px 8px rgba(194, 194, 194, 0.5);
                                        
                                "
                            >
                                <div class="col-100 center">
                                    <img
                                        src="../style/images/nav.png"
                                        alt
                                        class="posImg"
                                        width="18"
                                    />
                                </div>
                                <div class="col-100 center floatText">
                                    <span class="color-lightbrown font14">{{
                                        $t("nav")
                                    }}</span>
                                </div>
                            </a>
                        </div>
                        <!-- 餐前 -->
                        <div v-if="getPublicModel() && showPayOrder">
                            <a
                                class="row top10"
                                @click="actionClick(7)"
                                style="width: 60px;height: 60px;background: linear-gradient(to bottom left,#ff8237,#f4257c,#ea3d15);"
                            >
                                <div class="col-100 center">
                                    <img
                                        src="../style/images/ture.png"
                                        alt
                                        class="posImg"
                                        width="25"
                                    />
                                </div>
                                <div class="col-100 center floatText">
                                   
                                    <span class="color-white font12">{{
                                        $t('selectOk')
                                    }}</span>
                                </div>
                            </a>
                        </div>
                        <!-- 餐前(订单) -->
                        <div v-else @click="actionClick(7)">
                            <a
                                class="row top10"
                                style="width: 60px;height: 60px;background: linear-gradient(to bottom left,#ff8237,#f4257c,#ea3d15);"
                            >
                                <div class="col-100 center">
                                    <img
                                        src="../style/images/bgPay.png"
                                        alt
                                        class="posImg"
                                        width="18"
                                    />
                                </div>
                                <div class="col-100 center floatText">
                                    <span class="color-white font12">{{
                                        $t("payOrder")
                                    }}</span>
                                </div>
                            </a>
                        </div>
                        <div>
                            <a
                                class="row top10"
                                @click="actionClick(4)"
                                style="width: 60px;height: 60px;background: linear-gradient(to bottom left,#ff8237,#f4257c,#ea3d15);"
                            >
                                <div class="col-100 center">
                                    <img
                                        src="../style/images/continue.png"
                                        alt
                                        class="posImg"
                                        width="22"
                                    />
                                </div>
                                <div class="col-100 center floatText">
                                    <span class="color-white font12">{{
                                        $t("continue")
                                    }}</span> 
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <van-popup
            v-model="show"
            position="bottom"
            style="border-radius: 15px 15px 0 0;"
        >
            <NavigationPage @naviBackClick="naviBackClick"></NavigationPage>
        </van-popup>
		<!-- 暂不支持线上付款 -->
		<van-popup
            v-model="noSupportShow"
			class="noSupport-popup"
			style="width: 100%; height: 100%"
        >   
		    <div class="no-support">
				<div class="nosupport-cont">
					<div>
						{{$t('shopcart.noSupport1')}}
					</div>
					<div>
						{{$t('shopcart.noSupport2')}}
					</div>
				</div>
				<div class="nosupport-bottom" @click="noSupportShow=false">{{$t('shopcart.confirm')}}</div>
			</div>
			
        </van-popup>
       
    </div>
</template>
<script>
import NavigationPage from "./NavigationPage";
export default {
    name: "FloatActionBar",
    computed: {
        curentStore() {
            return this.$store.getters.curentStore;
        },
        getTotalDishNum() {
            return this.$store.getters.totalNum;
        },
        ipayQrcode() {
            return this.$store.getters.ipayQrcode;
        },
        storeTakeOut(){
            return this.$store.getters.storeTakeOut;
        },
        deliveryInfo(){
            return this.$store.getters.deliveryInfo;
        },
        qrcode(){
            return this.$store.getters.qrcode;
        },
    },
    components: {
        NavigationPage,
    },
    props: {
        beforeMealsEnd: {
            type: Boolean,
            default: false,
        },
        actionType: {
            type: String,
            default: "cart",
        },
        isOutOrder: {
            type: Boolean,
            default: true,
        },
        showPayOrder: {
            type: Boolean,
            default: true,
        },
        order_mode: {
            type: String,
            default: "0",
        },
        scan_type: {
            type: String,
            default: "",
        },
        fixToken: {
            type: String,
            default: "",
        },
        order_source: {
            type: String,
            default: "",
        },
        orderTb_id: {
            type: Number,
            default: 0,
        },
        orderTbId: {
            type: String,
            default: "0",
        },
        tb_id: {
            type: String,
            default: "0",
        },
        orderTb_name: {
            type: String,
            default: "",
        },
        cartOrder_id: {
            type: String,
            default: "0",
        },
        queueNum: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            show: false,
            orderSourceStar: false,
            TableCode: false,
            StoreCode: false,
            beforeOrderId: "",
			beforeToken: "",
			noSupportShow:false, 
           
        };
    },
    methods: {
        actionClick(index) {
            if (index == 1) {
                this.$emit("refreshClick", index);
            } else if (index == 2) {
                // 餐前，餐后
                this.show = true;
            } else if (index == 3) {
                // 仅点餐，餐后
                this.$emit("payOrderClick");
                // this.noSupportShow = true;
            } else if (index == 4) {
                if (
                    this.curentStore.tb_id != this.orderTb_id &&
                    this.curentStore.tb_id != this.orderTbId
                ) {
                    this.$dialog
                        .alert({
                            message:
                                this.$t("hint1") +
                                this.orderTb_name +
                                this.$t("hint2"),
                            confirmButtonColor: "#EB3B1C",
                        })
                        .then(() => {
                            // on close
                        });
                } else {
                    window.location.href = "./start.html#/storeHome";
                }
            } else if (index == 5) {
                window.location.href = "./shopcart.html";
            } else if (index == 6) {
                window.location.href = "./dish.html#/search";
            } else if (index == 7) {
                // === 扫桌码
                if (this.qrcode.substring(0, 4) == "TDEP") {
                    if(String(this.beforeMealsEnd)=='true'){
                        window.location.href =
                        "./shopcart.html#/payMent?token=" +
                        this.$store.getters.token;
                    }else if(this.actionType == 'cart'){
                        this.$emit("payOrderClick");
                    }else{
                        return false;
                    }
                }
                // ====扫店码
                if (this.qrcode.substring(0, 4) == "DEPX") {
                    // 店码只有餐前
                    //如果是外送 需先弹出外送弹窗填写信息完之后再执行
                    if(this.storeTakeOut=='2'&&String(this.deliveryInfo)==''){
                        if (Number(this.getTotalDishNum>0)) {
                            this.$emit("deliveryShowClick");
                        }else{
                            this.toast.fail("购物车内没有菜");
                        }
                    }else{
                        if(String(this.beforeMealsEnd)=='true'){
                            window.location.href =
                            "./shopcart.html#/payMent?token=" +
                            this.$store.getters.token;
                        }else if(this.actionType == 'cart'){
                            this.$emit("payOrderClick");
                        }else{
                            return false;
                        }
                        
                    }
                }
				// ====ipay88 走扫店码模式支付
				if (String(this.ipayQrcode)=="true") {
                    if(String(this.beforeMealsEnd)=='true'){
                        window.location.href =
                        "./shopcart.html#/payMent?token=" +
                        this.$store.getters.token;
                    }else if(this.actionType == 'cart'){
                        this.$emit("payOrderClick");
                    }else{
                        return false;
                    }
				}
            } else if (index == 8) {
                this.getOrderState();
            }
        },
        naviBackClick() {
            this.show = false;
        },
        getPayAfterBool() {
            return this.stringutils.isAfter(this.curentStore);
        },

        getPublicModel() {
            return !this.stringutils.getPublicPayModel();
        },
        //餐前订单页
        getOrderState() {
            let data = {
                dep_id: this.curentStore.dep_id,
                param: this.curentStore.tb_id,
                str_param: this.queueNum,
            };
            let that = this;
            this.request.checkorder(data, function (res) {
                if (res.code == "1") {
                    if (res.data) {
                        that.$store.dispatch("setTotalNum", 0);
                        window.location.href = "./shopcart.html#/PlaceOrder";
                    } else {
                        that.toast.info(that.$t("noDish_detail"));
                    }
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        // 餐前下单
        payBeforeOrderClick() {
            console.log(`1111oder`);
            this.$store.dispatch("setTotalNum", 0);
            let data = {
                dep_id: this.curentStore.dep_id,
                table_id: this.curentStore.tb_id,
            };
            let that = this;
            this.request.payOrder(data, function (res) {
                if (res.code == "1") {
                    that.beforeOrderId = res.data.order_id_show;
                    that.beforeToken = res.data.token;
                    that.$store.dispatch("setorder_id", res.data.order_id_show);
                    window.location.href =
                    "./shopcart.html#/payMent?token=" +
                    res.data.token;
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        // 餐前订单
        getBeforeOrderInfo() {
            if (this.$route.query.token == null) {
                this.$store.dispatch("setToken", this.$store.getters.token);
            } else {
                this.$store.dispatch("setToken", this.$route.query.token);
            }
            let data = {
                dep_id: this.curentStore.dep_id,
                param: this.curentStore.tb_id,
                company_id: this.curentStore.company_id,
                str_param: this.$store.getters.order_id,
                // str_param:this.beforeOrderId
            };
            let that = this;

            this.request.orderDetails(data, function (res) {
                if (res.code == "1") {
                    that.dishData = res.data;
                    that.dishPmtData = res.data.promotions;
                    that.memberPhone = that.dishData.member_phone;
                    that.member_name = that.dishData.member_name;
                    that.discount_set = that.dishData.discount_set;
                    that.member_grade_name = that.dishData.member_grade_name;
                    that.formatData(res);
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
    },
    created() {
        // this.qrcode = ?this.$store.getters.qrcode:'DEPX_';
        // 浏览器扫桌码
        if (
            this.order_source[0] == "e" &&
            this.order_source[1] == "x" &&
            this.order_source[2] == "p" &&
            this.order_source[3] == "l" &&
            this.order_source[4] == "o" &&
            this.order_source[5] == "r" &&
            this.order_source[6] == "e" &&
            this.order_source[7] == "r" &&
            this.order_source[8] == "_"
        ) {
            this.orderSourceStar = true;
        } else {
            this.orderSourceStar = false;
        }
        // 扫桌码
        if ( this.qrcode.substring(0, 4) == "TDEP") {
            this.TableCode = true;
            this.StoreCode = false;
        }
        // 扫店码
        if (this.qrcode.substring(0, 4) == "DEPX") {
            this.StoreCode = true;
            this.TableCode = false;
        }
		//ipay88路径
        if (String(this.ipayQrcode)=="true") {
            this.StoreCode = true;
            this.TableCode = false;
        }
    },
};
</script>
<style scoped>
.posImg {
    position: relative;
    top: 8px;
}

.floatText {
    position: relative;
    top: -5px;
}

.speed-dial {
    bottom: -10px;
}

.iconNum {
    display: block;
    position: relative;
    top: -70px;
    left: 40px;
    background: red;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    font-size: 12px;
    color: white;
    text-align: center;
    line-height: 18px;
    z-index: 99;
}
.noSupport-popup {
    background-color: rgb(255, 0, 255, 0) !important;
}
.no-support{
	position: relative;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 6px;
    margin: 0px 50px;
	background: #fff;
}
.nosupport-cont {
	padding: 20px 5px;
    text-align: center;
    color: #505050;
    font-size: 15px;
}
.nosupport-bottom{
	height: 45px;
    line-height: 45px;
	font-size: 14px;
    color: #eb3b1c;
    border-top: 1px #ececec solid;
	text-align: center;
}
</style>