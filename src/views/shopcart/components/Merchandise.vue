<!--
 * @Author: zzt
 * @Date: 2021-04-01 19:19:32
 * @LastEditTime: 2021-06-28 10:34:54
 * @LastEditors: Please set LastEditors
 * @Description: 购物车列表
 * @FilePath: \sjoyOrderingApp\src\views\shopcart\components\Merchandise.vue
-->
<template>
    <li class="liSet top5">
        <div class="item-content dishSelect">
            <!-- 是否外带 -->
            <van-checkbox
                v-show="waidaiMsg == true"
                v-model="isSelect"
                shape="square"
                class="color-lightbrown"
                style="width: 25px"
                @click="singleChecked(index)"
            ></van-checkbox>
            <div class="item-media left5" @click="editDishClick">
                <img
                    :src="dishData.dish_image"
                    width="60"
                    height="60"
                    style="border-radius: 5px"
                    :onerror="
                        dishData.weight_spec == '-1'
                            ? errorImg02
                            : dishData.weight_spec == '3' ||
                              dishData.weight_spec == '4'
                            ? errorImg03
                            : errorImg01
                    "
                />
            </div>
            <div class="item-inner">
                <div class="row">
                    <div class="col-100" @click="editDishClick">
                        <div class="row">
                            <div class="col-100">
                                <!-- 外带T标识 waidaiImg && isSelect-->
                                <img
                                    v-if="
                                        dishData.is_take_out == 1 ||
                                        isSelect == true
                                    "
                                    src="../../../style/images/takeOut.png"
                                    width="12"
                                    style="position:relative;top:2px;"
                                />
                                <span
                                    class="color-darkbrown fontWeight font13"
                                    
                                >
                                    <!-- 临时菜 -->
                                    <!-- <span v-if="dishData.is_temporary == '1'">({{$t("dish.open")}})</span> -->
                                    {{ dishData.dish_name }}
                                </span>
                            </div>
                            <div class="col-100 top5 font12">
                                <div class="row">
                                    <div class="col-70">
                                        <!-- 特价 -->
                                        <span
                                            v-if="
                                                dishData.salepmt_type == 2 &&
                                                dishData.promotion_range == '1'&&
                                                dishData.dish_status != 3 &&
                                                dishData.dish_status != 6
                                            "
                                        >
                                            <CommonLabel
                                                :title="$t('salespmt.sale')"
                                                class="left10"
                                            />
                                            <span
                                                v-if="
                                                    $store.getters.language ==
                                                    'zh_CN'
                                                "
                                                style="
                                                    position: relative;
                                                    left: 48px;
                                                    color: #eb3c1c;
                                                    top: 1px;
                                                "
                                                >
                                                    <span v-if="dishData.weight_spec==1">
                                                        {{(Number(dishData.salepmt_price)*Number(dishData.spec_detail) + Number(dishData.box_price_one) +Number(dishData.additional_price)+tasteTotal(dishData.taste_set))| price}}
                                                    </span>
                                                    <span v-else>
                                                        {{(Number(dishData.salepmt_price) + Number(dishData.box_price_one) +Number(dishData.additional_price)+tasteTotal(dishData.taste_set))| price}}
                                                    </span>
                                            </span>
                                            <span
                                                v-else-if="
                                                    $store.getters.language ==
                                                        'en_US' ||
                                                    $store.getters.language ==
                                                        'ms_MY'
                                                "
                                                style="
                                                    position: relative;
                                                    left: 62px;
                                                    color: #eb3c1c;
                                                    top: 1px;
                                                "
                                                >
                                                    <span v-if="dishData.weight_spec==1">
                                                        {{(Number(dishData.salepmt_price)*Number(dishData.spec_detail) + Number(dishData.box_price_one) +Number(dishData.additional_price)+tasteTotal(dishData.taste_set))| price}}
                                                    </span>
                                                    <span v-else>
                                                        {{(Number(dishData.salepmt_price) + Number(dishData.box_price_one) +Number(dishData.additional_price)+tasteTotal(dishData.taste_set))| price}}
                                                    </span>
                                            </span>
                                        </span>
                                        <!-- 第二份优惠 -->
                                        <span
                                            v-else-if="
                                                dishData.salepmt_type == 3 &&
                                                dishData.promotion_range == '1'
                                            "
                                        >
                                            <CommonLabel
                                                :title="$t('salespmt.saleHalf')"
                                                class="left10"
                                            />
                                            <span
                                                v-if="
                                                    $store.getters.language ==
                                                    'zh_CN'
                                                "
                                                style="
                                                    position: relative;
                                                    left: 90px;
                                                    color: #eb3c1c;
                                                    top: 2px;
                                                "
                                                >
                                                    <span v-if="dishData.weight_spec==1">
                                                        {{(Number(dishData.salepmt_price)*Number(dishData.spec_detail) + Number(dishData.box_price_one) +Number(dishData.additional_price)+tasteTotal(dishData.taste_set))| price}}
                                                    </span>
                                                    <span v-else>
                                                        {{(Number(dishData.salepmt_price) + Number(dishData.box_price_one) +Number(dishData.additional_price)+tasteTotal(dishData.taste_set))| price}}
                                                    </span>
                                            </span>
                                            <span
                                                v-else-if="
                                                    $store.getters.language ==
                                                        'en_US' ||
                                                    $store.getters.language ==
                                                        'ms_MY'
                                                "
                                                style="
                                                    position: relative;
                                                    left: 90px;
                                                    color: #eb3c1c;
                                                    top: 2px;
                                                "
                                                >
                                                    <span v-if="dishData.weight_spec==1">
                                                        {{(Number(dishData.salepmt_price)*Number(dishData.spec_detail) + Number(dishData.box_price_one) +Number(dishData.additional_price)+tasteTotal(dishData.taste_set))| price}}
                                                    </span>
                                                    <span v-else>
                                                        {{(Number(dishData.salepmt_price) + Number(dishData.box_price_one) +Number(dishData.additional_price)+tasteTotal(dishData.taste_set))| price}}
                                                    </span>
                                            </span>
                                        </span>
                                        <!-- 买即赠 -->
                                        <span
                                            v-else-if="
                                                dishData.salepmt_type == 4 &&
                                                dishData.promotion_range == '1'
                                            "
                                        >
                                            <CommonLabel
                                                :title="$t('salespmt.saleBuy')"
                                                class="left10"
                                            />
                                            <span
                                                v-if="
                                                    $store.getters.language ==
                                                    'zh_CN'
                                                "
                                                style="
                                                    position: relative;
                                                    left: 60px;
                                                    color: #eb3c1c;
                                                    top: 2px;
                                                "
                                                >
                                                    <span v-if="dishData.weight_spec==1">
                                                        {{(Number(dishData.dish_price)*Number(dishData.spec_detail) + Number(dishData.box_price_one) +Number(dishData.additional_price)+tasteTotal(dishData.taste_set))| price}}
                                                    </span>
                                                    <span v-else>
                                                        {{(Number(dishData.dish_price) + Number(dishData.box_price_one) +Number(dishData.additional_price)+tasteTotal(dishData.taste_set))| price}}
                                                    </span>
                                            </span>
                                            <span
                                                v-else-if="
                                                    $store.getters.language ==
                                                        'en_US' ||
                                                    $store.getters.language ==
                                                        'ms_MY'
                                                "
                                                style="
                                                    position: relative;
                                                    left: 118px;
                                                    color: #eb3c1c;
                                                    top: 2px;
                                                "
                                                >
                                                    <span v-if="dishData.weight_spec==1">
                                                        {{(Number(dishData.dish_price)*Number(dishData.spec_detail) + Number(dishData.box_price_one) +Number(dishData.additional_price)+tasteTotal(dishData.taste_set))| price}}
                                                    </span>
                                                    <span v-else>
                                                        {{(Number(dishData.dish_price) + Number(dishData.box_price_one) +Number(dishData.additional_price)+tasteTotal(dishData.taste_set))| price}}
                                                    </span>
                                            </span>
                                        </span>
                                        <!-- 会员价 -->
                                        <!-- 在shopping_cart_info_vo中取 discount_set == 1 && -->
                                        <span
                                            v-else-if="
                                                discountSet == '1' &&
                                                dishData.member_price >= 0
                                            "
                                        >  
                                            <span
                                                v-if="
                                                    dishData.dish_status != 3 &&
                                                    dishData.dish_status != 5 &&
                                                    dishData.dish_status != 6
                                                "
                                            >
                                                <img
                                                    src="../../../style/images/vipTag.png"
                                                    alt=""
                                                    width="24"
                                                />
                                                
                                                <span
                                                    v-if="dishData.weight_spec==1" 
                                                    class="font12 left5"
                                                    style="color: #eb3c1c"
                                                >   
                                                    {{(Number(dishData.member_price)*Number(dishData.spec_detail) + Number(dishData.box_price_one) +Number(dishData.additional_price)+tasteTotal(dishData.taste_set))| price}}
                                                </span>
                                                <span 
                                                    v-else
                                                    class="font12 left5"
                                                    style="color: #eb3c1c"
                                                >
                                                    {{(Number(dishData.member_price) + Number(dishData.box_price_one) +Number(dishData.additional_price)+tasteTotal(dishData.taste_set))| price}}
                                                </span>
                                            </span>
                                        </span>
                                        
                                    </div>
                                    <div class="col-30">
                                        <div class="row">
                                            <div class="col-100 right top10">
                                                <div
                                                    v-if="
                                                        dishData.weight_spec ==
                                                        '1'
                                                    "
                                                    style="
                                                        position: absolute;
                                                        right: 15px;
                                                        top: 15px;
                                                    "
                                                >
                                                    <span
                                                        style="
                                                            color: #eb3b1c;
                                                            display: block;
                                                        "
                                                        class="font14"
                                                        >{{
                                                            dishData.spec_detail|price
                                                        }}{{
                                                            dishData.unit_type
                                                        }}</span
                                                    >
                                                    <img
                                                        class="top5"
                                                        src="../../../style/images/less.png"
                                                        alt
                                                        width="20"
                                                        height="20"
                                                        @click.stop="
                                                            lessKG(dishData)
                                                        "
                                                    />
                                                </div>
                                                <CommonStepper
                                                    v-else
                                                    :num="dishData.dish_num"
                                                    @computeNum="computeNum"
                                                    @updateDishNum="
                                                        updateDishNum
                                                    "
                                                    :dishData="dishData"
                                                    style="
                                                        position: absolute;
                                                        right: 15px;
                                                    "
                                                ></CommonStepper>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-100 top5">
                                <span
                                    v-if="
                                        (discountSet == 1 &&
                                            dishData.member_price >= 0) ||
                                        dishData.promotion_range == '1'
                                    "
                                    class="font14 priceStyle"
                                    style="color: #808080"
                                    >
                                        <span
                                            v-if="dishData.weight_spec==1"
                                        >
                                            {{(Number(dishData.original_price)*Number(dishData.spec_detail) + Number(dishData.box_price_one) +Number(dishData.additional_price)+tasteTotal(dishData.taste_set))| price}}
                                        </span>
                                        <span 
                                            v-else
                                        >
                                            {{(Number(dishData.original_price) + Number(dishData.box_price_one) +Number(dishData.additional_price)+tasteTotal(dishData.taste_set))| price}}
                                        </span>
                                    </span
                                >
                                <span v-else class="font14" style="color: #808080">
                                    <span
                                        v-if="dishData.weight_spec==1"
                                    >
                                        {{(Number(dishData.original_price)*Number(dishData.spec_detail) + Number(dishData.box_price_one) +Number(dishData.additional_price)+tasteTotal(dishData.taste_set))| price}}
                                    </span>
                                    <span 
                                        v-else
                                    >
                                        {{(Number(dishData.original_price) + Number(dishData.box_price_one) +Number(dishData.additional_price)+tasteTotal(dishData.taste_set))| price}}
                                    </span>
                                </span>
                            </div>
                            <!-- 备注 -->
							<div class="col-100 top5 color-lightbrown font10">
                                <div>{{dishData.dish_attrs}}</div>
                                <span
                                    v-if="
                                        dishData.dish_chosen_notes != null  ||
                                        dishData.dish_remark != null 
                                    "
                                    >
                                    <span v-if="dishData.dish_chosen_notes.length>0||dishData.dish_remark!=''">{{ $t("note") }}:</span>
                                    <span>{{ dishData.dishNote }}</span>
                                    <span v-if="dishData.dish_remark != ''">
                                        <span v-if="dishData.dishNote != ''">/</span>
                                        {{ dishData.dish_remark }}
                                    </span>
                                </span>    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-100" style="margin-bottom: 7px">
                <span class="color-lightbrown font10">{{
                    dishData.dishTaocan
                }}</span>
            </div>
        </div>
    </li>
