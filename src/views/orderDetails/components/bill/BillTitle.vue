<template>
    <div>
        <div
            class="card facebook-card"
            style="
                margin-top: 0px;
                border-radius: 5px;
                box-shadow: 5px 5px 26px rgba(227, 227, 227, 0.5);
            "
        >
            <div class="card-header row">
                <div class="col-40">
                    <span class="color-darkbrown fontWeight font14">{{
                        $t("shopcart.bill")
                    }}</span>
                </div>
                <!-- 餐前支付为“已付款” -->
                <div
                    class="col-60 right-style"
                    style="position: relative; top: 20px"
                >
                    <div
                        style="display: inline-block"
                        v-if="dishData.take_out == 1"
                    >
                        <span v-if="$store.getters.language == 'zh_CN'">
                            <img
                                src="../../../../style/images/takeAwayCN.png"
                                alt
                                width="55"
                            />
                        </span>
                        <span
                            v-else-if="
                                $store.getters.language == 'en_US' ||
                                $store.getters.language == 'ms_MY'
                            "
                        >
                            <img
                                src="../../../../style/images/takeAwayEN.png"
                                alt
                                width="55"
                            />
                        </span>
                    </div>
                </div>
            </div>
            <div class="card-content">
                <div class="card-content-inner" style="padding-top: 0px">
                    <div class="row font12 no-gutter">
                        <div
                            class="col-100 font14"
                           
                            v-show="qucanCode"
                        >   
                            <span v-if="qrcode.substring(0, 4) == 'DEPX'"  style="color: #505050;padding-right:25px;">{{storeTakeOut=='0'?$t('start.tangshi'):storeTakeOut=='1'?$t('start.ziqu'):$t('start.waisong')}}</span>
                            <span style="color: #eb3c1c">{{ $t("waidaiMsg.qucanNo") }}</span>
                            <span style="color: #eb3c1c">{{ dishData.take_food_code }}</span>
                        </div>
                        <div class="col-100 top10 font14" v-show="dianmaSet">
                            <div style="display: inline-block">
                                <span class="colorText"
                                    >{{ $t("shopcart.tableID") }}：</span
                                >
                                <span class="colorText font16">{{
                                    dishData.table_name
                                }}</span>
                                &nbsp;&nbsp;&nbsp;
                            </div>

                            <span class="colorText" style="margin-left: 25px"
                                >{{ $t("shopcart.dinnerNum") }}：</span
                            >
                            <span
                                class="colorText font16"
                                v-if="dishData.diner_num >= 10"
                                >{{ dishData.diner_num }}</span
                            >
                            <span class="colorText font16" v-else
                                >0{{ dishData.diner_num }}</span
                            >
                        </div>
                        <div class="col-100 top10 fontWeight" v-if="String(isYuYue)=='true'&&yuYueTime!=''" >
                            <span class="color-gray font12">{{$t('start.yuyueTime')}}：</span>
                            <span class="color-gray font12">{{
                                yuYueTime
                            }}</span>
                        </div>
                        <div class="col-100 top10 font12 fontWeight">
                            <span class="colorText"
                                >{{ $t("shopcart.create_time") }}：</span
                            >
                            <span class="colorText">{{
                                dishData.create_time
                            }}</span>
                        </div>
                        <div class="col-100 top10 font12 fontWeight">
                            <span class="colorText">{{ $t("note") }}：</span>
                            <span class="colorText">{{ dishData.notes |empty }}</span>
                        </div>
                        <!-- <div class="col-100 top15 dishSelect">
                                是否外带
                                <img :src="getImgUrl(imgList[orderStatus])"  :key="orderStatus" alt="" width="15" @click="changeStatus()"><span class="color-lightbrown font16 left5">外带</span>
                        </div> -->
                        <div class="col-100">
                            <hr />
                        </div>
                        <div class="col-50 color-black font14">
                            <span>{{ $t("shopcart.dishTotal") }}</span>
                        </div>
                        <div
                            class="col-50 right-style color-darkbrown fontWeight"
                        >
                            <span>{{
                                dishData.dish_original_total_price | price
                            }}</span>
                        </div>
                        <div class="col-100">
                            <div
                                class="row"
                                v-if="
                                    dishPmtList != null && dishPmtType == 'dish'
                                "
                            >
                                <div
                                    class="col-50 top10 font12"
                                    style="color: #808080"
                                >
                                    <span>{{ $t("shopcart.dishPmt") }}</span>
                                </div>
                                <div
                                    class="col-50 top10 right-style font12"
                                    style="color: #808080"
                                >
                                    <span
                                        >-{{
                                            dishData.total_dish_pmt_price
                                                | price
                                        }}</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div
                            class="col-100"
                            v-for="(item, index) in dishPmtList"
                            :key="index"
                        >
                            <ul
                                class="font12 dishPmt"
                                style="color: #808080"
                                v-if="item.pmt_type == 'dish'"
                            >
                                <li>
                                    <span>{{ pmtValue[item.pmt_name] }}</span>
                                    <span class="right"
                                        >-{{ item.pmt_price | price }}</span
                                    >
                                </li>
                            </ul>
                        </div>
                        <div class="col-50 color-black top10 font14">
                            <span>{{ $t("shopcart.orderMoney") }}：</span>
                        </div>
                        <div
                            class="col-50 top10 right-style color-darkbrown fontWeight font14"
                        >
                            <span>{{ dishData.should_pay | price }}</span>
                        </div>
                    </div>
                    <div v-if="showDetails">
                        <div class="row font12 top10"  v-if="dishPmtType == 'order'&&dishPmtList != null">
                            <div class="col-100">
                                <div
                                    class="row"
                                   
                                >
                                    <div class="col-50 color-black">
                                        <span>{{
                                            $t("shopcart.checkoutPmt")
                                        }}</span>
                                    </div>
                                    <div
                                        class="col-50 right-style color-darkbrown fontWeight"
                                    >
                                        <span
                                            >-{{
                                                dishData.total_off | price
                                            }}</span
                                        >
                                    </div>
                                </div>
                            </div>
                            <div
                                class="col-100"
                                v-for="(item, index) in dishPmtList"
                                :key="index"
                            >
                                <ul
                                    class="font12 dishPmt"
                                    style="color: #808080"
                                    v-if="item.pmt_type == 'order'"
                                >
                                    <li>
                                        <span>{{
                                            pmtValue[item.pmt_name]
                                        }}</span>
                                        <span
                                            v-if="item.pmt_name == 'discount'"
                                        >
                                            <span v-if="item.member == '1'">
                                                ({{ dishData.discount_reason }}
                                                {{
                                                    Number(
                                                        dishData.discount_ratio *
                                                            100
                                                    )
                                                }}%{{ $t("dish.discount") }}
                                            </span>
                                            <span v-else>
                                                ({{
                                                    Number(
                                                        dishData.discount_ratio *
                                                            100
                                                    )
                                                }}%{{ $t("dish.discount") }},{{
                                                    dishData.discount_reason
                                                }}
                                            </span>
                                            <span
                                                v-show="
                                                    item.no_pmt_price != null
                                                "
                                                >,{{ $t("dish.notPrice") }}：{{
                                                    item.no_pmt_price | price
                                                }}</span
                                            >)</span
                                        >
                                        <span v-if="item.pmt_name == 'reduce'"
                                            >({{ item.note }})</span
                                        >
                                        <span v-if="item.pmt_name == 'coupon'"
                                            >({{ item.note }})</span
                                        >
                                        <span
                                            v-if="item.pmt_name == 'point_user'"
                                            >({{ item.note }})</span
                                        >
                                        <span class="right"
                                            >-{{ item.pmt_price | price }}</span
                                        >
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="row top10 font12">
                            <div
                                class="col-80 colorText"
                                style="color: #fe7d3b"
                            >
                                <span class="color-gray font12">
                                    {{ $t("SST") }}
                                    <span>{{ dishData.taxes_rate }}</span
                                    >%：</span
                                >
                            </div>
                            <div class="col-20 right-style">
                                <span>{{ dishData.sst_price | price }}</span>
                            </div>
                        </div>
                        <div class="row top10 font12">
                            <div
                                class="col-80 colorText font12"
                                style="color: #fe7d3b"
                            >
                                <span class="color-gray">
                                    {{ $t("SC") }}
                                    {{ dishData.cost_rate }}%
                                </span>
                                <span class="color-gray">{{
                                    dishData.take_out_service_charge==1?"":Number(dishData.total_take_price) > 0? "(" +stringutils.formatPrice(dishData.total_take_price)+$t("shopcart.excludePro") +")": ""
                                }}</span>：
                            </div>
                            <div class="col-20 right-style">
                                <span>{{ dishData.server_price | price }}</span>
                            </div>
                        </div>
                        <div class="row top10 font14">
                            <div class="col-50 color-darkbrown fontWeight">
                                <span>{{ $t("shopcart.amountPay") }}</span>
                            </div>
                            <div
                                class="col-50 right-style color-darkbrown fontWeight font14"
                            >
                                <span>{{ dishData.is_pay | price }}</span>
                            </div>
                        </div>
                        <div class="row top10 font14">
                            <div class="col-50 color-darkbrown fontWeight">
                                <span>{{ $t("shopcart.paymentType") }}</span>
                            </div>
                            <div
                                class="col-50 right-style color-darkbrown fontWeight font14"
                            >
                                <div class="row">
                                    <div class="col-100">
                                        <span>{{
                                            dishData.pay_type_name
                                        }}</span>
                                        <span v-show="dishData.pay_type == 28"
                                            >({{
                                                dishData.actually_pay | price
                                            }})</span
                                        >
                                        <span v-show="dishData.pay_type == 36"
                                            >({{
                                                dishData.pay_type_amount
                                                    | price
                                            }})</span
                                        >
                                    </div>
                                    <div
                                        class="col-100"
                                        v-show="
                                            dishData.pay_type2 != -1 &&
                                            dishData.pay_type2_amount != 0
                                        "
                                    >
                                        <span>{{
                                            dishData.pay_type2_name
                                        }}</span>
                                        <span v-if="dishData.pay_type2 == 28"
                                            >({{
                                                dishData.actually_pay | price
                                            }})</span
                                        >
                                        <span v-else
                                            >({{
                                                dishData.pay_type2_amount
                                                    | price
                                            }})</span
                                        >
                                    </div>
                                </div>
                            </div>
                            <div
                                class="col-100 font12 top10"
                                style="color: #808080"
                                v-if="
                                    dishData.pay_type == '28' ||
                                    dishData.pay_type2 == '28'
                                "
                            >
                                <ul style="margin-left: 10px">
                                    <li>
                                        <span>{{
                                            $t("shopcart.cashChange")
                                        }}</span
                                        ><span class="right">{{
                                            dishData.change_return | price
                                        }}</span>
                                    </li>
                                    <li>
                                        <span>{{
                                            $t("shopcart.cashZero")
                                        }}</span
                                        ><span
                                            class="right"
                                            v-if="dishData.left_deal > 0"
                                            >-{{
                                                dishData.left_deal | price
                                            }}</span
                                        ><span
                                            class="right"
                                            v-else-if="dishData.left_deal == 0"
                                            >{{
                                                dishData.left_deal | price
                                            }}</span
                                        ><span class="right" v-else
                                            >+{{
                                                (dishData.left_deal * -1)
                                                    | price
                                            }}</span
                                        >
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="row top10 font14">
                            <div class="col-50 color-darkbrown fontWeight">
                                <span>{{ $t("shopcart.amountTotal") }}</span>
                            </div>
                            <div
                                class="col-50 right-style color-darkbrown fontWeight"
                            >
                                <span>{{ dishData.total_price | price }}</span>
                            </div>
                        </div>
                        <div class="row top10 font12">
                            <div class="col-50 colorText">
                                <span>{{ $t("shopcart.payName") }}：</span>
                            </div>
                            <div class="col-50 right-style colorText">
                                <span
                                    v-if="
                                        dishData.pay_type == '28' ||
                                        dishData.pay_type2 == '28'
                                    "
                                    >--</span
                                >
                                <span v-else-if="dishData.pay_operator_id == ''"
                                    >--</span
                                >
                                <span
                                    v-else-if="
                                        dishData.pay_type2 == '74' ||
                                        dishData.pay_type2 == '75' ||
                                        dishData.pay_type == '74' ||
                                        dishData.pay_type == '75'
                                    "
                                    >{{ dishData.pay_operator_name }}</span
                                >
                                <span v-else>{{
                                    dishData.pay_operator_id
                                }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="row top10 font12">
                        <div class="col-100 center-style" @click="showClick">
                            <span v-if="!showDetails" class="font12 colorText">
                                {{ $t("shopcart.show") }}
                                <img
                                    src="../../../../style/images/foldUp.png"
                                    alt=""
                                    width="8"
                                />
                            </span>
                            <span v-else class="font12 colorText">
                                {{ $t("shopcart.hide") }}
                                <img
                                    src="../../../../style/images/up.png"
                                    alt=""
                                    width="8"
                                />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
const imgList = [1, 2, 3];
import VipLogin from "../../../shopcart/components/VipLogin";
export default {
    name: "BillTitle",
    components: {
        VipLogin,
    },
    props: {
        dishData: {
            type: Object,
            default: null,
        },
        dishPmtList: {
            type: Array,
            default: null,
        },
        dishPmtType: {
            type: String,
            default: "",
        },
        dishStatus: {
            type: Number,
            default: 0,
        },
        orderStatus: {
            type: Number,
            default: 0,
        },
        dishCook: {
            type: Number,
            default: 0,
        },
        qrcode: {
            type: String,
            default: "",
        },
    },
    computed: {
        curentStore() {
            //console.log('curentStore')
            return this.$store.getters.curentStore;
        },
        language: {
            get() {
                return this.$store.getters.language;
            },
            set(val) {},
        },
        storeTakeOut() {
            return this.$store.getters.storeTakeOut;
        },
        isYuYue(){
            return this.$store.getters.isYuYue;
        },
        yuYueTime(){
            return this.$store.getters.yuYueTime;
        },
    },
    data() {
        return {
            imgList,
            showDetails: false,
            waidaiChecked: false,
            dianmaSet: true,
            //优惠名称
            pmtValue: {
                on_sale: this.$t("shopcart.dishSpecial"),
                member_price: this.$t("shopcart.dishVip"),
                xoff2nd: this.$t("shopcart.twoPmt"),
                manual_give: this.$t("shopcart.shoudongzengcai"),
                buy_give: this.$t("shopcart.buyPmt"),
                discount: this.$t("shopcart.orderPmt"),
                reduce: this.$t("shopcart.customPrice"),
                coupon: this.$t("shopcart.coupon"),
                point_user: this.$t("shopcart.vipDiscount"),
                manual_discount: this.$t("shopcart.shoudongOff"),
            },
            qucanCode: false,
        };
    },
    methods: {
        getIsAfter() {
            return this.stringutils.isAfter(this.curentStore);
        },
        getPayAfterBool() {
            return !this.stringutils.isAfter(this.curentStore);
        },
        showClick() {
            this.showDetails = !this.showDetails;
        },
        getImgUrl(i) {
            return require("../../../../style/images/takeOut" + i + ".png");
        },
        changeStatus() {
            this.$emit("changeStatus");
        },
        showWaidai() {
            this.$emit("waidaiShow", this.waidaiChecked);
        },
    },
    created() {
        if (
            this.qrcode[0] == "D" &&
            this.qrcode[1] == "E" &&
            this.qrcode[2] == "P" &&
            this.qrcode[3] == "X" &&
            this.qrcode[4] == "_"
        ) {
            this.dianmaSet = false;
            this.qucanCode = true;
        }
    },
};
</script>
<style scoped>
.card-header {
    height: 0px;
}
hr {
    width: 100%;
    height: 1px;
    border: 0px;
    background: #eff1f2;
    margin: 12px 0px;
}
.colorText {
    color: #808080 !important;
}
.right {
    float: right;
}
.dishPmt {
    margin-left: 20px;
}
.dishPmt li {
    margin-top: 10px;
    list-style-type: disc;
}
.card-header:after {
    height: 0px !important;
}
</style>
