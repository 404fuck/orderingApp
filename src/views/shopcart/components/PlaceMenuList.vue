<template>
    <div class="list-block media-list inset foodcontent">
        <ul style="height: 40%;
    max-height: 450px;
    overflow-y: auto;">
            <li class="item-content">
                <div class="item-inner" style="padding-bottom:12px">
                    <div class="row font14">
                        <div class="col-50">
                            <span
                                style="color: #505050;position: relative;top: 8px;"
                            >{{dishData.phone}}</span>
                        </div>
                        <div class="col-50 right-style">
                            <span
                                style="color: #505050;position: relative;top: 8px;"
                            >{{$t('shopcart.total')}}&nbsp;{{dishData.total_dish_num}}&nbsp;{{$t('shopcart.num')}}</span>
                        </div>
                    </div>
                </div>
            </li>

            <li
                class="item-content"
                v-for="(item,index) in dishData.dish_data"
                style="margin-top:7px"
                :key="index"
            >
                <div class="item-inner" style="padding-bottom:0px;padding-top:5px">
                    <div class="row">
                        <div class="col-25">
                            <img
                                v-lazy="item.dish_image" :key="item.dish_image"
                                :onerror="item.weight_spec=='-1'?errorImg02:item.weight_spec=='3'|| item.weight_spec=='4'?errorImg03:errorImg01"
                                width="60"
                                height="60"
                                style="border-radius: 5px;"
                            />
                        </div>
                        <div class="col-75">
                            <div class="row">
                                <div class="col-100">
                                    <span
                                        class="color-darkbrown fontWeight font14"
                                    >{{item.dish_name}}</span>
                                </div>
                                <div class="col-100 top3">
                                    <span
                                        class="color-lightbrown font12"
                                    >{{item.dish_attrs || item.suits_desc}}</span>
                                </div>
                                <div class="col-100 top10">
                                    <div class="row">
                                        <div class="col-50 font14" style="color:#808080;margin-bottom:30px">
                                            <span>{{item.dish_price | price}}</span>
                                            <!-- 特价 -->
                                            <span v-if="item.salepmt_type==2" class="top5 left10" style="display:block">
                                                 <CommonLabel :title='$t("salespmt.sale")' />
                                            </span>
                                            <!-- 第二份优惠 -->
                                            <span v-else-if="item.salepmt_type==3" class="top5 left10" style="display:block">
                                                <CommonLabel  :title='$t("salespmt.saleHalf")'/>
                                            </span>
                                            <!-- 买即赠 -->
                                            <span class="top5 left10" style="display:block"
                                                v-else-if="item.salepmt_type==4 && item.salepmt_bg_flag==0"
                                            >
                                                 <CommonLabel  :title='$t("salespmt.saleBuy")'/>
                                            </span>
                                        </div>
                                        <div
                                            class="col-30 right-style stateImg"
                                            v-if="$store.getters.language == 'zh_CN'"
                                        >
                                            <img
                                                v-if="item.dish_status == 2 || item.dish_status == 4"
                                                src="../../../style/images/order_yituicai.png"
                                                alt
                                                width="60"
                                            />
                                            <img
                                                v-else-if="item.dish_status == 3 || item.dish_status == 5"
                                                src="../../../style/images/order_zengcai.png"
                                                alt
                                                width="60"
                                            />
                                            <img
                                                v-else-if="item.dish_status == 6"
                                                src="../../../style/images/zhekou.png"
                                                alt
                                                width="60"
                                                />
                                        </div>
                                        <div
                                            class="col-30 right-style stateImg"
                                            v-else-if="$store.getters.language == 'en_US' || $store.getters.language == 'ms_MY'"
                                        >
                                            <img
                                                v-if="item.dish_status == 2 || item.dish_status == 4"
                                                src="../../../style/images/yituicai_EN.png"
                                                alt
                                                width="60"
                                            />
                                            <img
                                                v-else-if="item.dish_status == 3 || item.dish_status == 5"
                                                src="../../../style/images/zengcai_EN.png"
                                                alt
                                                width="60"
                                            />
                                            <img
                                                v-else-if="item.dish_status == 6"
                                                src="../../../style/images/zhekouEN.png"
                                                alt
                                                width="60"
                                                />
                                        </div>
                                        <div class="col-20" style="text-align:right">
                                            <span
                                                class="color-gray font12"
                                                style
                                            >{{item.dish_num}}{{$t('shopcart.nums')}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import CommonLabel from "../../../components/CommonLabel";
export default {
    name: "placemenulist",
    components: {
        CommonLabel,
    },
    data(){
        return{
            errorImg01:'this.onerror=null;this.src="' + require('../../../style/images/defaultImg1.png') + '"',
            errorImg02:'this.onerror=null;this.src="' + require('../../../style/images/defaultImg2.png') + '"',
            errorImg03:'this.onerror=null;this.src="' + require('../../../style/images/defaultImg5.png') + '"',
        }
    },
    props: {
        dishData: {
            type: Object,
            default: null,
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
};
</script>
<style scoped>
.list-block .item-inner:after {
    background-color: #eff1f2;
}
.foodcontent {
    height: 40%;
    max-height: 450px;
    overflow-y: auto;
}
.stateImg {
    margin-top: -20px;
}
</style>