</template>
<script>
import CommonStepper from "./CommonStepper";
import CommonLabel from "../../../components/CommonLabel";
export default {
    name: "merchandise",
    components: {
        CommonStepper,
        CommonLabel,
    },
    props: {
        dishData: {
            type: Object,
            default: null,
        },
        index: {
            type: String,
            default: "",
        },
        waidaiMsg: {
            type: Boolean,
            default: false,
        },
        waidaiImg: {
            type: Boolean,
            default: false,
        },
        isSelect: {
            type: Boolean,
            default: false,
        },
        discountSet: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            isSelect1: false,
            errorImg01:
                'this.onerror=null;this.src="' +
                require("../../../style/images/defaultImg1.png") +
                '"',
            errorImg02:
                'this.onerror=null;this.src="' +
                require("../../../style/images/defaultImg2.png") +
                '"',
            errorImg03:
                'this.onerror=null;this.src="' +
                require("../../../style/images/defaultImg5.png") +
                '"',
        };
    },
    methods: {
        lessKG(dishData) {
            this.$emit("lessKG", this.index);
        },
        computeNum(type, num) {
            this.$emit(
                "computeNum",
                type,
                this.index,
                num,
                this,
                this.dishData.dish_id
            );
        },
        updateDishNum(value) {
            this.$emit("updateDishNum", value, this.dishData);
        },
        editDishClick() {
            console.log(this.index);
            this.$emit("editDishClick", this.dishData, this.index);
        },
        singleChecked(index) {
            // this.dishData.isSelect = this.isSelect;
            this.$emit("singleChecked", index);
        },
        //计算taste_list里的价格总和
        tasteTotal(taste_set){
            let total = 0;
            if(taste_set!=null&&taste_set.length>0&&taste_set!=undefined){
                for (let i in taste_set) {
                    if(taste_set[i].taste_list!=null&&taste_set[i].taste_list.length>0){
                        for (let j in taste_set[i].taste_list) {
                            if (taste_set[i].taste_list[j].checked==true) {
                                total+=Number(taste_set[i].taste_list[j].the_price);
                            }
                        }
                    }
                }
            }
            return total;
        }
    },
    created() {
        this.waidaiMsg = false;
    },
};
</script>
<style scoped>
.item-content:nth-child(2) {
    margin-top: -10px;
}
.orderBtn {
    float: right;
    padding-top: 5px;
}
.orderNum {
    position: relative;
    top: -5px;
    margin: 0px 5px;
}
.list-block .item-content {
    padding-left: 0px !important;
}
.liSet {
    border-bottom: 1px #eff1f2 solid;
    margin: 0px 7px;
}
</style>