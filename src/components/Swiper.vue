<template>
  <div class="list-block contacts-block inset bg-white top10 swiperPage"
       style="padding: 10px 16px 20px 16px;margin-bottom: 20px;margin:12px">
    <p class="center color-darkbrown font14"
       style="font-weight: bold;padding-bottom:10px">{{$t('lotsDish')}}</p>

    <van-swipe style="height:140px;border-radius: initial"
               class="van-swipe" indicator-color="#EB3B1C">
      <van-swipe-item style="height:100%"
                      v-for="(item, index) in datas"
                      :key="index">
        <div class="row"
             style="height:100%;margin-right:10px">
          <div class="col-33"
               :key="index"
               v-for="(data, index) in item"
               style="height:100%;text-align:center;"
               @click="swipeClick(data)">
            <img v-lazy="data.dish_image" :key="data.dish_image"
            :onerror="data.weight_spec=='-1'?errorImg02:data.weight_spec=='3'|| data.weight_spec=='4'?errorImg03:errorImg01"
                 width="100%"
                 style="border-radius:5px" />
            <div class="font12 color-darkbrown top5" style="width:100%;text-align: justify;word-break: break-all;">{{data.dish_name}}</div>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
    <!-- 固定套餐详情 -->
    <van-popup
      :overlay="true"
      :style="{height:'100%',width:'100%',padding:'0'}"
      v-model="isShowFixedFoodDetail"
      get-container="#app"
      >
        <FoodFixedDetail
            v-if="isShowFixedFoodDetail"
            :dishes="curentDishes"
            @addCart="addCart"
            @delCart="delCart"
        ></FoodFixedDetail>
        <img
          src="../style/images/backimg.png"
          class="closeImg2"
          @click="isShowFixedFoodDetail=false"
          width="30"
          height="30"
        />
    </van-popup>
    <!-- 自选套餐详情 -->
    <van-popup
      :overlay="true"
      :style="{height:'100%',width:'100%',padding:'0'}"
      v-model="isShowFoodOptionalDetail"
      get-container="#app"
      >
        <FoodOptionalDetail
            v-if="isShowFoodOptionalDetail"
            :dishes="curentDishes"
            @addCart="addCart"
            @delCart="delCart"
        ></FoodOptionalDetail>
        <img
          src="../style/images/backimg.png"
          class="closeImg2"
          @click="isShowFoodOptionalDetail=false"
          width="30"
          height="30"
        />
    </van-popup>
    <!-- 菜品详情 -->
    <van-popup v-model="isShowFoodDetail"
               get-container="#app"
               @close="dismissFoodDetail">
      <div class="popupcontent">
        <div class="fooddetail">
          <FoodDetail v-if="isShowFoodDetail"
                      :dishes="curentDishes"
                      @addCart="addCart"
                      @delCart="delCart"
                      :specialValue="specialValue"
                      @onSpecialItemClick="onSpecialItemClick"
                      @onTagItemClick="onTagItemClick"
                      @onSelectItemClick="onSelectItemClick"></FoodDetail>
        </div>
        <img src="../style/images/close.png"
             class="closeImg"
             @click="isShowFoodDetail=false"
             width="32" />
      </div>
    </van-popup>
  </div>
</template>
<script>
//http请求
// import {
//   request
// } from '../utils/http'
// 弹出菜品详情
import FoodDetail from "./FoodDetail";
// 弹出固定套餐详情
import FoodFixedDetail from "./FoodFixedDetail";
//  弹出自选套餐详情
import FoodOptionalDetail from "./FoodOptionalDetail";

