<!--新品上市——菜品切换 -->

<template>
  <div class="list-block media-list inset"
       @click="showDetail"
       style="margin:10px">
    <ul>
      <li class="row"
          style="height:86px">
        <div class="col-30"
             style="height:100%" :style="canGoPlay==false?'opacity:0.6':'opacity:1'">
             <div style="position: absolute;top: 3%;left: 4%;" v-for="(item, index) in tagsList" :key="index">
              <span v-if="item.flag == '0'">
                <CommonPmt :title='$store.getters.language == "zh_CN"?item.name:item.name2' v-if="dishes.dish_tag_id == item.id"/>
              </span>
              <span v-else>
                <CommonPmt :title='item.name' v-if="dishes.dish_tag_id == item.id"/>
              </span>
            </div>
        <div style="position: absolute;right: 45px;top: 8px;" v-if="dishes.dish_tag == 1201">
          <img src="../style/images/guqing.png" alt="" width="68" v-if="$store.getters.language == 'zh_CN'">
          <img src="../style/images/guqingEN.png" alt="" width="68" v-else>
        </div>
          <img :src="dishes.dish_image" :key="dishes.dish_image"
          :onerror="dishes.weight_spec=='3' ||dishes.weight_spec=='4' ?errorImg02:errorImg01"
               width="100%"
               style="border-radius: 5px 0 0 5px;height:100%" />
        </div>
        <div class="col-70" v-if="salepmt_id == 0 || dishtag >0" >
          <div class="item-inner row"
               style>
            <div class="col-100">
              <div class="row">
                <div class="col-100">
                  <div class="item-title-row">
                    <div class="item-title font14" style="color: #6d6d72; font-weight:bold">
                      <div class="right10 dishName" style="display:inline-block" :style="canGoPlay==false?'opacity:0.6':'opacity:1'">{{dishes.dish_name}}</div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-100 top5" :style="canGoPlay==false?'opacity:0.6':'opacity:1'">
              <div class="row">
                <div class="col-100" v-show="member_price >=0">
                  <img src="../style/images/vipTag.png" alt="" width="24">
                  <span
                  style="position: relative;top: -2px;"
                    class="color-purered font10 left5"
                  >{{member_price|price}}</span>
                </div>
                <div class="col-50">
                  <span class="color-lightbrown font14">{{dish_price|price}}</span>
                </div>
                <div class="col-100 right-style font12" style="position: relative;" :style="member_price >=0?'top: -20px;':''">
                  <CommonNon v-if="canGoPlay==false" style="color:white;position:relative;display:inline-block;left:-10px;top:5px" ></CommonNon>
                  <CommonStepper v-if="dishes.weight_spec == 2"
                  :txtAdd='$t("add")'
                  :dishes='dishes'
                  :canGoPlay="dishes.canGoPlay"
                  :dishId="dishes.dish_id"
                  @addCart="addCart"
                  @delCart="delCart"
                  style="display:inline-block"
                />
                  <CommonStepper v-else :dishes='dishes'
                  :canGoPlay="dishes.canGoPlay"
                                 :dishId="dishes.dish_id"
                                 @addCart="addCart"
                                 @delCart="delCart"
                                 style="display:inline-block" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-70" v-if="salepmt_type == 2  &&  dishtag == 0" >
          <div class="item-inner row"
               style>
            <div class="col-100">
              <div class="row">
                <div class="col-100">
                  <div class="item-title-row">
                    <div class="item-title font14 " :style="canGoPlay==false?'opacity:0.6':'opacity:1'">
                      <div class="right10 dishName" style="display:inline-block;color: #6d6d72; font-weight:bold" :style="canGoPlay==false?'opacity:0.6':'opacity:1'">{{dishes.dish_name}}</div>
                      <span v-if="dishes.weight_spec == '2'" class="right10" style="color:#808080" :style="canGoPlay==false?'opacity:0.6':'opacity:1'">{{spec_unit}}</span>
                     </div>
                  </div>
                </div>
                <div class="col-100" :style="canGoPlay==false?'opacity:0.6':'opacity:1'">
                  <CommonLabel  :title='$t("salespmt.sale")' class="left10 top5"/>
                  <span v-if="$store.getters.language == 'en_US' || $store.getters.language == 'ms_MY'" class="font12 fontWeight" style="color:#EB3C1C;position: absolute;left: 68px;top: 35%;">{{salepmt_price|price}}</span>
                  <span v-else-if="$store.getters.language == 'zh_CN'" class="font12 fontWeight" style="color:#EB3C1C;position: absolute;left: 55px;top: 35%;">{{salepmt_price|price}}</span>
                </div>
              </div>
            </div>
            <div class="col-100 top20" :style="canGoPlay==false?'opacity:0.6':'opacity:1'">
              <div class="row">
                <div class="col-50">
                  <span class=" font14 priceStyle" style="color:808080">{{dish_price|price}}</span>
                </div>
                <div class="col-100 right-style font12" style="position: relative;top: -20px;">
                  <CommonNon v-if="canGoPlay==false" style="color:white;position:relative;display:inline-block;left:-10px;top:5px" ></CommonNon>
                  <CommonStepper v-if="dishes.weight_spec == 2"
                  :txtAdd='$t("add")'
                  :dishes='dishes'
                  :canGoPlay="dishes.canGoPlay"
                  :dishId="special_id"
                  @addCart="addCart"
                  @delCart="delCart"
                  style="display:inline-block"
                />
                  <CommonStepper v-else :dishes='dishes'
                  :canGoPlay="dishes.canGoPlay"
                                 :dishId="dishes.dish_id"
                                 @addCart="addCart"
                                 @delCart="delCart" 
                                 style="display:inline-block"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-70" v-if="salepmt_type == 3 && dishtag == 0" >
          <div class="item-inner row"
               style>
            <div class="col-100">
              <div class="row">
                <div class="col-100">
                  <div class="item-title-row">
                    <div class="item-title font14">
                        <div class="right10 dishName" style="display:inline-block;color: #6d6d72; font-weight:bold" :style="canGoPlay==false?'opacity:0.6':'opacity:1'">{{dishes.dish_name}}</div>
                      <span v-if="dishes.weight_spec == '2'" class="right10" style="color:#808080" :style="canGoPlay==false?'opacity:0.6':'opacity:1'">{{spec_unit}}</span>
                         </div>
                  </div>
                </div>
                <div class="col-100" :style="canGoPlay==false?'opacity:0.6':'opacity:1'">
                  <CommonLabel :title='$t("salespmt.saleHalf")' class="left10 top5"/>
                   <span v-if="$store.getters.language == 'en_US' || $store.getters.language == 'ms_MY'" class="font12 fontWeight" style="color:#EB3C1C;position: absolute;left: 90px;top: 35%;">{{salepmt_price|price}}</span>
                  <span v-else-if="$store.getters.language == 'zh_CN'" class="font12 fontWeight" style="color:#EB3C1C;position: absolute;left: 90px;top: 35%;">{{salepmt_price|price}}</span>
                </div>
              </div>
            </div>
            <div class="col-100 top20" :style="canGoPlay==false?'opacity:0.6':'opacity:1'">
              <div class="row">
                <div class="col-50">
                  <span class="color-lightbrown font14">{{dish_price|price}}</span>
                </div>
                <div class="col-100 right-style font12" style="position: relative;top: -20px;">
                  <CommonNon v-if="canGoPlay==false" style="color:white;position:relative;display:inline-block;left:-10px;top:5px" ></CommonNon>
                  <CommonStepper v-if="dishes.weight_spec == 2"
                  :txtAdd='$t("add")'
                  :dishes='dishes'
                  :canGoPlay="dishes.canGoPlay"
                  :dishId="special_id"
                  @addCart="addCart"
                  @delCart="delCart"
                  style="display:inline-block"
                />
                  <CommonStepper v-else :dishes='dishes'
                  :canGoPlay="dishes.canGoPlay"
                                 :dishId="dishes.dish_id"
                                 @addCart="addCart"
                                 @delCart="delCart" 
                                 style="display:inline-block"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-70" v-if="salepmt_type == 4  && dishtag == 0" >
          <div class="item-inner row"
               style>
            <div class="col-100">
              <div class="row">
                <div class="col-100">
                  <div class="item-title-row">
                    <div class="item-title font14">
                         <div class="right10 dishName" style="display:inline-block;color: #6d6d72; font-weight:bold" :style="canGoPlay==false?'opacity:0.6':'opacity:1'">{{dishes.dish_name}}</div>
                      <span v-if="dishes.weight_spec == '2'" class="right10" style="color:#808080" :style="canGoPlay==false?'opacity:0.6':'opacity:1'">{{spec_unit}}</span>
                      </div> 
                  </div>
                </div>
                <div class="col-100" :style="canGoPlay==false?'opacity:0.6':'opacity:1'">
                  <!-- <CommonLabel :title='$t("salespmt.saleBuy")'/> -->
                  <CommonLabel  class="left10 top5" v-if="$store.getters.language == 'zh_CN'"  :title='$t("salespmt.buy")+buy_num+$t("salespmt.zeng")+give_num'/>
                  <CommonLabel  class="left10 top5" v-else-if="$store.getters.language == 'en_US' || $store.getters.language == 'ms_MY'"  :title='$t("salespmt.buy")+(give_num+buy_num)+$t("salespmt.zeng")+buy_num'/>
                </div>
              </div>
            </div>
            <div class="col-100 top20" :style="canGoPlay==false?'opacity:0.6':'opacity:1'">
              <div class="row">
                <div class="col-50">
                  <span class="color-lightbrown font14">
                    {{dish_price|price}}
                    
                  </span>
                </div>
                <div class="col-100 right-style font12" style="position: relative;top: -20px;">
                  <CommonNon v-if="canGoPlay==false" style="color:white;position:relative;display:inline-block;left:-10px;top:5px" ></CommonNon>
                  <CommonStepper v-if="dishes.weight_spec == 2"
                  :txtAdd='$t("add")'
                  :dishes='dishes'
                  :canGoPlay="dishes.canGoPlay"
                  :dishId="special_id"
                  @addCart="addCart"
                  @delCart="delCart"
                  style="display:inline-block"
                />
                  <CommonStepper v-else :dishes='dishes'
                  :canGoPlay="dishes.canGoPlay"
                                 :dishId="dishes.dish_id"
                                 @addCart="addCart"
                                 @delCart="delCart"
                                 style="display:inline-block" />
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
import CommonStepper from "./CommonStepper";
import CommonLabel from "./CommonLabel"
import CommonPmt from "./CommonPmt"
import CommonNon from "./CommonNon"
export default {
  name: "recommitem1",
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
    dishtag:{
      type: Number,
      default: 0
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
      salepmt_type: this.dishes.salepmt_type, //0：满减券，1:整单折扣，2：特价菜，3：第n份优惠，4：买赠
      dish_price: this.dishes.dish_price,
      member_price: this.dishes.member_price,
      salepmt_price: this.dishes.salepmt_price,
      salepmt_bg_flag:this.dishes.salepmt_bg_flag,//买赠优惠，0：属于买类别，1：属于赠送类别
      salepmt_id:this.dishes.salepmt_id,
      special: null,
      give_num: this.dishes.give_num,
      buy_num: this.dishes.buy_num,
      special_id:0,
      spec_unit:'',
       errorImg01:'this.onerror=null;this.src="' + require('../style/images/defaultImg.png') + '"',
      errorImg02:'this.onerror=null;this.src="' + require('../style/images/defaultImg5.png') + '"'
    };
  },
  computed: {
    getDishNum (dish_id) {
      return function (dish_id) {
        return this.$store.getters.dishNums[dish_id] | 0;
      };
    }
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
    delCart () {
      this.$emit("delCart", this.dishes);
    }
  },
  created () {
    //如果规格不为空 从规格读取价格
    if (this.dishes.weight_spec == "2" && this.dishes.spec_detail) {
      var specials = JSON.parse(this.dishes.spec_detail);
      this.special = specials[0];
      if (this.special) {
        this.dish_price = this.special.spec_price;
        this.member_price = this.special.member_price;
        this.salepmt_price = this.special.salepmt_price;
        this.salepmt_type = this.special.salepmt_type;
        this.salepmt_bg_flag = this.special.salepmt_bg_flag;
        this.salepmt_id = this.special.salepmt_id;
        this.special_id = this.special.id;
        this.give_num=this.special.give_num
        this.buy_num= this.special.buy_num
        this.spec_unit = this.special.spec_unit
        
      }
    }
  }
};
</script>
<style scoped>
.dishName{
  /* width: 80%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden; */
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