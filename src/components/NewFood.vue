<!--
 * @Author: zzt
 * @Date: 2021-04-01 19:19:32
 * @LastEditTime: 2021-05-21 20:50:34
 * @LastEditors: Please set LastEditors
 * @Description: 菜单中的菜品模块
 * @FilePath: \sjoyOrderingApp\src\components\NewFood.vue
-->
<template>
    <div class="newfood">
        <div
            @click="showDetail"
            class="card demo-card-header-pic"
            style="box-shadow: 5px 5px 26px rgba(227, 227, 227, 0.5)"
            :style="
                canGoPlay == false
                    ? 'background:rgba(255,255,255,0.6)'
                    : 'background:rgba(255,255,255,1)'
            "
        >
            <div class="card-header color-white no-border" style="padding: 0px">
                <div
                    style="position: absolute; top: 3%; left: 4%"
                    v-for="(item, index) in tagsList"
                    :key="index"
                >
                    <span v-if="item.flag == '0'">
                        <CommonPmt
                            :title="
                                $store.getters.language == 'zh_CN'
                                    ? item.name
                                    : item.name2
                            "
                            v-if="dishes.dish_tag_id == item.id"
                        />
                    </span>
                    <span v-else>
                        <CommonPmt
                            :title="item.name"
                            v-if="dishes.dish_tag_id == item.id"
                        />
                    </span>
                </div>
                <!-- 非可售时间 -->
                <CommonNon
                    v-if="canGoPlay == false"
                    :style="dishes.dish_tag_id == '' ? 'top:3%' : 'top: 18%'"
                    style="z-index: 99"
                ></CommonNon>
                <div
                    style="position: absolute; right: 2px; bottom: 0"
                    v-if="dishes.dish_tag == 1201"
                >
                    <img
                        src="../style/images/guqing.png"
                        alt=""
                        width="68"
                        v-if="$store.getters.language == 'zh_CN'"
                    />
                    <img
                        src="../style/images/guqingEN.png"
                        alt=""
                        width="68"
                        v-else
                    />
                </div>
                <!-- :key是为了防止刷新页面或图片更改时图片不更新 -->
                <img
                    :src="dishes.dish_image"
                    :key="dishes.dish_image"
                    alt=""
                    :onerror="
                        dishes.weight_spec == '3' || dishes.weight_spec == '4'
                            ? errorImg02
                            : errorImg01
                    "
                    width="100%"
                    height="100%"
                    :style="canGoPlay == false ? 'opacity:0.6' : 'opacity:1'"
                />
            </div>
            <div
                class="card-footer row no-gutter"
                style="height: 88px"
                :style="canGoPlay == false ? 'opacity:0.6' : 'opacity:1'"
            >
                <div class="col-100 font14">
                    <span
                        style="
                            color: #505050;
                            width: 100%;
                            font-weight: bold;
                            display: inline-block;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                        "
                        >{{ dishes.dish_name }}</span
                    >
                    <!-- <span v-if="dishes.weight_spec == '2' && salepmt_id != 0" style="color:#808080;float: right;">{{spec_unit}}</span> -->
                </div>
                <div class="col-100" v-if="salepmt_id == 0 || dishtag > 0">
                    <div class="row">
                        <div class="col-60 top5">
                            <!-- <span v-if="dishes.change_set == '1'" class="shijiaDish">{{$t("dish.shijia")}}</span> -->
                            <span class="color-lightbrown"
                                >{{ dish_price | price }}
                            </span>
                        </div>
                        <div class="col-40">
                            <CommonStepper
                                v-if="dishes.weight_spec == 2"
                                :txtAdd="$t('add')"
                                :dishes="dishes"
                                :canGoPlay="dishes.canGoPlay"
                                :dishId="dishes.dish_id"
                                @addCart="addCart"
                                @delCart="delCart"
                            />
                            <CommonStepper
                                v-else
                                :txtAdd="$t('add')"
                                :dishes="dishes"
                                :canGoPlay="dishes.canGoPlay"
                                :dishId="dishes.dish_id"
                                @addCart="addCart"
                                @delCart="delCart"
                            />
                        </div>
                    </div>
                </div>

                <div class="col-100" v-if="salepmt_type == 2 && dishtag == 0">
                    <div class="row">
                        <div class="col-50 top5">
                            <span class="color-lightbrown priceStyle">{{
                                dish_price | price
                            }}</span>
                        </div>
                        <div class="col-50">
                            <CommonStepper
                                v-if="dishes.weight_spec == 2"
                                :txtAdd="$t('add')"
                                :dishes="dishes"
                                :canGoPlay="dishes.canGoPlay"
                                :dishId="special_id"
                                @addCart="addCart"
                                @delCart="delCart"
                            />
                            <CommonStepper
                                v-else
                                :txtAdd="$t('add')"
                                :dishes="dishes"
                                :canGoPlay="dishes.canGoPlay"
                                :dishId="dishes.dish_id"
                                @addCart="addCart"
                                @delCart="delCart"
                            />
                        </div>
                        <div class="col-100" style="margin-bottom: 10px">
                            <CommonLabel
                                :title="$t('salespmt.sale')"
                                class="left5"
                            />
                            <div
                                v-if="
                                    $store.getters.language == 'en_US' ||
                                    $store.getters.language == 'ms_MY'
                                "
                                style="
                                    position: absolute;
                                    left: 73px;
                                    color: #f46f24;
                                "
                            >
                                <span>{{ salepmt_price | price }}</span>
                            </div>
                            <div
                                v-else-if="$store.getters.language == 'zh_CN'"
                                style="
                                    position: absolute;
                                    left: 60px;
                                    color: #f46f24;
                                "
                            >
                                <span>{{ salepmt_price | price }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-100" v-if="salepmt_type == 3 && dishtag == 0">
                    <div class="row">
                        <div class="col-50 top5">
                            <span class="color-lightbrown">{{
                                dish_price | price
                            }}</span>
                        </div>
                        <div class="col-50">
                            <CommonStepper
                                v-if="dishes.weight_spec == 2"
                                :txtAdd="$t('add')"
                                :dishes="dishes"
                                :canGoPlay="dishes.canGoPlay"
                                :dishId="special_id"
                                @addCart="addCart"
                                @delCart="delCart"
                            />
                            <CommonStepper
                                v-else
                                :txtAdd="$t('add')"
                                :dishes="dishes"
                                :canGoPlay="dishes.canGoPlay"
                                :dishId="dishes.dish_id"
                                @addCart="addCart"
                                @delCart="delCart"
                            />
                        </div>
                        <div class="col-100" style="margin-bottom: 10px">
                            <CommonLabel
                                :title="$t('salespmt.saleHalf')"
                                class="left5"
                            />
                        </div>
                    </div>
                </div>

                <div class="col-100" v-if="salepmt_type == 4 && dishtag == 0">
                    <div class="row">
                        <div class="col-50 top5">
                            <span class="color-lightbrown">{{
                                dish_price | price
                            }}</span>
                        </div>
                        <div class="col-50">
                            <CommonStepper
                                v-if="dishes.weight_spec == 2"
                                :txtAdd="$t('add')"
                                :dishes="dishes"
                                :canGoPlay="dishes.canGoPlay"
                                :dishId="special_id"
                                @addCart="addCart"
                                @delCart="delCart"
                            />
                            <CommonStepper
                                v-else
                                :txtAdd="$t('add')"
                                :dishes="dishes"
                                :canGoPlay="dishes.canGoPlay"
                                :dishId="dishes.dish_id"
                                @addCart="addCart"
                                @delCart="delCart"
                            />
                        </div>
                        <div class="col-100" style="margin-bottom: 10px">
                            <!-- <CommonLabel :title='$t("salespmt.saleBuy")'/>  -->
                            <CommonLabel
                                v-if="$store.getters.language == 'zh_CN'"
                                :title="
                                    $t('salespmt.buy') +
                                    buy_num +
                                    $t('salespmt.zeng') +
                                    give_num
                                "
                                class="left5"
                            />
                            <CommonLabel
                                class="left5"
                                v-else-if="
                                    $store.getters.language == 'en_US' ||
                                    $store.getters.language == 'ms_MY'
                                "
                                :title="
                                    $t('salespmt.buy') +
                                    (give_num + buy_num) +
                                    $t('salespmt.zeng') +
                                    buy_num
                                "
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CommonStepper from "./CommonStepper";
import CommonLabel from "./CommonLabel";
import CommonPmt from "./CommonPmt";
import CommonNon from "./CommonNon";
export default {
    name: "newfood",
    data() {
        return {
            salepmt_type: this.dishes.salepmt_type, //0：满减券，1:整单折扣，2：特价菜，3：第n份优惠，4：买赠
            dish_price: this.dishes.dish_price,
            member_price: this.dishes.member_price,
            salepmt_price: this.dishes.salepmt_price,
            salepmt_bg_flag: this.dishes.salepmt_bg_flag, //买赠优惠，0：属于买类别，1：属于赠送类别
            salepmt_id: this.dishes.salepmt_id,
            special_id: 0,
            special: null,
            give_num: this.dishes.give_num,
            buy_num: this.dishes.buy_num,
            spec_unit: "",
            errorImg01:
                'this.onerror=null;this.src="' +
                require("../style/images/defaultImg.png") +
                '"',
            errorImg02:
                'this.onerror=null;this.src="' +
                require("../style/images/defaultImg5.png") +
                '"',
        };
    },
    components: {
        CommonStepper,
        CommonLabel,
        CommonPmt,
        CommonNon,
    },

    props: {
        dishes: {
            type: Object,
            default: null,
        },
        dishtag: {
            type: Number,
            default: 0,
        },
        canGoPlay: {
            type: Boolean,
            default: false,
        },
        tagsList: {
            type: Array,
            default: function () {
                return [];
            },
        },
    },
    computed: {
        getDishNum(dish_id) {
            return function (dish_id) {
                return this.$store.getters.dishNums[dish_id] | 0;
            };
        },
        language: {
            get() {
                return this.$store.getters.language;
            },
        },
    },
    methods: {
        showDetail() {
            this.$emit("showFoodDetail", this.dishes);
        },
        addCart() {
            this.$emit(
                "addCart",
                this.dishes,
                this.dish_price,
                this.member_price,
                this.salepmt_price,
                true
            );
        },
        delCart() {
            this.$emit("delCart", this.dishes);
        },
    },
    created() {
        //如果规格不为空 从规格读取价格
        if (this.dishes.weight_spec == "2" && this.dishes.spec_detail) {
            let specials = JSON.parse(this.dishes.spec_detail);
            if (specials.length > 0) {
                this.special = specials[0];
				specials.forEach(item => {
                    // 默认勾选
                    if(Number(item.default_choice)==1){
                        this.special = item;
                    }
                });
                if(this.special){
                    this.dish_price = this.special.spec_price;
                    this.member_price = this.special.member_price;
                    this.salepmt_price = this.special.salepmt_price;
                    this.salepmt_type = this.special.salepmt_type;
                    this.salepmt_bg_flag = this.special.salepmt_bg_flag;
                    this.salepmt_id = this.special.salepmt_id;
                    this.special_id = this.special.id;
                    this.id = this.special.id;
                    this.spec_unit = this.special.spec_unit;

                }
                
            }
        }
    },
};
</script>
<style scoped>
.card {
    border-radius: 5px;
    margin: 10px 8px 10px 8px;
}

.card-header {
    height: 166px;
    border-radius: 5px 5px 0 0;
    background-size: cover;
    background-position: center;
}
.card_footer {
    min-height: 88px !important;
}
.shijiaDish {
    font-size: 10px;
    border: 1px #d8d8d8 solid;
    border-radius: 4px;
    padding: 0 3px;
    transform: scale(0.83);
    display: inline-block;
    color: #808080;
}
</style>