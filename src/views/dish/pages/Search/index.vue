<template>
  <div class="main-layout">
    <div class="row no-gutter">
      <div class="col-10 center">
        <div @click="backClick">
          <van-icon name="arrow-left"
                    class="font20 top18" />
        </div>
      </div>
      <div class="col-90">
        <van-search style="padding-left:0px"
                    v-model="searchText"
                    :placeholder="$t('dish.searchText')"
                    shape="round"
                    @search="onSearch"
                    background="transparent"
                    @clear="onClear"></van-search>
      </div>
    </div>
    <!-- 标签搜索 -->
    <!-- <div class="row">
      <div class="col-100">
        <ul class="dishTag">
          <li  v-for="(item, index) in tagsList" :key="index" :class="{active:index==isShow}" @click="selectTag(index)" >{{item.name}}</li>
        </ul>
      </div>
    </div> -->
    <div class="search_content">
      <div v-if="showType==0"
           class="swip">
        <Swiper :datas="dishList"></Swiper>
      </div>
      <div v-if="showType==1"
           class="dish-list">
        <RecommItem1 v-for="(dishitem, index) in dishList"
                     :key="index"
                     :dishes="dishitem"
                     @addCart="addCart"
                     @delCart="delCart"
                     @showFoodDetail="showFoodDetail" />
      </div>

      <div v-if="showType==2"
           class="noresult">
        <img src="../../../../style/images/noresult.png"
             class="closeImg"
             style="position:relative"
             @click="isShowFoodDetail=false" />
        <div class="noresult-text color-lightbrown font14 top10"
             style="display: block;text-align: center;width:100%">{{$t('noDish')}}</div>
      </div>
    </div>
