<template>
  <div class="food-map">
    <div @click="showDetail"
         class="card demo-card-header-pic"
         style="border-radius: 12px;box-shadow: 5px 5px 26px rgba(227, 227, 227, 0.5);" :style="canGoPlay==false?'background:rgba(255,255,255,0.6)':'background:rgba(255,255,255,1)'">

          <div class="card-header color-white no-border card-item" style="padding:0px">
            <div style="position: absolute;top: 3%;left: 4%;" v-for="(item, index) in tagsList" :key="index">
              <span v-if="item.flag == '0'">
                <CommonPmt :title='$store.getters.language == "zh_CN"?item.name:item.name2' v-if="dishes.dish_tag_id == item.id"/>
              </span>
              <span v-else>
                <CommonPmt :title='item.name' v-if="dishes.dish_tag_id == item.id"/>
              </span>
            </div>
            <CommonNon v-if="canGoPlay==false" :style="dishes.dish_tag_id == ''?'top:3%':'top: 15%'" style="z-index:99"></CommonNon>
            <div style="position: absolute;right: 2px;bottom: 0;" v-if="dishes.dish_tag == 1201">
              <img src="../style/images/guqing.png" alt="" width="68" v-if="$store.getters.language == 'zh_CN'">
              <img src="../style/images/guqingEN.png" alt="" width="68" v-else>
            </div>
            <img :src="dishes.dish_image" :key="dishes.dish_image" width="100%" height="100%" :style="canGoPlay==false?'opacity:0.6':'opacity:1'" alt :onerror="dishes.weight_spec=='3' ||dishes.weight_spec=='4' ?errorImg02:errorImg01" />
            <!-- <img :src="str" :key="str"  width="100%" height="100%" :style="canGoPlay==false?'opacity:0.6':'opacity:1'"> -->
          </div>
      <div class="card-footer row no-gutter" v-if="salepmt_id == 0" :style="canGoPlay==false?'opacity:0.6':'opacity:1'">
        <div class="col-50">
          <span>
            <b class="font14 color-darkbrown">{{dishes.dish_name}}</b>
          </span>
        </div>
        <div class="col-30">
          <span class="color-lightbrown font18">{{dish_price|price}}</span>
          <!-- <span v-if="dishes.change_set == '1'" class="shijiaDish">{{$t("dish.shijia")}}</span> -->
        </div>

        <div class="col-20 right-style">
          <CommonStepper
                    v-if="dishes.weight_spec == 2"
                    :dishes='dishes'
                    @updateDishNum = "updateDishNum"
                    :canGoPlay="dishes.canGoPlay"
                    :dishId="dishes.dish_id"
                    @addCart="addCart"
                    @delCart="delCart"
                  />
          <CommonStepper v-else :dishes="dishes"
                         :canGoPlay="dishes.canGoPlay"
                         :dishId="dishes.dish_id"
                         @addCart="addCart"
                         @delCart="delCart" 
                         @updateDishNum = "updateDishNum"/>
        </div>
      </div>
      <div class="card-footer row" v-else-if="salepmt_type == 2 && salepmt_id >0">
        <div class="col-50">
          <span style="display: block;">
            <b class="font14 color-darkbrown">{{dishes.dish_name}}</b>
          </span>
          <CommonLabel :title='$t("salespmt.sale")' class="recommCss" style="margin-top: 20px;display: inline-block;"/>
          <span v-if="$store.getters.language == 'zh_CN'"  class="color-purered font12 " style="position: relative;left: 50px;">{{salepmt_price|price}}</span>
          <span v-else  class="color-purered font12 " style="position: relative;left: 55px;">{{salepmt_price|price}}</span>
        </div>
        <div class="col-20">
          <span class="color-lightbrown font18 priceStyle">{{dish_price|price}}</span>
        </div>

        <div class="col-30 right-style">
          <CommonStepper
                    v-if="dishes.weight_spec == 2"
                    :dishes='dishes'
                    :canGoPlay="dishes.canGoPlay"
                    :dishId="dishes.dish_id"
                    @addCart="addCart"
                    @delCart="delCart"
                    @updateDishNum = "updateDishNum"
                  />
          <CommonStepper v-else :dishes="dishes"
          :canGoPlay="dishes.canGoPlay"
                         :dishId="dishes.dish_id"
                         @addCart="addCart"
                         @delCart="delCart" 
                         @updateDishNum = "updateDishNum"/>
        </div>
      </div>
      <div class="card-footer row" v-if="salepmt_type == 3 && salepmt_id >0">
        <div class="col-50">
          <span>
            <b class="font14 color-darkbrown">{{dishes.dish_name}}</b>
          </span>
          <CommonLabel :title='$t("salespmt.saleHalf")' class="recommCss" style="margin-top: 15px;"/>
        </div>
        <div class="col-20">
          <span class="color-lightbrown font18">{{dish_price|price}}</span>
        </div>

        <div class="col-30 right-style">
          <CommonStepper
                    v-if="dishes.weight_spec == 2"
                    :dishes='dishes'
                    :canGoPlay="dishes.canGoPlay"
                    :dishId="dishes.dish_id"
                    @addCart="addCart"
                    @delCart="delCart"
                    @updateDishNum = "updateDishNum"
                  />
          <CommonStepper v-else :dishes="dishes"
          :canGoPlay="dishes.canGoPlay"
                         :dishId="dishes.dish_id"
                         @addCart="addCart"
                         @delCart="delCart" 
                         @updateDishNum = "updateDishNum"/>
        </div>
      </div>
      <div class="card-footer row" v-if="salepmt_type == 4 && salepmt_id >0">
        <div class="col-50">
          <span>
            <b class="font14 color-darkbrown">{{dishes.dish_name}}</b>
          </span>
          <CommonLabel v-if="$store.getters.language == 'zh_CN'"  :title='$t("salespmt.buy")+buy_num+$t("salespmt.zeng")+give_num' class="recommCss" style="margin-top: 15px;"/>
          <CommonLabel v-else-if="$store.getters.language == 'en_US' || $store.getters.language == 'ms_MY'"  :title='$t("salespmt.buy")+(give_num+buy_num)+$t("salespmt.zeng")+buy_num' class="recommCss" style="margin-top: 15px;"/>
        </div>
        <div class="col-20">
          <span class="color-lightbrown font18">{{dish_price|price}}</span>
        </div>

        <div class="col-30 right-style">
          <CommonStepper
                    v-if="dishes.weight_spec == 2"
                    :dishes='dishes'
                    :canGoPlay="dishes.canGoPlay"
                    :dishId="dishes.dish_id"
                    @addCart="addCart"
                    @delCart="delCart"
                    @updateDishNum = "updateDishNum"
                  />
          <CommonStepper v-else :dishes="dishes"
          :canGoPlay="dishes.canGoPlay"
                         :dishId="dishes.dish_id"
                         @addCart="addCart"
                         @delCart="delCart"
                         @updateDishNum = "updateDishNum" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonStepper from "./CommonStepper";
