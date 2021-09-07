<!-- 固定套餐详情-->
<template>
    <div id="cardContainer">
        <div class="card-picture">
            <img :src="dishes.dish_image" :key="dishes.dish_image" alt :onerror="errorImg01" />
        </div>
        <div class="card-introduce">
            <div class="card-title">
                <span>
                    <b class="font16">{{dishes.dish_name}}</b>&nbsp;&nbsp;&nbsp;
                </span>
                <!-- 非可售时间 -->
                <CommonNon v-if="canGoPlay == false" style="color:white;position:relative;display:inline-block;left:0"></CommonNon>
            </div>                    
            <div class="row">
                <div class="col-60 card-price">
                    <div class="price1">{{dishes.dish_price|price}}</div>
                </div>
                <div class="col-40 top20">
                    <CommonStepper
                    :canGoPlay="canGoPlay"
                    v-if="dishes.weight_spec == 2"
                    :dishes='dishes'
                    :dishId="special_id"
                    @addCart="addCart"
                    @delCart="delCart"
                  />
                  <CommonStepper
                    v-else
                    :canGoPlay="canGoPlay"
                    :dishes='dishes'
                    :dishId="dishes.dish_id"
                    @addCart="addCart"
                    @delCart="delCart"
                  />
                </div>
            </div>
        </div>
        <div class="card-listbox">
            <div class="title">{{$t('dish.baohan')}}</div>
            <ul class="dishes-items">
                <li class="row" v-for="(item,index) in dishes.suits_list" :key="index">
                    <div class="col-80 dishes-fl">
                        <div class="dishes-pic">
                            <img v-lazy="item.dish_image" :key="item.dish_image" alt />
                        </div>
                        <div class="dishes-explain">
                            <b>{{item.dish_name}}</b>
                            <span>{{item.spec_name}}</span>
                        </div>
                    </div>
                    <div class="col-20 dishes-fr" v-if="item.weight_spec == '1'">{{item.spec_detail}} {{item.unit_type}}</div>
                     <div class="col-20 dishes-fr" v-else>{{item.buy_number}}</div>
                </li>
            </ul>
            <div class="row">
                <div class="col-100 font10 top10" v-if="dishes.sell_state == 1">
                    <span style="color:#505050">{{$t("dish.sellTime")}}：</span>
                    <span style="color:#808080">
                        <span>{{dishes.sell_date[0] | moment}}-{{dishes.sell_date[1] | moment}}，</span>
                        <span>{{showStrDate}}，</span>
                        <span>{{dishes.sell_time_start}}-{{dishes.sell_time_end}}</span>
                    </span>
                    </div>
            </div>
            <div class="title top10">{{$t('dishDetail')}}：</div>
            <div class="describe">{{dishes.dish_note}}</div>
        </div>
    </div>
