<template>
    <div>
        <li
            v-for="(item, index) in dishData.dish_data"
            :key="index"
            class="liSet"
            style="margin-top: 7px"
        >
            <span
                style="
                    font-weight: bold;
                    color: #333333;
                    display: block;
                    margin-top: 16px;
                    margin-left: 5px;
                "
                class="font14 top5"
                v-if="item.showTitle"
                >{{ item.dish_second_name_en }} &nbsp;
                {{ item.dish_second_name }}</span
            >
            <div class="item-content dishSelect">
                <!-- 是否外带(已下厨之前可编辑,退菜不可编辑) -->
                <div v-show="waidaiMsg == true">
                    <van-checkbox
                        v-model="item.checked"
                        @click="orderChecked(index)"
                        :class="
                            item.dish_cook == 1 || item.dish_status == 2
                                ? 'dispalyNone'
                                : 'dispalyBlock'
                        "
                        shape="square"
                        class="color-lightbrown"
                        style="width: 25px"
                    ></van-checkbox>
                </div>
                <div class="item-media left5">
                    <img
                        :src="item.dish_image"
                        :key="item.dish_image"
                        :onerror="
                            item.weight_spec == '-1'
                                ? errorImg02
                                : item.weight_spec == '3' ||
                                  item.weight_spec == '4'
                                ? errorImg03
                                : errorImg01
                        "
                        width="60"
                        height="60"
                        style="border-radius: 5px"
                    />
                </div>
                <div
                    class="item-inner"
                    style="padding-bottom: 0px; padding-top: 5px"
                >
                    <div class="row">
                        <div class="col-100">
                            <!-- 外带标识 -->
                            <img
                                v-if="
                                    item.is_take_out == 1 &&
                                    item.dish_status != 2 &&
                                    item.dish_status != 4
                                "
                                src="../../../style/images/takeOut.png"
                                width="12"
                                style="position:relative;top:2px;"
                            />
                            <span
                                class="color-darkbrown fontWeight font13"
                            >
                                <!-- 临时菜 -->
                                <!-- <span v-if="item.is_temporary == '1'">({{$t("dish.open")}})</span> -->
                                {{ item.dish_name }}
                            </span>
                        </div>

                        <div class="col-100 top5 font12">
                            <div class="row no-gutter">
                                <div
                                    class="col-50 font12"
                                    style="color: #808080"
                                >
                                    <!-- 特价 -->
                                    <span
                                        v-if="
                                            item.salepmt_type == 2 &&
                                            item.promotion_range == '1' &&
                                            item.dish_status != 3 &&
                                            item.dish_status != 6
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
                                                <span v-if="item.weight_spec==1">
                                                    {{(Number(item.salepmt_price)*Number(item.spec_detail) + Number(item.box_price_one) +Number(item.additional_price)+tasteTotal(item.taste_set))| price}}
                                                </span>
                                                <span v-else>
                                                    {{(Number(item.salepmt_price) + Number(item.box_price_one) +Number(item.additional_price)+tasteTotal(item.taste_set))| price}}
                                                </span>
                                            </span
                                        >
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
                                                <span v-if="item.weight_spec==1">
                                                    {{(Number(item.salepmt_price)*Number(item.spec_detail) + Number(item.box_price_one) +Number(item.additional_price)+tasteTotal(item.taste_set))| price}}
                                                </span>
                                                <span v-else>
                                                    {{(Number(item.salepmt_price) + Number(item.box_price_one) +Number(item.additional_price)+tasteTotal(item.taste_set))| price}}
                                                </span>
                                            </span
                                        >
                                    </span>
                                    <!-- 第二份优惠 -->
                                    <span
                                        v-else-if="
                                            item.salepmt_type == 3 &&
                                            item.promotion_range == '1' &&
                                            item.dish_status != 3 &&
                                            item.dish_status != 6
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
                                                <span v-if="item.weight_spec==1">
                                                    {{(Number(item.salepmt_price)*Number(item.spec_detail) + Number(item.box_price_one) +Number(item.additional_price)+tasteTotal(item.taste_set))| price}}
                                                </span>
                                                <span v-else>
                                                    {{(Number(item.salepmt_price) + Number(item.box_price_one) +Number(item.additional_price)+tasteTotal(item.taste_set))| price}}
                                                </span>
                                            </span
                                        >
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
                                                <span v-if="item.weight_spec==1">
                                                    {{(Number(item.salepmt_price)*Number(item.spec_detail) + Number(item.box_price_one) +Number(item.additional_price)+tasteTotal(item.taste_set))| price}}
                                                </span>
                                                <span v-else>
                                                    {{(Number(item.salepmt_price) + Number(item.box_price_one) +Number(item.additional_price)+tasteTotal(item.taste_set))| price}}
                                                </span>
                                            
                                            </span
                                        >
                                    </span>
                                    <!-- 买即赠 -->
                                    <span
                                        v-else-if="
                                            item.salepmt_type == 4 &&
                                            item.promotion_range == '1' &&
                                            item.dish_status != 3 &&
                                            item.dish_status != 6
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
                                                <span v-if="item.weight_spec==1">
                                                    {{(Number(item.dish_price)*Number(item.spec_detail) + Number(item.box_price_one) +Number(item.additional_price)+tasteTotal(item.taste_set))| price}}
                                                </span>
                                                <span v-else>
                                                    {{(Number(item.dish_price) + Number(item.box_price_one) +Number(item.additional_price)+tasteTotal(item.taste_set))| price}}
                                                </span>
                                            </span
                                        >
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
                                                <span v-if="item.weight_spec==1">
                                                    {{(Number(item.dish_price)*Number(item.spec_detail) + Number(item.box_price_one) +Number(item.additional_price)+tasteTotal(item.taste_set))| price}}
                                                </span>
                                                <span v-else>
                                                    {{(Number(item.dish_price) + Number(item.box_price_one) +Number(item.additional_price)+tasteTotal(item.taste_set))| price}}
                                                </span>
                                            </span
                                        >
                                    </span>

                                    <!-- 会员价 -->
                                    <span
                                        v-else-if="
                                            dishData.discount_set == '1' &&
                                            item.member_price >= 0
                                        "
                                    >
                                        <span
                                            v-if="
                                                item.dish_status != 3 &&
                                                item.dish_status != 5 &&
                                                item.dish_status != 6
                                            "
                                        >
                                            <img
                                                src="../../../style/images/vipTag.png"
                                                alt=""
                                                width="24"
                                            />
                                            <span
                                                v-if="item.weight_spec==1" 
                                                class="font12 left5"
                                                style="color: #eb3c1c"
                                                >{{
                                                    (Number(item.member_price)*Number(item.spec_detail) +
                                                        Number(
                                                            item.box_price_one
                                                        ) +
                                                        Number(
                                                            item.additional_price
                                                        )
                                                        +tasteTotal(item.taste_set)
                                                        )| price
                                                }}</span
                                            >
                                            <span 
                                                v-else
                                                class="font12 left5"
                                                style="color: #eb3c1c"
                                            >{{
                                                (Number(item.member_price)  +
                                                    Number(
                                                        item.box_price_one
                                                    ) +
                                                    Number(
                                                        item.additional_price
                                                    )
                                                    +tasteTotal(item.taste_set)
                                                    )| price
                                            }}</span
                                        >
                                        </span>
                                    </span>
                                </div>
                                <!-- 服务员手动折扣 -->
                                <div
                                    class="col-40 center stateImg"
                                    v-if="$store.getters.language == 'zh_CN'"
                                >
                                    <img
                                        v-if="
                                            item.dish_status == 2 ||
                                            item.dish_status == 4
                                        "
                                        style="
                                            position: absolute;
                                            right: 20px;
                                            top: 10px;
                                        "
                                        src="../../../style/images/order_yituicai.png"
                                        alt
                                        width="60"
                                    />
                                    <img
                                        v-else-if="
                                            item.dish_status == 3 ||
                                            item.dish_status == 5
                                        "
                                        style="
                                            position: absolute;
                                            top: 10px;
                                            right: 20px;
                                        "
                                        src="../../../style/images/order_zengcai.png"
                                        alt
                                        width="60"
                                    />
                                    <img
                                        v-else-if="item.dish_status == 6"
                                        style="
                                            position: absolute;
                                            top: 10px;
                                            right: 20px;
                                        "
                                        src="../../../style/images/zhekou.png"
                                        alt
                                        width="60"
                                    />
                                </div>
                                <div
                                    class="col-40 right-style stateImg"
                                    v-else-if="
                                        $store.getters.language == 'en_US' ||
                                        $store.getters.language == 'ms_MY'
                                    "
                                >
                                    <img
                                        v-if="
                                            item.dish_status == 2 ||
                                            item.dish_status == 4
                                        "
                                        style="
                                            position: absolute;
                                            top: 10px;
                                            right: 20px;
                                        "
                                        src="../../../style/images/yituicai_EN.png"
                                        alt
                                        width="60"
                                    />
                                    <img
                                        v-else-if="
                                            item.dish_status == 3 ||
                                            item.dish_status == 5
                                        "
                                        style="
                                            position: absolute;
                                            top: 10px;
                                            right: 20px;
                                        "
                                        src="../../../style/images/zengcai_EN.png"
                                        alt
                                        width="60"
                                    />
                                    <img
                                        v-else-if="item.dish_status == 6"
                                        style="
                                            position: absolute;
                                            top: 10px;
                                            right: 20px;
                                        "
                                        src="../../../style/images/zhekouEN.png"
                                        alt
                                        width="60"
                                    />
                                </div>
                                <div class="col-50 top5">
                                    <span
                                        style="display: block; color: #eb3c1c"
                                        v-if="
                                            item.dish_status == 6 ||
                                            item.dish_status == 3
                                        "
                                        >
                                        {{(Number(item.dish_price)+ Number(item.box_price_one))| price }}
                                    </span>
                                    <span
                                        v-if="
                                            (dishData.discount_set == 1 &&
                                                item.member_price >= 0) ||
                                            item.promotion_range == '1'
                                        "
                                        class="font14 priceStyle"
                                        style="color: #808080"
                                        >
                                            <span
                                                v-if="item.weight_spec==1"
                                            >
                                                {{(Number(item.original_price)*Number(item.spec_detail) + Number(item.box_price_one) +Number(item.additional_price)+tasteTotal(item.taste_set))| price}}
                                            </span>
                                            <span 
                                                v-else
                                            >
                                                {{(Number(item.original_price) + Number(item.box_price_one) +Number(item.additional_price)+tasteTotal(item.taste_set))| price}}
                                            </span>
                                        </span
                                    >   
                                    <span v-else class="font14" style="color: #808080">
                                        <span
                                            v-if="item.weight_spec==1"
                                        >
                                            {{(Number(item.original_price)*Number(item.spec_detail) + Number(item.box_price_one) +Number(item.additional_price)+tasteTotal(item.taste_set))| price}}
                                        </span>
                                        <span 
                                            v-else
                                        >
                                            {{(Number(item.original_price) + Number(item.box_price_one) +Number(item.additional_price)+tasteTotal(item.taste_set))| price}}
                                        </span>
                                    </span>
                                </div>
                                <div
                                    class="col-50 top10"
                                    style="text-align: right"
                                >
                                    <span
                                        v-if="item.weight_spec == '1'"
                                        class="color-gray font12"
                                        style
                                        >{{ item.spec_detail}}
                                        {{ item.unit_type }}</span
                                    >
                                    <span
                                        v-else
                                        class="color-gray font12"
                                        style
                                        >{{ item.dish_num }}</span
                                    >
                                </div>
                            </div>
                        </div>
                        <!-- 备注 -->
                        <div class="col-100 top5 color-lightbrown font10">
                            <div>{{item.dish_attrs}}</div>
                            <span
                                v-if="
                                    item.dish_chosen_notes != null  ||
                                    item.dish_remark != null 
                                "
                                >
                                <span v-if="item.dish_chosen_notes.length>0||item.dish_remark!=''">{{ $t("note") }}:</span>
                                <span>{{ item.dishNote }}</span>
                                <span v-if="item.dish_remark != ''">
                                    <span v-if="item.dishNote != ''">/</span>
                                    {{ item.dish_remark }}
                                </span>
                            </span>    
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-100 top5" style="margin-bottom: 7px">
                    <span class="color-lightbrown font12">{{
                        item.dishTaocan
                    }}</span>
                </div>
            </div>
        </li>
    </div>
