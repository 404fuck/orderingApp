<template>
    <div class="main-layout">
        <RefreshBtn @refreshClick="refreshClick"></RefreshBtn>
        <YuYuePanel 
            v-if="String(isYuYue)=='true'&&yuYueTime!=''" 
            @editYuYueClick="editYuYueClick"  
        >
        </YuYuePanel>
        <YuyuePickData
            v-if="String(isYuYue)=='true'&&yuYueTime!=''" 
            :yuyueShow="yuyueShow"
            @yuyueClick="yuyueClick" 
            :getSerUrl="getSerUrl" 
        ></YuyuePickData>
        <DeliveryInfoPanel
            v-if="storeTakeOut=='2'&&String(deliveryInfo)!=''"
            @editDeliveryClick="editDeliveryClick"
        ></DeliveryInfoPanel>
        <VipLogin
            class="top10"
            :memberPhone="memberPhone"
            :member_name="member_name"
            :member_grade_name="member_grade_name"
            @confirmClick="confirmClick"
        ></VipLogin>
        <CartTitle
            :titleData="shopping_cart_info_vo"
            @updateRemark="updateRemark"
            @changeDinerNum="changeDinerNum"
            @clearCartClick="clearCartClick"
            @changeStatus="changeStatus"
            :orderStatus="orderStatus"
            :qrcode="qrcode"
        ></CartTitle>
        <div class="list-block media-list inset" style="margin: 12px">
            <ul>
                <li
                    class="row"
                    style="
                        margin: 0 12px;
                        border-bottom: 1px #eff1f2 solid;
                        padding-bottom: 12px;
                    "
                    v-if="dishesCart != null"
                >
                    <div class="col-100 top10">
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
                </li>
                <div
                    v-for="(item, index) in shopping_cart_dishes_vo"
                    class="top5 liSet"
                    :key="index"
                >
                    <li
                        class="row"
                        style="padding: 10px 12px"
                        v-if="item.showTitle"
                    >
                        <div class="col-100">
                            <span
                                style="font-weight: bold; color: #333333"
                                class="font14"
                                >{{ item.dish_second_name_en }} &nbsp;
                                {{ item.dish_second_name }}</span
                            >
                        </div>
                    </li>
                    <Merchandise
                        :dishData="item"
                        :index="index"
                        @computeNum="computeNum"
                        @editDishClick="editDishClick"
                        @lessKG="lessKG"
                        @updateDishNum="updateDishNum"
                        :waidaiImg="waidaiImg"
                        :waidaiMsg="waidaiMsg"
                        :isSelect="item.isSelect"
                        :discountSet="discount_set"
                        @singleChecked="singleChecked"
                    ></Merchandise>
                </div>
            </ul>
        </div>

        <Swiper
            :datas="hotDatas"
            @addSuccessClick="addSuccessClick"
            :specialValue="specialValue"
            @addCart="addCart"
        ></Swiper>

        <FloatActionBar
            style="position: fixed"
            actionType="cart"
            @refreshClick="refreshClick"
            :order_mode="order_mode"
            :scan_type="scan_type"
            :fixToken="fixToken"
            :orderTbId="orderTbId"
            :order_source="order_source"
            :cartOrder_id="cartOrder_id"
            :queueNum="queueNum"
            @payOrderClick="payOrderClick"
            @deliveryShowClick="deliveryShowClick"
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
        <!-- webScoket 消息推送 -->
        <!-- <Socket
            v-if="isWebSocket"
            :getWebSocketArr="getWebSocketArr"
        ></Socket> -->
        <!-- 弹出固定套餐详情 -->
        <van-popup
            :overlay="true"
            :style="{ height: '100%', width: '100%', padding: '0' }"
            v-model="isShowFixedFoodDetail"
            get-container="#app"
        >
            <CartDishFixedDetail
                v-if="isShowFixedFoodDetail"
                @addCart="addCart"
                :dishes="curentDishes"
            ></CartDishFixedDetail>
            <img
                src="../../../../style/images/backimg.png"
                class="closeImg2"
                @click="isShowFixedFoodDetail = false"
                width="30"
                height="30"
            />
        </van-popup>
        <!-- 弹出自选套餐详情 -->
        <van-popup
            :overlay="true"
            :style="{ height: '100%', width: '100%', padding: '0' }"
            v-model="isShowFoodOptionalDetail"
            get-container="#app"
        >
            <CartDishOptionalDetail
                v-if="isShowFoodOptionalDetail"
                @addCart="addCart"
                :dishes="curentDishes"
            ></CartDishOptionalDetail>
            <img
                src="../../../../style/images/backimg.png"
                class="closeImg2"
                @click="isShowFoodOptionalDetail = false"
                width="30"
                height="30"
            />
        </van-popup>
        <!-- 菜品详情 -->
        <van-popup v-model="isShowFoodDetail" @close="dismissFoodDetail">
            <div class="popupcontent">
                <div class="fooddetail">
                    <CartDishDetail
                        v-if="isShowFoodDetail"
                        :dishes="curentDishes"
                        :curentShoppingCart="curentShoppingCart"
                        :curSelectIndex="curSelectIndex"
                        :tagsList="tagsList"
                        :giveDishesCart="giveDishesCart"
                        :specialValue="specialValue"
                        @addCart="addCart"
                        @onSpecialItemClick="onSpecialItemClick"
                        @onTagItemClick="onTagItemClick"
                        @onSelectItemClick="onSelectItemClick"
                    ></CartDishDetail>
                </div>
                <img
                    src="../../../../style/images/close.png"
                    class="closeImg"
                    @click="isShowFoodDetail = false"
                    width="32"
                />
            </div>
        </van-popup>

        <CopyURL />
        <!-- 刷新按钮 -->
        <van-popup v-model="showShopCart" style="width: 100%; height: 100%">
            <div style></div>
            <div class="row" style="position: relative; top: 13%">
                <div
                    class="col-100"
                    style="
                        width: 70px;
                        height: 70px;
                        background: white;
                        position: relative;
                        left: 85%;
                        border-radius: 50%;
                    "
                ></div>
                <div class="col-100 font16 center dotted" style>
                    <span>{{ $t("Manual refresh") }}</span>
                </div>
                <div class="col-100 center" style="margin-top: 40px">
                    <button class="button btn" @click="close">
                        {{ $t("DONE") }}
                    </button>
                </div>
            </div>
        </van-popup>
        <!-- 订单备注 -->
        <van-popup v-model="showBeizhu" style="width: 100%; height: 100%">
            <div style></div>
            <div class="row" style="position: relative; top: 10%">
                <div class="col-100" v-if="$store.getters.language == 'zh_CN'">
                    <img
                        src="../../../../style/images/popBeizhu_zn.png"
                        alt
                        style="width: 100%"
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
                        src="../../../../style/images/popBeizhu_en.png"
                        alt
                        style="width: 100%"
                    />
                </div>
                <div class="col-100 font16 center dotted" style>
                    <span>{{ $t("order remarks") }}</span>
                </div>
                <div class="col-100 center" style="margin-top: 40px">
                    <button class="button btn" @click="closeBeizhu">
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
                        alt
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
                        alt
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
                                    shopping_cart_dishes_vo[index].dish_num
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
        <!-- 填写外送信息 -->
        <van-popup
            v-model="deliveryShow"
            class="delivery-pop"
        >
            <div class="center font14">{{$t('start.fillinfo')}}</div>
            <div class="font12 top15">{{$t('start.contact')}}</div>
            <div class="delivery-input">
                <input type="text" v-model="deliveryForm.contacts">
            </div>
            <div class="font12 top15">{{$t('start.mobile')}}</div>
            <div class="delivery-input">
                <input type="text" v-model="deliveryForm.telephone">
            </div>
            <div class="font12 top15">{{$t('start.address')}}</div>
            <div class="delivery-input">
                <input type="text" v-model="deliveryForm.address">
            </div>
            <div class="delivery-buttons">
                <button class="plain" @click="deliveryShow=false">{{$t('cancel')}}</button>
                <button class="primary" @click="deliveryComfirm">{{$t('shopcart.true')}}</button>
            </div>
        </van-popup>
    </div>