<CopyURL/>
    <!-- 菜品详情 -->
    <van-popup v-model="isShowFoodDetail"
               get-container="#app"
               @close="dismissFoodDeatils">
      <div class="popupcontent">
        <div class="fooddetail">
          <FoodDetail v-if="isShowFoodDetail"
                      :dishes="curentDishes"
                      @addCart="addCart"
                      @delCart="delCart"
                      @onSpecialItemClick="onSpecialItemClick"
                      @onTagItemClick="onTagItemClick"
                      @onSelectItemClick="onSelectItemClick"></FoodDetail>
        </div>
        <img src="../../../../style/images/close.png"
             class="closeImg"
             @click="isShowFoodDetail=false"
             width="32" />
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
    CopyURL
  },
  computed: {
    curentStore () {
      //console.log('curentStore')
      return this.$store.getters.curentStore;
    },
    dinersNum () {
      return function () {
        return this.$store.getters.dinersNum;
      };
    },
    getDishNum (dish_id) {
      return function (dish_id) {
        return this.$store.getters.dishNums[dish_id] | 0;
      };
    },
    getTotalDishNum () {
      return function () {
        return this.$store.getters.totalNum | 0;
      };
    }
  },
  data () {
    return {
      showType: 0,
      dep_id: "",
      searchText: "",
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
      tempRecommandDishList: {} ,//购车详细信息
      tagsList:[],
      isShow:-1
    };
  },
  methods: {
    // 选择菜品标签查询
    selectTag(index){
      this.isShow = index
    },
     // 菜品标签和规则列表查询
    tagspeclist(){
      let data ={
        dep_id: this.dep_id,
        dict_type: "DISH_TAG"
      }
      let that = this
      this.request.tagspeclist(data,function(res){
        if(res.code == "1"){
          that.tagsList = res.data
        }else{
          that.toast.fail(res.msg);
        }
      })
    },
    getShowSpecial (dishes) {
      //判断是否展示规格

      return (
        dishes.weight_spec == "2" ||
        dishes.taste_set ||
        dishes.dishAdditionalSimpleVOList.length > 0 ||
        dishes.weight_spec == "1"
      );
    },
    addCart (dishes, dish_price, member_price, showDetail, weight) {
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
    delCart (dishes) {
      this.isShowSpecial = this.getShowSpecial(dishes);
      if (this.isShowSpecial) {
        this.toast.info(this.$t("setShopcart"));
        return;
      }
      this.lessDish(dishes);
    },
    onSpecialItemClick (special) {
      //this.toast.info(JSON.stringify(special))
      this.special = special;
    },
    onTagItemClick (charactor) {
      this.charactor = charactor;
      //this.toast.info(JSON.stringify(charactor))
    },
    onSelectItemClick (selectArray) {
      this.selectArray = selectArray;
      //this.toast.info(JSON.stringify(selectArray))
    },
    addDish (dishes, weight) {

      var map = {};

      var price = {
        dish_price: this.curentDishPrice,
        member_price: this.curentMemberPrice
      };
      if (this.special) {
        map["spec_detail"] = JSON.stringify(this.special);
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
        map: map
      };
      let that = this;
      var num = this.getDishNum(id);
      this.request.addDish(data, function (res) {
        if (res.code == "101") {
          that.updateDishCartId(id, res.msg);
          that.stringutils.setDishNum(id, ++num)
          that.addTotal(1);
          // that.reload(dishType)
          that.toast.success(that.$t("addShopcart"));
          // that.isShowFoodDetail = false;
        } else {
          that.toast.fail(res.msg);
        }
      });
    },
    dismissFoodDeatils () {
      this.charactor = null;
      this.special = null;
      this.selectArray = null;
    },
    lessDish (info) {
      //减少菜品

      let data = {
        dep_id: this.curentStore.dep_id,
        param: this.curentStore.tb_id, //桌子id
        str_param: info.cart_id, //菜品id
        param2: 1 //菜品数量
      };
      let that = this;
      var num = this.getDishNum(info.dish_id);
      this.request.delDish(data, function (res) {
        if (res.code >0) {
          that.stringutils.setDishNum(info.dish_id, --num)
          that.addTotal(info.least_number);
        } else {
          that.toast.fail(res.msg);
        }
      });
    },
    //展示菜品详情
    showFoodDetail (dishes) {
      this.isShowFoodDetail = true;
      this.curentDishes = dishes;
      //初始化规格等信息
      if (dishes.weight_spec == "2" && dishes.spec_detail) {
        var specialList = JSON.parse(dishes.spec_detail);
        this.special = specialList[0];
      } else {
        this.special = null;
      }
      //初始化口味等信息
      if (dishes.taste_set) {
        var taste_set =dishes.taste_set;
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

    getItem (item) {
      var selectItem = {};
      var childItem = [];
      selectItem["dict_type"] = item.dict_type;
      selectItem["dict_value"] = item.dict_value;
      selectItem["dict_child_value"] = childItem;

      return selectItem;
    },
    publishStorage () {
      //初始化菜品信息
      var dic = {}
      if (this.tempDishList != null) {
        for (const key in this.tempDishList) {
          if (this.tempDishList.hasOwnProperty(key)) {
            const item = this.tempDishList[key];
            // console.log(item.dish_id+":"+item.dish_num)
            dic[item.dish_id] = 0
          }
        }
      }

      if (this.tempRecommandDishList != null) {
        for (const key in this.tempRecommandDishList) {
          if (this.tempRecommandDishList.hasOwnProperty(key)) {
            const item = this.tempRecommandDishList[key];
            // console.log(item.dish_id+":"+item.dish_num)
            dic[item.dish_id] = 0
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
            dic[item.dish_id] = item.dish_num
            totalNum = Number(totalNum) + Number(item.dish_num);
            this.updateDishCartId(item.dish_id, key);
          }
        }
        this.$store.dispatch("setDishNums", dic);

        this.$store.dispatch("setTotalNum", totalNum);
      }
    },
    getHotDish () {
      let data = {
        dep_id: this.curentStore.dep_id,
         param1: this.curentStore.tb_id,
        company_id: this.curentStore.company_id
      };
      let that = this;
      this.request.hotDish(data, function (res) {
        if (res.code == "1") {
          let cart = res.data.shoppingCartDetail.shopping_cart_dishes_vo;
          for (let i in res.data.recommandVos) {
            for (let j in cart) {
              if (res.data.recommandVos[i].dish_id == cart[j].dish_id) {
                res.data.recommandVos[i].cart_id = j;
              }
            }
          }
          that.dishList = that.stringutils.getHotDishs(res.data.recommandVos);
        } else {
          that.toast.fail(res.msg);
        }
      });
    },
    addTotal (num) {
      var totalNum = this.getTotalDishNum();
      this.$store.dispatch("setTotalNum", Number(totalNum) + Number(num));
    },
    getDishList () {
      let data = {
        dep_id: this.curentStore.dep_id,
        str_param: this.$store.getters.dinersNum,
        company_id: this.curentStore.company_id,
        map: { take_out: this.$store.getters.take_out, appoint_time: "" }
      };
      let that = this;
      this.request.dishList(data, function (res) {
        if (res.code == "1") {
          if (res.data != null) {
            //更新购物车缓存
            that.tempDishList = res.data.dishList;
            that.tempRecommandDishList = res.data.recommandDishList;
            that.shoppingCartDetail = res.data.shoppingCartDetail;
            that.publishStorage();
          }
        } else {
          that.toast.fail(res.msg);
        }
      });
    },
    searchDish () {
      let data = {
        dep_id: this.curentStore.dep_id,
        company_id: this.curentStore.company_id,
        str_param: this.searchText
      };
      let that = this;
      this.request.searchDish(data, function (res) {
        if (res.code == "1") {
          if (res.data != null) {
            that.dishList = res.data;
            that.publishStorage();
            if (
              that.dishList == null ||
              JSON.stringify(that.dishList) == "{}"
            ) {
              that.showType = 2;
            } else {
              that.showType = 1;
            }
          }
        } else {
          that.toast.fail(res.msg);
        }
      });
    },
    onClear () {
      this.searchText = "";
      this.searchDish();
    },
    onSearch () {
      this.searchDish();
    },
    backClick () {
      window.history.go(-1);
    },
    updateDishCartId (id, cart_id) {
      for (let i in this.dishList) {
        if (this.dishList[i].dish_id === id) {
          this.dishList[i].cart_id = cart_id;
        }
      }
    }
  },
  created () {
    if (this.curentStore) {
      this.dep_id = this.curentStore.dep_id;
      this.getHotDish();
      this.getDishList();
      this.tagspeclist()
    }
  }
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

.search_content {
  height: 100%;
  overflow-y: auto;
}

.mainType {
  float: left;
  top: 10%;
  left: 10%;
}

.closeImg {
  margin-top: 20px;
  margin-bottom: 20px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}

.swipe {
  padding: 10px;
}

.van-swipe {
  border-radius: 10px;
}

.clearFloat {
  clear: both;
}

.dish-list {
  margin-bottom: 50px;
}

.noresult {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.dishTag{
  padding: 0 14px;
  /* text-align: center; */
}
.dishTag li{
  display: inline-block;
  background: white;
  padding: 6px 27px 7px 29px;
  font-size: 12px;
  color: #808080;
  border-radius: 4px;
  margin-right: 9px;
  margin-bottom: 10px;
}
.active{
  background: #FDEBE8 !important;
  color: #EB3B1C !important;
}
</style>