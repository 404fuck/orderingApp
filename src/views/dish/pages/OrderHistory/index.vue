<template>
    <div class="main-layout">
        <div class="row no-gutter">
            <div class="col-10">
                <div @click="backClick" style="margin-left:8px">
                    <van-icon name="arrow-left" class="font20 top18" />
                </div>
            </div>
            <div class="col-90 center">
                <p class="center color-darkbrown" style="font-weight: bold;">{{$t('dish.Ydish')}}</p>
            </div>
        </div>

        <div  v-if="dishList!=null" class="dish-list">
            <RecommItem1
                v-for="(dishitem, index) in dishList"
                :key="index"
                :dishes="dishitem"
                :canGoPlay="dishitem.canGoPlay"
                @addCart="addCart"
                @delCart="delCart"
                @showFoodDetail="showFoodDetail"
            />
        </div>

        <div v-if="showType==false&&dishList==null" class="noresult">
            <div class="closeImg1">
                <img
                    src="../../../../style/images/noresult.png"
                    @click="isShowFoodDetail=false"
                    style="display:block;left: 20%;position: relative;"
                />
                <span
                    class="noresult-text color-lightbrown font14 top10"
                    style="display: block;text-align: center;width:100%"
                >{{$t('dish.Ndish')}}</span>
                <div class="row center top30">
                    <div class="col-100">
                        <input
                            type="button"
                            :value="$t('dish.hotDish')"
                            class="button button-round color-red"
                            @click="goHostDish"
                            style="height:40px"
                        />
                    </div>
                </div>
            </div>
        </div>
        <CopyURL />
        <!-- 菜品详情 -->
        <van-popup v-model="isShowFoodDetail" get-container="#app" @close="dismissFoodDetail">
            <div class="popupcontent">
                <div class="fooddetail">
                    <FoodDetail
                        v-if="isShowFoodDetail"
                        :dishes="curentDishes"
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
                    @click="isShowFoodDetail=false"
                    width="32"
                />
            </div>
        </van-popup>
    </div>