</template>
<script>
import CommonLabel from "../../../components/CommonLabel";
export default {
    name: "placemenu",
    components: {
        CommonLabel,
    },
    computed: {
        language: {
            get() {
                return this.$store.getters.language;
            },
            set(val) {},
        },
    },
    props: {
        dishData: {
            type: Object,
            default: null,
        },
        waidaiMsg: {
            type: Boolean,
            default: false,
        },
        waidaiImg: {
            type: Boolean,
            default: false,
        },
        is_take_out: {
            type: Number,
            default: 0,
        },
        checked: {
            type: Boolean,
            default: false,
        },
        dishStatus: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            salepmt_type: this.dishData.salepmt_type,
            waidaiDishChecked: false,
            isAble: false,
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
        orderChecked(index) {
            this.$emit("orderChecked", index);
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
        },
    },
    
    created() {
        this.waidaiMsg = false;
        for (let index in this.dishData) {
            this.dishData[index].checked = this.checked;
        }
    },
};
</script>
<style scoped>
.list-block .item-inner:after {
    background-color: #eff1f2;
    height: 0px !important;
}
.stateImg {
    margin-top: -25px;
}
.list-block .item-content {
    padding-left: 0px !important;
}
.liSet {
    border-bottom: 1px #eff1f2 solid;
    margin: 0px 7px;
}
.dispalyNone {
    display: none;
}
.dispalyBlock {
    display: block;
}
</style>
