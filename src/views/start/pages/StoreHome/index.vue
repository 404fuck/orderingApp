<!-- 门店首页 菜品列表 -->
<template>
    <div class="main-layout" style="z-index: -1">
        <MenuBtn @onItemClick="onItemClick" :qrcode="qrcode"></MenuBtn>
        <div
            class="list-block inset"
            v-if="
                curentStore.banner_display == '1' &&
                curentStore.banner_url != null &&
                curentStore.banner_url.length > 0
            "
            style="
                background: none;
                margin-top: 20px;
                margin-bottom: 0px;
                margin-right: 10px;
                margin-left: 10px;
            "
        >
            <img
                :src="curentStore.banner_url"
                width="100%"
                height="110"
                style="object-fit: cover; border-radius: 5px"
            />
        </div>
        <!-- 热销榜是否展示 -->
        <div class="row">
            <div
                class="col-60"
                v-if="Object.keys(recommandDishList).length > 0"
            >
                <CommonTitle
                    :title="{ type_name: $t('hotDish'), type_name_en: null }"
                    :showRight="showRight"
                ></CommonTitle>
            </div>
            <div v-else class="col-60"></div>
            <div
                class="col-40"
                style="position: relative; right: 0px; top: 10px"
            >
                <SelectLang
                    :order_mode="order_mode"
                    :fixToken="fixToken"
                    :order_source="order_source"
                    v-if="order_mode == '3' || orderSourceStar"
                    style="color: #808080 !important"
                ></SelectLang>
            </div>
            <div
                class="col-100"
                v-if="Object.keys(recommandDishList).length > 0"
            >
                <div v-for="(item, index) in recommandDishList" :key="index">
                    <RecommItem
                        :dishes="item"
                        :canGoPlay="item.canGoPlay"
                        :tagsList="tagsList"
                        @addCart="addCart"
                        @delCart="delCart"
                        @updateDishNum="updateDishNum"
                        @showFoodDetail="showFoodDetail"
                    />
                </div>
            </div>
        </div>
        <div class="news">
            <div v-if="dishListType == 1">
                <div
                    class="dishType"
                    v-for="(item, key) in salesList"
                    :key="key"
                >
                    <CommonTitle
                        v-if="item.type_id != -2"
                        :title="item"
                        :showRight="false"
                        :id="'dishType' + item.type_id"
                    ></CommonTitle>
                    <div
                        v-show="key == 0"
                        class="right-style"
                        @click="changeType(2)"
                    >
                        <span
                            class="listName font12"
                            style="
                                width: 50%;
                                margin-top: -22px;
                                float: right;
                                margin-right: 15px;
                            "
                        >
                            <img
                                src="../../../../style/images/list.png"
                                alt
                                width="18"
                                height="18"
                            />
                            <span
                                style="position: relative; top: -5px; left: 3px"
                                >{{ $t("qiehuanList") }}</span
                            >
                        </span>
                    </div>
                    <ul>
                        <li
                            class="liItem"
                            v-for="(dishitem, index) in item.dishSimpleVOS"
                            :key="index"
                        >
                            <NewFood
                                v-if="item.type_id != -2"
                                :dishtag="item.type_id"
                                :tagsList="tagsList"
                                :dishes="dishitem"
                                :canGoPlay="dishitem.canGoPlay"
                                @addCart="addCart"
                                @delCart="delCart"
                                @showFoodDetail="showFoodDetail"
                            />
                        </li>
                        <li class="clearFloat"></li>
                    </ul>
                    <div class="botom"></div>
                </div>
            </div>
            <div v-if="dishListType == 2">
                <div
                    class="dishType"
                    v-for="(item, index) in salesList"
                    :key="index"
                >
                    <CommonTitle
                        :title="item"
                        :showRight="false"
                        :id="'dishType' + item.type_id"
                    ></CommonTitle>
                    <div
                        v-show="index == 0"
                        class="col-40 right-style"
                        @click="changeType(1)"
                    >
                        <span
                            class="listName font12"
                            style="
                                width: 50%;
                                margin-top: -22px;
                                float: right;
                                margin-right: 15px;
                            "
                        >
                            <img
                                src="../../../../style/images/list.png"
                                alt
                                width="18"
                                height="18"
                            />
                            <span
                                style="position: relative; top: -5px; left: 3px"
                                >{{ $t("qiehuanList") }}</span
                            >
                        </span>
                    </div>
                    <RecommItem1
                        v-for="(dishitem, index) in item.dishSimpleVOS"
                        :key="index"
                        :dishtag="item.type_id"
                        :dishes="dishitem"
                        :tagsList="tagsList"
                        :canGoPlay="dishitem.canGoPlay"
                        @addCart="addCart"
                        @delCart="delCart"
                        @showFoodDetail="showFoodDetail"
                    />
                </div>
            </div>
        </div>
        <!-- webScoket 消息推送 -->
        <!-- <Socket
            v-if="isWebSocket"
            :getWebSocketArr="getWebSocketArr"
        ></Socket> -->

        <!-- 固定套餐详情 -->
        <van-popup
            :overlay="true"
            :style="{ height: '100%', width: '100%', padding: '0' }"
            v-model="isShowFixedFoodDetail"
            get-container="#app"
        >
            <FoodFixedDetail
                v-if="isShowFixedFoodDetail"
                :dishes="curentDishes"
                @addCart="addCart"
                @delCart="delCart"
            ></FoodFixedDetail>
            <img
                src="../../../../style/images/backimg.png"
                class="closeImg2"
                @click="isShowFixedFoodDetail = false"
                width="30"
                height="30"
            />
        </van-popup>
        <!-- 自选套餐详情 -->
        <van-popup
            :overlay="true"
            :style="{ height: '100%', width: '100%', padding: '0' }"
            v-model="isShowFoodOptionalDetail"
            get-container="#app"
        >
            <FoodOptionalDetail
                v-if="isShowFoodOptionalDetail"
                :dishes="curentDishes"
                @addCart="addCart"
                @delCart="delCart"
            ></FoodOptionalDetail>
            <img
                src="../../../../style/images/backimg.png"
                class="closeImg2"
                @click="isShowFoodOptionalDetail = false"
                width="30"
                height="30"
            />
        </van-popup>
        <!--普通 菜品详情 -->
        <van-popup
            v-model="isShowFoodDetail"
            get-container="#app"
            @close="dismissFoodDetail"
        >
            <div class="popupcontent">
                <div class="fooddetail">
                    <FoodDetail
                        v-if="isShowFoodDetail"
                        :dishes="curentDishes"
                        :curSelectIndex="curSelectIndex"
                        :tagsList="tagsList"
                        @addCart="addCart"
                        @delCart="delCart"
                        @onSpecialItemClick="onSpecialItemClick"
                        @onTagItemClick="onTagItemClick"
                        @onSelectItemClick="onSelectItemClick"
                    ></FoodDetail>
                </div>
                <img
                    src="../../../../style/images/close.png"
                    class="closeImg"
                    @click="isShowFoodDetail = false"
                    width="32"
                />
            </div>
        </van-popup>
        <!-- 菜品分类 -->
        <van-popup
            v-model="isShowMenuType"
            get-container="#app"
            position="left"
            :style="{ height: '100%', width: '60%' }"
            :overlay="false"
        >
            <div class="popupcontent">
                <MenuTypePage
                    :dishTypeList="menuList"
                    @clickMenuType="clickMenuType"
                    @onItemClick="onItemClick"
                    @onTypeItemClick="onTypeItemClick"
                ></MenuTypePage>
            </div>
        </van-popup>

        <!-- 服务铃 -->
        <van-popup v-model="isShowService" get-container="#app">
            <div class="servicepage">
                <ServicePage
                    v-if="isShowService"
                    :serviceArray="serviceArray"
                    @closeService="closeService"
                    @onService="onService"
                ></ServicePage>
            </div>
        </van-popup>

        <MainMenuTypeBtn
            style="float: left"
            @click.native="clickMenuType(true)"
        ></MainMenuTypeBtn>

        <div>
            <FloatActionBar
                style="position: fixed"
                actionType="start"
                :order_mode="order_mode"
                :scan_type="scan_type"
                :fixToken="fixToken"
                :order_source="order_source"
            ></FloatActionBar>
        </div>

        <van-popup v-model="showShareCode" style="width: 100%; height: 100%">
            <ShareCode @closeClick="closeClick"></ShareCode>
        </van-popup>

        <!-- 分类 -->
        <van-popup v-model="show" style="width: 100%; height: 100%">
            <div class="row" style="position: relative; top: 54%; left: -25px">
                <div class="col-100" v-if="$store.getters.language == 'zh_CN'">
                    <img
                        src="../../../../style/images/popFenlei_zn.png"
                        alt=""
                        width="75"
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
                        src="../../../../style/images/popFenlei_en.png"
                        alt=""
                        width="75"
                    />
                </div>
                <div class="col-100 font16 center dotted">
                    <span>{{ $t("Unfold") }}</span>
                </div>
                <div class="col-100 center" style="margin-top: 40px">
                    <button class="button btn" @click="close">
                        {{ $t("DONE") }}
                    </button>
                </div>
            </div>
        </van-popup>
        <!-- 服务铃 -->
        <van-popup v-model="showFuwu" style="width: 100%; height: 100%">
            <div class="row" style="position: relative; top: 9%">
                <div class="col-100" v-if="$store.getters.language == 'zh_CN'">
                    <img
                        src="../../../../style/images/popFuwu_zn.png"
                        alt=""
                        width="90"
                        style="position: relative; left: 73%"
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
                        src="../../../../style/images/popFuwu_en.png"
                        alt=""
                        width="90"
                        style="position: relative; left: 73%"
                    />
                </div>
                <div class="col-100 font16 center dotted" style>
                    <span>{{ $t("Use call") }}</span>
                </div>
                <div class="col-100 center" style="margin-top: 40px">
                    <button class="button btn" @click="closeFuwu">
                        {{ $t("DONE") }}
                    </button>
                </div>
            </div>
        </van-popup>
        <!-- 店码模式预约时间选择 -->
        <YuyuePickData
            :yuyueShow="yuyueShow"
            @yuyueClick="yuyueClick"
            :getSerUrl="getSerUrl" 
            v-if="String(isYuYue)=='true'&&yuYueTime==''&&showShareCode==false&&show==false"
        ></YuyuePickData>
    </div>
