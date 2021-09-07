<!--
 * @Author: zzt
 * @Date: 2021-04-01 19:19:32
 * @LastEditTime: 2021-06-28 11:49:15
 * @LastEditors: Please set LastEditors
 * @Description: 订单页面
 * @FilePath: \sjoyOrderingApp\src\views\shopcart\pages\PlaceOrder\index.vue
-->
<template>
    <div class="main-layout">
        <RefreshBtn
            @refreshClick="refreshClick"
            :order_id="order_id"
        ></RefreshBtn>
        
        <div>
            <div
                class="row"
                :style="
                    order_mode != 1
                        ? 'background: linear-gradient(to bottom, #FFCB46, #FFDE8C,#FCF8EC);'
                        : 'background: none;'
                "
            >   
               
                <div
                    class="col-100"
                    v-if="TableCode == true"
                    style="margin: 20px 20px 0 20px"
                >
                    <div class="item-content" v-show="order_mode != 1">
                        <div
                            class="item-media"
                            style="
                                display: inline-block;
                                vertical-align: middle;
                            "
                        >
                            <span v-if="scanStatus == '1'">
                                <!-- 制作中 -->
                                <img
                                    v-if="havePrint == '1'"
                                    src="../../../../style/images/zhizuozhong.png"
                                    alt=""
                                    width="48"
                                />
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
                                    <span v-else-if="scanStatus == '2'">{{
                                        $t("vipMsg.yijujue")
                                    }}</span>
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
                                            dishData.reject_reason
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
                
                <div
                    class="col-100"
                    v-if="StoreCode == true"
                    style="margin: 20px 20px 0 20px"
                ></div>
                <VipLogin
                    class="top10"
                    :member_name="member_name"
                    :memberPhone="memberPhone"
                    :discount_set="discount_set"
                    :member_grade_name="member_grade_name"
                    @confirmClick="confirmClick"
                ></VipLogin>
            </div>
            <!-- 外送信息 -->
            <DeliveryInfoPanel
                v-if="storeTakeOut=='2'&&String(deliveryInfo)!=''"
                :isEditIcon='false'
            ></DeliveryInfoPanel>
            <PlaceFood
                :datas="dishData"
                :dishPmt="dishPmtData"
                :dishStatus="dishStatusData"
                :cart_remark="cart_remark"
                :order_mode="order_mode"
                :fixToken="fixToken"
                :order_source="order_source"
                :qrcode="qrcode"
                :orderTb_id="orderTb_id"
                :orderTb_name="orderTb_name"
                :dishCook="dishCook"
                :is_take_out="is_take_out"
                @waidaiShow="waidaiShowSelect"
                @payClick="payClick"
                :orderStatus="orderStatus"
                @changeStatus="changeStatus"
                @callClick="callClick"
            ></PlaceFood>
        </div>
        
        <div class="list-block media-list inset" style="margin: 12px">
            <ul>
                <li
                    class="row"
                    style="margin: 0 12px; border-bottom: 1px #eff1f2 solid"
                >
                    <div class="col-50 top10">
                        <img
                            :src="getImgUrl(imgList[orderStatus])"
                            :key="orderStatus"
                            alt=""
                            width="15"
                            @click="changeStatus()"
                        />
                        <span class="color-lightbrown font16 left5">{{
                            $t("start.waidai")
                        }}</span>
                        <span
                            v-show="orderStatus == 2 && waidaiNum > 0"
                            class="font14"
                        >
                            ({{ waidaiNum }})</span
                        >
                    </div>
                    <div class="col-50 right-style" style="line-height: 44px">
                        <span
                            class="fontWeight font13"
                            style="
                                color: #505050;
                                position: relative;
                                top: 3 px;
                            "
                            >{{ $t("shopcart.total") }}&nbsp;{{
                                dishData.total_dish_num
                            }}&nbsp;{{ $t("shopcart.num") }}</span
                        >
                    </div>
                </li>
                <PlaceMenu
                    :dishStatus="dishStatusData"
                    :dishData="dishData"
                    :waidaiImg="waidaiImg"
                    :waidaiMsg="waidaiMsg"
                    :orderStatus="orderStatus"
                    :checked="dishData.checked"
                    @orderChecked="orderChecked"
                ></PlaceMenu>
            </ul>
        </div>

        <Swiper :datas="hotDatas"></Swiper>
        <CopyURL
            :orderTb_id="orderTb_id"
            :tb_id="tb_id"
            :orderTb_name="orderTb_name"
        />
        <FloatActionBar
            style="position: fixed"
            actionType="cart"
            :beforeMealsEnd="true"
            @refreshClick="refreshClick"
            :showPayOrder="false"
            :order_mode="order_mode"
            :scan_type="scan_type"
            :fixToken="fixToken"
            :order_source="order_source"
            :orderTb_id="orderTb_id"
            :tb_id="tb_id"
            :orderTb_name="orderTb_name"
            :isOutOrder="false"
        ></FloatActionBar>

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
        <!-- 结账 -->
        <van-popup v-model="showJiezhang" style="width: 100%; height: 100%">
            <div style></div>
            <div class="row" style="position: relative; top: 20%">
                <div class="col-100 font16 center dotted" style>
                    <span>{{ $t("get bill") }}</span>
                </div>
                <div class="col-100 center" style="margin-top: 40px">
                    <button class="button btn" @click="close">
                        {{ $t("DONE") }}
                    </button>
                </div>
            </div>
        </van-popup>
        <!-- 菜单按钮 -->
        <van-popup v-model="showCaidan" style="width: 100%; height: 100%">
            <div style></div>
            <div class="row" style="position: relative; top: 73%">
                <div class="col-100" v-if="$store.getters.language == 'zh_CN'">
                    <img
                        src="../../../../style/images/popCaidan_zn.png"
                        alt=""
                        width="75"
                        style="position: absolute; left: 82%; top: 55%"
                    />
                </div>
                <div
                    class="col-100"
                    v-else-if="
                        $store.getters.language == 'en_US' ||
                        $store.getters.language == 'ms_MY'
                    "
                >
                    <img
                        src="../../../../style/images/popCaidan_en.png"
                        alt=""
                        width="75"
                        style="position: absolute; left: 82%; top: 55%"
                    />
                </div>
                <div class="col-100 font16 center dotted" style>
                    <span>{{ $t("Return to menu") }}</span>
                </div>
                <div class="col-100 center" style="margin-top: 40px">
                    <button class="button btn" @click="closeCaidan">
                        {{ $t("DONE") }}
                    </button>
                </div>
            </div>
        </van-popup>
        <van-popup v-model="selectWaidaiNum">
            <div class="card demo-card-header-pic" style="border-radius: 12px">
                <div class="row">
                    <div
                        class="col-100 center font14"
                        style="padding: 22px 0 12px 0px"
                    >
                        {{ $t("waidaiMsg.selectNum") }}
                    </div>
                </div>
                <hr style="background: #eff1f2; height: 1px; border: none" />
                <div v-for="(item, index) in optionWaiDai" :key="index">
                    <div
                        class="row"
                        style="padding: 13px 22px"
                        v-if="item.isShowAlertWaiDai == true"
                    >
                        <div
                            class="col-70 font14 fontWeight"
                            style="color: #505050"
                        >
                            {{ item.dish_name }}
                        </div>
                        <div class="col-30">
                            <img
                                src="../../../../style/images/less.png"
                                alt
                                width="18"
                                height="18"
                                @click="lessDishClick(index)"
                            />
                            <span class="text">{{ item.dish_num }}</span>
                            <img
                                v-if="
                                    item.dish_num <
                                    dishData.dish_data[index].dish_num
                                "
                                src="../../../../style/images/add.png"
                                alt
                                width="18"
                                height="18"
                                @click="addDishClick(index)"
                            />
                            <img
                                v-else
                                src="../../../../style/images/addGray.png"
                                alt
                                width="18"
                                height="18"
                            />
                        </div>
                    </div>
                </div>
                <div class="row top30 center" style="padding-bottom: 20px">
                    <div class="col-100">
                        <a
                            @click="cancelDishClick"
                            class="button button-round lineheight30 font10 cancelBtn"
                            style="display: inline-block"
                            >{{ $t("waidaiMsg.cancel") }}</a
                        >
                        <a
                            @click="clickDishItem"
                            class="button button-round lineheight30 font10 confirmBtn"
                            style="display: inline-block; margin-left: 20px"
                            >{{ $t("shopcart.true") }}</a
                        >
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import PlaceFood from "../../components/PlaceFood";
import VipLogin from "../../components/VipLogin";
import PlaceMenu from "../../components/PlaceMenu";
import FloatActionBar from "../../../../components/FloatActionBar";
import Swiper from "../../../../components/Swiper";
import RefreshBtn from "../../components/RefreshBtn";
import CopyURL from "../../../../components/CopyURL";
//外送信息展示
import DeliveryInfoPanel from "../../../../components/DeliveryInfoPanel";
const imgList = [1, 2, 3];
export default {
    name: "placeorder",
    components: {
        PlaceFood,
        PlaceMenu,
        FloatActionBar,
        Swiper,
        CopyURL,
        RefreshBtn,
        VipLogin,
        DeliveryInfoPanel,
    },
    computed: {
        curentStore() {
            return this.$store.getters.curentStore;
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
        storeTakeOut() {
            return this.$store.getters.storeTakeOut;
        },
        deliveryInfo(){
            return this.$store.getters.deliveryInfo;
        },

    },
    data() {
        return {
            showJiezhang: false,
            showCaidan: false,
            hotDatas: [],
            dishData: {},
            dishPmtData: [],
            dishStatusData: 0,
            scanStatus: 0,
            printSts: 0,
            havePrint: "",
            dishCook: 0,
            is_take_out: 0,
            cart_remark: "",
            order_mode: "",
            scan_type: "",
            fixToken: this.$store.getters.fixToken,
            order_source: this.$store.getters.order_source,
            qrcode: this.$store.getters.qrcode,
            order_id: this.$store.getters.order_id,
            tb_id: this.$store.getters.tb_id,
            orderTb_id: 0,
            orderTb_name: "",
            waidaiMsg: "",
            allSelect: false,
            showAllselect: false,
            waidaiImg: false,
            waidaiDishChecked: false,
            orderStatus: 0,
            imgList,
            member_name: "",
            memberPhone: "",
            member_grade_name: "",
            discount_set: "",
            waidaiNum: 0,
            take_out: 0,
            dishesCart: {},
            selectWaidaiNum: false,
            selectNum: 0,
            optionWaiDai: {},
            TableCode: false,
            StoreCode: false,
        };
    },
    methods: {
        getImgUrl(i) {
            return require("../../../../style/images/takeOut" + i + ".png");
        },
        isAllSelect() {
            var arry = this.dishData.dish_data;
            for (let i in arry) {
                if (arry[i].checked == false || arry[i].checked == undefined) {
                    this.allSelect = false;
                    // return;
                } else {
                    if (arry[i].dish_num > 1) {
                        this.dishData.dish_data[i].isShowAlertWaiDai = true;
                        //     this.selectWaidaiNum = true
                    } else {
                        this.dishData.dish_data[i].isShowAlertWaiDai = false;
                    }
                }
            }
            this.optionWaiDai = JSON.parse(
                JSON.stringify(this.dishData.dish_data)
            );
            // this.allSelect = true;
        },
        orderChecked(index) {
            var arry = this.dishData.dish_data;
            arry[index].checked = !arry[index].checked;
            for (let i in arry) {
                arry[i].isShowAlertWaiDai = false;
            }
            this.dishData.dish_data = {};
            this.dishData.dish_data = arry;
            if (arry[index].checked == false) {
                this.allSelect = false;
            } else {
                if (
                    arry[index].dish_cook != 1 ||
                    (arry[index].dish_status != 2 &&
                        arry[index].dish_status != 1)
                ) {
                    if (arry[index].dish_num > 1) {
                        this.dishData.dish_data[index].isShowAlertWaiDai = true;
                        this.selectWaidaiNum = true;
                    } else {
                        this.dishData.dish_data[
                            index
                        ].isShowAlertWaiDai = false;
                    }
                }

                // this.isAllSelect();
            }
            this.optionWaiDai = JSON.parse(
                JSON.stringify(this.dishData.dish_data)
            );
        },
        // 弹窗取消外带菜品
        cancelDishClick() {
            this.selectWaidaiNum = false;
            for (let k in this.dishesCart) {
                if (this.dishesCart[k].is_take_out == 0) {
                    this.dishesCart[k].checked = false;
                }
            }
        },
        lessDishClick(index) {
            if (this.optionWaiDai[index].dish_num > 1) {
                this.optionWaiDai[index].dish_num--;
            }
        },
        addDishClick(index) {
            this.optionWaiDai[index].dish_num++;
        },
        clickDishItem() {
            this.waidaiConfirm();
            this.selectWaidaiNum = false;
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
        //    选择外带菜品
        waidaiConfirm() {
            let data = {
                dep_id: this.curentStore.dep_id,
                table_id: this.curentStore.tb_id, //桌子id
                list: [], //菜品id
                flag: "order",
            };
            var listIndex = 0;
            this.dishData.dish_data = JSON.parse(
                JSON.stringify(this.optionWaiDai)
            );
            for (let i in this.optionWaiDai) {
                if (this.dishData.dish_data[i].dish_cook != 1) {
                    if (
                        this.dishData.dish_data[i].dish_status != 2 &&
                        this.dishData.dish_data[i].dish_status != 1 &&
                        this.dishData.dish_data[i].dish_status != 4
                    ) {
                        var addEle = { dish_id_cart: "", take_num: "" };
                        if (this.dishData.dish_data[i].checked == true) {
                            data.list[listIndex] = this.dishData.dish_data[
                                i
                            ].dish_id_cart;
                            addEle["dish_id_cart"] = this.dishData.dish_data[
                                i
                            ].dish_id_cart;
                            addEle["take_num"] =
                                this.dishData.dish_data[i].dish_num + "";
                            this.selectNum = addEle["take_num"];
                            data.list[listIndex] = addEle;
                            listIndex++;
                        }
                    }
                }
                this.optionWaiDai = JSON.parse(
                    JSON.stringify(this.dishData.dish_data)
                );
            }
            let that = this;
            this.request.setTakeDishOut(data, function (res) {
                if (res.code == "11") {
                    that.showAllselect = false;
                    that.waidaiMsg = false;
                    if (that.take_out == 0) {
                        that.orderStatus = 0;
                    } else {
                        that.orderStatus = 2;
                    }

                    if (that.curentStore) {
                        that.getOrderInfo();
                    }
                } else if (res.code == "-227") {
                    that.toast.fail(res.msg);
                    setTimeout(function () {
                        that.getOrderInfo();
                    }, "2000");
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        shoppingCartCancelAll() {
            var arry = this.dishData.dish_data;
            for (let i in this.dishData.dish_data) {
                arry[i].checked = false;
            }

            this.dishData.dish_data = {};
            this.dishData.dish_data = arry;
            this.optionWaiDai = JSON.parse(
                JSON.stringify(this.dishData.dish_data)
            );
        },
        shoppingCartSelectAll() {
            var arry = this.dishData.dish_data;
            for (let i in this.dishData.dish_data) {
                if (this.dishData.dish_data[i].dish_cook != 1) {
                    if (
                        this.dishData.dish_data[i].dish_status != 2 &&
                        this.dishData.dish_data[i].dish_status != 1 &&
                        this.dishData.dish_data[i].dish_status != 4
                    ) {
                        arry[i].checked = true;
                        if (arry[i].dish_num > 1) {
                            this.selectWaidaiNum = true;
                            arry[i].isShowAlertWaiDai = true;
                        }
                    }
                }
            }
            this.dishData.dish_data = {};
            this.dishData.dish_data = arry;
            this.optionWaiDai = JSON.parse(
                JSON.stringify(this.dishData.dish_data)
            );
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
        // 取消选择
        cancelBtn() {
            for (let k in this.dishesCart) {
                if (this.dishesCart[k].is_take_out == 1) {
                    this.dishesCart[k].checked = true;
                    this.orderStatus = 2;
                } else {
                    this.dishesCart[k].checked = false;
                    this.orderStatus = 0;
                }
            }
            this.showAllselect = false;
            this.waidaiMsg = false;
            this.isAllSelect();
        },
        close() {
            this.showJiezhang = false;
            this.$store.dispatch("setShowOrder", false);
            this.showCaidan = true;
        },
        closeCaidan() {
            this.showCaidan = false;
        },
        refreshClick() {
            this.getOrderInfo();
        },
        confirmClick() {
            this.getOrderInfo();
        },
        getHotDish() {
            let data = {
                dep_id: this.curentStore.dep_id,
                param1: this.curentStore.tb_id,
                company_id: this.curentStore.company_id,
            };
            let that = this;
            this.request.hotDish(data, function (res) {
                if (res.code == "1") {
                    let cart =
                        res.data.shoppingCartDetail.shopping_cart_dishes_vo;
                    for (let i in res.data.recommandVos) {
                        for (let j in cart) {
                            if (
                                res.data.recommandVos[i].dish_id ==
                                cart[j].dish_id
                            ) {
                                res.data.recommandVos[i].cart_id = j;
                            }
                        }
                    }
                    that.hotDatas = that.stringutils.getHotDishs(
                        res.data.recommandVos
                    );
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        getCartRemark() {
            let data = {
                dep_id: this.curentStore.dep_id,
                param: this.curentStore.tb_id,
            };
            let that = this;
            this.request.cartRemark(data, function (res) {
                if (res.code == "1") {
                    that.cart_remark = res.data;
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        payClick() {
            let that = this;
            that.$store.dispatch("setTotalNum", 0);
            window.location.href =
                "./shopcart.html#/payMent?token=" + that.$store.getters.token;
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
                                    " " +
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
                                    " " +
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
            for (let m in dishAdditionalSimpleVOList) {
                if (dishAdditionalSimpleVOList[m].adt_num > 0) {
                    if (dishAdditionalSimpleVOList[m].adt_num > 0) {
                        dish_attrs.push(
                            dishAdditionalSimpleVOList[m].add_name +
                                "×" +
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
        getOrderInfo() {
            if (this.$route.query.token == null) {
                this.$store.dispatch("setToken", this.$store.getters.token);
            } else {
                this.$store.dispatch("setToken", this.$route.query.token);
            }
            let data = {
                dep_id: this.curentStore.dep_id,
                param:
                    this.$store.getters.order_id == "" ||
                    this.$store.getters.order_id == null
                        ? this.curentStore.tb_id
                        : "",
                company_id: this.curentStore.company_id,
                str_param:
                    this.$route.query.order_id == null
                        ? this.$store.getters.order_id
                        : this.$route.query.order_id,
            };
            let that = this;

            this.request.orderDetails(data, function (res) {
                if (res.code == "1") {
                    var arr = [];
                    that.dishesCart = res.data.dish_data;
                    let temp = res.data.dish_data;
                    that.$store.dispatch("setorder_id", res.data.order_id_show);
                    that.take_out = res.data.take_out;
                    that.dishPmtData = res.data.promotions;
                    that.scanStatus = res.data.scan_sts; //scan_sts: 0:需手动接单，1：已接单，空字符串为不做任何处理,2:拒单
                    that.printSts = res.data.print_sts;
                    that.havePrint = res.data.have_print; //是否打印成功过,只要打印成功一次此值就变为1,之后就不在改变
                    that.waidaiNum = 0;
                    for (let j in temp) {
                        let spec_detail = temp[j].spec_detail;
                        let taste_set = temp[j].taste_set;
                        let dishAdditionalSimpleVOList =
                            temp[j].dishAdditionalSimpleVOList;
                        var dish_attrs = [];
                        that.dishStatusData = temp[j].dish_status;
                        that.dishCook = temp[j].dish_cook;
                        // that.is_take_out = temp[j].is_take_out;
                        if (temp[j].is_take_out == 1) {
                            temp[j].checked = true;
                            that.orderStatus = 2;
                            that.waidaiDishChecked = false;
                            that.waidaiMsg = false;
                            that.waidaiNum++;
                        }
                        if (that.stringutils.getJsonLength(spec_detail) > 0) {
                            spec_detail = JSON.parse(spec_detail);
                            for (let s in spec_detail) {
                                dish_attrs.push(spec_detail[s].spec_unit);
                            }
                        }
                        for (let m in taste_set) {
                            for (let t in taste_set[m].taste_list) {
                                if (taste_set[m].taste_list[t].need_i18n == 1) {
                                    if (
                                        that.$store.getters.language == "zh_CN"
                                    ) {
                                        dish_attrs.push(
                                            taste_set[m].taste_list[t].name_zh
                                        );
                                    } else if (
                                        that.$store.getters.language == "ms_MY"
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
                                    dish_attrs.push(
                                        taste_set[m].taste_list[t].name
                                    );
                                }
                            }
                        }
                        for (let m in dishAdditionalSimpleVOList) {
                            if (dishAdditionalSimpleVOList[m].adt_num > 1) {
                                dish_attrs.push(
                                    dishAdditionalSimpleVOList[m].add_name +
                                        "×" +
                                        dishAdditionalSimpleVOList[m].adt_num
                                );
                            } else {
                                dish_attrs.push(
                                    dishAdditionalSimpleVOList[m].add_name
                                );
                            }
                        }
                        temp[j].dish_attrs = dish_attrs.join(" / ");
                        arr.push(temp[j]);
                    }

                    // 促销菜放入促销分类中
                    for (let j in res.data.dish_data) {
                        if (res.data.dish_data[j].promotion_range == "1") {
                            res.data.dish_data[j].dish_second_type = -1;
                            res.data.dish_data[j].dish_second_name = "促销";
                            res.data.dish_data[j].dish_second_name_en =
                                "Promotional";
                        }
                    }

                    var dishSecondTypeArr = [];
                    for (let i in res.data.dish_data) {
                        dishSecondTypeArr.push(
                            res.data.dish_data[i].dish_second_type
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
                        for (let j in res.data.dish_data) {
                            if (
                                res.data.dish_data[j].dish_second_type ==
                                dishSecondTypeArr[i]
                            ) {
                                if (tag == 0) {
                                    res.data.dish_data[j].showTitle = true;
                                } else {
                                    res.data.dish_data[j].showTitle = false;
                                }
                                res.data.dish_data[
                                    j
                                ].dish_attrs = that.resetAttr(
                                    res.data.dish_data[j]
                                );
                                res.data.dish_data[
                                    j
                                ].dishTaocan = that.resetDishTaocan(
                                    res.data.dish_data[j]
                                );
                                res.data.dish_data[
                                    j
                                ].dishNote = that.resetdishNote(
                                    res.data.dish_data[j]
                                );

                                tag++;

                                if (
                                    res.data.dish_data[j].dish_second_type ==
                                    cuXiaoType
                                ) {
                                    showsCuXiao[showsCuXiaoNum++] =
                                        res.data.dish_data[j];
                                } else {
                                    showsDishOrder[showsDishOrderNum++] =
                                        res.data.dish_data[j];
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
                    that.dishData = res.data;
                    that.memberPhone = that.dishData.member_phone;
                    that.member_name = that.dishData.member_name;
                    that.discount_set = that.dishData.discount_set;
                    that.member_grade_name = that.dishData.member_grade_name;

                    that.orderTb_id = that.dishData.table_id;
                    that.orderTb_name = that.dishData.table_name;
                    that.dishData.dish_data = dishArr;
                    that.optionWaiDai = JSON.parse(
                        JSON.stringify(that.dishData.dish_data)
                    );
                    if (that.dishData.order_status == 1) {
                        that.toast.fail(that.$t('dish.orderPay'));
                        setTimeout(function () {
                            let strUrl = `./orderDetails.html#/?order_id=${res.data.order_id_show}&token=${that.token}&dep_id=${that.curentStore.dep_id}&qr_code=${that.qrcode}&lang=${that.language}`;
                            strUrl = strUrl.replace(/\s+/g, "");
                            window.location.href = strUrl;
                        }, "2000");
                    } else if (that.dishData.order_status == 2) {
                        that.toast.fail("服务员已撤单！");
                        setTimeout(function () {
                            window.location.href = "./start.html#/storeHome";
                        }, "2000");
                    } else if (that.dishData.order_status == 3) {
                        that.toast.fail(that.$t('dish.orderRfund'));
                        setTimeout(function () {
                            window.location.href = "./start.html#/storeHome";
                        }, "2000");
                    }
                } else {
                    that.toast.fail(res.msg);
                    // window.location.href = "./start.html#/storeHome";
                }
            });
        },
        callClick() {},
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
        getCookieValue(eleName) {
            var objName = eleName;
            var arrStr = document.cookie.split("; ");
            for (var i = 0; i < arrStr.length; i++) {
                var temp = arrStr[i].split("=");
                if (temp[0] == objName) {
                    return decodeURI(temp[1]);
                }
            }
            return "";
        },
    },
    created() {
        this.order_mode = this.curentStore.order_mode;
        this.scan_type = this.curentStore.scan_type;
        this.waidaiMsg = false;
        this.saveLang();
        if (this.curentStore) {
            this.getHotDish();
            this.getOrderInfo();
            this.getCartRemark();
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
.dotted {
    color: white;
    border: 3px white dotted;
    line-height: 60px;
    margin: 0px 50px;
}
.btn {
    background: linear-gradient(to bottom left, #ff8237, #f4257c, #ea3d15);
    border: none;
    color: white;
    width: 80px;
    height: 30px;
    border-radius: 20px;
    font-size: 12px;
    display: inline-block;
}
.cancelBtn {
    border: 1px #cccccc solid;
    border-radius: 16px;
    width: 100px;
    color: #808080;
}
.confirmBtn {
    background: #eb3c1c;
    color: white;
    border-radius: 16px;
    border: 1px #eb3c1c solid;
    width: 100px;
}
.text {
    margin: 0 5px;
    display: inline-block;
    position: relative;
    top: -3px;
}
</style>