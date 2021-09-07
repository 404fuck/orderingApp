<!-- 弹出菜品详情-->
<template>
    <div class="card demo-card-header-pic" style="border-radius: 12px">
        <div class="foodcontent">
            <div
                class="color-white no-border"
                valign="bottom"
                style="padding: 0px"
            >   
           
                <div
                    class="row"
                    style="
                        padding: 17px 16px 10px 16px;
                        position: relative;
                        border-bottom: 1px #eff1f2 solid;
                    "
                >
                    <div class="col-30">
                        <div
                            style="position: absolute; top: 18px; left: 6%"
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
                        <!-- :key是为了防止刷新页面或图片更改时图片不更新 -->
                        <img
                            :src="dishes.dish_image"
                            :key="dishes.dish_image"
                            alt=""
                            width="78"
                            height="78"
                            style="border-radius: 6px"
                            :onerror="
                                dishes.weight_spec == '-1'
                                    ? errorImg02
                                    : errorImg01
                            "
                        />
                    </div>
                    <div class="col-70 left10">
                        <div class="row">
                            <div class="col-100">
                                <b
                                    class="font16"
                                    style="
                                        color: #505050;
                                        display: block;
                                        white-space: nowrap;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                    "
                                    >{{ dishes.dish_name }}</b
                                >&nbsp;&nbsp;&nbsp;
                                <!-- 非可售时间 -->
                            </div>
                            <div
                                class="col-100"
                                style="margin-top:3px;overflow:hidden;"
                                
                            >   

                                <div
                                    style="
                                        color: #505050;
                                        float:left;
                                    "
                                >   
                                    <span v-if="dishes.weight_spec == 2">
                                        <span v-if="dishes.dish_status == 5 || dishes.dish_status == 3||(salepmt_type == 2 && salepmt_id > 0)" style="text-decoration:line-through">{{Number(special.spec_price)|price}} </span>
                                        <span v-else>{{Number(special.spec_price)|price}} </span>
                                        <span v-if="dishes.unit_type != ''" style="font-size:12px"> / {{dishes.unit_type}}</span></span>
                                    <span v-else>
                                        <span v-if="dishes.dish_status == 5 || dishes.dish_status == 3||(salepmt_type == 2 && salepmt_id > 0)" style="text-decoration:line-through">{{dishes.original_price|price}}</span>
                                        <span v-else>{{dishes.dish_price|price}} </span>
                                        <span v-if="dishes.unit_type != ''" style="font-size:12px"> / {{dishes.unit_type}}</span>
                                    </span>
                                </div>
                                <!-- 价格（特价） -->
                                <div
                                    style="
                                        float:left;
                                        margin-left: 15px;
                                        
                                    "
                                    v-if="salepmt_type == 2 && salepmt_id > 0"
                                >
                                    <CommonLabel :title="$t('salespmt.sale')" />
                                </div>
                                <!-- 价格（第二份优惠） -->
                                <div
                                    style="clear:both;position: relative;left:8px;top:5px;min-height:22px;"
                                    v-else-if="
                                        salepmt_type == 3 &&
                                        salepmt_id > 0 &&
                                        salepmt_bg_flag == 0
                                    "
                                >
                                    <CommonLabel
                                        :title="$t('salespmt.saleHalf')"
                                    />
                                    <div
                                        style="position: absolute;left:75px;top: 2px;color:#EB3B1C;font-size:12px;"
                                    >
                                        <span>{{ salepmt_price | price }}</span>
                                    </div>
                                </div>
                                <!-- 价格（买即赠） 促销显示-->
                                <div
                                    style="
                                        color:#EB3C1C;
                                        font-size:12px;
                                        height:22px;
                                        margin-top:20px;
                                        overflow:hidden;
                                        clear:both;
                                    "
                                    v-if="
                                        dishes.dish_status == 5 ||
                                        dishes.dish_status == 3
                                    "   
                                >   
                                    <CommonLabel
                                        style="margin-left:8px;"
                                        :title="$t('salespmt.saleBuy')"
                                    />
                                    <div style="position:relative;top:2px;z-index:99;" :style="{'left':$store.getters.language =='zh_CN'?'58px':'115px'}">
                                        {{Number(dishes.dish_price) | price}}
                                    </div>
                                </div>
                                <!-- 价格（买n赠n） -->
                                <div
                                    style="
                                        float:left;
                                        margin-left: 15px;
                                    "
                                    v-else-if="
                                        salepmt_type == 4 &&
                                        salepmt_id > 0 &&
                                        salepmt_bg_flag == 0
                                    "
                                >
                                    <div v-if="dishes.dish_status != 5">
                                        <CommonLabel
                                            v-if="
                                                $store.getters.language ==
                                                'zh_CN'
                                            "
                                            :title="
                                                $t('salespmt.buy') +
                                                buy_num +
                                                $t('salespmt.zeng') +
                                                give_num
                                            "
                                        />
                                        <CommonLabel
                                            v-else
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
                    <div
                        v-if="
                            salepmt_type == 4 &&
                            salepmt_id > 0 &&
                            salepmt_bg_flag == 0
                        "
                    >
                        
                        <div
                            class="col-100 top5"
                            style="font-size: 10px; color: #eb3c1c"
                            v-if="$store.getters.language == 'zh_CN'"
                        >
                            买
                            <span
                                class="dishNameBuy"
                                v-for="(item, index) in buy_dishes"
                                :key="'dishNameBuy-' + index"
                            >
                                {{ item.dish_name }}
                                <span v-show="item.spec_unit !== ''"
                                    >-</span
                                >
                                {{ item.spec_unit }}
                            </span>
                            {{ special.buy_num }}份，随机赠送
                            <span
                                class="dishNameGive"
                                v-for="(item, index) in give_dishs"
                                :key="index"
                                style="display: inline-block"
                            >
                                {{ item.dish_name }}
                                <span v-show="item.spec_unit !== ''"
                                    >-</span
                                >
                                {{ item.spec_unit }}
                            </span>
                            {{ special.give_num }}份
                        </div>
                        <div
                            class="col-100 top5"
                            style="font-size: 10px; color: #eb3c1c"
                            v-else-if="
                                $store.getters.language == 'en_US' ||
                                $store.getters.language == 'ms_MY'
                            "
                        >
                            buy {{ special.buy_num }}&nbsp;
                            <span
                                class="dishNameBuy"
                                v-for="(item, index) in buy_dishes"
                                :key="'dishNameBuy-' + index"
                            >
                                {{ item.dish_name }}
                                <span v-show="item.spec_unit !== ''"
                                    >-</span
                                >
                                {{ item.spec_unit }}
                            </span>
                            ，get {{ special.give_num }}
                            <span
                                class="dishNameGive"
                                v-for="(item, index) in give_dishs"
                                :key="index"
                                style="display: inline-block"
                            >
                                {{ item.dish_name }}
                                <span v-show="item.spec_unit !== ''"
                                    >-</span
                                >
                                {{ item.spec_unit }}
                            </span>
                            free
                        </div>
                        
                    </div>
                </div>
            </div>
            <div class="cardBox">
                <div class="card-content">
                    <div class="row" style="padding: 0 16px">
                        <div class="col-100">
                            <CommonSpecial
                                v-if="dishInfo.weight_spec == 2"
                                :selectIndex="curSelectIndex"
                                :special="dishInfo.spec_detail"
                                :selectSpecial="dishes.spec_detail"
                                @onSpecialItemClick="onSpecialItemClick"
                            />
                            <div
                                class="row top20"
                                v-if="dishes.weight_spec == 1"
                            >
                                <div class="col-100 font12">
                                    {{ $t("Weight") }}
                                </div>
                                <div class="col-100">
                                    <input
                                        class="top10"
                                        v-model.trim="specialValue"
                                        type="number"
                                        style="
                                            border-radius: 4px;
                                            height: 32px;
                                            outline: none;
                                            border: 1px #cccccc solid;
                                            padding-left: 10px;
                                            width: 96px;
                                        "
                                    />
                                    &nbsp;{{ dishes.unit_type }}
                                </div>
                            </div>
                            <div v-if="taste_set" class="chractor">
                                <CommonTag
                                    v-for="(item, index) in taste_set"
                                    :key="index"
                                    :items="item"
                                    :selectItem="dishes.taste_set[index]"
                                    :curentIndex="index"
                                    :huixuanFlag="true"
                                    @onTagItemClick="onTagItemClick"
                                />
                            </div>
                            
                            <CommonAddDish
                                v-if="
                                    curentShoppingCart.dishAdditionalSimpleVOList != null &&
                                    curentShoppingCart.dishAdditionalSimpleVOList.length > 0
                                "
                                :title="$t('jialiao')"
                                :huixuanFlag="true"
                                :tagArray="curentShoppingCart.dishAdditionalSimpleVOList"
                                :selectTagArray="curentShoppingCart.dishAdditionalSimpleVOList"
                                @onSelectItemClick="onSelectItemClick"
                            />
                        </div>
                        <div
                            class="col-100 color-black font12 top10"
                            v-show="dishes.dish_note != ''"
                        >
                            {{ $t("dishDetail") }}
                        </div>
                        <div class="col-100 color-gray spec_detail font12">
                            <p>{{ dishes.dish_note }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="card-footer row"
                style="min-height: auto;padding:0px"
            >
                <div
                    class="col-100"
                    style="
                        height: 56px;
                        padding: 16px;
                        box-shadow: 0 -2px 9px 0px rgba(227, 227, 227, 0.5);
                        border-radius: 12px;
                    "
                >
                    <span
                        class="color-purered font20"
                        v-if="dishes.weight_spec == 2"
                    >
                        <span
                            v-if="
                                dishes.dish_status == 5 ||
                                dishes.dish_status == 3
                            "
                            >{{ Number(special.spec_price) | price }}</span
                        >
                        <span v-else>{{
                            dish_price | price
                        }}</span>
                    </span>
                    <span v-else  class="color-purered font20">
                        <span
                            v-if="
                                dishes.dish_status == 5 ||
                                dishes.dish_status == 3
                            "
                            >{{ dishes.original_price | price }}</span
                        >
                        <span v-else>{{ dish_price | price }}</span>
                    </span>
                    <span v-if="Number(member_price) >= 0" class="left10">
                        <img
                            src="../../../style/images/vipTag.png"
                            alt=""
                            width="24"
                        />
                        <span
                            style="position: relative; top: -1px;z-index:99;"
                            class="color-purered font10 left10"
                            >{{ member_price | price }}</span
                        >
                    </span>
                    <span style=" display: inline-block; float: right;">
                        <a
                            v-show="
                                dishes.dish_status != 5 &&
                                dishes.dish_status != 3
                            "
                            style="padding: 7px 16px;border-radius: 15px;font-size: 12px;line-height: 16px;background: #eb3c1c;color: white;"
                            @click="addCart"
                            >{{ $t("shopcart.confirm") }}</a
                        >
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import CommonTag from "../../../components/CommonTag";
import CommonSpecial from "../../../components/CommonSpecial";
import CommonAddDish from "../../../components/CommonAddDish";
import CommonStepper from "../../../components/CommonStepper";
import CommonLabel from "../../../components/CommonLabel";
import CommonPmt from "../../../components/CommonPmt";

export default {
    name: "CartDishDetail",
    components: {
        CommonTag,
        CommonSpecial,
        CommonAddDish,
        CommonStepper,
        CommonLabel,
        CommonPmt,
    },
    computed: {
        getDishNum(dish_id) {
            return function (dish_id) {
                return this.$store.getters.dishNums[dish_id] | 0;
            };
        },
        curentStore() {
            return this.$store.getters.curentStore;
        },
    },
    props: {
        dishes: {
            type: Object,
            default: null,
        },
        curentShoppingCart:{
            type: Object,
            default: {},
        },
        giveDishes: {
            type: Object,
            default: null,
        },
        tagsList: {
            type: Array,
            default: function () {
                return [];
            },
		},
		curSelectIndex: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            taste_set: null,
            give_dishs: null,
            buy_dishes: "",
            unlike_set: {},
            selectUnlike_set: {},
            dish_price: 0,
            member_price: this.dishes.member_price,
            charactor: [],
            special: {},
            selectArray: [],
            buy_num: this.dishes.buy_num,
            give_num: this.dishes.give_num,
            salepmt_id: this.dishes.salepmt_id,
            salepmt_price: this.dishes.salepmt_price,
            salepmt_type: this.dishes.salepmt_type, //0：满减券，1:整单折扣，2：特价菜，3：第n份优惠，4：买赠
            salepmt_bg_flag: 0, //买赠优惠，0：属于买类别，1：属于赠送类别

            dishInfo: {
                weight_spec: "0",
                spec_detail: [],
                dishAdditionalSimpleVOList: [],
                taste_set: [],
            },
            specialValue: null,
            price: 0,
            vPrice: 0,
            sPrice: 0,
            childItem: "",
            showStrDate: "",
            errorImg01:
                'this.onerror=null;this.src="' +
                require("../../../style/images/defaultImg1.png") +
                '"',
            errorImg02:
                'this.onerror=null;this.src="' +
                require("../../../style/images/defaultImg2.png") +
                '"',
        };
    },
    
    methods: {
        addCart() {
            this.$emit(
                "addCart",
                this.dishes,
                this.dishInfo,
                this.dish_price,
                this.member_price,
                this.salepmt_price,
                false,
                this.specialValue
            );
        },
        onSpecialItemClick(special,index) {
            //修改价格
            this.special = special;
            this.changePrice();
            this.$emit("onSpecialItemClick", special,index);
        },
        onTagItemClick(curentIndex, selectItem) {
            this.charactor[curentIndex] = selectItem;
            this.changePrice();
            this.$emit("onTagItemClick", this.charactor);
        },
        onSelectItemClick(selectArray) {
            //修改价格
            this.selectArray = selectArray;
            this.changePrice();
            this.$emit("onSelectItemClick", selectArray);
        },
        
        changePrice() {
            //规格菜
            if (this.special) {
                this.dish_price = Number(this.special.spec_price);
                this.member_price = Number(this.special.member_price);
                this.salepmt_price = Number(this.special.salepmt_price);
                this.salepmt_type = this.special.salepmt_type;
                this.salepmt_bg_flag = this.special.salepmt_bg_flag;
                this.salepmt_id = this.special.salepmt_id;
                if(this.salepmt_type == 2&&this.salepmt_id>0){
                    this.dish_price = this.salepmt_price;
                }
            }
            // 称重菜
            if (this.dishes.weight_spec == 1) {
                this.dish_price = Number(this.dishes.original_price) * Number(this.specialValue);
                this.member_price = Number(this.dishes.member_price) * Number(this.specialValue);
                this.salepmt_price = this.dishes.salepmt_price * this.specialValue;
                if(this.salepmt_type == 2&&this.salepmt_id>0){
                    this.dish_price = this.salepmt_price;
                }
            }
            // 加料
            if (this.selectArray) {
                if (this.selectArray != null) {
                    for (
                        let index = 0;
                        index < this.selectArray.length;
                        index++
                    ) {
                        const element = this.selectArray[index];
                        if (element.adt_num == 0) {
                            continue;
                        }
                        this.dish_price += element.price
                            ? element.price * element.adt_num
                            : 0;
                        if (this.special) {
                            if (Number(this.special.member_price) >= 0) {
                                this.member_price += element.price
                                    ? element.price * element.adt_num
                                    : 0;
                            } else {
                                this.member_price += element.member_price
                                    ? element.price * element.adt_num
                                    : 0;
                            }
                        } else {
                            if (this.dishes.member_price >= 0) {
                                this.member_price += element.price
                                    ? element.price * element.adt_num
                                    : 0;
                            } else {
                                this.member_price += element.member_price
                                    ? element.price * element.adt_num
                                    : 0;
                            }
                        }

                        // this.salepmt_price += element.price? element.price * element.adt_num: 0;
                            
                    }
                }
            }
            // 口味
            if(this.taste_set){
                if (this.taste_set!=null) {
                    this.taste_set.forEach(items => {
                        items.taste_list.forEach(item=>{
                            if(item.checked==true){
                                if(Number(item.the_price)>0){
                                    this.dish_price+=Number(item.the_price);
                                    if (Number(this.member_price)>=0) {
                                        this.member_price+=Number(item.the_price);
                                    }
                                }
                               
                            }
                        })
                        
                    });
                }

            }
        },
        getItem(item) {
            let selectItem = {};
            this.childItem = item.taste_list;
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
        getDishInfo() {
            let data = {
                dep_id: this.curentStore.dep_id,
                param: this.dishes.dish_id,
            };
            let that = this;
            this.request.dishDetail(data, function (res) {
                if (res.code == "1") {
                    that.dishInfo = res.data;
                    //口味回显要从info接口里拿
                    let theTasteSet = [];
                    theTasteSet = that.curentShoppingCart.taste_set;
                    // console.log(theTasteSet);
                    if (theTasteSet!=null&&theTasteSet.length>0&&theTasteSet!=undefined) {
                        that.taste_set = theTasteSet;
                        // 初始化charactor
                        for (let index = 0,lens=that.taste_set.length;index < lens;index++) {
                            let element = that.taste_set[index];
                            that.charactor[index] = that.getItem(element);

                        }
                    }
                    //加料回显要从info接口里拿
                    //curentShoppingCart.dishAdditionalSimpleVOList

                    // 如果规格不为空 从规格读取价格
                    if (
                        that.dishInfo.weight_spec == "2" &&
                        that.dishInfo.spec_detail
                    ) {
                        if (that.dishes.dish_status != 5) {
                            let specials = JSON.parse(that.dishes.spec_detail);
                            that.special = specials[0];
                        } else {
                            let specials = JSON.parse(
                                that.dishInfo.spec_detail
                            );
                            that.special = specials[1];
                        }
                        if (that.special) {
                            that.dish_price = that.special.spec_price;
                            that.member_price = that.special.member_price;
                            that.salepmt_price = that.special.salepmt_price;
                            that.salepmt_type = that.special.salepmt_type;
                            that.give_num = that.special.give_num;
                            that.buy_num = that.special.buy_num;
                            that.salepmt_bg_flag = that.special.salepmt_bg_flag;
                            that.salepmt_id = that.special.salepmt_id;
                            that.give_dishs = that.special.give_dishs;
                            that.buy_dishes = JSON.parse(
                                that.special.buy_dishes
                            );
                            if (
                                that.special.buy_dishes != "" &&
                                that.special.buy_dishes != null
                            ) {
                                that.buy_dishes = JSON.parse(
                                    that.special.buy_dishes
                                );
                            }
                        }
                    } else {
                        that.special = {};
                        that.special.spec_price = that.dishInfo.dish_price;
                        that.special.member_price = that.dishInfo.member_price;
                        that.special.salepmt_price = that.dishes.salepmt_price;
                        that.special.salepmt_type = that.dishes.salepmt_type;
                        that.special.give_num = that.dishes.give_num;
                        that.special.buy_num = that.dishes.buy_num;
                        that.special.salepmt_bg_flag =
                            that.dishes.salepmt_bg_flag;
                        that.special.salepmt_id = that.dishes.salepmt_id;
                        that.give_dishs = that.dishes.give_dishs;
                        if (
                            that.dishes.buy_dishes != "" &&
                            that.dishes.buy_dishes != null
                        ) {
                            that.buy_dishes = JSON.parse(
                                that.dishes.buy_dishes
                            );
                        }
                    }
                    that.changePrice();
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
    },
    created() {
        if (this.dishes) {
            if (this.dishes.weight_spec == "1") {
                this.specialValue = this.dishes.spec_detail;
                this.price = this.dishes.member_price / this.dishes.spec_detail;
                this.vPrice = this.dishes.dish_price / this.dishes.spec_detail;
                this.sPrice =
                    this.dishes.salepmt_price / this.dishes.spec_detail;
            }
        }
        this.getDishInfo();
    },
    watch: {
        // 称重菜重量--不超过两位小数，最多输入6位整数
        specialValue(newval,oldval) {
            let reg = /^(\d{0,5})(\.(\d{0,2}))?$/g;
            if (!reg.test(newval)) {
                if (newval == undefined||newval == null) {
                    this.specialValue = undefined;
                    return;
                }
                this.specialValue = oldval
            } else {
                this.specialValue = newval.replace(/^\./g, "")
            }
            this.changePrice();
        },
    },
};
</script>

<style scoped>
.choose-style {
    border-radius: 20px;
    height: 25px;
    outline: none;
    border: 1px #cccccc solid;
    padding-left: 10px;
    margin-top: -5px;
}
.card-header {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 12px 12px 0px 0px;
}
.foodcontent {
    height: 100%;
}
.cardBox {
    height: 50%;
    max-height: 220px;
    overflow: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
}

/* 强制显示滚动条 */
.cardBox::-webkit-scrollbar {
    -webkit-appearance: none;
}
.cardBox::-webkit-scrollbar:vertical {
    width: 8px;
}
.cardBox::-webkit-scrollbar-thumb {
    border-radius: 8px;
    border: 2px solid white;
    background-color: #ccc;
}

.dishNameGive::after {
    content: "  /  ";
}
.dishNameGive:last-of-type::after {
    content: "";
}
.dishNameBuy::after {
    content: "  /  ";
}
.dishNameBuy:last-of-type::after {
    content: "";
}
.card-footer:before {
    height: 0px !important;
}
</style>