</template>

<script>
import MenuBtn from "../../../../components/MenuBtn";
import CopyURL from "../../../../components/CopyURL";
import RealMessage from "../../../../components/RealMessage";
// 弹出菜品详情
import FoodDetail from "../../../../components/FoodDetail";
// 弹出固定套餐详情
import FoodFixedDetail from "../../../../components/FoodFixedDetail";
//  弹出自选套餐详情
import FoodOptionalDetail from "../../../../components/FoodOptionalDetail";

// 弹出菜品规格详情
import SpecificDetail from "../../../../components/SpecificDetail";
import RecommItem from "../../../../components/RecommItem";
// 新品上市——菜品列表切换页
import RecommItem1 from "../../../../components/RecommItem1";
import CommonTitle from "../../../../components/CommonTitle";
import NewFood from "../../../../components/NewFood";
import MenuTypePage from "../../../../components/MenuTypePage";
import MainMenuTypeBtn from "../../../../components/MainMenuTypeBtn";
import FloatActionBar from "../../../../components/FloatActionBar";
//服务铃
import ServicePage from "../../../../components/ServicePage";
import SelectLang from "../../../../components/SelectLang";
import ShareCode from "../ShareCode";
import { Dialog } from "vant";
//webSocket消息推送
import Socket from "../../../../components/Socket";
// 店码模式预约时间选择
import YuyuePickData from "../../../../components/YuyuePickData";
export default {
    name: "StoreHome",
    components: {
        SelectLang,
        MenuBtn,
        CopyURL,
        RealMessage,
        SpecificDetail,
        FoodDetail,
        FoodFixedDetail,
        FoodOptionalDetail,
        RecommItem,
        RecommItem1,
        CommonTitle,
        NewFood,
        MenuTypePage,
        MainMenuTypeBtn,
        FloatActionBar,
        ServicePage,
        ShareCode,
        Socket,
        YuyuePickData
	},
    computed: {
        language: {
            get() {
                return this.$store.getters.language;
            },
            set(val) {},
        },
        curentStore() {
            return this.$store.getters.curentStore;
        },
        token() {
            return this.$store.getters.token;
        },
        dinersNum() {
            return this.$store.getters.dinersNum;
        },
        storeTakeOut() {
            return this.$store.getters.storeTakeOut;
        },
        isYuYue() {
            return this.$store.getters.isYuYue;
        },
        yuYueTime() {
            return this.$store.getters.yuYueTime;
        },
        getDishNum(dish_id) {
            return function (dish_id) {
                return this.$store.getters.dishNums[dish_id] | 0;
            };
        },
        getTotalDishNum() {
            return function () {
                return this.$store.getters.totalNum | 0;
            };
        },
        dishListType: {
            get() {
                return this.$store.getters.dishListType;
            },
            set(val) {},
        },
    },
    data() {
        return {
            copy_href: "",
            show: false,
            showDingdan: false,
            showFuwu: false,
            serviceArray: [],
            curentComputeNumId: -1,
            showRight: false,
            showSwipe: false,
            isShowSpecial: false,
            isShowService: false,
            isShowMenuType: false,
            curentDishPrice: 0, //当前加购菜品价格
            curentMemberPrice: 0, //当前加购菜品会员价格
            curentSalepmtPrice: 0, //当前加购菜品促销价格
            curSelectIndex:0,//当前规格菜 规格选中项
            special: null,
            charactor: null,
            selectArray: null,
            optional_dish: [],
            dishTypeList: [], //分类列表
            menuList: {}, //菜品列表
            dishList: {}, //新品上市列表
            salesList: {}, //促销菜品列表
            recommandDishList: {}, //店家推荐列表
            isShowFoodDetail: false, //是否展示菜品详情
            isShowFixedFoodDetail: false, //是否展示固定套餐菜品详情
            isShowFoodOptionalDetail: false, //是否展示自选套餐菜品详情
            curentDishes: {}, //当前菜品详情
            shoppingCartDetail: {}, //购车详细信息
            tempDishList: {}, //购车详细信息
            tempRecommandDishList: {}, //购车详细信息
            salepmt_type: 0, //0：满减券，1:整单折扣，2：特价菜，3：第n份优惠，4：买赠
            salepmt_sts: 0, //促销优惠是否上线状态，1:上线状态，需要显示促销到页面
            salepmt_bg_flag: 0, //买赠优惠，0：属于买类别，1：属于赠送类别
            give_dish_price: 0,
            special_id: 0,
            give_dish_member_price: 0,
            count: 0,
            isLoading: false,
            showShareCode: false,
            order_mode: this.$store.getters.order_mode,
            scan_type: "",
            fixToken: this.$store.getters.fixToken,
            order_source: this.$store.getters.order_source,
            qrcode: this.$store.getters.qrcode,
            orderSourceStar: false,
            childItem: "",
            tagsList: [],
            
            propEnd:'', //获取路由最后一个值
            getSerUrl:'',//得到当前的环境url
            
            //webSocket
            websocket:null,
            isWebSocket:false,
            getWebSocketArr:[],
            yuyueShow: true,

        };
    },
    methods: {
        //店码模式预约时间选择弹窗
        yuyueClick(){
            this.yuyueShow = false;
        },
        updateDishNum(value, dishes) {
            let that = this;
            clearTimeout(this.timer);
            this.timer = setTimeout(function () {
                that.uploadRemark(value, dishes);
            }, 1000);
        },
        uploadRemark(value, dishes) {
            let data = {
                dep_id: this.curentStore.dep_id,
                param: this.curentStore.tb_id, //桌子id
                dish_num: value,
                str_param: dishes.dish_id_cart, // 菜品在购物车内的key,
                token: this.token,
            };
            let that = this;
            this.$http({
                method: "post",
                url: this.getSerUrl+':18081/capis/shoppingcart/inputDishNum',
                data: data,
            }).then((ress) => {
                var res=ress.data;
                if (res.code == "101") {
                    that.refreshDishList();
                    that.toast.success(res.msg);
                } else {
                    that.toast.fail(res.msg);
                }
            }).catch((err) => {
                // that.toast.error(err);
            });
        },
        getCookie(objName) {
            //获取指定名称的cookie的值
        },
        closeClick() {
            this.showShareCode = false;
            this.$store.dispatch("setShowShareCode", false);
            this.show = true;
        },
        close() {
            this.show = false;
            if (
                this.qrcode[0] == "D" &&
                this.qrcode[1] == "E" &&
                this.qrcode[2] == "P" &&
                this.qrcode[3] == "X" &&
                this.qrcode[4] == "_"
            ) {
                this.showFuwu = false;
            } else {
                this.showFuwu = true;
            }
        },
        closeFuwu() {
            this.showFuwu = false;
        },
        //设置cookie
        setCookie(c_name, exdays) {
            var exdate = new Date(); //获取时间
            exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
            //字符串拼接cookie
            window.document.cookie =
                "userName" +
                "=" +
                c_name +
                ";path=/;expires=" +
                exdate.toGMTString();
        },
        //读取cookie
        getCookie() {
            if (document.cookie.length > 0) {
                Dialog.confirm({
                    message: document.cookie,
                    confirmButtonText: "ok",
                    cancelButtonText: "cancel",
                })
                    .then(() => {})
                    .catch(() => {
                        // on cancel
                    });
            }
        },
        getServeArr() {
            if(this.curentStore.call_item!=""){
                let arr = this.curentStore.call_item.split("|");
                var temp = [];
                for (var i in arr) {
                    temp.push({ value: arr[i], select: false });
                }
                this.serviceArray = temp;

            }
        },
        getShowSpecial(dishes) {
            //判断是否展示规格
            return (
                dishes.weight_spec == "2" ||
                dishes.weight_spec == "4" ||
                dishes.taste_set ||
                dishes.dishAdditionalSimpleVOList != null ||
                dishes.weight_spec == "1"
            );
        },
        addCart(
            dishes,
            dish_price,
            member_price,
            salepmt_price,
            showDetail,
            weight
        ) {
            this.isShowFoodDetail = false;
            this.isShowFixedFoodDetail = false;
            this.isShowFoodOptionalDetail = false;
            this.curentDishPrice = Number(dish_price);
            this.curentMemberPrice = Number(member_price);
            this.curentSalepmtPrice = Number(salepmt_price);
            this.optional_dish = dishes.optional_list;
            // console.log(this.optional_dish);
            var id = dishes.dish_id;
            this.isShowSpecial = this.getShowSpecial(dishes);
            // alert(this.isShowSpecial);
            if (showDetail && this.isShowSpecial) {
                this.showFoodDetail(dishes);
            } else {
                if (dishes.weight_spec == "1") {
                    if (weight <= 0) {
                        this.toast.fail(this.$t("dish.inputWeight"));
                        this.isShowFoodDetail = true;
                        return false;
                    }
                }
                this.addDish(dishes, weight);
            }
        },
        delCart(dishes) {
            this.isShowSpecial = this.getShowSpecial(dishes);
            if (this.isShowSpecial) {
                this.toast.info(this.$t("setShopcart"));
                return;
            }

            this.lessDish(dishes);
        },
        onSpecialItemClick(special,index) {
            this.curSelectIndex = Number(index);
            this.special = special;
        },
        onTagItemClick(charactor) {
            this.charactor = charactor;
            //this.toast.info(JSON.stringify(charactor))
        },
        onSelectItemClick(selectArray) {
            this.selectArray = selectArray;
            //this.toast.info(JSON.stringify(selectArray))
        },
        onTypeItemClick(type) {
            // alert("dishType" + type);
            document.getElementById("dishType" + type).scrollIntoView();
            //this.toast.info(JSON.stringify(classList))
            this.isShowMenuType = false;
        },
        clickMenuType(isShowMenuType) {
            this.isShowMenuType = isShowMenuType;
        },
        closeService() {
            this.isShowService = false;
        },
        onService(item) {
            this.callBell(item);
        },
        callBell(name) {
            let data = {
                dep_id: this.curentStore.dep_id,
                company_id: this.curentStore.company_id,
                param: this.curentStore.tb_id,
                str_param: this.curentStore.tb_name,
                str_param1: name,
                str_param2: 0,
                token: this.token,
            };
            let that = this;
            this.$http({
                method: "post",
                url: this.getSerUrl+':18081/capis/bell/call',
                data: data,
            }).then((ress) => {
                var res=ress.data;
                if (res.code == "1") {
                    that.toast.info(that.$t("bellSuccess"));
                    that.isShowService = false;
                } else {
                    that.toast.fail(res.msg);
                }
            }).catch((err) => {
                // that.toast.error(err);
            });
        },
        addDish(dishes, weight) {
            var map = {};
            if (dishes.weight_spec == "2") {
                if (this.special) {
                    map["spec_detail"] = JSON.stringify(this.special);
                }
            } else if (dishes.weight_spec == "1") {
                map["spec_detail"] = weight;
            }
            if (this.charactor) {
                map["taste_set"] = this.charactor;
            }
            if (this.selectArray) {
                // alert(JSON.stringify(this.selectArray))
                map["dish_additional"] = this.selectArray;
            }
            if (dishes.weight_spec == "4") {
                if (this.optional_dish) {
                    map["optional_detail"] = this.optional_dish;
                }
            }
            let id = dishes.dish_id;
            let data = {
                dep_id: this.curentStore.dep_id,
                company_id: this.curentStore.company_id,
                param: this.curentStore.tb_id, //桌子id
                str_param: id, //菜品id
                param2: 1, //菜品数量
                map: map,
                token: this.token,
            };
            let that = this;
            var num = this.getDishNum(id);
            this.$http({
                method: "post",
                url: this.getSerUrl+':18081/capis/shoppingcart/onedishadd',
                data: data,
            }).then((ress) => {
                var res=ress.data;
                if (res.code == "101") {
                    // alert('DDDD'+JSON.stringify(data))
                    that.updateDishCartId(id, res.msg);
                    that.addTotal(dishes.least_number);
                    that.refreshDishList();
                    that.toast.success(that.$t("addShopcart"));
                } else if (res.code == -102 || res.code == -103) {
                    that.refreshDishList();
                } else {
                    that.toast.fail(res.msg);
                }
            }).catch((err) => {
                // that.toast.error(err);
            });
        },

        dismissFoodDetail() {
            this.charactor = null;
            this.special = null;
            this.selectArray = null;
            this.optional_dish = [];
        },
        lessDish(info) {
            //减少菜品
            let data = {
                dep_id: this.curentStore.dep_id,
                param: this.curentStore.tb_id, //桌子id
                str_param: info.dish_id_cart, //菜品id
                param2: 1, //菜品数量
                token: this.token,
            };
            let that = this;
            this.$http({
                method: "post",
                url: this.getSerUrl+':18081/capis/shoppingcart/onedishsub',
                data: data,
            }).then((ress) => {
                var res=ress.data;
                if (res.code > 0) {
                    //  that.stringutils.setDishNum(info.dish_id, --num);
                    that.addTotal(info.least_number);
                    that.refreshDishList();
                } else if (res.code == -102 || res.code == -103) {
                    that.refreshDishList();
                } else {
                    that.toast.fail(res.msg);
                }
            }).catch((err) => {
                // that.toast.error(err);
            });
        },
        //展示菜品详情
        showFoodDetail(dishes) {
            if (dishes.weight_spec == "3") {
                this.isShowFixedFoodDetail = true;
            } else if (dishes.weight_spec == "4") {
                this.isShowFoodOptionalDetail = true;
            } else {
                this.isShowFoodDetail = true;
            }
            this.curentDishes = dishes;
            // alert(dishes.sell_week.length)
            //初始化规格等信息
            if (dishes.sell_date != "" && dishes.sell_dateChange != true) {
                dishes.sell_date = dishes.sell_date.split("/");
                dishes.sell_dateChange = true;
                dishes.sell_week = dishes.sell_week.replace(/[^0-9]/gi, "");
            }
            if (dishes.weight_spec == "2" && dishes.spec_detail) {
                let specialList = JSON.parse(dishes.spec_detail);
                for (let index in specialList) {
                    if (specialList[index].default_choice==1) {
                        this.curSelectIndex = Number(index);
                        break;
                    }
                }
                this.special = specialList[this.curSelectIndex];
                
            } else {
                this.special = null;
            }
            //初始化口味等信息
            if (dishes.taste_set) {
                var taste_set = dishes.taste_set;
                this.charactor = [];
                //初始化charactor
                if (taste_set != null) {
                    for (let index = 0; index < taste_set.length; index++) {
                        let element = taste_set[index];
                        this.charactor[index] = this.getItem(element);
                        // alert(JSON.stringify(this.charactor[index]))
                    }
                }
            } else {
                this.charactor = [];
            }
        },

        getCanGoPlay(dishes) {
            var canGoPlay = false;
            var item = dishes;
            if (dishes.sell_date != "") {
                if (item.sell_dateChange != true) {
                    item.sell_date = dishes.sell_date.split("/");
                    item.sell_dateChange = true;
                    item.sell_week = dishes.sell_week.replace(/[^0-9]/gi, "");
                }
                var CurrentTime = new Date();
                var startTime = new Date(item.sell_date[0]);
                var endTime = new Date(item.sell_date[1]);
                var day = CurrentTime.getDay();
                var hours = CurrentTime.getHours();
                var minutes = CurrentTime.getMinutes();
                var index = 0;
                for (index = 0; index < dishes.sell_week.length; index++) {
                    if (dishes.sell_week[index] == day) {
                        canGoPlay = true;
                    }
                }
                if (
                    CurrentTime.getTime() < startTime.getTime() ||
                    CurrentTime.getTime() > endTime.getTime()
                ) {
                    canGoPlay = false;
                }
                var currCalT = hours * 100 + minutes;
                var startCalT =
                    dishes.sell_time_start.replace(/[^0-9]/gi, "") * 1;
                var endCalT = dishes.sell_time_end.replace(/[^0-9]/gi, "") * 1;
                if (currCalT < startCalT || currCalT > endCalT) {
                    canGoPlay = false;
                }
            } else {
                canGoPlay = true;
            }
            return canGoPlay;
        },

        getItem(item) {
            var selectItem = {};
            this.childItem = item.taste_list;
            for (var index in this.childItem) {
                this.childItem[index].checked = false;
            }
            selectItem["taste_name"] = item.taste_name;
            selectItem["taste_name_en"] = item.taste_name_en;
            selectItem["taste_name_my"] = item.taste_name_my;
            selectItem["taste_name_zh"] = item.taste_name_zh;
            selectItem["need_i18n"] = item.need_i18n;
            selectItem["single_multiple"] = item.single_multiple;
            selectItem["is_sys"] = item.is_sys;
            selectItem["taste_list"] = this.childItem;

            return selectItem;
        },
        //切换列表样式
        changeType(showType) {
            this.$store.dispatch("setDishListType", showType);
        },

        onItemClick(index) {
            switch (index) {
                case 0:
                    window.location.href = "./dish.html#/hotDish";
                    break;
                case 1:
                    break;
                case 2:
                    window.location.href = "./dish.html#/search";
                    break;
                case 3:
                    this.isShowService = true;
                    break;
                case 4:
                    window.location.href = "./dish.html#/hotDish";
                    break;
                case 5:
                    window.location.href = "./dish.html#/orderhistory";
                    break;
                default:
                    break;
            }
            this.isShowMenuType = false;
        },
        publishStorage(tempDishList, shoppingCartDetail) {
            //初始化菜品信息
            var dic = {};
            var canGoPlayArry = 0;
            var dontCanGoPlayArry = 0;
            var setNum = 0;
            var dontCanGoPlayNum = 0;
            var CanGoPlayNum = 0;
            if (this.tempDishList != null) {
                for (var n in tempDishList) {
                    canGoPlayArry = {};
                    dontCanGoPlayArry = {};
                    dontCanGoPlayNum = 0;
                    CanGoPlayNum = 0;
                    for (var m in tempDishList[n].dishSimpleVOS) {
                        const item = tempDishList[n].dishSimpleVOS[m];
                        dic[item.dish_id] = 0;
                        tempDishList[n].dishSimpleVOS[
                            m
                        ].canGoPlay = this.getCanGoPlay(
                            tempDishList[n].dishSimpleVOS[m]
                        );
                        if (
                            tempDishList[n].dishSimpleVOS[m].canGoPlay == true
                        ) {
                            canGoPlayArry[dontCanGoPlayNum++] =
                                tempDishList[n].dishSimpleVOS[m];
                        } else {
                            dontCanGoPlayArry[CanGoPlayNum++] =
                                tempDishList[n].dishSimpleVOS[m];
                        }
                    }

                    for (var index in canGoPlayArry) {
                        tempDishList[n].dishSimpleVOS[setNum++] =
                            canGoPlayArry[index];
                    }
                    for (var index in dontCanGoPlayArry) {
                        tempDishList[n].dishSimpleVOS[setNum++] =
                            dontCanGoPlayArry[index];
                    }
                    setNum = 0;
                }

            }
            //更新购物车缓存
            if (
                shoppingCartDetail != null &&
                shoppingCartDetail.shopping_cart_dishes_vo != null
            ) {
                var shopping_cart_dishes_vo =
                    shoppingCartDetail.shopping_cart_dishes_vo;
                var totalNum = 0;
                for (const key in shopping_cart_dishes_vo) {
                    if (shopping_cart_dishes_vo.hasOwnProperty(key)) {
                        const item = shopping_cart_dishes_vo[key];
                        this.updateDishCartId(item.dish_id, key);
                        if (item.weight_spec == "2") {
                            var specialList = JSON.parse(item.spec_detail);
                            if (dic[specialList[0].id] == null) {
                                dic[specialList[0].id] = 0;
                            }
                            dic[specialList[0].id] += item.dish_num;
                        }
                        dic[item.dish_id] += item.dish_num;
                        // alert(dic[item.dish_id]+"id="+item.dish_id);
                        totalNum = Number(totalNum) + Number(item.dish_num);
                    }
                }
                this.$store.dispatch("setTotalNum", totalNum);
            } else {
                this.$store.dispatch("setTotalNum", 0);
            }
            this.$store.dispatch("setDishNums", dic);
        },
        updateDishCartId(id, cart_id) {
            for (let t in this.dishTypeList) {
                let list = this.dishTypeList[t].list;
                for (let a in list) {
                    let dishes = list[a].dishSimpleVOS;
                    for (let d in dishes) {
                        if (dishes[d].dish_id === id) {
                            dishes[d].dish_id_cart = cart_id;
                        }
                    }
                }
            }
            for (let i in this.recommandDishList) {
                if (this.recommandDishList[i].dish_id === id) {
                    this.recommandDishList[i].dish_id_cart = cart_id;
                }
            }
        },
        addTotal(num) {
            var totalNum = this.getTotalDishNum();
            this.$store.dispatch("setTotalNum", Number(totalNum));
        },
        //18000端口拉取返回的 serverUrl
		getServerUrl() {
            let that = this;
            let data = {
                qr_code: this.qrcode?this.qrcode:this.propEnd
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
                    if(that.token){
                        that.getDishList();
                        that.tagspeclist();
                        //桌码模式开启webSocKet
                        // if (that.qrcode[0] == "T" && that.qrcode[1] == "D" &&that.qrcode[2] == "E" &&that.qrcode[3] == "P" &&that.qrcode[4] == "_"){
                        //     that.initWebSocket();
                        // }
                    }
                } else {
                    that.toast.error(res.data.msg);
                }
            }).catch((err) => {
                // that.toast.error(err);
            });
            
		},
		getDishList() {
            let data = {
                dep_id: this.curentStore.dep_id,
                company_id: this.curentStore.company_id,
                param: this.dinersNum,
                param1: this.curentStore.tb_id,
                map: {
                    take_out: parseInt(this.$store.getters.take_out),
                    appoint_time: "",
                    store_take_out: this.storeTakeOut,
                },
                token: this.token,
               
            };
            let that = this;

            this.$http({
                method: "post",
                url: this.getSerUrl+':18081/capis/dishes/list',
                data: data,
            }).then((ress) => {
                var res = ress.data;
                if (res.code == "1") {
                    if (res.data != null) {
                        //更新购物车缓存
                        that.menuList = [];
                        that.tempDishList = {};
                        that.shoppingCartDetail = {};

                        that.tempDishList = res.data.dishList;
                        for (
                            let idx = 0, len = res.data.dishList.length;
                            idx < len;
                            idx++
                        ) {
                            that.menuList.push(res.data.dishList[idx]);
                        }
                        that.salesList = res.data.dishList; //促销菜品列表
                        that.tempRecommandDishList = res.data.recommandDishList;
                        that.shoppingCartDetail = res.data.shoppingCartDetail;
                        that.generateDishList(res.data.dishList);
                        that.recommandDishList = res.data.recommandDishList; // 店家推荐热销
                        var canGoPlayArry = {};
                        var dontCanGoPlayArry = {};
                        var canGoPlayNum = 0;
                        var dontCanGoPlayNum = 0;
                        var setNum = 0;

                        for (let i in that.recommandDishList) {
                            that.recommandDishList[
                                i
                            ].canGoPlay = that.getCanGoPlay(
                                that.recommandDishList[i]
                            );
                            if (that.recommandDishList[i].canGoPlay == true) {
                                canGoPlayArry[canGoPlayNum++] =
                                    that.recommandDishList[i];
                            } else {
                                dontCanGoPlayArry[dontCanGoPlayNum++] =
                                    that.recommandDishList[i];
                            }
                        }
                        for (var n in canGoPlayArry) {
                            that.recommandDishList[setNum++] = canGoPlayArry[n];
                        }
                        for (var n in dontCanGoPlayArry) {
                            that.recommandDishList[setNum++] =
                                dontCanGoPlayArry[n];
                        }

                        that.publishStorage(
                            that.tempDishList,
                            that.shoppingCartDetail
                        );
                    }
                } else {
                    that.toast.fail(res.msg);
                }
            }).catch((err) => {
                // that.toast.error(err);
            });
            
        },
        // 菜品标签和规则列表查询
        tagspeclist() {
            let data = {
                dep_id: this.curentStore.dep_id,
                dict_type: "DISH_TAG",
                token: this.token,
            };
            this.$http({
                method: "post",
                url: this.getSerUrl+':18081/capis/dishes/tagspeclist',
                data: data,
            }).then((ress) => {
                var res=ress.data;
                if (res.code == "1") {
                    that.tagsList = res.data;
                } else {
                    that.toast.fail(res.msg);
                }
            }).catch((err) => {
                // that.toast.error(err);
            });
            
		},
        refreshDishList() {
            let data = {
                dep_id: this.curentStore.dep_id,
                company_id: this.curentStore.company_id,
                param: this.dinersNum,
                param1: this.curentStore.tb_id,
                map: {
                    take_out: parseInt(this.$store.getters.take_out),
                    appoint_time: "",
                    store_take_out:this.storeTakeOut,
                },
                token: this.token,
            };
            let that = this;
            this.$http({
                method: "post",
                url: this.getSerUrl+':18081/capis/dishes/list',
                data: data,
            }).then((ress) => {
                var res=ress.data;
                if (res.code == "1") {
                    if (res.data != null) {
                        that.publishStorage(
                            res.data.dishList,
                            res.data.shoppingCartDetail
                        );
                    }
                } else {
                    that.toast.fail(res.msg);
                }
            }).catch((err) => {
                // that.toast.error(err);
            });
        },
        generateDishList(dishList) {
            //对菜品分类处理

            var dishTypeList = [];
            var index = 0;
            for (var idx in dishList) {
                var element = dishList[idx];
                var type = element.type_id;
                const typeName = element.type_name;
                const typeName_en = element.type_name_en;

                var typeObj = {};
                var list = [];
                list.push(element);
                typeObj["type"] = type;
                typeObj["typeName"] = typeName;
                typeObj["typeName_en"] = typeName_en;
                typeObj["list"] = list;
                typeObj["index"] = index;
                dishTypeList[type] = typeObj;
                index++;
            }
            //第一个 加上切换
            index = 0;
            for (var i in dishTypeList) {
                dishTypeList[i].index = index;
                index++;
            }
            this.dishTypeList = dishTypeList;
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
            this.getDishList();
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
        document.title = this.curentStore.dep_comp_name + this.$t("start.menu");
	},
	// destroyed () {
    //     // 销毁监听
    //     this.websocket.onclose = this.websockClose;
    // },
    created() {
        let show_href = window.location.href;
        this.propEnd = this.getUrlStr.getUrl();
        if(this.propEnd!='storeHome'){
            //ipay88模式
            document.cookie = "showUrl===" +show_href;
            this.$store.dispatch("setIpayQrcode", true);
        }
        this.scan_type = this.curentStore.scan_type;
        // alert(this.curentStore.scan_type)
        var popped = "";
        var objName = "popped";
        var arrStr = document.cookie.split("; ");
        for (let i = 0; i < arrStr.length; i++) {
            let temp = arrStr[i].split("=");
            if (temp[0] == objName) {
                popped = decodeURI(temp[1]);
            }
        }
        if (this.curentStore) {
            this.getServerUrl();
            this.getServeArr();
        }
        if (popped == ""&&this.propEnd=='storeHome') {
            //cookie 中没有 popped 则赋给他一个值（此时弹框显示）
            document.cookie = "popped = yes";
            this.showShareCode = true;
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
        // 首次加载使用缓存   1.促销菜品列表 2.店家推荐热销
        // let salesListJsonStr = localStorage.getItem('dataSalesList'); //取出list接口数据
        // let recommandListJsonStr = localStorage.getItem('dataRecommandList'); //取出list接口数据
        // this.salesList=JSON.parse(salesListJsonStr)//转为对象
        // this.recommandDishList=JSON.parse(recommandListJsonStr)//转为对象
        // console.log(this.salesList);
        // console.log(this.recommandDishList);
    }, 
    watch:{
        curentStore:{
            handler(newVal,odlVal){
                if(newVal){
                    this.getServerUrl();
                    this.getServeArr();
                }
            }
        }
    }
    
};
</script>
<style scoped>
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
.botom {
    height: 55px;
    position: absolute;
    bottom: 0;
}

.clearFloat {
    clear: both;
}

.liItem {
    width: 50%;
    float: left;
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
</style>