<!--
 * @Author: zzt
 * @Date: 2021-04-01 19:19:32
 * @LastEditTime: 2021-08-25 14:27:10
 * @LastEditors: zzt
 * @Description: 欢迎页
 * @FilePath: \sjoyOrderingApp\src\views\start\pages\Start\index.vue
-->
<template>
    <div class="codeStyle">
        <SelectLang ref="changeLang"></SelectLang>
        <CopyURL
            :style="
                msg == '请扫描正确的二维码' ? 'display:none' : 'display:block'
            "
        />
        <div class="storeInfo">
            <img
                class="dep-logo"
                :src="dep_logo"
            />
            <div class="dep-name">
                <span>{{ dep_comp_name }}</span>
                <img v-if="isHalal=='1'" class="dep-halal" src="../../../../style/images/halal.png" width="24" height="24">
            </div>
            <div class="dep-welcome">
                <span>{{ $t("start.welcome") }}！</span>
            </div>
        </div>
        <!-- 桌码显示 -->
        <div
            v-if="QRcode.substring(0, 4) == 'TDEP'"
            class="row no-gutter center"
            style="
                background: white;
                border-radius: 10px;
                margin: 12px 26px 50px 26px;
                padding-bottom: 30px;
            "
        >
            <div class="col-100 font14" style="margin: 20px;color:#505050;">
                - {{ $t("start.selectDishCount") }} -
            </div>
            <div class="col-100 jiucanBtn">
                <button
                    :class="{ active: active == 1 }"
                    class="button-round"
                    @click="jiucanCount(0)"
                >
                    1
                </button>
                <button
                    :class="{ active: active == 2 }"
                    class="button-round"
                    @click="jiucanCount(1)"
                >
                    2
                </button>
                <button
                    :class="{ active: active == 3 }"
                    class="button-round"
                    @click="jiucanCount(2)"
                >
                    3
                </button>
                <button
                    :class="{ active: active == 4 }"
                    class="button-round"
                    @click="jiucanCount(3)"
                >
                    4
                </button>
            </div>
            <div class="col-100 jiucanBtn">
                <button
                    :class="{ active: active == 5 }"
                    class="button-round"
                    @click="jiucanCount(4)"
                >
                    5
                </button>
                <button
                    :class="{ active: active == 6 }"
                    class="button-round"
                    @click="jiucanCount(5)"
                >
                    6
                </button>
                <button
                    :class="{ active: active == 7 }"
                    class="button-round"
                    @click="jiucanCount(6)"
                >
                    7
                </button>
                <button
                    v-if="moreCount == false"
                    :class="{ active: active == 8 }"
                    class="button-round"
                    @click="jiucanCount(7)"
                >
                    {{ $t("more") }}
                </button>
                <button
                    v-else
                    :class="{ active: active == 8 }"
                    class="button-round"
                    @click="jiucanCount(7)"
                >
                    8
                </button>
            </div>
            <div class="col-100 jiucanBtn" v-show="moreCount">
                <button
                    :class="{ active: active == 9 }"
                    class="button-round"
                    @click="jiucanCount(8)"
                >
                    9
                </button>
                <button
                    :class="{ active: active == 10 }"
                    class="button-round"
                    @click="jiucanCount(9)"
                >
                    10
                </button>
                <van-stepper
                    :class="{ colordisplay: display }"
                    v-model="writeValue"
                    min="11"
                    max="99"
                    integer
                    style="display: inline-block"
                    @change="writePeople()"
                />
            </div>
        </div>
        <!-- 店码显示 -->
        <div
            v-else
            class="row no-gutter center"
            style="
                background: white;
                border-radius: 10px;
                margin: 12px 26px 50px 26px;
                padding-bottom: 30px;
            "
        >
            <div class="col-100 font14" style="margin: 20px;color:#505050;">
                - {{$t("start.selectDishMode")}} -
            </div>
            <div class="xingshiBtn">
                <button
                   class="button-round"
                   :class="{ active: yuyueIndex == 0 }"
                   @click="xingshiCount(0)"
                >{{$t('start.tangshi')}}</button>
                <button
                   class="button-round"
                   :class="{ active: yuyueIndex == 1 }"
                   @click="xingshiCount(1)"
                >{{$t('start.ziqu')}}</button>
                <button
                   class="button-round"
                   :class="{ active: yuyueIndex == 2 }"
                   @click="xingshiCount(2)"
                >{{$t('start.waisong')}}</button>
            </div>
        </div>
        <!-- 开始点餐 -->
        <div>
            <button
                v-if="isStartShow"
                class="button button-round button-fill startOrder"
                @click="startOrder"
            >
                {{ $t("start.startDish") }}
            </button>
        </div>
        <!-- 预约点餐 -->
        <div>
            <button
                v-if="isYuyueShow"
                class="button button-round button-fill yuyueOrder"
                @click="yuyueOrder"
            >
                {{ $t("start.yuyueDish") }}
            </button>
        </div>
        <van-number-keyboard
            :show="showPicker"
            theme="custom"
            :close-button-text="$t('start.startDish')"
            @close="startOrder"
            maxlength="6"
            @blur="showPicker = false"
            @input="onInput"
            @="onDelete"
            hide-on-click-outside
        />

        <van-popup
            class="van-popup"
            v-model="showSafetyCode"
            style="width: 100%; height: 100%"
        >
            <SafetyCode @rememberClick="rememberClick"></SafetyCode>
        </van-popup>

        <van-popup
            class="van-popup"
            v-model="showWriteCode"
            style="width: 100%; height: 100%"
        >
            <WriteCode
                @sendCodeClick="sendCodeClick"
                @closeClick="closeClick"
            ></WriteCode>
        </van-popup>

        <van-popup
            class="van-popup"
            v-model="showTigs"
            style="
                width: 100%;
                height: 100%;
                background-color: #8c8c8c !important;
            "
        >
            <div
                v-if="msg == '请扫描正确的二维码'"
                style="height: 100%; background: #f5f9fc; text-align: center"
            >
                <div style="padding-top: 40%">
                    <img
                        src="../../../../style/images/errorCode.png"
                        alt=""
                        width="134"
                        style=""
                    />
                    <p class="font14" style="color: #808080">
                        {{ $t("start.toCode") }}
                    </p>
                </div>
            </div>
            <div v-else class="tigs">{{ msg }}</div>
        </van-popup>
        <van-popup
            class="van-popup"
            v-model="showTimeTigs"
            style="
                width: 100%;
                height: 100%;
                background-color: #8c8c8c !important;
            "
        >
            <div class="Timetigs" style="padding: 30px 0">
                <span>{{ $t("start.storeTime") }}：</span>
                <span class="top5">{{ timeMsg }}</span>
                <span class="top5">{{ $t("start.storeTigs") }}</span>
            </div>
        </van-popup>
        <van-popup
            class="van-popup"
            v-model="showPingzhuoTigs"
            style="
                width: 100%;
                height: 100%;
                background-color: #8c8c8c !important;
            "
        >
            <div class="Timetigs" style="padding: 30px 0">
                <span
                    >{{ $t("dish.pingzhuo") }},<br />{{
                        $t("dish.unSaoma")
                    }}</span
                >
            </div>
        </van-popup>
    </div>
