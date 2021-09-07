<!-- 弹出菜品详情-->
<template>
    <div class="card demo-card-header-pic" style="border-radius: 12px">
        <div class="foodcontent" ref="cardHeader">
            <div
                class="cars-header color-white no-border"
                :style="
                    borderLine == true
                        ? 'border-bottom: 1px solid rgb(239, 241, 242);'
                        : ''
                "
            >
                <div
                    class="row"
                    style="padding: 17px 16px 0px 16px; position: relative"
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
                        <img
                            v-lazy="dishes.dish_image"
                            :key="dishes.dish_image"
                            width="78"
                            height="78"
                            style="border-radius: 6px"
                            onerror="this.src='../../../style/images/defaultImg.png';this.onerror=null"
                        />
                    </div>
                    <div class="col-70">
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
                                <CommonNon
                                    v-if="canGoPlay == false"
                                    style="
                                        color: white;
                                        position: relative;
                                        display: inline-block;
                                        left: -12px;
                                        margin: 5px 0px 2px 0px;
                                    "
                                ></CommonNon>
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
                                    <span
                                        >
                                        <span :style="
                                            salepmt_type == 2 && salepmt_id > 0
                                                ? 'text-decoration:line-through;'
                                                : ''">
                                            {{Number(special.spec_price) | price}}
                                        </span>
                                        <span
                                            v-if="dishes.unit_type != ''"
                                            style="font-size: 12px"
                                            >/{{ dishes.unit_type }}</span
                                        ></span
                                    >
                                </div>
                                <!-- 价格 (特价)-->
                                <div
                                    style="
                                            float:left;
                                            margin-left: 15px;
                                            
                                        "
                                    v-if="salepmt_type == 2 && salepmt_id > 0"
                                >
                                    <CommonLabel
                                        :title="$t('salespmt.sale')"
                                    />
                                </div>
                                <!-- 价格(第二份优惠) -->
                                <div
                                   style="clear:both;position: relative;left:8px;top:5px;min-height:22px;"
                                    v-else-if="
                                        salepmt_type == 3 && salepmt_id > 0
                                    "
                                >
                                        <CommonLabel
                                            :title="$t('salespmt.saleHalf')"
                                        />
                                        <div
                                            style="position: absolute;left:75px;top: 2px;color:#EB3B1C;font-size:12px;"
                                            >{{ salepmt_price | price }}</div
                                        >
                                    
                                </div>
                                <!-- 价格(买即赠) -->
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
                                    <CommonLabel
                                        v-if="
                                            $store.getters.language == 'zh_CN'
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
                                v-for="(item2, index) in buy_dishes"
                                :key="'dishNameBuy-' + index"
                            >
                                {{ item2.dish_name }}
                                <span v-show="item2.spec_unit !== ''">-</span>
                                {{ item2.spec_unit }}
                            </span>
                            {{ buy_num }}份，随机赠送
                            <span
                                class="dishNameGive"
                                v-for="(item, index) in give_dishs"
                                :key="index"
                                style="display: inline-block"
                            >
                                {{ item.dish_name }}
                                <span v-show="item.spec_unit !== ''">-</span>
                                {{ item.spec_unit }}
                            </span>
                            {{ give_num }}份
                        </div>
                        <div
                            class="col-100 top5"
                            style="font-size: 10px; color: #eb3c1c"
                            v-else-if="
                                $store.getters.language == 'en_US' ||
                                $store.getters.language == 'ms_MY'
                            "
                        >
                            buy {{ buy_num }}&nbsp;
                            <span
                                class="dishNameBuy"
                                v-for="(item3, index) in buy_dishes"
                                :key="'dishNameBuy-' + index"
                            >
                                {{ item3.dish_name }}
                                <span v-show="item3.spec_unit !== ''">-</span>
                                {{ item3.spec_unit }}
                            </span>

                            ，get {{ give_num }}
                            <p
                                class="dishNameGive"
                                v-for="(item, index) in give_dishs"
                                :key="index"
                                style="display: inline-block"
                            >
                                {{ item.dish_name }}
                                <span v-show="item.spec_unit !== ''">-</span
                                >{{ item.spec_unit }}
                            </p>
                            free
                        </div>
                    </div>
                </div>
                <!-- 售卖时间 -->
                <div style="padding: 0px 16px 10px 16px">
                    <div
                        class="col-100 font10 top5"
                        v-if="dishes.sell_state == 1"
                    >
                        <span style="color: #505050"
                            >{{ $t("dish.sellTime") }}：</span
                        >
                        <span style="color: #808080">
                            <span
                                >{{ dishes.sell_date[0] | moment }}-{{
                                    dishes.sell_date[1] | moment
                                }}，</span
                            >
                            <span>{{ showStrDate }}，</span>
                            <span
                                >{{ dishes.sell_time_start }}-{{
                                    dishes.sell_time_end
                                }}</span
                            >
                        </span>
                    </div>
                </div>
            </div>
            <div class="cardBox">
                <div class="card-content">
                    <div class="row" style="padding: 0 16px">
                        <div class="col-100">
                            <CommonSpecial
                                v-if="dishes.weight_spec == 2"
								:selectIndex="curSelectIndex"
                                :special="dishes.spec_detail"
                                @onSpecialItemClick="onSpecialItemClick"
                            />

                            <div
                                class="row no-gutter top20"
                                v-if="dishes.weight_spec == 1"
                            >
                                <div class="col-100 font12">
                                    {{ $t("Weight") }}
                                </div>
                                <div class="col-100">
                                    <input
                                        class="top10"
                                        type="number"
                                        v-model.trim="specialValue"
                                        style="
                                            border-radius: 4px;
                                            height: 32px;
                                            outline: none;
                                            border: 1px #cccccc solid;
                                            padding-left: 10px;
                                            width: 78px;
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
                                    :curentIndex="index"
                                    @onTagItemClick="onTagItemClick"
                                />
                            </div>
                           
                            <div
                                v-if="
                                    dishes.dishAdditionalSimpleVOList == null ||
                                    dishes.dishAdditionalSimpleVOList.length < 1
                                "
                            ></div>
                            <div v-else>
                                <CommonAddDish
                                    :title="$t('jialiao')"
                                    :tagArray="
                                        dishes.dishAdditionalSimpleVOList
                                    "
                                    :selectTagArray="[]"
                                    @onSelectItemClick="onSelectItemClick"
                                />
                            </div>
                        </div>
                        <div
                            class="col-100 color-black font12 top10"
                            v-show="dishes.dish_note != ''"
                        >
                            {{ $t("dishDetail") }}
                        </div>
                        <div class="col-100 color-gray spec_detail">
                            <p class="font12">{{ dishes.dish_note }}</p>
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
                        padding: 15px 16px;
                        box-shadow: 0 -2px 9px 0px rgba(227, 227, 227, 0.5);
                        border-radius: 0 0 12px;
                    "
                >
                    
                    <span class="color-purered font20">{{
                        dish_price | price
                    }}</span>
                    <span v-if="Number(member_price) >= 0" class="left10">
                        <img
                            src="../style/images/vipTag.png"
                            alt=""
                            width="24"
                        />
                        <span 
                            style="position: relative; top: -1px;z-index:99;"
                            class="color-purered font10 left10"
                            >{{ member_price | price }}</span
                        >
                    </span>
                    <span>
                        <CommonStepper1
                            v-if="dishes.weight_spec == 2"
                            :dishes="dishes"
                            :canGoPlay="canGoPlay"
                            :dishId="special_id"
                            :special="special"
                            @addCart="addCart"
                            @delCart="delCart"
                        />
                        <CommonStepper1
                            v-else
                            :dishes="dishes"
                            :canGoPlay="canGoPlay"
                            :dishId="dishes.dish_id"
                            @addCart="addCart"
                            @delCart="delCart"
                        />
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import CommonTag from "./CommonTag";
import CommonSpecial from "./CommonSpecial";
import CommonAddDish from "./CommonAddDish";
import CommonStepper1 from "./CommonStepper1";
import CommonAddUnlick from "./CommonAddUnlick";
import CommonLabel from "./CommonLabel";
import CommonPmt from "./CommonPmt";
import CommonNon from "./CommonNon";

