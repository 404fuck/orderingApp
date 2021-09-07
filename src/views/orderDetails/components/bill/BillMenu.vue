<template>
    <div class="list-block media-list inset foodcontent" style="margin: 12px">
        <ul>
            <li class="item-content">
                <div class="item-inner" style="padding-bottom: 12px">
                    <div class="row font14">
                        <div class="col-50">
                        </div>
                        <div class="col-50 right-style">
                            <span
                                style="
                                    color: #333333;
                                    position: relative;
                                    top: 5px;
                                "
                                >{{ $t("shopcart.total") }}&nbsp;{{
                                    dishData.total_dish_num
                                }}&nbsp;{{ $t("shopcart.num") }}</span
                            >
                        </div>
                    </div>
                </div>
            </li>

            <li
                class="item-content dishSelect"
                v-for="(item, index) in dishData.dish_data"
                style="margin-top: 7px"
                :key="index"
            >
                <!-- 是否外带(已下厨之前可编辑,退菜不可编辑，餐后支付不可编辑) -->
                <van-checkbox
                    v-show="waidaiMsg == true"
                    v-model="item.checked"
                    @click="orderChecked(index)"
                    :disabled="
                        !getPayAfterBool() ||
                        item.dish_status == 2 ||
                        item.dish_status == 4 ||
                        item.dish_cook == 1 ||
                        item.dish_status == 1
                            ? !isAble
                            : isAble
                    "
                    shape="square"
                    class="color-lightbrown"
                    style="width: 25px"
                ></van-checkbox>
                <div
                    class="item-inner row"
                    style="padding-bottom: 0px; padding-top: 5px"
                >
                    <!-- 菜品分类 -->
                    <div class="col-100" v-if="item.showTitle">
                        <span
                            style="font-weight: bold; color: #333333"
                            class="font14"
                            >{{ item.dish_second_name_en }} &nbsp;
                            {{ item.dish_second_name }}</span
                        >
                    </div>
                    <div class="row top5">
                        <div style="width:23%">
                            <img
                                :src="item.dish_image"
                                :key="item.dish_image"
                                width="60"
                                height="60"
                                style="border-radius: 5px"
                                :onerror="
                                    item.weight_spec == '-1'
                                        ? errorImg02
                                        : item.weight_spec == '3' ||
                                          item.weight_spec == '4'
                                        ? errorImg03
                                        : errorImg01
                                "
                            />
                        </div>
                        <div style="width:77%">
                            <div class="row">
                                <div class="col-100">
                                    <!-- 外带标识 -->
                                    <img
                                        v-if="
                                            item.is_take_out == 1 &&
                                            item.dish_status != 2 &&
                                            item.dish_status != 4
                                        "
                                        src="../../../../style/images/takeOut.png"
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

                                <div
                                    class="col-100 font12"
                                    style="margin-bottom: 15px"
                                >
                                    <div class="row top5">
                                        <div class="col-50 font14 color-lightbrown">
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
                                                        $store.getters
                                                            .language == 'zh_CN'
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
                                                        $store.getters
                                                            .language ==
                                                            'en_US' ||
                                                        $store.getters
                                                            .language == 'ms_MY'
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
                                                    item.promotion_range ==
                                                        '1' &&
                                                    item.dish_status != 3 &&
                                                    item.dish_status != 6
                                                "
                                            >
                                                <CommonLabel
                                                    :title="
                                                        $t('salespmt.saleHalf')
                                                    "
                                                    class="left10"
                                                />
                                                <span
                                                    v-if="
                                                        $store.getters
                                                            .language == 'zh_CN'
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
                                                        $store.getters
                                                            .language ==
                                                            'en_US' ||
                                                        $store.getters
                                                            .language == 'ms_MY'
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
                                                    item.promotion_range ==
                                                        '1' &&
                                                    item.dish_status != 3 &&
                                                    item.dish_status != 6
                                                "
                                            >
                                                <CommonLabel
                                                    :title="
                                                        $t('salespmt.saleBuy')
                                                    "
                                                    class="left10"
                                                />
                                                <span
                                                    v-if="
                                                        $store.getters
                                                            .language == 'zh_CN'
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
                                                        $store.getters
                                                            .language ==
                                                            'en_US' ||
                                                        $store.getters
                                                            .language == 'ms_MY'
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
                                                    item.member_price >= 0 &&
                                                    dishData.discount_set == '1'
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
                                                        src="../../../../style/images/vipTag.png"
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
                                            class="col-40 right-style stateImg"
                                            v-if="
                                                $store.getters.language ==
                                                'zh_CN'
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
                                                src="../../../../style/images/order_yituicai.png"
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
                                                src="../../../../style/images/order_zengcai.png"
                                                alt
                                                width="60"
                                            />
                                            <img
                                                v-else-if="
                                                    item.dish_status == 6
                                                "
                                                style="
                                                    position: absolute;
                                                    top: 15px;
                                                    right: 20px;
                                                "
                                                src="../../../../style/images/zhekou.png"
                                                alt
                                                width="60"
                                            />
                                        </div>
                                        <div
                                            class="col-40 right-style stateImg"
                                            v-else-if="
                                                $store.getters.language ==
                                                    'en_US' ||
                                                $store.getters.language ==
                                                    'ms_MY'
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
                                                src="../../../../style/images/yituicai_EN.png"
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
                                                src="../../../../style/images/zengcai_EN.png"
                                                alt
                                                width="60"
                                            />
                                            <img
                                                v-else-if="
                                                    item.dish_status == 6
                                                "
                                                style="
                                                    position: absolute;
                                                    top: 15px;
                                                    right: 20px;
                                                "
                                                src="../../../../style/images/zhekouEN.png"
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
                                                    (dishData.discount_set ==
                                                        1 &&
                                                        item.member_price >=
                                                            0) ||
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
                                            <span
                                                v-else
                                                class="font14"
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
                                                >{{ item.spec_detail }}
                                                {{ item.unit_type }}</span
                                            >
                                            <span
                                                v-else
                                                class="color-gray font12"
                                                style
                                                >{{ item.dish_num }}</span
                                            >
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
                        </div>
                        <div class="col-100 top3">
                            <span class="color-lightbrown font12">{{
                                item.dishTaocan
                            }}</span>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import CommonLabel from "../../../../components/CommonLabel";
export default {
    name: "BillMenu",
    components: {
        CommonLabel,
    },
    data() {
        return {
            isAble: false,
            errorImg01:
                'this.onerror=null;this.src="' +
                require("../../../../style/images/defaultImg1.png") +
                '"',
            errorImg02:
                'this.onerror=null;this.src="' +
                require("../../../../style/images/defaultImg2.png") +
                '"',
            errorImg03:
                'this.onerror=null;this.src="' +
                require("../../../../style/images/defaultImg5.png") +
                '"',
        };
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
        checked: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        language: {
            get() {
                return this.$store.getters.language;
            },
            set(val) {},
        },
    },
    methods: {
        orderChecked(index) {
            this.$emit("orderChecked", index);
        },
        getPayAfterBool() {
            return !this.stringutils.isAfter(this.curentStore);
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
}
.stateImg {
    margin-top: -25px;
}
</style>