export default {
  components: {
    FoodDetail,
    FoodFixedDetail,
    FoodOptionalDetail,
  },
  name: "swiper",
  computed: {
    curentStore () {
      return this.$store.getters.curentStore;
    }
  },
  props: {
    datas: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      isShowFoodDetail: false,
      isShowFixedFoodDetail:false,//是否展示固定套餐菜品详情
      isShowFoodOptionalDetail:false,//是否展示自选套餐菜品详情
      curentDishes: null,
      special: null,
      charactor: [],
      selectArray: null,
      optional_dish:[],
      specialValue: null,
      errorImg01:'this.onerror=null;this.src="' + require('../style/images/defaultImg1.png') + '"',
      errorImg02:'this.onerror=null;this.src="' + require('../style/images/defaultImg2.png') + '"',
      errorImg03:'this.onerror=null;this.src="' + require('../style/images/defaultImg5.png') + '"',
    };
  },
  methods: {
    getData () {
      var allArr = [];
      var j = 0;
      var arr = [];
      return allArr;
    },
    swipeClick (data) {
      if (data.weight_spec == "3") {
        this.isShowFixedFoodDetail = true;
      } else if(data.weight_spec == "4") {
         this.isShowFoodOptionalDetail = true;
      }else{
         this.isShowFoodDetail = true;
      }
      this.curentDishes = data;

      if (
        this.curentDishes.weight_spec == "2" &&
        this.curentDishes.spec_detail
      ) {
        var specialList = JSON.parse(this.curentDishes.spec_detail);
        this.special = specialList[0];
      } else {
        this.special = null;
      }
    },
    onSpecialItemClick (special) {
      this.special = special;
    },
    onTagItemClick (charactor) {
      this.charactor = charactor;
    },
    onSelectItemClick (selectArray) {
      this.selectArray = selectArray;
    },
    addCart (dishes, dish_price, member_price, showDetail, weight,specialValue) {
      this.isShowFoodDetail = false;
      this.isShowFixedFoodDetail = false;
      this.isShowFoodOptionalDetail = false;
      var id = dishes.dish_id;
      this.optional_dish = dishes.optional_list;
      this.addDish(dishes, weight,specialValue);
    },
    addDish (dishes, weight,specialValue) {
      var map = {};
      if (dishes.weight_spec == "2") {
        if (this.special) {
          map["spec_detail"] = JSON.stringify(this.special);
        }
      } else if (dishes.weight_spec == "1") {
        map["spec_detail"] = specialValue;
      }
      if (this.charactor) {
        map["taste_set"] = this.charactor;
      }
      if (this.selectArray) {
        map["dish_additional"] = this.selectArray;
      }
      if (dishes.weight_spec == "4") {
        if(this.optional_dish){
          map["optional_detail"] = this.optional_dish;
        }
      }

      let id = dishes.dish_id;
      let data = {
        dep_id: this.curentStore.dep_id,
        company_id: this.curentStore.company_id,
        param: this.curentStore.tb_id, //桌子id
        str_param: id, //菜品id
        param2: 1, //菜品数量
        map: map
      };
      // alert(JSON.stringify(data))
      let that = this;
      var num = this.getDishNum(id);

      this.request.addDish(data, function (res) {
        if (res.code == "101") {
          that.$emit("addSuccessClick");
          that.stringutils.setDishNum(id, ++num)
          that.updateDishCartId(id, res.msg);
          // that.reload(dishType)
          that.toast.success(that.$t("addShopcart"));
          // that.isShowFoodDetail = false
        } else {
          that.toast.fail(res.msg);
        }
      });
    },
    updateDishCartId (id, cart_id) {
      for (let i in this.datas) {
        for (let j in this.datas[i]) {
          if (this.datas[i][j].dish_id == id) {
            this.datas[i][j].cart_id = cart_id;
          }
        }
      }
    },
    dismissFoodDetail () {
      this.charactor = null;
      this.special = null;
      this.selectArray = null;
      this.optional_dish=[];
    },
    getDishNum (dish_id) {
      return this.$store.getters.dishNums[dish_id] | 0;
    },
    getShowSpecial(dishes) {
      //判断是否展示规格
         return (
        dishes.weight_spec == "2" || dishes.weight_spec == "4" ||
        dishes.taste_set || ( dishes.dishAdditionalSimpleVOList != null || dishes.dishAdditionalSimpleVOList.length > 0)||dishes.weight_spec == "1"
      );
     
    },
    delCart (dishes) {
      this.isShowSpecial = this.getShowSpecial(dishes);
      if (this.isShowSpecial) {
        this.toast.info(this.$t("setShopcart"));
        return;
      }

      this.lessDish(dishes);
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
          that.$emit("addSuccessClick");
          that.stringutils.setDishNum(info.dish_id, --num)
        } else {
          that.toast.fail(res.msg);
        }
      });
    }
  },
  created () { 
    if(this.dishes){
      if (this.dishes.weight_spec == "1") {
        
        this.specialValue = this.dishes.spec_detail;
        alert(this.specialValue)
      }
    }
  }
};
</script>

<style scoped>
.row{
  justify-content: flex-start !important;
  margin-right: 0;
}
.row .col-33{
  margin-left: 10px;
}
.van-swipe img {
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 90px;
}

.card-header {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 222px;
  border-radius: 12px 12px 0px 0px;
}

.inset ul {
  clear: both;
}
.clear-button {
  float: right;
  position: relative;
  top: 13px;
  right: 10px;
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

.botom {
  height: 55px;
  position: absolute;
  bottom: 0;
}

.clearFloat {
  clear: both;
}

.liItem {
  width: 50%;
  float: left;
}
.closeImg2{
  position: absolute;
  top: 10px;
  left: 18px;
  z-index: 99999;
}
</style>