</template>

<script>
import CartTitle from "../../components/CartTitle";
import Merchandise from "../../components/Merchandise";
import Swiper from "../../../../components/Swiper";
import FloatActionBar from "../../../../components/FloatActionBar";
// 弹出菜品详情
import CartDishDetail from "../../components/CartDishDetail";
//弹出固定套餐详情
import CartDishFixedDetail from "../../components/CartDishFixedDetail";
//弹出自选套餐详情
import CartDishOptionalDetail from "../../components/CartDishOptionalDetail";
import RefreshBtn from "../../components/RefreshBtn";
import CopyURL from "../../../../components/CopyURL";
import VipLogin from "../../components/VipLogin";
//webSocket消息推送
import Socket from "../../../../components/Socket";
//预约时间展示与修改
import YuYuePanel from "../../../../components/YuYuePanel";
// 店码模式预约时间选择
import YuyuePickData from "../../../../components/YuyuePickData";
//外送信息展示与修改
import DeliveryInfoPanel from "../../../../components/DeliveryInfoPanel";
const imgList = [1, 2, 3];
export default {
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
        token() {
            return this.$store.getters.token;
        },
        isYuYue(){
            return this.$store.getters.isYuYue;
        },
        yuYueTime(){
            return this.$store.getters.yuYueTime;
        },
        storeTakeOut(){
            return this.$store.getters.storeTakeOut;
        },
        deliveryInfo(){
            return this.$store.getters.deliveryInfo;
        },
    },
    name: "shopCart",
    components: {
        CartTitle,
        CopyURL,
        Merchandise,
        Swiper,
        FloatActionBar,
        CartDishDetail,
        CartDishFixedDetail,
        CartDishOptionalDetail,
        RefreshBtn,
        VipLogin,
        Socket,
        YuYuePanel,
        YuyuePickData,
        DeliveryInfoPanel,
    },
    data() {
        return {
            showShopCart: false,
            showBeizhu: false,
            showCaidan: false,
            shopping_cart_info_vo: {},
            shopping_cart_dishes_vo: {},
            optionWaiDai: {},
            optional_dish: [],
            hotDatas: [],

            isShowFoodDetail: false,
            isShowFixedFoodDetail: false,
            isShowFoodOptionalDetail: false,
            special: null,
            charactor: null,
            selectArray: null,
            flag: "cart",
            curentDishes: null,
            curentShoppingCart:{}, //在info接口获取口味和加料选中状态
            curentId: null,
            curSelectIndex: 0, //当前规格菜 规格选中项
            timer: null,
            salepmt_type: 0, //0：满减券，1:整单折扣，2：特价菜，3：第n份优惠，4：买赠
            salepmt_sts: 0, //促销优惠是否上线状态，1:上线状态，需要显示促销到页面
            salepmt_bg_flag: 0, //买赠优惠，0：属于买类别，1：属于赠送类别
            give_dish_price: 0,
            give_dish_member_price: 0,
            specialValue: null,
            order_mode: this.$store.getters.order_mode,
            scan_type: "",
            fixToken: this.$store.getters.fixToken,
            order_source: this.$store.getters.order_source,
            cartOrder_id: this.$store.getters.cartOrder_id,
            waidaiMsg: "",
            allSelect: false,
            waidaiImg: false,
            waidaiDishChecked: false,
            orderStatus: 0,
            qrcode: this.$store.getters.qrcode,
            imgList,
            requestData: {
                dep_id: null,
                company_id: null,
                param: null, //桌子id
                str_param: "", //菜品id
                map: [],
            },
            orderTbId: "",
            dishesCart: {},
            giveDishesCart: {},
            member_name: "",
            memberPhone: "",
            member_grade_name: "",
            discount_set: "",
            waidaiNum: 0,
            take_out: 0,
            selectWaidaiNum: false,
            queueNum: "",
            tagsList: [],
            defaultPhoneHeight: "", //屏幕默认高度
            nowPhoneHeight: "", //屏幕现在的高度
            dishInputNum: "",
            reqType: "",
            
            getSerUrl:this.$store.getters.serverUrl,
            //webSocket
            websocket:null,
            isWebSocket:false,
            getWebSocketArr:[],
            yuyueShow: false,
            deliveryShow:false,
            deliveryForm:{
                contacts:"",
                telephone:"",
                address:""
            },
        };
    },
    methods: {
        //外送信息弹窗
        editDeliveryClick(){
            this.deliveryShow = true;
        },
        deliveryShowClick(){
            this.deliveryShow = true;
        },
        deliveryComfirm(){
            if(this.deliveryForm.contacts==""){
                this.toast.info("请输入联系人");
            }else if(this.deliveryForm.telephone==""){
                this.toast.info("请输入电话");
            }else if(this.deliveryForm.address==""){
                this.toast.info("请输入地址");
            }else{
                this.setStoreDeliveryInfo();
            }
        },
        setStoreDeliveryInfo(){
            let data = {
                dep_id: this.curentStore.dep_id,
                company_id: this.curentStore.company_id,
                store_delivery_to_name: this.deliveryForm.contacts,
                store_delivery_to_phone: this.deliveryForm.telephone,
                store_delivery_to_address: this.deliveryForm.address
            };
            let that = this;
            this.request.setStoreDeliveryInfo(data, function (res) {
                if (Number(res.code) > 0) {
                    that.toast.success("提交成功");
                    that.deliveryShow = false;
                    that.$store.dispatch("setDeliveryInfo", JSON.stringify(that.deliveryForm));
                } else {
                    that.toast.fail(res.msg);
                }
            });

        },
        //店码模式预约时间选择弹窗
        yuyueClick(){
            this.yuyueShow = false;
        },
        editYuYueClick(){
           this.yuyueShow = true;
        },
        // 菜品标签和规则列表查询
        tagspeclist() {
            let data = {
                dep_id: this.curentStore.dep_id,
                dict_type: "DISH_TAG",
            };
            let that = this;
            this.request.tagspeclist(data, function (res) {
                if (res.code == "1") {
                    that.tagsList = res.data;
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        dismissFoodDetail() {
            this.charactor = null;
            this.special = null;
            this.selectArray = null;
            this.optional_dish = [];
        },
        getImgUrl(i) {
            return require("../../../../style/images/takeOut" + i + ".png");
        },
        changeStatus() {
            if (this.orderStatus == 0) {
                this.orderStatus = 1;
                this.waidaiMsg = true;
            }
            // else if(this.orderStatus == 1)
            // {
            //   this.orderStatus = 0;
            //   this.waidaiDishChecked = false;
            //   this.allSelect = false;
            //   this.waidaiMsg = false;
            // }
            else if (this.orderStatus == 2) {
                this.orderStatus = 1;
                this.waidaiMsg = true;
            }
        },
        // 完成操作
        confirmBtn() {
            if (this.take_out == 0) {
                this.orderStatus = 0;
            } else {
                this.orderStatus = 2;
            }
            this.waidaiMsg = false;
            this.waidaiImg = true;
            this.waidaiConfirm();
        },
        close() {
            this.showShopCart = false;
            // this.$store.dispatch("setShowShopCart", false);
            this.showBeizhu = true;
        },
        closeBeizhu() {
            this.showBeizhu = false;
            this.showCaidan = true;
        },
        closeCaidan() {
            this.showCaidan = false;
        },
        lessKG(id) {
            //删除称重菜
            let data = {
                dep_id: this.curentStore.dep_id,
                param: this.curentStore.tb_id, //桌子id
                str_param: id, //菜品id
            };
            let that = this;
            this.request.onedishdel(data, function (res) {
                if (res.code == "110") {
                    that.refreshCartPrice();
                    var map = {};
                    let keys = Object.keys(that.shopping_cart_dishes_vo);

                    for (var i in that.shopping_cart_dishes_vo) {
                        if (i == id) {
                            let index = keys.indexOf(i) + 1;

                            if (keys.length > index) {
                                that.shopping_cart_dishes_vo[
                                    keys[index]
                                ].showTitle = true;
                            }
                            continue;
                        }
                        let showTitle =
                            that.shopping_cart_dishes_vo[i].showTitle;
                        map[i] = that.shopping_cart_dishes_vo[i];
                        map[i].showTitle = showTitle;
                    }
                    that.shopping_cart_dishes_vo = map;
                } else if (res.code == "-102" || res.code == "-103") {
                    that.getCartInfo();
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        confirmClick() {
            this.getCartInfo();
        },
        //购物车信息
        getCartInfo() {
            let data = {
                dep_id: this.curentStore.dep_id,
                param: this.curentStore.tb_id,
            };
            let that = this;
            this.request.cartInfo(data, function (res) {
                if (res.code == "1") {
                    if (res.data != null) {
                        that.orderTbId = res.data.pmt_page_bean.table_id;
                        that.queueNum =
                            res.data.shopping_cart_info_vo.queue_num;
                        that.$store.dispatch(
                            "setorder_id",
                            res.data.shopping_cart_info_vo.queue_num == ""
                                ? res.data.shopping_cart_info_vo.order_id
                                : res.data.shopping_cart_info_vo.queue_num
                        );
                        that.$store.dispatch(
                            "setcartOrder_id",
                            res.data.shopping_cart_info_vo.order_id
                        );
                        let showsShoppingCartArry = {};
                        that.waidaiNum = 0;
                        that.dishesCart = res.data.shopping_cart_dishes_vo;
                        that.giveDishesCart = res.data.give_dishes;
                        for (let t in res.data.shopping_cart_dishes_vo) {
                            showsShoppingCartArry[t] =
                                res.data.shopping_cart_dishes_vo[t];
                        }
                        for (let t in res.data.give_dishes) {
                            showsShoppingCartArry[t] = res.data.give_dishes[t];
                        }
                        //改变菜品分类
                        for (let j in showsShoppingCartArry) {
                            if (showsShoppingCartArry[j].is_take_out == 1) {
                                showsShoppingCartArry[j].isSelect = true;
                                that.orderStatus = 2;
                                that.waidaiDishChecked = false;
                                that.waidaiMsg = false;
                                that.waidaiNum++;
                            }
                            if (
                                showsShoppingCartArry[j].promotion_range == "1"
                            ) {
                                showsShoppingCartArry[j].dish_second_type = -1;
                                showsShoppingCartArry[j].dish_second_name =
                                    "促销";
                                showsShoppingCartArry[j].dish_second_name_en =
                                    "Promotional";
                            }
                        }
                        //改变菜品分类

                        that.shopping_cart_info_vo =
                            res.data.shopping_cart_info_vo;
                        that.member_name =
                            that.shopping_cart_info_vo.member_name;
                        that.memberPhone =
                            that.shopping_cart_info_vo.member_phone;
                        that.member_grade_name =
                            that.shopping_cart_info_vo.member_grade_name;
                        that.discount_set =
                            that.shopping_cart_info_vo.discount_set;
                        that.take_out = that.shopping_cart_info_vo.take_out;
                        var dishSecondTypeArr = [];
                        for (let i in showsShoppingCartArry) {
                            if (
                                showsShoppingCartArry[i].dish_second_type != -1
                            ) {
                                dishSecondTypeArr.push(
                                    showsShoppingCartArry[i].dish_second_type
                                );
                            }
                        }
                        for (let i in showsShoppingCartArry) {
                            if (
                                showsShoppingCartArry[i].dish_second_type == -1
                            ) {
                                dishSecondTypeArr.push(
                                    showsShoppingCartArry[i].dish_second_type
                                );
                            }
                        }
                        dishSecondTypeArr = that.stringutils.putDuplicate(
                            dishSecondTypeArr
                        );

                        var dishArr = {};
                        for (let i in dishSecondTypeArr) {
                            var tag = 0;
                            for (let j in showsShoppingCartArry) {
                                if (
                                    showsShoppingCartArry[j].dish_second_type ==
                                    dishSecondTypeArr[i]
                                ) {
                                    if (tag == 0) {
                                        showsShoppingCartArry[
                                            j
                                        ].showTitle = true;
                                    } else {
                                        showsShoppingCartArry[
                                            j
                                        ].showTitle = false;
                                    }
                                    showsShoppingCartArry[
                                        j
                                    ].dish_attrs = that.resetAttr(
                                        showsShoppingCartArry[j]
                                    );
                                    showsShoppingCartArry[
                                        j
                                    ].dishTaocan = that.resetDishTaocan(
                                        showsShoppingCartArry[j]
                                    );
                                    showsShoppingCartArry[
                                        j
                                    ].dishNote = that.resetdishNote(
                                        showsShoppingCartArry[j]
                                    );
                                    tag++;
                                    dishArr[j] = showsShoppingCartArry[j];
                                }
                            }
                        }
                        that.shopping_cart_dishes_vo = dishArr;
                        that.optionWaiDai = JSON.parse(
                            JSON.stringify(that.shopping_cart_dishes_vo)
                        );
                    }
                } else {
                    that.toast.fail(res.msg);
                }
            });
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
            let suits_list = data.suits_list;
            let boxList = data.box;
            // alert('111'+JSON.stringify(dishAdditionalSimpleVOList))

            var dish_attrs = [];
            if (this.stringutils.getJsonLength(spec_detail) > 0) {
                // if (JSON.parse(spec_detail).spec_unit) {
                //   dish_attrs.push(JSON.parse(spec_detail).spec_unit);
                // }
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
            //     taste_set = taste_set;
            //     for (let m in taste_set) {
            //         if (taste_set[m].taste_list.length > 0) {
            //             dish_attrs = this.stringutils.insert(
            //                 dish_attrs,
            //                 taste_set[m].taste_list,
            //                 dish_attrs.length
            //             );
            //         }
            //     }
            // }

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

        refreshCartPrice() {
            this.getCartInfo();
        },

        clearCartClick() {
            let that = this;
            this.$dialog
                .confirm({
                    // title: this.$t("tishi"),
                    message: this.$t("shifouqingkong"),
                    confirmButtonColor: "#EB3B1C",
                })
                .then(() => {
                    // on confirm
                    this.clearCart();
                })
                .catch(() => {
                    // on cancel
                });
        },

        clearCart() {
            let data = {
                dep_id: this.curentStore.dep_id,
                param: this.curentStore.tb_id,
            };
            let that = this;
            this.request.clearCart(data, function (res) {
                if (res.code == "104") {
                    that.refreshCartPrice();
                    that.stringutils.clearDishNum();
                    that.shopping_cart_dishes_vo = null;
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },

        //统计菜品数量  type  add 增加  less  减少
        computeNum(type, id, num, e, dish_id) {
            if (type == "add") {
                this.addDish(id, dish_id);
            } else {
                if (num <= 1) {
                    // var map = {};
                    // let keys = Object.keys(this.shopping_cart_dishes_vo);
                    // for (var i in this.shopping_cart_dishes_vo) {
                    //     if (i == id) {
                    //         let index = keys.indexOf(i) + 1;
                    //         if (keys.length > index) {
                    //             this.shopping_cart_dishes_vo[
                    //                 keys[index]
                    //             ].showTitle = true;
                    //         }
                    //         continue;
                    //     }
                    //     let showTitle = this.shopping_cart_dishes_vo[i]
                    //         .showTitle;
                    //     map[i] = this.shopping_cart_dishes_vo[i];
                    //     map[i].showTitle = showTitle;
                    // }
                    // this.shopping_cart_dishes_vo = map;
                } else {
                    this.shopping_cart_dishes_vo[id].dish_num = num;
                    // alert(num)
                }
                this.lessDish(id, dish_id);
            }
        },

        addDish(id, dish_id) {
            //增加菜品
            let data = {
                dep_id: this.curentStore.dep_id,
                company_id: this.curentStore.company_id,
                param: this.curentStore.tb_id, //桌子id
                str_param: id, //菜品id
                param2: 1, //菜品数量
            };
            let that = this;
            this.request.addDishInCart(data, function (res) {
                if (res.code > 0) {
                    that.refreshCartPrice();
                    that.shopping_cart_dishes_vo[id].dish_num = ++that
                        .shopping_cart_dishes_vo[id].dish_num;

                    var num = that.$store.getters.dishNums[dish_id];
                    that.stringutils.setDishNum(dish_id, ++num);
                } else if (res.code == "-102" || res.code == "-103") {
                    that.getCartInfo();
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        lessDish(id, dish_id) {
            //减少菜品
            let data = {
                dep_id: this.curentStore.dep_id,
                param: this.curentStore.tb_id, //桌子id
                str_param: id, //菜品id
                param2: 1, //菜品数量
            };
            let that = this;
            this.request.delDish(data, function (res) {
                if (res.code > 0) {
                    that.refreshCartPrice();
                    if (that.shopping_cart_dishes_vo[id] != undefined) {
                        // if(){

                        // }
                        that.shopping_cart_dishes_vo[id].dish_num = --that
                            .shopping_cart_dishes_vo[id].dish_num;
                    }
                    var num = that.$store.getters.dishNums[dish_id];
                    that.stringutils.setDishNum(dish_id, --num);
                } else if (res.code == "-102" || res.code == "-103") {
                    that.getCartInfo();
                } else if (res.code == "-229") {
                    that.$dialog
                        .confirm({
                            message: "低于起售数量,删除该菜品？",
                            confirmButtonText: "删除",
                            cancelButtonText: "保留",
                            cancelButtonColor: "#808080",
                            confirmButtonColor: "#EB3B1C",
                        })
                        .then(() => {
                            // 删除
                            that.reqType = "1";
                            that.lessdDishNum(id);
                        })
                        .catch(() => {
                            // 保留
                            that.reqType = "0";
                            that.getCartInfo();
                        });
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        updateDishNum(value, dishData, num) {
            let that = this;
            that.dishInputNum = value;
            if (value != "") {
                clearTimeout(that.timer);
                that.timer = setTimeout(function () {
                    that.reqType = "";
                    that.uploadDishNum(value, dishData, num);
                }, 1000);
            } else {
                that.dishInputNum = dishData.dish_num;
                value = that.dishInputNum;
                //    alert(value)
            }
        },
        uploadDishNum(value, dishData, num) {
            let data = {
                dep_id: this.curentStore.dep_id,
                param: this.curentStore.tb_id, //桌子id
                dish_num: value,
                str_param: dishData.dish_id_cart, // 菜品在购物车内的key,
                req_type: "", //1:确认删除菜品,0:保留至起售数量，其余传空字符串
            };
            data.req_type = this.reqType;
            let that = this;
            this.request.inputDishNum(data, function (res) {
                if (res.code == "101") {
                    that.getCartInfo();
                    // that.toast.success(res.msg);
                } else if (res.code == "-229") {
                    that.$dialog
                        .confirm({
                            message: that.$t("dish.lessLeastNum"),
                            confirmButtonText: that.$t("dish.dishDel"),
                            cancelButtonText: that.$t("dish.numSave"),
                            cancelButtonColor: "#808080",
                            confirmButtonColor: "#EB3B1C",
                        })
                        .then(() => {
                            // 删除
                            that.reqType = "1";
                            that.deldDishNum(value, dishData);
                        })
                        .catch(() => {
                            // 保留
                            that.reqType = "0";
                            that.deldDishNum(value, dishData);
                            // that.getCartInfo();
                        });
                } else if (res.code == "-230") {
                    that.$dialog
                        .confirm({
                            message: that.$t("dish.sureDishDel"),
                            confirmButtonText: that.$t("dish.dishDel"),
                            cancelButtonText: that.$t("dish.cancel"),
                            cancelButtonColor: "#808080",
                            confirmButtonColor: "#EB3B1C",
                        })
                        .then(() => {
                            // 删除
                            that.reqType = "1";
                            that.deldDishNum(value, dishData);
                        })
                        .catch(() => {
                            // 取消
                            that.reqType = "0";
                            that.getCartInfo();
                        });
                } else {
                    that.toast.fail(res.msg);
                    that.getCartInfo();
                }
            });
        },
        deldDishNum(value, dishData) {
            let data = {
                dep_id: this.curentStore.dep_id,
                param: this.curentStore.tb_id, //桌子id
                dish_num: value,
                str_param: dishData.dish_id_cart, // 菜品在购物车内的key,
                req_type: "", //1:确认删除菜品,0:保留至起售数量，其余传空字符串
            };
            data.req_type = this.reqType;
            let that = this;
            this.request.inputDishNum(data, function (res) {
                if (res.code == "101") {
                    that.getCartInfo();
                } else {
                    that.toast.fail(res.msg);
                    that.getCartInfo();
                }
            });
        },
        lessdDishNum(id) {
            let data = {
                dep_id: this.curentStore.dep_id,
                param: this.curentStore.tb_id, //桌子id
                dish_num: "0",
                str_param: id, // 菜品在购物车内的key,
                req_type: "", //1:确认删除菜品,0:保留至起售数量，其余传空字符串
            };
            data.req_type = this.reqType;
            let that = this;
            this.request.inputDishNum(data, function (res) {
                if (res.code == "101") {
                    that.getCartInfo();
                    // that.toast.success(res.msg);
                } else if (res.code == "-229") {
                    // that.toast.fail(res.msg);
                    setTimeout(function () {
                        // that.getCartInfo();
                    }, "1000");
                } else {
                    that.toast.fail(res.msg);
                    that.getCartInfo();
                }
            });
        },
        updateRemark(text) {
            let that = this;
            clearTimeout(this.timer);
            this.timer = setTimeout(function () {
                that.uploadRemark(text);
            }, 2000);
        },
        uploadRemark(text) {
            let data = {
                dep_id: this.curentStore.dep_id,
                param: this.curentStore.tb_id, //桌子id
                str_param: text,    
                code_mode: this.order_mode,
            };
            let that = this;
            this.request.modifyNote(data, function (res) {
                if (res.code == "102") {
                    that.toast.success(that.$t("xiugaichenggong"));
                } else {
                    that.toast.fail(res.msg);
                }
            });
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
                        if (res.data.recommandVos[i].sell_date != "")
                            res.data.recommandVos[
                                i
                            ].sell_date = res.data.recommandVos[
                                i
                            ].sell_date.split("/");
                        res.data.recommandVos[
                            i
                        ].sell_week = res.data.recommandVos[
                            i
                        ].sell_week.replace(/[^0-9]/gi, "");
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
        payOrderClick() {
            this.$store.dispatch("setTotalNum", 0);
            let data = {
                dep_id: this.curentStore.dep_id,
                table_id: this.curentStore.tb_id,
            };
            let that = this;
            this.request.payOrder(data, function (res) {
                if (res.code == "1") {
                    that.$router.push({
                        path: "/PlaceOrder?order_id=" + res.data.order_id_show,
                    });
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
        getCartInfoCount() {
            this.$store.dispatch(
                "setTotalNum",
                this.shopping_cart_info_vo.total_dish_num
            );
            let bl = this.shopping_cart_info_vo.total_dish_num > 0;
            return bl;
        },
        //菜品详情
        onSpecialItemClick(special, index) {
            this.curSelectIndex = Number(index);
            this.special = special;
        },
        onTagItemClick(charactor) {
            this.charactor = charactor;
            //this.toast.info(JSON.stringify(charactor))
        },
        onSelectItemClick(selectArray) {
            this.selectArray = selectArray;
            // alert(JSON.stringify(this.selectArray))
            //this.toast.info(JSON.stringify(selectArray))
        },
        addCart(
            dishes,
            dish_price,
            member_price,
            salepmt_price,
            showDetail,
            weight,
            specialValue
        ) {
            this.isShowFoodDetail = false;
            this.isShowFixedFoodDetail = false;
            this.isShowFoodOptionalDetail = false;

            let currCharactorSet = dishes.taste_set; //获取当前的口味
            let map = {};
            if (map["dish_additional"] == null || map["taste_set"] == null) {
                map["flag"] = "clean_adt";
            }
            if (dishes.weight_spec == "2") {
                if (this.special) {
                    map["spec_detail"] = JSON.stringify(this.special);
                }
            }
            if (dishes.weight_spec == "1") {
                map["spec_detail"] = String(specialValue);
            }
            if (dishes.weight_spec == "4") {
                this.optional_dish = dishes.optional_list;
                console.log(this.optional_dish);
                if (this.optional_dish) {
                    map["optional_detail"] = this.optional_dish;
                }
            }
            if (this.charactor) {
                map["taste_set"] = this.charactor;
            }
            if (currCharactorSet && this.selectArray != "") {
                map["dish_additional"] = this.selectArray;
            }
            this.requestData.map = map;
            this.selectArray = "";
            this.charactor = "";
            if (dishes.weight_spec == "1") {
                if (specialValue <= 0) {
                    this.toast.fail(this.$t("dish.inputWeight"));
                    this.isShowFoodDetail = true;
                    return false;
                }
            }
            this.updateDish();
        },
        updateDish() {
            //修改菜品
            this.requestData.dep_id = this.curentStore.dep_id;
            this.requestData.company_id = this.curentStore.company_id;
            this.requestData.param = this.curentStore.tb_id;
            this.requestData.str_param = this.curentId;

            let that = this;
            this.request.updateCartDish(this.requestData, function (res) {
                if (res.code == "102") {
                    that.shopping_cart_dishes_vo[that.curentId] = res.data;
                    that.shopping_cart_dishes_vo[
                        that.curentId
                    ].dish_attrs = that.resetAttr(
                        that.shopping_cart_dishes_vo[that.curentId]
                    );

                    // alert(that.shopping_cart_dishes_vo[that.curentId].dish_attrs);
                    that.refreshCartPrice();
                    that.toast.success(that.$t("xiugaichenggong"));
                    that.isShowFoodDetail = false;
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        editDishClick(dishData, index) {
            // this.dishesCart = shopping_cart_dishes_vo info取的值 
            this.curentShoppingCart = {};
            this.curentDishes = dishData;
            for (let i in this.dishesCart) {
                if(index==i){
                    this.curentShoppingCart = this.dishesCart[i];
                    if(this.curentShoppingCart.taste_set==null){
                       this.curentShoppingCart.taste_set = [];
                    }
                    break;
                }
            }
            this.curentId = index;
            if (dishData.weight_spec == "3") {
                this.isShowFixedFoodDetail = true;
            } else if (dishData.weight_spec == "4") {
                this.isShowFoodOptionalDetail = true;
            } else {
                this.isShowFoodDetail = true;
            }
        },

        addSuccessClick() {
            this.getCartInfo();
        },
        appRefreshDish(dish_id, operation, order_id, body) {
            this.stringutils.refreshDishNum(dish_id, operation, order_id, body);
            if (operation == "0" || operation == "7") {
                //新增菜
            } else {
                this.getCartInfo();
            }
        },
        changeDinerNum(num) {
            let data = {
                dep_id: this.curentStore.dep_id,
                dinner_num: Number(num),
                comp_id: this.curentStore.company_id,
                param: this.curentStore.tb_id,
            };
            let that = this;
            this.request.modifydinnernum(data, function (res) {
                if (res.code == "102") {
                    that.shopping_cart_info_vo.diner_num = num;
                    that.$store.dispatch("setDinersNum", num);
                    that.toast.success(that.$t("xiugaichenggong"));
                    that.getCartInfo();
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },

        isAllSelect() {
            var arry = this.shopping_cart_dishes_vo;
            this.allSelect = true;
            for (let i in arry) {
                if (
                    arry[i].isSelect == false ||
                    arry[i].isSelect == undefined
                ) {
                    this.allSelect = false;
                } else {
                    if (arry[i].dish_num > 1) {
                        this.shopping_cart_dishes_vo[
                            i
                        ].isShowAlertWaiDai = true;
                        //     this.selectWaidaiNum = true
                    } else {
                        this.shopping_cart_dishes_vo[
                            i
                        ].isShowAlertWaiDai = false;
                    }
                }
            }
            this.optionWaiDai = JSON.parse(
                JSON.stringify(this.shopping_cart_dishes_vo)
            );
        },
        singleChecked(index) {
            var arry = this.shopping_cart_dishes_vo;
            arry[index].isSelect = !arry[index].isSelect;

            for (let i in arry) {
                arry[i].isShowAlertWaiDai = false;
            }
            this.shopping_cart_dishes_vo = {};
            this.shopping_cart_dishes_vo = arry;
            if (arry[index].isSelect == false) {
                this.allSelect = false;
            } else {
                if (arry[index].dish_num > 1) {
                    this.shopping_cart_dishes_vo[
                        index
                    ].isShowAlertWaiDai = true;
                    this.selectWaidaiNum = true;
                } else {
                    this.shopping_cart_dishes_vo[
                        index
                    ].isShowAlertWaiDai = false;
                }
                this.isAllSelect();
            }
            this.optionWaiDai = JSON.parse(
                JSON.stringify(this.shopping_cart_dishes_vo)
            );
        },
        // 弹窗取消外带菜品
        cancelDishClick() {
            this.selectWaidaiNum = false;
            for (let k in this.dishesCart) {
                if (this.dishesCart[k].is_take_out == 0) {
                    this.dishesCart[k].isSelect = false;
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
        //    选择外带菜品
        waidaiConfirm() {
            let data = {
                dep_id: this.curentStore.dep_id,
                table_id: this.curentStore.tb_id, //桌子id
                list: [], //菜品id
                flag: "cart",
            };
            var listIndex = 0;
            this.shopping_cart_dishes_vo = JSON.parse(
                JSON.stringify(this.optionWaiDai)
            );
            for (let i in this.optionWaiDai) {
                var addEle = { dish_id_cart: "", take_num: "" };
                if (this.shopping_cart_dishes_vo[i].isSelect == true) {
                    addEle["dish_id_cart"] = this.shopping_cart_dishes_vo[
                        i
                    ].dish_id_cart;
                    addEle["take_num"] =
                        this.shopping_cart_dishes_vo[i].dish_num + "";
                    data.list[listIndex] = addEle;
                    listIndex++;
                }
                this.optionWaiDai = JSON.parse(
                    JSON.stringify(this.shopping_cart_dishes_vo)
                );
            }
            let that = this;
            this.request.setTakeDishOut(data, function (res) {
                if (res.code == "11") {
                    that.showAllselect = false;
                    that.waidaiMsg = false;
                    if (that.curentStore) {
                        that.getCartInfo();
                        that.getHotDish();
                    }
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        shoppingCartCancelAll() {
            var arry = this.shopping_cart_dishes_vo;
            for (let i in this.shopping_cart_dishes_vo) {
                arry[i].isSelect = false;
            }
            this.shopping_cart_dishes_vo = {};
            this.shopping_cart_dishes_vo = arry;

            this.optionWaiDai = JSON.parse(
                JSON.stringify(this.shopping_cart_dishes_vo)
            );
        },
        shoppingCartSelectAll() {
            var arry = this.shopping_cart_dishes_vo;
            for (let i in this.shopping_cart_dishes_vo) {
                arry[i].isSelect = true;
                //   alert(arry[i].dish_num)
                if (arry[i].dish_num > 1) {
                    this.selectWaidaiNum = true;
                    arry[i].isShowAlertWaiDai = true;
                }
            }
            this.shopping_cart_dishes_vo = {};
            this.shopping_cart_dishes_vo = arry;

            this.optionWaiDai = JSON.parse(
                JSON.stringify(this.shopping_cart_dishes_vo)
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
                    this.dishesCart[k].isSelect = true;
                    this.orderStatus = 2;
                } else {
                    for (let t in this.giveDishesCart) {
                        // this.dishesCart[k]=this.giveDishesCart[t];
                        this.giveDishesCart[t].isSelect = false;
                    }
                    this.dishesCart[k].isSelect = false;
                    this.orderStatus = 0;
                }
            }
            this.showAllselect = false;
            this.waidaiMsg = false;
            this.isAllSelect();
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
        refreshClick() {
            if (this.curentStore) {
                this.getCartInfo();
                this.getHotDish();
            }
        },
        // webSocket
        initWebSocket() {
            this.websocket = new WebSocket(
                `ws://${this.getSerUrl.substring(7)}:18003/pushWebSocket/${this.curentStore.dep_id}_${this.curentStore.tb_id}/${this.token}`
            );
            
            // 连接错误
            this.websocket.onerror = this.websockError;
            // 连接成功
            this.websocket.onopen = this.websockOpen;
            // 收到消息的回调
            this.websocket.onmessage = this.websockMessage;
            // 连接关闭的回调
            this.websocket.onclose = this.websockClose;
            // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
            window.onbeforeunload = this.onbeforeunload;
        },
        websockError(e) {
            this.isWebSocket = false;
            console.log("WebSocket连接发生错误",e);
        },
        websockOpen() {
            console.log("WebSocket连接成功"); 
        },
        websockMessage(e) {
            this.isWebSocket = true;
            // 根据服务器推送的消息做自己的业务处理
            let getData = JSON.parse(e.data);
            this.getWebSocketArr.push(getData);
            // console.log(this.getWebSocketArr);
            //更新同步菜品
            this.getCartInfo();
            this.getHotDish();
            this.tagspeclist();
            
        },
        websockClose(e) {
            this.isWebSocket = false;
            console.log("WebSocket连接关闭",e);
        },
        onbeforeunload() {
            this.closeWebSocket();
        },
        closeWebSocket() {
            this.isWebSocket = false;    
            this.websocket.close();
        },
    },
    mounted() {
        this.defaultPhoneHeight = window.innerHeight;
        window.onresize = () => {
            this.nowPhoneHeight = window.innerHeight;
        };
    },
    // destroyed () {
    //     // 销毁监听
    //     this.websocket.onclose = this.websockClose;
    // },
    watch: {
        nowPhoneHeight() {
            if (this.defaultPhoneHeight != this.nowPhoneHeight) {
                //手机键盘被唤起了。
            } else {
                // alert(this.dishInputNum)
                if (this.dishInputNum === 0 || this.dishInputNum === "") {
                    this.dishInputNum = this.dishData.dish_num;
                    // this.getCartInfo()
                }
                //手机键盘被关闭了。
            }
        },
        deliveryShow:{
            handler(newVal,oldVal){
                if(newVal==true&&String(this.deliveryInfo)!=""){
                    let deliveryInfo = JSON.parse(this.deliveryInfo);
                    this.deliveryForm.contacts = deliveryInfo.contacts;
                    this.deliveryForm.telephone = deliveryInfo.telephone;
                    this.deliveryForm.address = deliveryInfo.address;
                }
            }
            
        }
    },
    created() {
        this.order_mode = this.curentStore.order_mode;
        this.scan_type = this.curentStore.scan_type;
        this.waidaiMsg = false;
        this.saveLang();
        var poppeds = "";
        var objName = "poppeds";
        var arrStr = document.cookie.split("; ");
        for (var i = 0; i < arrStr.length; i++) {
            var temp = arrStr[i].split("=");
            if (temp[0] == objName) {
                poppeds = decodeURI(temp[1]);
            }
        }
        if (poppeds == "") {
            //cookie 中没有 poppeds 则赋给他一个值（此时弹框显示）
            document.cookie = "poppeds = yes";
            this.showShopCart = true;
        }
        if (this.curentStore) {
            this.getCartInfo();
            this.getHotDish();
            this.tagspeclist();
            //桌码模式开启webSocKet
            // if (this.qrcode[0] == "T" && this.qrcode[1] == "D" &&this.qrcode[2] == "E" &&this.qrcode[3] == "P" &&this.qrcode[4] == "_"){
            //     this.initWebSocket();
            // }
        }
    },
};
</script>
<style scoped>
.inset ul {
    clear: both;
}
.clear-button {
    float: right;
    position: relative;
    top: 13px;
    right: 10px;
}
.van-popup {
    background-color: transparent;
    width: 90%;
    padding: 0px 0px 80px 0;
    overflow: unset;
    z-index: 9999 !important;
}
.closeImg {
    margin-top: 20px;
    margin-bottom: 20px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
}

.swipe {
    padding: 10px;
}

.van-swipe {
    border-radius: 10px;
}

.botom {
    height: 55px;
    position: absolute;
    bottom: 0;
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
.closeImg2 {
    position: absolute;
    top: 10px;
    left: 18px;
    z-index: 99999;
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
/* 外送弹窗 */
.delivery-pop{
    width:65%;
    height:auto;
    border-radius: 6px;
    padding: 20px;
    color: #505050;
    background: #fff !important;
}
.delivery-input{
    margin-top: 5px;
    padding: 0 10px;
    height: 30px;
    border-radius: 4px;
    border: 1px solid #E5E5E5
}
.delivery-input input{
    width: 100%;
    height: 100%;
    font-size: 12px;
    border: none;
}
.delivery-buttons{
    padding: 0 5px;
    margin-top: 30px;
    margin-bottom: 5px;
    overflow: hidden;
}
.delivery-buttons button{
    width: 45%;
    height: 30px;
    border-radius: 16px;
    font-size: 14px;
}
.delivery-buttons .plain{
    float: left;
    border:1px solid #ccc;
    color: #808080;
    background: none;
}
.delivery-buttons .primary{
    border: none;
    float: right;
    color: #fff;
    background: #EB3C1C;
}
</style>