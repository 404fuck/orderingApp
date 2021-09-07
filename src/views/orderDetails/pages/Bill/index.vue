<!--
 * @Author: zzt
 * @Date: 2021-04-01 19:19:32
 * @LastEditTime: 2021-06-26 17:42:31
 * @LastEditors: Please set LastEditors
 * @Description: 订单详情
 * @FilePath: \sjoyOrderingApp\src\views\shopcart\pages\Bill\index.vue
-->
<template>
    <div class="main-layout">
        <RefreshBtn @refreshClick="refreshClick"></RefreshBtn>
        <div>
            <div class="row boxBg">
                <!-- 扫桌码 -->
                <div
                    class="col-100"
                    v-if="TableCode == true"
                    style="margin: 20px 20px 10px 20px"
                >
                    <div class="item-content" v-if="order_mode != 1">
                        <div
                            class="item-media"
                            style="
                                display: inline-block;
                                vertical-align: middle;
                            "
                        >
                            <span v-if="orderInfo.order_status == 1">
                                <img
                                    v-if="orderInfo.table_status != 0"
                                    src="../../../../style/images/paid.png"
                                    alt=""
                                    width="48"
                                />
                                <img
                                    v-else
                                    src="../../../../style/images/yiwancheng.png"
                                    alt=""
                                    width="48"
                                />
                            </span>
                            <span v-else-if="orderInfo.order_status == 3">
                                <img
                                    src="../../../../style/images/yituikuan.png"
                                    alt=""
                                    width="48"
                                />
                            </span>
                            <span v-else-if="orderInfo.table_status == 0">
                                <img
                                    src="../../../../style/images/yiwancheng.png"
                                    alt=""
                                    width="48"
                                />
                            </span>
                        </div>
                        <div
                            class="item-inner left5"
                            style="
                                display: inline-block;
                                vertical-align: middle;
                            "
                        >
                            <div class="row" style="display: inline-block">
                                <div class="col-100 font14 fontWeight">
                                    <span v-if="orderInfo.order_status == 1">
                                        <span
                                            v-if="orderInfo.table_status != 0"
                                            >{{ $t("vipMsg.yifukuan") }}</span
                                        >
                                        <span v-else>{{
                                            $t("vipMsg.yiwancheng")
                                        }}</span>
                                    </span>
                                    <span
                                        v-else-if="orderInfo.order_status == 3"
                                        >{{ $t("vipMsg.youtuikuan") }}</span
                                    >
                                    <span
                                        v-else-if="orderInfo.table_status == 0"
                                        >{{ $t("vipMsg.yiwancheng") }}</span
                                    >
                                </div>
                                <div
                                    class="col-100 font12"
                                    style="color: #505050"
                                >
                                    <span v-if="orderInfo.order_status == 1">
                                        <span
                                            v-if="orderInfo.table_status != 0"
                                            >{{ $t("vipMsg.welco") }}</span
                                        >
                                        <span v-else>{{
                                            $t("vipMsg.welcAgain")
                                        }}</span>
                                    </span>
                                    <span
                                        v-else-if="orderInfo.order_status == 3"
                                        >{{ $t("vipMsg.storeRefund") }}
                                        {{
                                            orderInfo.refund_price | price
                                        }}</span
                                    >
                                    <span
                                        v-else-if="orderInfo.table_status == 0"
                                        >{{ $t("vipMsg.welcAgain") }}</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item-content" v-else>
                        <div
                            class="item-media"
                            style="
                                display: inline-block;
                                vertical-align: middle;
                            "
                        >
                            <span v-if="scanStatus == '1'">
                                <!-- 制作中 -->
                                <span v-if="havePrint == '1'">
                                    <span v-if="orderInfo.table_status == 0">
                                        <img
                                            src="../../../../style/images/yiwancheng.png"
                                            alt=""
                                            width="48"
                                        />
                                    </span>
                                    <span v-else>
                                        <img
                                            src="../../../../style/images/zhizuozhong.png"
                                            alt=""
                                            width="48"
                                        />
                                    </span>
                                </span>
                                <span v-else>
                                    <span v-if="orderInfo.table_status == 0">
                                        <img
                                            src="../../../../style/images/yiwancheng.png"
                                            alt=""
                                            width="48"
                                        />
                                    </span>
                                    <!-- 已接单 -->
                                    <span v-else
                                        ><img
                                            src="../../../../style/images/yijiedan.png"
                                            alt=""
                                            width="48"
                                    /></span>
                                </span>
                            </span>
                            <!-- 已拒单 -->
                            <img
                                v-else-if="scanStatus == '2'"
                                src="../../../../style/images/yijujue.png"
                                alt=""
                                width="48"
                            />
                            <!-- 已下单 -->
                            <span
                                v-else-if="dishStatusData == 0 || dishCook == 0"
                            >
                                <img
                                    v-if="orderInfo.table_status == 0"
                                    src="../../../../style/images/yiwancheng.png"
                                    alt=""
                                    width="48"
                                />
                                <img
                                    v-else
                                    src="../../../../style/images/order.png"
                                    alt=""
                                    width="48"
                                />
                            </span>
                        </div>
                        <div
                            class="item-inner left5"
                            style="
                                display: inline-block;
                                vertical-align: middle;
                            "
                        >
                            <div class="row" style="display: inline-block">
                                <div class="col-100 font14 fontWeight">
                                    <span v-if="scanStatus == '1'">
                                        <!-- 制作中 -->
                                        <span v-if="havePrint == '1'">
                                            <span
                                                v-if="
                                                    orderInfo.table_status == 0
                                                "
                                                >{{
                                                    $t("vipMsg.yiwancheng")
                                                }}</span
                                            >
                                            <span v-else>{{
                                                $t("vipMsg.zhizuo")
                                            }}</span>
                                        </span>
                                        <!-- 已接单 -->
                                        <span v-else>
                                            <span
                                                v-if="
                                                    orderInfo.table_status == 0
                                                "
                                                >{{
                                                    $t("vipMsg.yiwancheng")
                                                }}</span
                                            >
                                            <span v-else>{{
                                                $t("vipMsg.yijiedan")
                                            }}</span>
                                        </span>
                                    </span>
                                    <span v-else-if="scanStatus == '2'">
                                        <!-- {{dishStatusData}} -->
                                        <span
                                            v-if="orderInfo.order_status == 5"
                                            >{{ $t("dish.judantuikuan") }}</span
                                        >
                                        <span v-else>{{
                                            $t("dish.judan")
                                        }}</span>
                                    </span>
                                    <span
                                        v-else-if="
                                            dishStatusData == 0 || dishCook == 0
                                        "
                                    >
                                        <span
                                            v-if="orderInfo.table_status == 0"
                                            >{{ $t("vipMsg.yiwancheng") }}</span
                                        >
                                        <span v-else>{{ $t("Yxiadan") }}</span>
                                    </span>
                                </div>
                                <div
                                    class="col-100 font12"
                                    style="color: #505050"
                                >
                                    <span v-if="scanStatus == '1'">
                                        <!-- 制作中 -->
                                        <span v-if="havePrint == '1'">
                                            <span
                                                v-if="
                                                    orderInfo.table_status == 0
                                                "
                                                >{{
                                                    $t("vipMsg.welcAgain")
                                                }}</span
                                            >
                                            <span v-else>{{
                                                $t("vipMsg.meiwei")
                                            }}</span>
                                        </span>
                                        <!-- 已接单 -->
                                        <span v-else>
                                            <span
                                                v-if="
                                                    orderInfo.table_status == 0
                                                "
                                                >{{
                                                    $t("vipMsg.welcAgain")
                                                }}</span
                                            >
                                            <span v-else>{{
                                                $t("vipMsg.dishDo")
                                            }}</span>
                                        </span>
                                    </span>
                                    <span v-else-if="scanStatus == '2'"
                                        >{{ $t("vipMsg.sorry") }}
                                        <span>{{
                                            orderInfo.reject_reason
                                        }}</span></span
                                    >
                                    <span
                                        v-else-if="
                                            dishStatusData == 0 || dishCook == 0
                                        "
                                    >
                                        <span
                                            v-if="orderInfo.table_status == 0"
                                            >{{ $t("vipMsg.welcAgain") }}</span
                                        >
                                        <span v-else>{{
                                            $t("vipMsg.storeJIedan")
                                        }}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="col-100"
                    v-if="StoreCode == true"
                    style="margin: 20px 20px 10px 20px"
                >
                    <div class="item-content">
                        <div
                            class="item-media"
                            style="
                                display: inline-block;
                                vertical-align: middle;
                            "
                        >
                            <span v-if="scanStatus == '1'">
                                <!-- 制作中 -->
                                <span v-if="havePrint == '1'">
                                    <span>
                                        <img
                                            src="../../../../style/images/zhizuozhong.png"
                                            alt=""
                                            width="48"
                                        />
                                    </span>
                                </span>
                                <!-- 已接单 -->
                                <img
                                    v-else
                                    src="../../../../style/images/yijiedan.png"
                                    alt=""
                                    width="48"
                                />
                            </span>
                            <!-- 已拒单 -->
                            <img
                                v-else-if="scanStatus == '2'"
                                src="../../../../style/images/yijujue.png"
                                alt=""
                                width="48"
                            />
                            <!-- 已下单 -->
                            <img
                                v-else-if="dishStatusData == 0 || dishCook == 0"
                                src="../../../../style/images/order.png"
                                alt=""
                                width="48"
                            />
                        </div>
                        <div
                            class="item-inner left5"
                            style="
                                display: inline-block;
                                vertical-align: middle;
                            "
                        >
                            <div class="row" style="display: inline-block">
                                <div class="col-100 font14 fontWeight">
                                    <span v-if="scanStatus == '1'">
                                        <!-- 制作中 -->
                                        <span v-if="havePrint == '1'">{{
                                            $t("vipMsg.zhizuo")
                                        }}</span>
                                        <!-- 已接单 -->
                                        <span v-else>{{
                                            $t("vipMsg.yijiedan")
                                        }}</span>
                                    </span>
                                    <span v-else-if="scanStatus == '2'">
                                        <span
                                            v-if="orderInfo.order_status == 5"
                                            >{{ $t("dish.judantuikuan") }}</span
                                        >
                                        <span v-else>{{
                                            $t("dish.judan")
                                        }}</span>
                                    </span>
                                    <span
                                        v-else-if="
                                            dishStatusData == 0 || dishCook == 0
                                        "
                                        >{{ $t("Yxiadan") }}</span
                                    >
                                </div>
                                <div
                                    class="col-100 font12"
                                    style="color: #505050"
                                >
                                    <span v-if="scanStatus == '1'">
                                        <!-- 制作中 -->
                                        <span v-if="havePrint == '1'">{{
                                            $t("vipMsg.meiwei")
                                        }}</span>
                                        <!-- 已接单 -->
                                        <span v-else>{{
                                            $t("vipMsg.dishDo")
                                        }}</span>
                                    </span>
                                    <span v-else-if="scanStatus == '2'"
                                        >{{ $t("vipMsg.sorry") }}
                                        <span>{{
                                            orderInfo.reject_reason
                                        }}</span></span
                                    >
                                    <span
                                        v-else-if="
                                            dishStatusData == 0 || dishCook == 0
                                        "
                                        >{{ $t("vipMsg.storeJIedan") }}</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <VipLogin
                    v-if="memberPhone != null && memberPhone != ''"
                    :member_name="member_name"
                    :memberPhone="memberPhone"
                    :discount_set="discount_set"
                    :order_status="order_status"
                    :member_grade_name="member_grade_name"
                ></VipLogin>
            </div>
            <!-- 外送信息 -->
            <DeliveryInfoPanel
                v-if="storeTakeOut=='2'&&String(deliveryInfo)!=''"
                :isEditIcon='false'
            ></DeliveryInfoPanel>
            <BillTitle
                :dishCook="dishCook"
                :dishData="orderInfo"
                :dishPmtList="pmtInfo"
                :dishPmtType="pmtType"
                :qrcode="qrcode"
                :dishStatus="dishStatusData"
                :orderStatus="orderStatus"
                @changeStatus="changeStatus"
            ></BillTitle>
        </div>
        <BillMenu
            :checked="orderInfo.checked"
            @orderChecked="orderChecked"
            :dishData="orderInfo"
            :orderStatus="orderStatus"
            :waidaiImg="waidaiImg"
            :waidaiMsg="waidaiMsg"
        ></BillMenu>
        <BillBottom :dishData="orderInfo"></BillBottom>
        <div
            v-show="orderStatus == 1"
            class="row no-gutter"
            style="
                position: fixed;
                bottom: 0;
                width: 100%;
                background: #ffffff;
                height: 50px;
                line-height: 50px;
                z-index: 999;
            "
        >
            <div class="col-33 center">
                <van-checkbox
                    v-model="allSelect"
                    @click="allSelectBtn"
                    shape="square"
                    class="color-lightbrown"
                    >{{ $t("waidaiMsg.allSelect") }}</van-checkbox
                >
            </div>
            <div class="col-33">
                <button class="cancelWaidaiBtn" style="" @click="cancelBtn">
                    {{ $t("waidaiMsg.cancel") }}
                </button>
            </div>
            <div class="col-33">
                <button class="confirmWaidaiBtn" style="" @click="confirmBtn">
                    {{ $t("waidaiMsg.confirm") }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import BillTitle from "../../components/bill/BillTitle";
import BillBottom from "../../components/bill/BillBottom";
import BillMenu from "../../components/bill/BillMenu";
import RefreshBtn from "../../../shopcart/components/RefreshBtn";
import VipLogin from "../../../shopcart/components/VipLogin";
//外送信息展示
import DeliveryInfoPanel from "../../../../components/DeliveryInfoPanel";
export default {
    name: "Bill",
    components: {
        BillTitle,
        BillMenu,
        BillBottom,
        RefreshBtn,
        VipLogin,
        DeliveryInfoPanel,
    },
    data() {
        return {
            orderInfo: {},
            pmtInfo: null,
            dishStatusData: 0,
            scanStatus: 0,
            printSts: 0,
            havePrint: "",
            dishCook: 0,
            pmtType: "",
            waidaiMsg: "",
            allSelect: false,
            showAllselect: false,
            waidaiImg: false,
            waidaiDishChecked: false,
            orderStatus: 0,
            is_take_out: 0,
            qrcode: this.$store.getters.qrcode,
            member_name: "",
            memberPhone: "",
            member_grade_name: "",
            discount_set: "",
            order_status: 0,
            waidaiNum: 0,
            TableCode: false,
            StoreCode: false,
            order_mode: "",

            getSerUrl: "", //得到当前的环境url
        };
    },
    computed: {
        curentStore() {
            //console.log('curentStore')
            return this.$store.getters.curentStore;
        },
        storeTakeOut() {
            return this.$store.getters.storeTakeOut;
        },
        deliveryInfo(){
            return this.$store.getters.deliveryInfo;
        },
        language: {
            get() {
                return this.$store.getters.language;
            },
            set(val) {},
        },
        token: {
            get() {
                return this.$store.getters.token;
            },
            set(val) {},
        },
        
    },
    methods: {
        isAllSelect() {
            var arry = this.orderInfo.dish_data;
            for (let i in arry) {
                if (arry[i].checked == false || arry[i].checked == undefined) {
                    this.allSelect = false;
                    return;
                }
            }
            this.allSelect = true;
        },
        orderChecked(index) {
            var arry = this.orderInfo.dish_data;
            arry[index].checked = !arry[index].checked;
            this.orderInfo.dish_data = {};
            this.orderInfo.dish_data = arry;
            if (arry[index].checked == false) {
                this.allSelect = false;
            } else {
                this.isAllSelect();
            }
        },
        changeStatus() {
            if (this.orderStatus == 0) {
                this.orderStatus = 1;
                this.waidaiMsg = true;
            } else if (this.orderStatus == 1) {
                this.orderStatus = 0;
                this.waidaiDishChecked = false;
                this.allSelect = false;
                this.waidaiMsg = false;
            } else if (this.orderStatus == 2) {
                this.orderStatus = 1;
                this.waidaiMsg = true;
            }
        },
        // 外带是否开启控制显示
        waidaiShowSelect(msg) {
            this.waidaiMsg = msg;
            if (this.waidaiMsg == true) {
                this.showAllselect = true;
            } else {
                this.showAllselect = false;
            }
        },
        // 完成操作
        confirmBtn() {
            this.waidaiImg = true;
            this.waidaiConfirm();
        },
        // 选择外带菜品
        waidaiConfirm() {
            let data = {
                dep_id: this.curentStore.dep_id,
                table_id: this.curentStore.tb_id, //桌子id
                list: [], //菜品id
                flag: "order",
                token: this.$route.query.token,
            };
            var listIndex = 0;
            for (let i in this.orderInfo.dish_data) {
                if (this.orderInfo.dish_data[i].checked == true) {
                    data.list[listIndex] = this.orderInfo.dish_data[
                        i
                    ].dish_id_cart;
                    listIndex++;
                }
            }
            let that = this;
            this.$http({
                method: "post",
                url: this.getSerUrl + ":18081/capis/order/setTakeDishOut",
                data: data,
            }).then((ress) => {
                var res = ress.data;
                if (res.code == "11") {
                    that.showAllselect = false;
                    that.waidaiMsg = false;
                    that.orderStatus = 2;
                    that.getOrderInfo();
                } else {
                    that.toast.fail(res.msg);
                }
            })
            .catch((err) => {
                // that.toast.error(err);
            });
        },

        shoppingCartCancelAll() {
            var arry = this.orderInfo.dish_data;
            for (let i in this.orderInfo.dish_data) {
                arry[i].checked = false;
            }
            this.orderInfo.dish_data = {};
            this.orderInfo.dish_data = arry;
        },
        shoppingCartSelectAll() {
            var arry = this.orderInfo.dish_data;
            for (let i in this.orderInfo.dish_data) {
                arry[i].checked = true;
            }
            this.orderInfo.dish_data = {};
            this.orderInfo.dish_data = arry;
        },
        // 全选外带商品
        allSelectBtn() {
            this.allSelect = !this.allSelect;
            if (this.allSelect == true) {
                this.shoppingCartSelectAll();
            } else {
                this.shoppingCartCancelAll();
            }
        },
        // 取消
        cancelBtn() {
            this.showAllselect = false;
            this.waidaiMsg = false;
            this.orderStatus = 0;
        },
        resetAttr(data) {
            let spec_detail = data.spec_detail;
            let taste_set = data.taste_set;
            let dishAdditionalSimpleVOList = data.dishAdditionalSimpleVOList;
            let boxList = data.box;

            var dish_attrs = [];

            if (this.stringutils.getJsonLength(spec_detail) > 0) {
                spec_detail = JSON.parse(spec_detail);
                for (let s in spec_detail) {
                    dish_attrs.push(spec_detail[s].spec_unit);
                }
            }
            for (let m in taste_set) {
                for (let t in taste_set[m].taste_list) {
                    if (taste_set[m].taste_list[t].checked == true) {
                        if (taste_set[m].taste_list[t].need_i18n == 1) {
                            if (this.$store.getters.language == "zh_CN") {
                                dish_attrs.push(
                                    taste_set[m].taste_list[t].name_zh
                                );
                            } else if (
                                this.$store.getters.language == "ms_MY"
                            ) {
                                dish_attrs.push(
                                    taste_set[m].taste_list[t].name_my
                                );
                            } else {
                                dish_attrs.push(
                                    taste_set[m].taste_list[t].name_en
                                );
                            }
                        } else {
                            dish_attrs.push(taste_set[m].taste_list[t].name);
                        }
                    }
                }
            }
            // if (this.stringutils.getJsonLength(taste_set) > 0) {
            //   for (let m in taste_set) {
            //     if (taste_set[m].dict_child_value.length > 0) {
            //       dish_attrs = this.stringutils.insert(
            //         dish_attrs,
            //         taste_set[m].dict_child_value,
            //         dish_attrs.length
            //       );
            //     }
            //   }
            // }

            for (let m in dishAdditionalSimpleVOList) {
                if (dishAdditionalSimpleVOList[m].adt_num > 0) {
                    if (dishAdditionalSimpleVOList[m].adt_num > 0) {
                        dish_attrs.push(
                            dishAdditionalSimpleVOList[m].add_name +
                                " ×" +
                                dishAdditionalSimpleVOList[m].adt_num
                        );
                    } else {
                        dish_attrs.push(dishAdditionalSimpleVOList[m].add_name);
                    }
                }
            }
            if (boxList != null && data.is_take_out == 1) {
                dish_attrs.push(boxList.box_name + " ×" + boxList.box_num);
            }
            return dish_attrs.join(" / ");
        },
        resetDishTaocan(data) {
            let optional_list = data.optional_list;
            let suits_list = data.suits_list;
            var dishTaocan = [];
            for (let o in optional_list) {
                for (let d in optional_list[o].dishes) {
                    if (optional_list[o].dishes[d].buy_number > 0) {
                        if (
                            optional_list[o].dishes[d].box != null &&
                            data.is_take_out == 1
                        ) {
                            dishTaocan.push(
                                optional_list[o].dishes[d].dish_name +
                                    " " +
                                    optional_list[o].dishes[d].buy_number +
                                    "" +
                                    optional_list[o].dishes[d].spec_name +
                                    "-" +
                                    optional_list[o].dishes[d].box.box_name +
                                    " ×" +
                                    optional_list[o].dishes[d].box.box_num
                            );
                        } else {
                            dishTaocan.push(
                                optional_list[o].dishes[d].dish_name +
                                    " " +
                                    optional_list[o].dishes[d].buy_number +
                                    "" +
                                    optional_list[o].dishes[d].spec_name
                            );
                        }
                    }
                }
            }
            for (let s in suits_list) {
                if (suits_list[s].weight_spec == "1") {
                    if (suits_list[s].box != null && data.is_take_out == 1) {
                        dishTaocan.push(
                            suits_list[s].dish_name +
                                " " +
                                suits_list[s].spec_detail +
                                " " +
                                suits_list[s].spec_name +
                                "-" +
                                suits_list[s].box.box_name +
                                " ×" +
                                suits_list[s].box.box_num
                        );
                    } else {
                        dishTaocan.push(
                            suits_list[s].dish_name +
                                " " +
                                suits_list[s].spec_detail +
                                " " +
                                suits_list[s].spec_name
                        );
                    }
                } else {
                    if (suits_list[s].box != null && data.is_take_out == 1) {
                        dishTaocan.push(
                            suits_list[s].dish_name +
                                " " +
                                suits_list[s].buy_number +
                                " " +
                                suits_list[s].spec_name +
                                "-" +
                                suits_list[s].box.box_name +
                                " ×" +
                                suits_list[s].box.box_num
                        );
                    } else {
                        dishTaocan.push(
                            suits_list[s].dish_name +
                                " " +
                                suits_list[s].buy_number +
                                " " +
                                suits_list[s].spec_name
                        );
                    }
                }
            }
            return dishTaocan.join(" / ");
        },
        resetdishNote(data) {
            let dish_chosen_notes = data.dish_chosen_notes;
            var dishNote = [];
            for (let n in dish_chosen_notes) {
                dishNote.push(dish_chosen_notes[n].content);
            }
            return dishNote.join(" / ");
        },
        getOrderInfo() {
            let data = {
                order_id: this.$route.query.order_id,
                token: this.$route.query.token,
            };
            let that = this;
            this.$http({
                method: "post",
                url: this.getSerUrl + ":18081/capis/order/cart/order/history",
                data: data,
            }).then((ress) => {
                var res = ress.data;
                if (res.code == "1") {
                    var arr = [];
                    let temp = res.data.data.dish_data;
                    that.orderInfo = res.data.data;
                    that.pmtInfo = res.data.data.promotions;
                    that.scanStatus = res.data.data.scan_sts; //scan_sts: 0:需手动接单，1：已接单，空字符串为不做任何处理,2:拒单
                    that.printSts = res.data.data.print_sts;
                    that.havePrint = res.data.data.have_print; //是否打印成功过,只要打印成功一次此值就变为1,之后就不在改变
                    that.order_mode = res.data.data.order_mode;
                    for (let f in that.pmtInfo) {
                        that.pmtType = that.pmtInfo[f].pmt_type;
                    }
                    for (let j in temp) {
                        let spec_detail = temp[j].spec_detail;
                        let taste_set = temp[j].taste_set;
                        let dishAdditionalSimpleVOList =
                            temp[j].dishAdditionalSimpleVOList;
                        that.dishStatusData = temp[j].dish_status;
                        that.dishCook = temp[j].dish_cook;
                        that.is_take_out = temp[j].is_take_out;
                        if (that.is_take_out == 1) {
                            temp[j].checked = true;
                            that.orderStatus = 2;
                            that.waidaiDishChecked = false;
                            that.waidaiMsg = false;
                            that.waidaiNum++;
                        }
                        var dish_attrs = [];
                        if (that.stringutils.getJsonLength(spec_detail) > 0) {
                            spec_detail = JSON.parse(spec_detail);
                            for (let s in spec_detail) {
                                dish_attrs.push(spec_detail[s].spec_unit);
                            }
                        }
                        for (let m in taste_set) {
                            for (let t in taste_set[m].taste_list) {
                                if (
                                    taste_set[m].taste_list[t].checked == true
                                ) {
                                    if (
                                        taste_set[m].taste_list[t].need_i18n ==
                                        1
                                    ) {
                                        if (
                                            that.$store.getters.language ==
                                            "zh_CN"
                                        ) {
                                            dish_attrs.push(
                                                taste_set[m].taste_list[t]
                                                    .name_zh
                                            );
                                        } else if (
                                            that.$store.getters.language ==
                                            "ms_MY"
                                        ) {
                                            dish_attrs.push(
                                                taste_set[m].taste_list[t]
                                                    .name_my
                                            );
                                        } else {
                                            dish_attrs.push(
                                                taste_set[m].taste_list[t]
                                                    .name_en
                                            );
                                        }
                                    } else {
                                        dish_attrs.push(
                                            taste_set[m].taste_list[t].name
                                        );
                                    }
                                }
                            }
                        }
                        // if (that.stringutils.getJsonLength(taste_set) > 0) {
                        //   taste_set = JSON.parse(taste_set);
                        //   for (let m in taste_set) {
                        //     if (taste_set[m].dict_child_value.length > 0) {
                        //       dish_attrs = that.stringutils.insert(
                        //         dish_attrs,
                        //         taste_set[m].dict_child_value,
                        //         dish_attrs.length
                        //       );
                        //     }
                        //   }
                        // }

                        for (let m in dishAdditionalSimpleVOList) {
                            if (dishAdditionalSimpleVOList[m].adt_num > 0) {
                                if (dishAdditionalSimpleVOList[m].adt_num > 1) {
                                    dish_attrs.push(
                                        dishAdditionalSimpleVOList[m].add_name +
                                            "×" +
                                            dishAdditionalSimpleVOList[m]
                                                .adt_num
                                    );
                                } else {
                                    dish_attrs.push(
                                        dishAdditionalSimpleVOList[m].add_name
                                    );
                                }
                            }
                        }

                        temp[j].dish_attrs = dish_attrs.join(" / ");
                        arr.push(temp[j]);
                    }
                    // 促销菜放入促销分类中
                    for (let j in res.data.data.dish_data) {
                        if (res.data.data.dish_data[j].promotion_range == "1") {
                            res.data.data.dish_data[j].dish_second_type = -1;
                            res.data.data.dish_data[j].dish_second_name =
                                "促销";
                            res.data.data.dish_data[j].dish_second_name_en =
                                "Promotional";
                        }
                    }
                    var dishSecondTypeArr = [];
                    for (let i in res.data.data.dish_data) {
                        dishSecondTypeArr.push(
                            res.data.data.dish_data[i].dish_second_type
                        );
                    }
                    dishSecondTypeArr = that.stringutils.putDuplicate(
                        dishSecondTypeArr
                    );
                    var dishArr = {};
                    var showsDishOrder = {};
                    var showsCuXiao = {};
                    var showsCuXiaoNum = 0;
                    var cuXiaoType = -1;
                    var showsDishOrderNum = 0;
                    for (let i in dishSecondTypeArr) {
                        var tag = 0;
                        for (let j in res.data.data.dish_data) {
                            if (
                                res.data.data.dish_data[j].dish_second_type ==
                                dishSecondTypeArr[i]
                            ) {
                                if (tag == 0) {
                                    res.data.data.dish_data[j].showTitle = true;
                                } else {
                                    res.data.data.dish_data[
                                        j
                                    ].showTitle = false;
                                }
                                res.data.data.dish_data[
                                    j
                                ].dish_attrs = that.resetAttr(
                                    res.data.data.dish_data[j]
                                );
                                res.data.data.dish_data[
                                    j
                                ].dishTaocan = that.resetDishTaocan(
                                    res.data.data.dish_data[j]
                                );
                                res.data.data.dish_data[
                                    j
                                ].dishNote = that.resetdishNote(
                                    res.data.data.dish_data[j]
                                );
                                tag++;

                                if (
                                    res.data.data.dish_data[j]
                                        .dish_second_type == cuXiaoType
                                ) {
                                    showsCuXiao[showsCuXiaoNum++] =
                                        res.data.data.dish_data[j];
                                } else {
                                    showsDishOrder[showsDishOrderNum++] =
                                        res.data.data.dish_data[j];
                                }
                            }
                        }
                    }
                    var showNum = 0;
                    for (let j in showsDishOrder) {
                        dishArr[showNum++] = showsDishOrder[j];
                    }
                    for (let j in showsCuXiao) {
                        dishArr[showNum++] = showsCuXiao[j];
                    }

                    that.memberPhone = that.orderInfo.member_phone;
                    that.member_name = that.orderInfo.member_name;
                    that.discount_set = that.orderInfo.discount_set;
                    that.member_grade_name = that.orderInfo.member_grade_name;
                    that.order_status = that.orderInfo.order_status;
                    that.orderInfo.dish_data = dishArr;
                    
                } else {
                    that.toast.error(res.data.msg);
                }
            })
            .catch((err) => {
                // that.toast.error(err);
            });
        },
        getServerUrl() {
            let that = this;
            let data = {
                qr_code: this.$route.query.qr_code,
            };
            this.$http({
                method: "post",
                url:
                    this.baseUrl.getBaseUrlLogin() +
                    "/api/consumer/scan/upgradeInfo",
                data: data,
            }).then((res) => {
                if (res.data.code == "1") {
                    let serverUrl = res.data.data.serverUrl;
                    that.getSerUrl = serverUrl;
                    that.$store.dispatch("setServerUrl", serverUrl);
                    that.getOrderInfo();
                } else {
                    that.toast.error(res.data.msg);
                }
            })
            .catch((err) => {
                // that.toast.error(err);
            });
            
        },
        refreshClick() {
            this.getOrderInfo();
        },
        saveLang() {
            if (this.$route.query.lang == undefined) {
                if (this.language != undefined && this.language.length > 0) {
                } else {
                    this.$store.dispatch("setLanguage", "en_US");
                    this.$i18n.locale = "en_US";

                    this.$Local("en_US");
                }
            } else {
                this.$store.dispatch("setLanguage", this.$route.query.lang);
                this.$i18n.locale = this.$route.query.lang;

                this.$Local(this.$route.query.lang);
            }
        },
    },
    created() {
        let show_href = window.location.href;
        //桌码和店码模式
        let qrCode = "";
        if (
            this.$route.query.qr_code != null &&
            this.$route.query.qr_code != undefined
        ) {
            qrCode = this.$route.query.qr_code;
            if (qrCode.substring(0, 4) == "DEPX") {
                let index = show_href.indexOf("?");
                let getUrl = show_href.substring(0, index);
                document.cookie = "showUrl===" + getUrl + "/" + qrCode;
            } else {
                document.cookie = "showUrl===" + show_href;
            }
            this.$store.dispatch("setqrcode", this.$route.query.qr_code);
        }
        
        if(this.$route.query.token!=undefined&&this.$route.query.token!=null){
            this.$store.dispatch("setToken", this.$route.query.token);
        }
        this.saveLang();
        this.getServerUrl();
        this.waidaiMsg = false;
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
<style>
.boxBg {
    background: linear-gradient(to bottom, #ffcb46, #ffde8c, #fcf8ec);
}
</style>