</template>
<script>
import CommonStepper from "./CommonStepper";
import CommonNon from "./CommonNon"
export default {
    name: "FoodFixedDetail",
    components: {
        CommonStepper,
        CommonNon
    },
computed: {
    getDishNum(dish_id) {
      return function(dish_id) {
        return this.$store.getters.dishNums[dish_id] | 0;
      };
    },
    language: {
      get() {
        return this.$store.getters.language;
      }
    }
  },
  props: {
    dishes: {
      type: Object,
      default: null
    }
  },
  
  data() {
    return {
      dish_price: 0,
      member_price: 0,
      showStrDate:'',
      canGoPlay:false,
      errorImg01:'this.onerror=null;this.src="' + require('../style/images/defaultImg4.png') + '"'
    };
  },
  methods: {
    addCart() {
      this.$emit(
        "addCart",
        this.dishes,
        this.dish_price,
        this.member_price,
        false,
       
      );
    },
    delCart() {
      this.$emit("delCart", this.dishes);
    },
    
    
   
  },

  created() {
if(this.dishes.sell_date != "")
    {
    var CurrentTime = new Date();
    var startTime = new Date(this.dishes.sell_date[0]);
    var endTime = new Date(this.dishes.sell_date[1]);
    var year=CurrentTime.getFullYear();
    var month=CurrentTime.getMonth()+1;
                   var day=CurrentTime.getDay();
                    var hours=CurrentTime.getHours();
                    var minutes=CurrentTime.getMinutes();
    var index = 0
    var dataArry =  this.dishes.sell_week.replace(/[^0-9]/ig, "");
    var arryDate={"1":"周一","2":"周二","3":"周三","4":"周四","5":"周五","6":"周六","0":"周日"}
    
    for(index = 0;index < this.dishes.sell_week.length -1 ;index++)
    {
    this.showStrDate = this.showStrDate + arryDate[this.dishes.sell_week[index]]+"，";
    
    if( this.dishes.sell_week[index] == day){
this.canGoPlay = true;
    }
    }

    if( this.dishes.sell_week[index] == day){
this.canGoPlay = true;
    }
    this.showStrDate = this.showStrDate + arryDate[ this.dishes.sell_week[index] ];

    if(CurrentTime.getTime()<startTime.getTime() || CurrentTime.getTime() > endTime.getTime())
    {
      this.canGoPlay = false;
    }
    var currCalT = hours*100+minutes;
    var startCalT =  this.dishes.sell_time_start.replace(/[^0-9]/ig, "")*1;
    var endCalT = this.dishes.sell_time_end.replace(/[^0-9]/ig, "")*1;
    if(currCalT < startCalT || currCalT > endCalT)
    {
      this.canGoPlay = false;
    }
    }
    else{

      this.canGoPlay = true;
    }
  },
  watch: {
 
  },
};
</script>

<style scoped>
*,
*:before,
*::after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -o-box-sizing: border-box;
    box-sizing: border-box;
}
#cardContainer {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background: #fff;
}
.card-picture {
    width: 100%;
    height: 196px;
    overflow: hidden;
}
.card-picture img {
    display: block;
    width: 100%;
    height: 100%;
}

.card-introduce {
    border-bottom: 1px solid #eff1f2;
    padding: 15px 18px 20px 18px;
}
.card-title {
    font-size: 16px;
    color: #505050;
}
.card-price .price1 {
    margin-top: 10px;
    font-size: 21px;
    color: #f46f24;
    font-weight: bold;
}
.card-price .price2 {
    margin-top: 10px;
    font-size: 12px;
    font-weight: 400;
    color: #505050;
}
.card-price em {
    font-style: normal;
    padding-left: 6px;
}
.card-listbox {
    padding: 18px 0 18px 18px;
    overflow: hidden;
}
.card-listbox .title {
    font-size: 14px;
    color: #333;
}
.dishes-items li {
    width: 100%;
    height: auto;
    margin-top: 5px;
    padding: 10px 18px 10px 0;
    border-bottom: 1px solid #eff1f2;
    overflow: hidden;
}
.dishes-items li:last-child {
    border: none;
}
.dishes-fl .dishes-pic {
    float: left;
    width: 50px;
    height: 50px;
    border-radius: 5px;
    overflow: hidden;
}
.dishes-fl .dishes-pic img {
    display: block;
    width: 100%;
    height: 100%;
}
.dishes-fl .dishes-explain {
    float: left;
    margin-left: 15px;
}
.dishes-fl .dishes-explain b {
    font-size: 14px;
    color: #505050;
}
.dishes-fl .dishes-explain span {
    display: block;
    font-size: 12px;
    margin-top: 10px;
    color: #808080;
}
.dishes-fr {
    text-align: right;
    font-size: 12px;
    color: #808080;
    margin-top: 18px;
}
.describe {
    padding-right: 18px;
    margin-top: 10px;
    color: #808080;
    font-size: 12px;
    line-height: 17px;
}
</style>