import CommonLabel from './CommonLabel'
import CommonPmt from './CommonPmt'
import CommonNon from './CommonNon'
export default {
  name: "recommitem",
  components: {
    CommonStepper,
    CommonLabel,
    CommonPmt,
    CommonNon
  },
  props: {
    dishes: {
      type: Object,
      default: null
    },
    canGoPlay:{
      type: Boolean,
      default: false
    },
    tagsList:{
      type: Array,
      default:function(){
				return [];
			}
    },
  },

  data () {
    return {
      dish_price: this.dishes.dish_price,
      member_price: this.dishes.member_price,
      salepmt_price:this.dishes.salepmt_price,
      salepmt_type:this.dishes.salepmt_type,
      salepmt_id:this.dishes.salepmt_id,
      special: null,
      give_num: this.dishes.give_num,
      buy_num: this.dishes.buy_num,
      special_id:0,
      errorImg01:'this.onerror=null;this.src="' + require('../style/images/defaultImg1.png') + '"',
      errorImg02:'this.onerror=null;this.src="' + require('../style/images/defaultImg5.png') + '"',
      str:''
    };
  },
  computed: {

  },
  methods: {
    showDetail () {
      this.$emit("showFoodDetail", this.dishes);
    },
    addCart () {
      this.$emit(
        "addCart",
        this.dishes,
        this.dish_price,
        this.member_price,
        this.salepmt_price,
        true
      );
    },
    updateDishNum(value) {
      this.$emit("updateDishNum", value,this.dishes);
    },
    delCart () {
      this.$emit("delCart", this.dishes);
    },
  },
  created () {
    this.str = this.dishes.dish_image;

    this.str = this.str.replace(/default_dish/g, '\default_suit');     
    //如果规格不为空 从规格读取价格
    if (this.dishes.weight_spec == "2" && this.dishes.spec_detail) {
      var specials = JSON.parse(this.dishes.spec_detail);
      this.special = specials[0];
      if (this.special) {
        this.dish_price = this.special.spec_price;
        this.member_price = this.special.member_price;
        this.salepmt_price = this.special.salepmt_price;
        this.salepmt_type = this.special.salepmt_type;
        this.salepmt_id = this.special.salepmt_id;
        this.salepmt_bg_flag = this.special.salepmt_bg_flag;
        this.special_id = this.special.id;
        
      this.give_num=this.special.give_num
      this.buy_num= this.special.buy_num
      }

    }
  }
};
</script>
<style>
.card-header {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 222px;
  border-radius: 12px 12px 0px 0px;
}
.recommCss .tag-horizontal{
  margin-left: 10px;
  margin-top: -13px;
  display: inline-block;
}
.shijiaDish{
  font-size: 10px;
  border: 1px #D8D8D8 solid;
  border-radius: 4px;
  padding: 0 3px;
  transform: scale(0.83);
  display: inline-block;
  color: #808080;
}
</style>