</template>
<script>
import SelectLang from "../../../../components/SelectLang";
import SafetyCode from "../SafetyCode";
import WriteCode from "../WriteCode";
import CopyURL from "../../../../components/CopyURL";
export default {
    name: "Start",
    components: {
        SelectLang,
        CopyURL,
        SafetyCode,
        WriteCode,
    },
    computed: {
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
        getDishNum(dish_id) {
            return function (dish_id) {
                return this.$store.getters.dishNums[dish_id] | 0;
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
    },
    data() {
        return {
            isStartShow: false,
            isYuyueShow: false,
            yuyueIndex:0,
            showSafetyCode: false,
            showWriteCode: false,
            showTigs: false,
            showTimeTigs: false,
            scanOrderShow: false,
            display: false,
            dep_logo: "",
            token: "",
            dep_comp_name: "",
            isHalal:"",//为'1'是清真
            QRcode: "",
            index: 0,
            take_out: 0,
            order_mode: "3",
            showPicker: false,
            tempDishList: {}, //购车详细信息
            tempRecommandDishList: {}, //购车详细信息
            dishInfo: {}, //门店信息
            isOriginHei: true, //显示或者隐藏
            documentHeight: document.documentElement.clientHeight, //默认屏幕高度
            // curentStore: null,
            activeNames: ["1"],
            timer: null,
            msg: "",
            timeMsg: "",
            value: 1,
            writeValue: 11,
            activeBtn: 0,
            active: 1,
            moreCount: false,
            scanOrder: "",
            fixToken: "",
            order_source: "",
            tbBefore: 0,
            scanType: "",
            languageList: "",
            showPingzhuoTigs: false,
            //拉取scan接口
            requestData: {
                str_param: "",
                table_key: null,
                token: "",
            },

            getSerUrl: "", //得到当前的环境url
            oneToken: "", //判断第一次登陆使用的token

            //营业时间
            openTimeJson:"",
        };
    },
    methods: {
        jiucanCount(val) {
            this.display = false;
            this.active = val + 1;
            this.value = val;
            if (val == 7) {
                this.moreCount = true;
            }
        },
        xingshiCount(index){
            this.yuyueIndex = index;
        },
        writePeople() {
            this.active = this.writeValue;
            this.display = true;
        },

        //记住安全码
        rememberClick() {
            this.isStartShow = true;
            this.showSafetyCode = false;
        },
        closeClick() {
            this.showSafetyCode = false;
            this.showWriteCode = false;
        },
        //输入安全码
        sendCodeClick(val) {
            this.showSafetyCode = false;
            this.showWriteCode = false;
            this.getCurentStoreInfo(val);
        },
        getPublicModel() {
            if (this.stringutils.getPublicPayModel()) {
                return true;
            } else {
                return !this.stringutils.isAfter(this.curentStore);
            }
        },
        startOrder() {
            if (this.active == "" || this.active <= 0) {
                this.toast.info(this.$t("start.selectDishCount"));
                return;
            }
            this.showPicker = false;
            localStorage.setItem("isFirst", "true");
            this.$store.dispatch("setDinersNum", this.active);
            this.$store.dispatch("settake_out", this.take_out);
            //就餐形式
            if(this.QRcode.substring(0, 4) == "TDEP"){
                this.$store.dispatch("setStoreTakeOut", ""); 
            }else{
                //如果是外送
                if(this.yuyueIndex==2){
                    this.$store.dispatch("setDeliveryInfo", "");
                }
                this.$store.dispatch("setStoreTakeOut", String(this.yuyueIndex));//就餐形式
                this.$store.dispatch("setIsYuYue", false); //预约点餐
            }
            this.$router.push("/storeHome");
        },
        yuyueOrder(){
            //如果是外送
            if(this.yuyueIndex==2){
                this.$store.dispatch("setDeliveryInfo", "");
            }
            this.$store.dispatch("setStoreTakeOut", String(this.yuyueIndex)); //就餐形式
            this.$store.dispatch("setIsYuYue", true); //预约点餐
            this.$store.dispatch("setYuYueTime", ""); //预约时间置空
            this.$store.dispatch("setOpenTimeJson", this.openTimeJson); //营业时间
            this.$router.push("/storeHome");
        },
        getCurentStoreInfo(tablekey) {
            if (this.$route.query.token == null) {
                this.$store.dispatch(
                    "setToken",
                    this.stringutils.getPublicToken()
                );
                this.oneToken = "enjoyyourdinner";
            } else {
                this.$store.dispatch("setToken", this.$route.query.token);
                this.oneToken = this.$route.query.token;
            }
            this.requestData.table_key = tablekey;
            this.requestData.token = this.oneToken;
            let that = this;
            this.$http({
                method: "post",
                url: this.getSerUrl + ":18081/capis/order/scan",
                data: this.requestData,
            })
                .then((ress) => {
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
                        that.dep_logo = res.data.dep_logo;
                        that.dep_comp_name = res.data.dep_comp_name;
                        that.isHalal = res.data.halal;
                        //存储当前门店信息
                        that.dishInfo = res.data;
                        // this.$store.getters.language

                        that.scanType = that.dishInfo.scan_type; //返回扫码状态，0：桌码和店码，1：为扫桌码，2：为扫店码 ,
                        that.scanOrder = that.dishInfo.scan_order; // 扫码点餐开关，0为关，1为开
                        that.$store.dispatch("setCurentStore", res.data);
                        document.title =
                            that.$t("start.welcomeTo") + that.dep_comp_name;
                        that.$store.dispatch(
                            "setDinersNum",
                            res.data.diner_num
                        );
                        that.$store.dispatch(
                            "setorder_mode",
                            res.data.order_mode
                        );
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
                        if (res.data.diner_num > 0 && tablekey != null) {
                            that.showSafetyCode = true;
                            localStorage.setItem("isFirst", "true");
                            setTimeout(function () {
                                that.$router.push("/storeHome");
                            }, 80);
                        } else {
                            if (tablekey == null) {
                                that.showSafetyCode = true;
                            }
                        }
                        // 店码模式
                        if (that.QRcode.substring(0, 4) != "TDEP") {
                            that.showSafetyCode = false;
                            that.isStartShow = true;
                            that.isYuyueShow = true;
                            that.openTimeJson = res.data.open_time_json;
                        }
                    } else if (res.code == -666) {
                        that.token = res.data.token;
                        if (
                            that.token !== null &&
                            that.token !== "" &&
                            typeof that.token !== "undefined"
                        ) {
                            that.$store.dispatch("setToken", that.token);
                        }
                        that.dep_logo = res.data.dep_logo;
                        that.dep_comp_name = res.data.dep_comp_name;
                        that.isHalal = res.data.halal;
                        //存储当前门店信息
                        that.dishInfo = res.data;
                        that.$store.dispatch("setqrcode", that.QRcode);
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

                        document.title =
                            that.$t("start.welcomeTo") + that.dep_comp_name;
                        that.$store.dispatch(
                            "setDinersNum",
                            res.data.diner_num
                        );
                        //如果选过人数 就跳转到门店页面 不用重新选择人数
                        // that.showSafetyCode = false;
                        that.showWriteCode = true;
                    } else if (res.code == -1) {
                        that.msg = res.msg;
                        that.showTigs = true;
                        that.dishInfo = res.data;
                        that.$store.dispatch("setqrcode", that.QRcode);
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
                    }
                    //  -667:不在营业时间范围内
                    else if (res.code == -667) {
                        that.timeMsg = res.msg;
                        that.showTimeTigs = true;
                        that.dishInfo = res.data;
                        that.$store.dispatch("setqrcode", that.QRcode);
                        that.$store.dispatch(
                            "setscan_language",
                            res.data.scan_language
                        );
                        that.saveLang();
                        that.$store.dispatch(
                            "setorder_source",
                            res.data.order_source
                        );
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
                        that.$store.dispatch("setCurentStore", res.data);
                        that.dishInfo = res.data;
                        that.$store.dispatch("setqrcode", that.QRcode);
                        that.$store.dispatch(
                            "setscan_language",
                            res.data.scan_language
                        );
                        that.$store.dispatch(
                            "setorder_source",
                            res.data.order_source
                        );
                        that.saveLang();
                        window.location.href =
                        "./shopcart.html#/PlaceOrder?order_id=" +
                        res.data.order_id_show;
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
                        that.$store.dispatch("setCurentStore", res.data);
                        that.dishInfo = res.data;
                        that.$store.dispatch("setqrcode", that.QRcode);
                        that.$store.dispatch(
                            "setscan_language",
                            res.data.scan_language
                        );
                        that.$store.dispatch(
                            "setorder_source",
                            res.data.order_source
                        );
                        that.saveLang();
                        let strUrl = `./orderDetails.html#/?order_id=${res.data.order_id_show}&token=${res.data.token}&dep_id=${that.curentStore.dep_id}&qr_code=${that.QRcode}&lang=${res.data.scan_language}`;
                        strUrl = strUrl.replace(/\s+/g, "");
                        window.location.href = strUrl;
                        
                    } else if (res.code == -228) {
                        that.showPingzhuoTigs = true;
                    }
                })
                .catch((err) => {
                    // console.log('error');
                });
        },
        onInput(value) {
            this.value = this.value + value;
        },
        onDelete() {
            var str = this.value;
            if (str) {
                this.value = str.substring(0, str.length - 1);
            }
        },
        takeOutClick(index) {
            this.take_out = index;
        },
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
        //扫码时提前加载菜品列表 存入缓存中
        // getDishList() {
        //     let data = {
        //         dep_id: this.curentStore.dep_id,
        //         company_id: this.curentStore.company_id,
        //         param: this.$store.getters.dinersNum,
        //         param1: this.curentStore.tb_id,
        //         map: {
        //             take_out: parseInt(this.$store.getters.take_out),
        //             appoint_time: "",
        //         },
        //     };
        //     console.log(data);
        //     let that = this;
        //     this.$http({
        //         method: "post",
        //         url: this.getSerUrl + ":18081/capis/dishes/list",
        //         data: data,
        //     }).then((ress) => {
        //         var res = ress.data;
        //         if (res.code == "1" || res.code == "-6") {
        //             if (res.data != null) {
        //                 //存入缓存 1.促销菜品列表 2.店家推荐热销
        //                 localStorage.setItem(
        //                     "dataSalesList",
        //                     JSON.stringify(res.data.dishList)
        //                 );
        //                 localStorage.setItem(
        //                     "dataRecommandList",
        //                     JSON.stringify(res.data.recommandDishList)
        //                 );
        //             }
        //         } else {
        //             that.toast.fail(res.msg);
        //         }
        //     });
        // },

        //18000端口拉取返回的 serverUrl
        getServerUrl() {
            let that = this;
            let data = {
                qr_code: this.QRcode,
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
                    if (that.QRcode) {
                        that.getCurentStoreInfo(null);
                    }
                } else {
                    that.toast.error(res.data.msg);
                }
            })
            .catch((err) => {
                // that.toast.error(err);
            });
            
        },
    },

    created() {
        this.$store.dispatch("setShowShareCode", true);
        let show_href = window.location.href;
        //桌码和店码模式
        if (
            this.$route.query.QRcode != null &&
            this.$route.query.QRcode != undefined
        ) {
            this.QRcode = this.$route.query.QRcode;
            this.requestData.str_param = this.$route.query.QRcode;
            if (this.QRcode.substring(0, 4) == "DEPX") {
                let index = show_href.indexOf("?");
                let getUrl = show_href.substring(0, index);
                document.cookie = "showUrl===" + getUrl + "/" + this.QRcode;
            } else {
                document.cookie = "showUrl===" + show_href;
            }
            this.$store.dispatch("setqrcode", this.$route.query.QRcode);
        } else {
            this.QRcode = this.getUrlStr.getUrl();
            this.requestData.str_param = this.getUrlStr.getUrl();
            document.cookie = "showUrl===" + show_href;
            this.$store.dispatch("setqrcode", this.getUrlStr.getUrl());
            if (this.QRcode.substring(0, 4) != "DEPX") {
                this.$store.dispatch(
                    "setqrcode",
                    "DEPX_" + this.getUrlStr.getUrl()
                );
            }
        }
        this.getServerUrl();

        // setTimeout(() => {
        //   this.getDishList();
        // },300);
    },
    mounted() {
        // window.onresize监听页面高度的变化
        window.onresize = () => {
            return (() => {
                if (
                    this.documentHeight > document.documentElement.clientHeight
                ) {
                    this.isOriginHei = false;
                } else {
                    this.isOriginHei = true;
                }
            })();
        };
    },
    watch: {
        value(curr, old) {
            if (Number(curr) / 100.0 > 1) {
                this.value = old;
            } else {
                this.value = curr;
            }
        },
    },
};
</script>