</template>
<script>
import Swiper from "../../../../components/Swiper";
import RecommItem from "../../../../components/RecommItem";
import RecommItem1 from "../../../../components/RecommItem1";
// 弹出菜品详情
import FoodDetail from "../../../../components/FoodDetail";
import CopyURL from "../../../../components/CopyURL";
export default {
    name: "search",
    components: {
        Swiper,
        RecommItem1,
        FoodDetail,
        CopyURL,
    },
    computed: {
        curentStore() {
            //console.log('curentStore')
            return this.$store.getters.curentStore;
        },
        dinersNum() {
            return function () {
                return this.$store.getters.dinersNum;
            };
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
    },
    data() {
        return {
            showType: true,
            dep_id: "",
            searchText: "",
            hotDatas: {},
            dishList: null,
            curentDishPrice: 0, //当前加购菜品价格
            curentMemberPrice: 0, //当前加购菜品会员价格
            special: null,
            charactor: null,
            selectArray: null,
            depRecommandSet: "2", //为2时展示店家推荐
            isShowFoodDetail: false, //是否展示菜品详情
            curentDishes: {}, //当前菜品详情
            shoppingCartDetail: {}, //购车详细信息
            tempDishList: {}, //购车详细信息
            tempRecommandDishList: {}, //购车详细信息
            childItem:''
        };
    },
    methods: {
        getCanGoPlay(dishes)
    {
      var canGoPlay = false;
      var item = dishes;
      if(dishes.sell_date != "")
      {
        if(item.sell_dateChange!=true){
        item.sell_date=dishes.sell_date.split('/')
        item.sell_dateChange =true;
        item.sell_week=dishes.sell_week.replace(/[^0-9]/ig, "")
      } 
        var CurrentTime = new Date();
        var startTime = new Date(item.sell_date[0]);
        var endTime = new Date(item.sell_date[1]);
        var year=CurrentTime.getFullYear();
        var month=CurrentTime.getMonth()+1;
        var day=CurrentTime.getDay();
        var hours=CurrentTime.getHours();
        var minutes=CurrentTime.getMinutes();
        var index = 0
        var dataArry =  dishes.sell_week.replace(/[^0-9]/ig, "");
        var arryDate={"1":"周一","2":"周二","3":"周三","4":"周四","5":"周五","6":"周六","0":"周日"}
    
        for(index = 0;index < dishes.sell_week.length ;index++)
      {
        if( dishes.sell_week[index] == day){
          canGoPlay = true;
        }
      }
    if(CurrentTime.getTime()<startTime.getTime() || CurrentTime.getTime() > endTime.getTime())
    {
      canGoPlay = false;
    }
    var currCalT = hours*100+minutes;
    var startCalT =  dishes.sell_time_start.replace(/[^0-9]/ig, "")*1;
    var endCalT = dishes.sell_time_end.replace(/[^0-9]/ig, "")*1;
    if(currCalT < startCalT || currCalT > endCalT)
    {
      canGoPlay = false;
    }
    }
    else{

      canGoPlay = true;
    }
    return canGoPlay;
    },
        goHostDish() {
            this.$router.replace({ path: "hotDish" });
        },
        getShowSpecial(dishes) {
            //判断是否展示规格

            return (
                dishes.weight_spec == "2" ||
                dishes.taste_set ||
                dishes.dishAdditionalSimpleVOList.length > 0 ||
                dishes.weight_spec == "1"
            );
        },
        addCart(dishes, dish_price, member_price, showDetail, weight) {
            this.curentDishPrice = Number(dish_price);
            this.curentMemberPrice = Number(member_price);
            var id = dishes.dish_id;
            this.isShowSpecial = this.getShowSpecial(dishes);
            if (showDetail && this.isShowSpecial) {
                this.showFoodDetail(dishes);
            } else {
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
        onSpecialItemClick(special) {
            //this.toast.info(JSON.stringify(special))
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
        addDish(dishes, weight) {
            //增加菜品
            // map: { //菜品规格
            //   spec_detail:"",//按照原有菜品的规格样式放入客户选择的规格
            //   taste_set:"",//按照原有菜品的口味样式放入客户选择的口味
            //   dish_additional:"",//按照原有菜品的配菜的List格式放入客户选择的配菜
            // },
            var map = {};

            var price = {
                dish_price: this.curentDishPrice,
                member_price: this.curentMemberPrice,
            };
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
                map["dish_additional"] = this.selectArray;
            }

            let id = dishes.dish_id;

            let data = {
                dep_id: this.dep_id,
                company_id: this.curentStore.company_id,
                param: this.curentStore.tb_id, //桌子id
                str_param: id, //菜品id
                param2: 1, //菜品数量
                map: map,
            };
            let that = this;
            var num = this.getDishNum(id);
            this.request.addDish(data, function (res) {
                if (res.code == "101") {
                    that.updateDishCartId(id, res.msg);
                    that.stringutils.setDishNum(id, ++num);
                    that.addTotal(1);
                    // that.reload(dishType)
                    that.toast.success(that.$t("addShopcart"));
                    // that.isShowFoodDetail = false
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        dismissFoodDetail() {
            this.charactor = null;
            this.special = null;
            this.selectArray = null;
        },
        lessDish(info) {
            //减少菜品

            let data = {
                dep_id: this.curentStore.dep_id,
                param: this.curentStore.tb_id, //桌子id
                str_param: info.cart_id, //菜品id
                param2: 1, //菜品数量
            };
            let that = this;
            var num = this.getDishNum(info.dish_id);
            this.request.delDish(data, function (res) {
                if (res.code > 0) {
                    that.stringutils.setDishNum(info.dish_id, --num);
                    that.addTotal(info.least_number);
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        //展示菜品详情
        showFoodDetail(dishes) {
            this.isShowFoodDetail = true;
            this.curentDishes = dishes;
            if(dishes.sell_date!=""){
                dishes.sell_date=dishes.sell_date.split('/')
                dishes.sell_week=dishes.sell_week.replace(/[^0-9]/ig, "")
            }
            
            //初始化规格等信息
            if (dishes.weight_spec == "2" && dishes.spec_detail) {
                var specialList = JSON.parse(dishes.spec_detail);
                this.special = specialList[0];
            } else {
                this.special = null;
            }
            //初始化口味等信息
            if (dishes.taste_set) {
                var taste_set = dishes.taste_set;
                this.charactor = [];
                //初始化charactor
                for (let index = 0; index < taste_set.length; index++) {
                    const element = taste_set[index];
                    this.charactor[index] = this.getItem(element);
                }
            } else {
                this.charactor = null;
            }
        },

         getItem(item) {
            var selectItem = {};
            this.childItem = item.taste_list;
            for(var index in this.childItem)
            {
                this.childItem[index].checked = false;
            }
            selectItem["taste_name"] =item.taste_name;
            selectItem["taste_name_en"] = item.taste_name_en;
            selectItem["taste_name_my"] = item.taste_name_my;
            selectItem["taste_name_zh"] = item.taste_name_zh;
            selectItem["need_i18n"] = item.need_i18n;
            selectItem["single_multiple"] = item.single_multiple;
            selectItem["is_sys"] = item.is_sys;
            selectItem["taste_list"] = this.childItem;
            return selectItem;
            },
        publishStorage() {
            //初始化菜品信息
            var dic = {};
            if (this.tempDishList != null) {
                for (const key in this.tempDishList) {
                    if (this.tempDishList.hasOwnProperty(key)) {
                        const item = this.tempDishList[key];
                        // console.log(item.dish_id+":"+item.dish_num)
                        dic[item.dish_id] = 0;
                        this.tempDishList[key].canGoPlay=this.getCanGoPlay(this.tempDishList[key]);
                    }
                }
            }

            if (this.tempRecommandDishList != null) {
                for (const key in this.tempRecommandDishList) {
                    if (this.tempRecommandDishList.hasOwnProperty(key)) {
                        const item = this.tempRecommandDishList[key];
                        // console.log(item.dish_id+":"+item.dish_num)
                        dic[item.dish_id] = 0;
                    }
                }
            }

            //更新购物车缓存
            if (
                this.shoppingCartDetail != null &&
                this.shoppingCartDetail.shopping_cart_dishes_vo != null
            ) {
                var shopping_cart_dishes_vo = this.shoppingCartDetail
                    .shopping_cart_dishes_vo;
                var totalNum = 0;
                for (const key in shopping_cart_dishes_vo) {
                    if (shopping_cart_dishes_vo.hasOwnProperty(key)) {
                        const item = shopping_cart_dishes_vo[key];
                        // console.log(item.dish_id+":"+item.dish_num)
                        dic[item.dish_id] = item.dish_num;
                        totalNum = Number(totalNum) + Number(item.dish_num);
                        this.updateDishCartId(item.dish_id, key);
                    }
                }

                this.$store.dispatch("setDishNums", dic);
                this.$store.dispatch("setTotalNum", totalNum);
            }
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
                        for (let j in cart) {
                            if (
                                res.data.recommandVos[i].dish_id ==
                                cart[j].dish_id
                            ) {
                                res.data.recommandVos[i].cart_id = j;
                            }
                        }
                    }
                    that.dishList = that.stringutils.getHotDishs(
                        res.data.recommandVos
                    );
                    for (let i in that.dishList) {
                        that.dishList[i].canGoPlay=that.getCanGoPlay(that.dishList[i]);
                        }
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        addTotal(num) {
            var totalNum = this.getTotalDishNum();
            this.$store.dispatch("setTotalNum", Number(totalNum) + Number(num));
        },
        getDishList() {
            let data = {
                dep_id: this.curentStore.dep_id,
            };
            let that = this;
            this.request.dishList(data, function (res) {
                if (res.code == "1") {
                    if (res.data != null) {
                        //更新购物车缓存

                        that.tempRecommandDishList = res.data.recommandDishList;
                        that.shoppingCartDetail = res.data.shoppingCartDetail;
                        that.publishStorage();
                    } else {
                    }
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        getDDDish() {
            let data = {
                dep_id: this.curentStore.dep_id,
            };
            let that = this;
            this.request.userorderdish(data, function (res) {
                if (res.code == "1") {
                    if (res.data != null) {
                        that.showType = false;
                        //更新购物车缓存
                        that.tempDishList = res.data;
                        that.dishList = res.data;
                    } else {
                        that.showType = true;
                    }
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },

        backClick() {
            window.history.go(-1);
        },
        updateDishCartId(id, cart_id) {
            for (let i in this.dishList) {
                if (this.dishList[i].dish_id === id) {
                    this.dishList[i].cart_id = cart_id;
                }
            }
        },
    },
    created() {
        if (this.curentStore) {
            this.dep_id = this.curentStore.dep_id;
            // this.getHotDish()
            this.getDDDish();
            this.getDishList();
            
        }
    },
};
</script>
<style scoped>
.van-search__content {
    background-color: white;
}

.van-popup {
    background-color: transparent;
    width: 90%;
    padding: 80px 0;
    overflow: hidden;
}

.mainType {
    float: left;
    top: 10%;
    left: 10%;
}

.closeImg1 {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.closeImg {
    margin-top: 20px;
    margin-bottom: 20px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
}

.hotBtn {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
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

.clearFloat {
    clear: both;
}

.dish-list {
    margin-bottom: 50px;
}
</style>