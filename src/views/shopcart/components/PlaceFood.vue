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
            <div class="card-content">
                <div class="card-content-inner" style="padding-top: 15px">
                    <div class="row no-gutter">
                        <div class="col-70">
                            <div class="row no-gutter">
                                <div
                                    class="col-100 font14"
                                    v-show="qucanCode"
                                >   
                                    <span v-if="qrcode.substring(0, 4) == 'DEPX'"  style="color: #505050;padding-right:25px;">{{storeTakeOut=='0'?$t('start.tangshi'):storeTakeOut=='1'?$t('start.ziqu'):$t('start.waisong')}}</span>
                                    <span style="color: #eb3c1c">{{ $t("waidaiMsg.qucanNo") }}</span>
                                    <span style="color: #eb3c1c">{{ datas.take_food_code }}</span>
                                </div>
                                <div
                                    class="col-100 font12 color-gray fontWeight"
                                    v-show="tableDinerName"
                                >
                                    <span>{{ $t("shopcart.tableID") }}：</span>
                                    <span class="font16">{{
                                        datas.table_name
                                    }}</span>
                                    &nbsp;&nbsp;&nbsp;
                                    <span
                                        >{{ $t("shopcart.dinnerNum") }}：</span
                                    >
                                    <span
                                        class="font16"
                                        v-if="datas.diner_num >= 10"
                                        >{{ datas.diner_num }}</span
                                    >
                                    <span class="font16" v-else
                                        >0{{ datas.diner_num }}</span
                                    >
                                </div>
                                <div class="col-100 top10 fontWeight" v-if="String(isYuYue)=='true'&&yuYueTime!=''" >
                                    <span class="color-gray font12">{{$t('start.yuyueTime')}}：</span>
                                    <span class="color-gray font12">{{
                                        yuYueTime
                                    }}</span>
                                </div>
                                <div class="col-100 top10 fontWeight">
                                    <span class="color-gray font12"
                                        >{{
                                            $t("shopcart.create_time")
                                        }}：</span
                                    >
                                    <span class="color-gray font12">{{
                                        datas.create_time
                                    }}</span>
                                </div>
                            </div>
                        </div>
                        <!-- 仅点餐和餐后支付为“已下单”标签 -->
                        <div class="col-30 labelCss center">
                            <!-- <div v-if="order_mode=='3'|| !getPayAfterBool() || orderSourceStar" style="display:inline-block;margin-right:10px" class="left10">
								<span v-if="$store.getters.language == 'zh_CN'">
								<img v-if="dishStatus == 0 || dishCook == 0" src="../../../style/images/yixiadan.png" alt  width="54" />
								<img v-else-if="dishStatus == 1 || dishCook == 1" src="../../../style/images/yixiachu.png" alt  width="54" />
								</span>
								<span v-else-if="$store.getters.language == 'en_US' || $store.getters.language == 'ms_MY'">
								<img v-if="dishStatus == 0 || dishCook == 0" src="../../../style/images/yixiadanEN.png" alt  width="54" />
								<img v-else-if="dishStatus == 1 || dishCook == 1" src="../../../style/images/yixiachuEN.png" alt  width="54" />
								</span> 
							</div>  -->
                            <div
                                style="display: inline-block"
                                v-if="datas.take_out == 1"
                            >
                                <span v-if="$store.getters.language == 'zh_CN'">
                                    <img
                                        src="../../../style/images/takeAwayCN.png"
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
                                        src="../../../style/images/takeAwayEN.png"
                                        alt
                                        width="55"
                                    />
                                </span>
                            </div>
                        </div>
                        <div class="col-100 top10 fontWeight">
                            <span class="color-gray font12"
                                >{{ $t("note") }}：</span
                            >
                            <span class="color-gray font12">{{
                                datas.notes | empty
                            }}</span>
                        </div>
                        <div class="col-100 top15 dishSelect">
                            <!-- 是否外带 -->
                            <!-- <img :src="getImgUrl(imgList[orderStatus])"  :key="orderStatus" alt="" width="15" @click="changeStatus()"><span class="color-lightbrown font16 left5">外带</span> -->
                            <!-- <van-checkbox v-model="waidaiChecked" @change="showWaidai" shape="square" class="color-lightbrown" style="position:relative;top:-3px">外带</van-checkbox> -->
                        </div>
                        <hr />
                    </div>
                    <div class="row">
                        <div class="col-50">
                            <span class="color-darkbrown font14 fontWeight">{{
                                $t("shopcart.dishTotal")
                            }}</span>
                        </div>
                        <div class="col-50 right-style">
                            <span
                                class="color-darkbrown font14 fontWeight"
                                >{{
                                    datas.dish_original_total_price | price
                                }}</span
                            >
                        </div>
                        <div
                            class="col-100"
                            v-if="
                                dishPmt != undefined &&
                                dishPmt != null &&
                                dishPmt.length > 0
                            "
                        >
                            <div class="row">
                                <div class="col-50 top5">
                                    <span
                                        class="font12 fontWeight"
                                        style="color: #808080"
                                        >{{ $t("shopcart.pmtTotal") }}</span
                                    >
                                </div>
                                <div class="col-50 right-style top5">
                                    <span
                                        class="font12 fontWeight"
                                        style="color: #808080"
                                        >-{{
                                            (Number( datas.total_dish_pmt_price) +Number(datas.total_off)) | price
                                        }}</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div
                            class="col-100"
                            v-for="(item, index) in dishPmt"
                            :key="index"
                        >
                            <ul class="font12 dishPmt" style="color: #808080">
                                <li>
                                    <span>{{ pmtValue[item.pmt_name] }}</span>
                                    <span v-if="item.pmt_name == 'discount'">
                                        <span v-if="item.member == '1'">
                                            ({{ datas.discount_reason }}
                                            {{
                                                Number(
                                                    datas.discount_ratio * 100
                                                )
                                            }}%{{ $t("dish.discount") }}
                                        </span>
                                        <span v-else>
                                            ({{
                                                Number(
                                                    datas.discount_ratio * 100
                                                )
                                            }}%{{ $t("dish.discount") }},{{
                                                datas.discount_reason
                                            }}
                                        </span>
                                        <span v-show="item.no_pmt_price != null"
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
                                    <span v-if="item.pmt_name == 'point_user'"
                                        >({{ item.note }})</span
                                    >
                                    <span class="right"
                                        >-{{ item.pmt_price | price }}</span
                                    >
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="top10 row fontWeight">
                        <div class="col-80">
                            <span class="color-gray font12">
                                {{ $t("SST") }}
                                <span>{{ datas.taxes_rate }}</span>
                                %：
                            </span>
                        </div>
                        <div class="col-20 right-style">
                            <span
                                class="color-gray font12"
                                >{{ datas.sst_price | price }}</span
                            >
                        </div>
                    </div>
                    <div class="top10 row fontWeight">
                        <div class="col-80 color-gray font12">
							<span>
								{{ $t("SC") }}
								{{ datas.cost_rate }}%
							</span>
							<span>{{
								datas.take_out_service_charge==1?"":Number(datas.total_take_price) > 0? "(" +stringutils.formatPrice(datas.total_take_price)+$t("shopcart.excludePro") +")": ""
							}}</span>：
                        </div>
                        <div class="col-20 right-style">
                            <span
                                class="color-gray font12"
                                >{{ datas.server_price | price }}</span
                            >
                        </div>
                    </div>
                    <div
                        class="top20 row"
                        style="height: 30px; line-height: 30px"
                    >
                        <div class="col-60">
                            <span
                                class="color-purered font14 fontWeight"
                            >
                                <span style="color: #eb3b1c">{{
                                    $t("shopcart.daifu")
                                }}</span
                                >&nbsp;
                                <span class="font18">{{
                                    datas.total_price | price
                                }}</span>
                            </span>
                        </div>
                        <div class="col-40 right-style" v-show="dianmaSett">
                            <div v-if="!orderSourceStar" @click="payClick">
                                <a class="button button-round pay">{{
                                    $t("shopcart.goPay")
                                }}</a>
                            </div>

                            <div v-else @click="callClick">
                                <button
                                    class="button button-round pay"
                                    @click="sendCode"
                                    :disabled="!show"
                                >
                                    <span class="checkbox-text" v-show="show">{{
                                        $t("hujiaofuwu")
                                    }}</span>
                                    <span class="checkbox-text" v-show="!show"
                                        >{{ count }} s</span
                                    >
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
const imgList = [1, 2, 3];
import VipLogin from "../components/VipLogin";
export default {
    name: "pacefood",
    components: {
        VipLogin,
    },
    computed: {
        curentStore() {
            //console.log('curentStore')
            return this.$store.getters.curentStore;
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
    props: {
        datas: {
            type: Object,
            default: null,
        },
        cart_remark: {
            type: String,
            default: null,
        },
        order_mode: {
            type: String,
            default: "0",
        },
        dishPmt: {
            type: Array,
            default: [],
        },
        dishStatus: {
            type: Number,
            default: 0,
        },
        dishCook: {
            type: Number,
            default: 0,
        },
        is_take_out: {
            type: Number,
            default: 0,
        },
        fixToken: {
            type: String,
            default: "",
        },
        order_source: {
            type: String,
            default: "",
        },
        qrcode: {
            type: String,
            default: "",
        },
        orderTb_id: {
            type: Number,
            default: 0,
        },
        orderTb_name: {
            type: String,
            default: "",
        },
        orderStatus: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            show: true,
            count: 0,
            waidaiChecked: false,
            imgList,
            dianmaSett: true,
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
            tableDinerName: true,
            qucanCode: false,
            orderSourceStar: false,
            couponShow: false,
        };
    },
    methods: {
        getImgUrl(i) {
            return require("../../../style/images/takeOut" + i + ".png");
        },
        changeStatus() {
            // 状态变为已下厨不可编辑
            if (this.dishStatus == 1 || this.dishCook == 1) {
                return;
            }
            this.$emit("changeStatus");
        },
        showWaidai() {
            this.$emit("waidaiShow", this.waidaiChecked);
        },
        getPayAfterBool() {
            return !this.stringutils.isAfter(this.curentStore);
        },
        payClick() {
            this.$emit("payClick");
        },
        callClick() {
            this.$emit("callClick");
        },
        getPublicModel() {
            return this.stringutils.getPublicPayModel();
        },
        sendCode() {
            if (this.curentStore.prompt == "1") {
                this.$dialog
                    .confirm({
                        message: this.$t("shopcart.qiantaijiezhang"),
                        confirmButtonColor: "#EB3B1C",
                    })
                    .then(() => {
                        this.send();
                    })
                    .catch(() => {
                        return;
                        // on cancel
                    });
            } else {
                this.$dialog
                    .confirm({
                        message: this.$t("shopcart.fuwuyuanhujiao"),
                        confirmButtonText: this.$t("shopcart.true"),
                        confirmButtonColor: "#EB3B1C",
                    })
                    .then(() => {
                        this.send();
                    })
                    .catch(() => {
                        return;
                        // on cancel
                    });
            }
        },
        send() {
            // 验证码倒计时
            this.curentStore.tb_id = this.orderTb_id;
            this.curentStore.tb_name = this.orderTb_name;
            let data = {
                dep_id: this.curentStore.dep_id,
                company_id: this.curentStore.company_id,
                param: this.curentStore.tb_id,
                str_param: this.curentStore.tb_name,
                str_param1: this.$t("checkout"),
                str_param2: 5,
            };
            let that = this;

            this.request.callBell(data, function (res) {
                if (res.code == "1") {
                    that.toast.info(that.$t("bellSuccess"));
                    {
                        if (that.curentStore.call_interval > 0) {
                            that.count = that.curentStore.call_interval;
                            that.show = false;
                            that.timer = setInterval(() => {
                                if (that.count > 0 && that.count <= 60) {
                                    that.count--;
                                } else {
                                    that.show = true;
                                    clearInterval(that.timer);
                                    that.timer = null;
                                }
                            }, 1000);
                        }
                    }
                } else {
                    that.toast.fail(res.msg);
                }
            });
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
            this.dianmaSett = false;
            this.tableDinerName = false;
            this.qucanCode = true;
        }
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
    },
};
</script>
<style scoped>
.pay {
    background: linear-gradient(to bottom left, #ff8237, #f4257c, #ea3d15);
    color: white;
    border: 0;
    float: right;
    font-size: 12px;
    line-height: 30px;
}
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
.card-footer:before {
    height: 0px !important;
}
.right {
    float: right;
}
.dishPmt {
    margin-left: 10px;
}
.dishPmt li {
    margin-top: 10px;
    /* list-style-type: disc; */
}
.dishPmt li::before {
    content: ".";
    display: inline-block;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    font-size: 10px;
    position: relative;
    top: -5px;
}
.labelCss {
    position: absolute;
    right: 0;
}
.card-header:after {
    height: 0px !important;
}
.color-gray {
    color: #808080;
}
</style>
