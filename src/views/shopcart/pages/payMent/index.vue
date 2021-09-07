<template>
    <div class="main-layout">
        <span v-if="StoreCode == true"> </span>
        <span v-if="TableCode == true">
            <div @click="backClick" v-if="$store.getters.order_mode == 1"></div>
            <div @click="backClick" v-else>
                <img
                    src="../../../../style/images/orderBack.png"
                    alt=""
                    width="12"
                    style="margin: 10px 0px 0px 10px"
                />
                <span
                    style="
                        position: relative;
                        top: -4px;
                        left: 5px;
                        color: #808080;
                    "
                    >{{ backTitle }}</span
                >
            </div>
        </span>
        <CopyURL />
        <VipLogin
            class="top10"
            :member_name="member_name"
            :memberPhone="memberPhone"
            :discount_set="discount_set"
            :member_grade_name="member_grade_name"
            @confirmClick="confirmClick"
        ></VipLogin>
        <PayTitle
            :dishData="dishData"
            :beforeData="beforeData"
            :dishPmt="dishPmtData"
            :qrcode="qrcode"
            @dishInfoClick="dishInfoClick"
        ></PayTitle>
        <!-- ipay88 支付方式 -->
        <PayMode @confirmPayClick="confirmPayClick"></PayMode>
        <payCoupon :dishData="dishData" :couponCount="couponCount"></payCoupon>
        <PayBtn :dishData="dishData" @payClick="payClick"></PayBtn>
        <!--点击查看订单，弹出已选菜单列表-->
        <!-- 菜品详情 -->
        <!-- <van-popup
            v-model="isShowFoodDetail"
            get-container="#app"
            :style="{ width: '100%' }"
        >
            <div class="popupcontent">
                <div style="border-radius: 5px">
                    <PlaceMenuList :dishData="dishData"></PlaceMenuList>
                </div>
                <img
                    src="../../../../style/images/close.png"
                    class="closeImg"
                    @click="isShowFoodDetail = false"
                    width="32"
                />
            </div>
        </van-popup> -->
    </div>
</template>

<script>
import VipLogin from "../../components/VipLogin";
import PayTitle from "../../components/PayTitle";
import PayMode from "../../components/PayMode";
import payCoupon from "../../components/payCoupon";
import PayBtn from "../../components/PayBtn";
// 点击查看订单，弹出已选菜单列表
import PlaceMenuList from "../../components/PlaceMenuList";
import CopyURL from "../../../../components/CopyURL";
export default {
    name: "payMent",
    computed: {
        curentStore() {
            return this.$store.getters.curentStore;
        },
        ipayQrcode() {
            return this.$store.getters.ipayQrcode;
        },
        serverUrl() {
            return this.$store.getters.serverUrl;
        },

    },
    components: {
        PayTitle,
        PayMode,
        payCoupon,
        PayBtn,
        PlaceMenuList,
        CopyURL,
        VipLogin,
    },
    data() {
        return {
            dishData: {},
            backTitle: "",
            isShowFoodDetail: false,
            couponCount: 0,
            qrcode: this.$store.getters.qrcode,
            member_name: "",
            memberPhone: "",
            member_grade_name: "",
            discount_set: "",
            dishPmtData: [],
            beforeData: {},
            TableCode: false,
            StoreCode: false,
            //ipay88支付
            payMentId: null,
        };
    },
    methods: {
        confirmPayClick(id) {
            this.payMentId = id;
        },
        // 线上真实支付
        payClick() {
            if (this.payMentId == null) {
                this.toast.info(this.$t('shopcart.pleaseSelect'));
                return false;
            }
            let frontStr = "";
            
            if (this.dishData.order_status == 0) {
                if(this.serverUrl=='http://www.shule666.com'){
                    //线上地址  epayment.mjoyapp.com    
                    frontStr = "http://epayment.mjoyapp.com";
                }else{
                    //本地支付 serverUrl
                    frontStr = this.serverUrl;
                }
                let strUrl =  `${frontStr}/en/ipay88/request/${this.curentStore.dep_id
                }?dep_id=${
                    this.curentStore.dep_id
                }&Amount=${
                    this.stringutils.formatPrice(this.dishData.total_price)
                }&RefNo=${this.$store.getters.order_id}&token=${
                    this.$route.query.token
                }&userid=${this.dishData.member_phone}&PaymentId=${
                   this.payMentId
                }&qr_code=${this.qrcode}`;
                strUrl = strUrl.replace(/\s+/g, "");
                window.location.href = strUrl;
               
            } else {
                if (this.dishData.order_status == 1) {
                    this.toast.fail(this.$t("dish.orderPay"));
                } else if (this.dishData.order_status == 2) {
                    this.toast.fail(this.$t("dish.orderCancel"));
                } else if (this.dishData.order_status == 3) {
                    this.toast.fail(this.$t("dish.orderRfund"));
                } else {
                    this.toast.fail(this.$t("dish.orderJudan"));
                }
            }
        },
        backClick() {
            window.location.href =
                "./shopcart.html#/PlaceOrder?token=" + this.$route.query.token;
        },
        dishInfoClick() {
            this.isShowFoodDetail = true;
        },
        confirmClick() {
            this.getOrderInfo();
        },
        deptakenlist() {
            let data = {
                company_id: this.curentStore.company_id,
                dep_id: this.curentStore.dep_id,
            };
            let that = this;
            this.request.deptakenlist(data, function (res) {
                if (res.code == "1") {
                    that.couponCount = res.data.length;
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        getOrderInfo() {
            this.$store.dispatch("setToken", this.$route.query.token);
            let data = {
                dep_id: this.curentStore.dep_id,
                param: this.curentStore.tb_id,
                company_id: this.curentStore.company_id,
                str_param: this.$store.getters.order_id,
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
        this.deptakenlist();
        if (this.curentStore) {
            this.getOrderInfo();
            this.backTitle = this.$t("dingdan");
        }

        // 扫桌码
        if (
            this.qrcode[0] == "T" &&
            this.qrcode[1] == "D" &&
            this.qrcode[2] == "E" &&
            this.qrcode[3] == "P" &&
            this.qrcode[4] == "_"
        ) {
            this.TableCode = true;
        }
        // 扫店码
        if (
            this.qrcode[0] == "D" &&
            this.qrcode[1] == "E" &&
            this.qrcode[2] == "P" &&
            this.qrcode[3] == "X" &&
            this.qrcode[4] == "_"
        ) {
            this.StoreCode = true;
        }
    },
};
</script>
<style scoped>
.van-popup {
    background-color: transparent;
    width: 90%;
    padding: 80px 0;
    overflow: hidden;
}
.closeImg {
    margin-top: 0px;
    margin-bottom: 20px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
}
</style>