export default {
    name: "foodDetail",
    components: {
        CommonTag,
        CommonSpecial,
        CommonAddDish,
        CommonStepper1,
        CommonAddUnlick,
        CommonLabel,
        CommonPmt,
        CommonNon,
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
    props: {
        dishes: {
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
            multipleSet: {},
            dish_price: 0,
            member_price: 0,
            salepmt_price: 0,
            charactor: [],
            special: {},
            selectArray: null,
            specialValue: 1.0,
            buy_num: this.dishes.buy_num,
            give_num: this.dishes.give_num,
            salepmt_id: 0,
            salepmt_type: this.dishes.salepmt_type, //0：满减券，1:整单折扣，2：特价菜，3：第n份优惠，4：买赠
            salepmt_bg_flag: this.dishes.salepmt_bg_flag, //买赠优惠，0：属于买类别，1：属于赠送类别
            arryDate: [],
            showStrDate: "",
            canGoPlay: false,
            childItem: "",
            borderLine: false,
        };
    },
    methods: {
        addCart() {
            this.$emit(
                "addCart",
                this.dishes,
                this.dish_price,
                this.member_price,
                this.salepmt_price,
                false,
                this.specialValue
            );
        },
        delCart() {
            this.$emit("delCart", this.dishes);
        },
        onSpecialItemClick(special,index) {
            //修改价格
            this.special = special;
            this.special_id = this.special.id;
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
            var selectItem = {};
            this.childItem = item.taste_list;
            for (let index in this.childItem) {
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
    },

    created() {
        if (this.dishes.sell_date != "") {
            var CurrentTime = new Date();
            var startTime = new Date(this.dishes.sell_date[0]);
            var endTime = new Date(this.dishes.sell_date[1]);
            var year = CurrentTime.getFullYear();
            var month = CurrentTime.getMonth() + 1;
            var day = CurrentTime.getDay();
            var hours = CurrentTime.getHours();
            var minutes = CurrentTime.getMinutes();
            var index = 0;
            var dataArry = this.dishes.sell_week.replace(/[^0-9]/gi, "");
            var arryDate = {
                1: "周一",
                2: "周二",
                3: "周三",
                4: "周四",
                5: "周五",
                6: "周六",
                0: "周日",
            };
            if (this.dishes.sell_week != null) {
                for (
                    index = 0;
                    index < this.dishes.sell_week.length - 1;
                    index++
                ) {
                    this.showStrDate =
                        this.showStrDate +
                        arryDate[this.dishes.sell_week[index]] +
                        "，";

                    if (this.dishes.sell_week[index] == day) {
                        this.canGoPlay = true;
                    }
                }
            }

            if (this.dishes.sell_week[index] == day) {
                this.canGoPlay = true;
            }
            this.showStrDate =
                this.showStrDate + arryDate[this.dishes.sell_week[index]];

            if (
                CurrentTime.getTime() < startTime.getTime() ||
                CurrentTime.getTime() > endTime.getTime()
            ) {
                this.canGoPlay = false;
            }
            var currCalT = hours * 100 + minutes;
            var startCalT =
                this.dishes.sell_time_start.replace(/[^0-9]/gi, "") * 1;
            var endCalT = this.dishes.sell_time_end.replace(/[^0-9]/gi, "") * 1;
            if (currCalT < startCalT || currCalT > endCalT) {
                this.canGoPlay = false;
            }
        } else {
            this.canGoPlay = true;
        }
        if (this.dishes.taste_set) {
            let arr = this.dishes.taste_set;
            this.taste_set = arr;
            if (this.taste_set != null) {
                // 初始化charactor
                for (let index = 0; index < this.taste_set.length; index++) {
                    let element = this.taste_set[index];
                    this.charactor[index] = this.getItem(element);
                }
               
            }
        }
        if (this.give_dishs != null) {
            for (let i in this.give_dishs) {
                let temp = this.give_dishs[i];
                temp.dish_name = this.give_dishs[i].dish_name;
            }
        }
        //如果规格不为空 从规格读取价格
        if (this.dishes.weight_spec == 2 && this.dishes.spec_detail) {
            let specials = JSON.parse(this.dishes.spec_detail);
            if(specials.length>0){
                this.special = specials[0];
                specials.forEach(item => {
                    // 默认勾选
                    if(Number(item.default_choice)==1){
                        this.special = item;
                    }
                });
                if (this.special) {
                    this.dish_price = this.special.spec_price;
                    this.member_price = this.special.member_price;
                    this.salepmt_price = this.special.salepmt_price;
                    this.salepmt_type = this.special.salepmt_type;
                    this.give_num = this.special.give_num;
                    this.buy_num = this.special.buy_num;
                    this.salepmt_bg_flag = this.special.salepmt_bg_flag;
                    this.salepmt_id = this.special.salepmt_id;
                    this.give_dishs = this.special.give_dishs;
                    this.special_id = this.special.id;
                    this.buy_dishes = [];
                    if (
                        this.special.buy_dishes != "" &&
                        this.special.buy_dishes != null
                    ) {
                        this.buy_dishes = JSON.parse(this.special.buy_dishes);
                    }

                }
                
            }
            this.changePrice();
        } else {
            this.special = {};
            this.special.spec_price = this.dishes.dish_price;
            this.special.member_price = this.dishes.member_price;
            this.special.salepmt_price = this.dishes.salepmt_price;
            this.special.salepmt_type = this.dishes.salepmt_type;
            this.special.give_num = this.dishes.give_num;
            this.special.buy_num = this.dishes.buy_num;
            this.special.salepmt_bg_flag = this.dishes.salepmt_bg_flag;
            this.special.salepmt_id = this.dishes.salepmt_id;
            this.give_dishs = this.dishes.give_dishs;
            this.special.special_id = this.dishes.dish_id;
            this.buy_dishes = [];
            if (
                this.dishes.buy_dishes != "" &&
                this.dishes.buy_dishes != null
            ) {
                this.buy_dishes = JSON.parse(this.dishes.buy_dishes);
            }
            this.specialValue = "1.0";
        }
    },
    mounted() {
        var heightCss = window.getComputedStyle(this.$refs.cardHeader).height;
        var b = "180px";
        if (heightCss > b) {
            this.borderLine = true;
        } else {
            this.borderLine = false;
        }
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
.button-round {
    width: 82px;
    height: 30px;
    font-size: 12px;
    float: right;
    line-height: 30px;
}
.choose-style {
    border-radius: 20px;
    height: 25px;
    outline: none;
    border: 1px #cccccc solid;
    padding-left: 10px;
    margin-top: -5px;
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
.card-header {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 222px;
    border-radius: 12px 12px 0px 0px;
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