<style scoped>
.van-picker-column ul {
    overflow-y: auto;
    height: 100px;
}
.tigs {
    height: 80px;
    line-height: 80px;
    background: white;
    position: relative;
    top: 50%;
    text-align: center;
    margin: 0px 10%;
    transform: translateY(-50%);
    border-radius: 6px;
    color: #505050;
}
.Timetigs {
    background: white;
    position: relative;
    top: 50%;
    text-align: center;
    margin: 0px 10%;
    transform: translateY(-50%);
    border-radius: 6px;
    color: #505050;
}
.Timetigs span {
    display: block;
}
.jiucanBtn button {
    width: 20%;
    height: 35px;
    line-height: 35px;
    border: none;
    background: #f6f6f6;
    color: #6d7278;
    border-radius: 10px;
    margin-right: 10px;
    margin-top: 10px;
}
.jiucanBtn .active {
    border: 1px #eb3c1c solid;
    background: rgba(235, 60, 28, 0.1);
    color: #eb3c1c;
}
.codeStyle {
    width: 100%;
    height: 100%;
    z-index:-10;
    zoom: 1;
    min-height: 600px;
    padding: 0; 
    background: url("../../../../style/images/bg.png") no-repeat;
    background-size: cover;
}
.colordisplay {
    border: 1px solid #eb3c1c;
    border-radius: 5px;
}
.storeInfo{
    position: relative;
    margin: 85px 26px 0 26px;
    padding: 28px 0 20px 0;
    background: #fff;
    border-radius: 10px;
    text-align: center;
    color: #333;
}
.dep-logo{
    position: absolute;
    left: 40%;
    top: -38px;
    z-index: 9;
    width: 60px;
    height: 60px;
    border-radius: 10px;
}
.dep-halal{
    position: relative;
    top: 5px;
    left: 10px;
}
.dep-name{
    font-size: 20px;
    font-weight: bold;
    height: 30px;
    line-height: 30px;
}
.dep-welcome{
    padding-top: 15px;
    font-size: 14px;
}
.startOrder {
    margin: 0 auto;
    width: 180px;
    height: 40px;
    font-size: 16px;
    background: linear-gradient(to left,#ff8237,#f4257c,#ea3d15);
    border: none;
}
.yuyueOrder{
    margin: 12px auto;
    width: 180px;
    height: 40px;
    font-size: 16px;
    border: 1px solid #fff;
    background: rgba(255, 255, 255, 0.3);
}
.xingshiBtn{
    width: 85%;
    margin: 0 auto;
    text-align: center;
}
.xingshiBtn button {
    width: 31.2%;
    height: 35px;
    line-height: 35px;
    border: none;
    background: #f6f6f6;
    color: #6d7278;
    border-radius: 6px;
    margin-left: 3.2%;
    margin-top: 10px;
    font-size: 16px;
}
.xingshiBtn button:first-child{
    margin-left: 0;
}
.xingshiBtn .active {
    border: 1px #eb3c1c solid;
    background: rgba(235, 60, 28, 0.1);
    color: #eb3c1c;
}

</style>