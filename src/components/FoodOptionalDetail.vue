<!-- 自选套餐详情-->
<template>
    <div id="cardContainer">
        <div class="card-picture">
            <img   :src="dishes.dish_image" :key="dishes.dish_image" alt :onerror="errorImg01"/>
        </div>
        <div class="card-introduce">
            <span>
                 <b class="font16">{{dishes.dish_name}}</b>&nbsp;&nbsp;&nbsp;
            </span>
            <!-- 非可售时间 -->
             <CommonNon v-if="canGoPlay == false" style="color:white;position:relative;display:inline-block;left:0"></CommonNon>
            <div class="card-price row">
                <div class="price1 col-100">{{dishes.dish_price|price}}</div>
            </div>
        </div>
        <div class="card-listbox">
            <div class="title">{{$t('dish.bixuan')}}</div>
            <ul class="dishes-items">
                <li class="row" v-for="(item,index) in dishes.suits_list" :key="index">
                    <div class="col-80 dishes-fl">
                        <div class="dishes-pic">
                            <img v-lazy="item.dish_image" :key="item.dish_image"  alt />
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
            <div class="title top15">{{$t('dish.zixuan')}}</div>
            <div class="top5" v-for="(items,i) in dishes.optional_list" :key="i">
                <div class="dishes-choice">
                    <b>{{items.group_name}}</b>
                    <span>{{items.dishes.length}}&nbsp;{{$t('dish.xuan')}}&nbsp;{{items.max_count}}</span>
                </div>
                <ul class="dishes-items">
                    <li class="row" v-for="(item,index) in dishes.optional_list[i].dishes" :key="index">
                        <div class="col-80 dishes-fl">
                            <div class="dishes-pic">
                                <img v-lazy="item.dish_image" :key="item.dish_image" alt />
                            </div>
                            <div class="dishes-explain">
                                <b>{{item.dish_name}}</b>
                                <span>{{item.spec_name}}</span>
                            </div>
                        </div>
                        <div class="col-20 dishes-fr">
                            <div class="commonstepper" style="display: inline-flex;float: right;text-align: center;" v-if="items.re_select==0">
                                <img
                                    v-show="item.buy_number>0"
                                    src="../style/images/less.png"
                                    alt
                                    width="24"
                                    height="24"
                                    @click.stop="decrement(index,item,items,i)"
                                />
                                <span
                                    style="margin: auto 3px;display: inline-block;"
                                    v-show="item.buy_number>0"
                                > {{item.buy_number>items.max_count?items.max_count:item.buy_number}}</span> 
                                
                                <img src="../style/images/add.png" 
                                    alt
                                    width="24"
                                    height="24"
                                    @click.stop="increment(index,item,items,i)" 
                                    v-show="shortof_countMax[i]!== 0&&item.buy_number==0"
                                    
                                />
                                <img src="../style/images/gray.png" 
                                    alt
                                    width="24"
                                    height="24"
                                    v-show="shortof_countMax[i]== 0 || items.re_select==0&&item.buy_number==1" 
                                />
                            </div>
                            <div
                              v-else
                              class="commonstepper" style="display: inline-flex;float: right;text-align: center;"
                              >
                                <img
                                    v-show="item.buy_number>0"
                                    src="../style/images/less.png"
                                    alt
                                    width="24"
                                    height="24"
                                    @click.stop="decrement(index,item,items,i)"
                                />
                                <span
                                    style="margin: auto 3px;display: inline-block;"
                                    v-show="item.buy_number>0"
                                > {{item.buy_number>items.max_count?items.max_count:item.buy_number}}</span> 
                                
                                <img src="../style/images/add.png" 
                                    alt
                                    width="24"
                                    height="24"
                                    @click.stop="increment(index,item,items,i)" 
                                    v-show="shortof_countMax[i]!== 0"
                                    
                                />
                                <img src="../style/images/gray.png" 
                                    alt
                                    width="24"
                                    height="24"
                                    v-show="shortof_countMax[i]== 0" 
                                />
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
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
        <!-- 加购 -->
        <div class="dishes-addbox row">
            <div class="dishes-numTxt" v-if="$store.getters.language == 'zh_CN'" :class="[shortof_counts== 0 ? '': 'light']">还差<em>{{shortof_counts}}</em>份未选</div>
            <div class="dishes-numTxt" v-else-if="$store.getters.language == 'en_US' || $store.getters.language == 'ms_MY'" :class="[shortof_counts== 0 ? '': 'light']"> <span class="font16 fontWeight">{{shortof_counts}}</span>&nbsp;{{$t('dish.maxfen')}}</div>
            <!-- canGoPlay：true:不在可售时间内灰掉 -->
            <button  class="dishes-addBtn" :class="[shortof_counts== 0 && canGoPlay == true? 'light': '']" @click="addCart" >{{$t('add')}}</button>
        </div>
    </div>
</template>
<script>
import CommonNon from "../components/CommonNon"
export default {
    name: "FoodOptionalDetail",
    components: {
        CommonNon
    },
    props: {
        dishes: {
            type: Object,
            default: null
        },
       
        dishId: {
            default: 0
        }
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
    data() {
        return {
            dish_price: 0,
            member_price: 0,
            //还差几份未选  
            shortof_counts: 0,
            //group中还差几份未选  
            shortof_countMax: [],
            //当前group中选择了几份
            shortof_count:[],
            showStrDate:'',
            canGoPlay:false,
            errorImg01:'this.onerror=null;this.src="' + require('../style/images/defaultImg4.png') + '"'
        };
    },
    methods: {
        increment(index,item,items,groupCount) {
            //购买份数buy_number，默认0
            item.buy_number++;
            this.shortof_count[groupCount]++;
            this.shortof_counts--;
            this.shortof_countMax[groupCount]--;
            // console.log(item);
            console.log(items)
            // console.log("在增加"+ item.buy_number)
            
        },
        decrement(index,item,items,groupCount) {
            item.buy_number--;
            this.shortof_count[groupCount]--;
            this.shortof_counts++;
            this.shortof_countMax[groupCount]++;
            // console.log(item);
            console.log(items)
            // console.log("在逐减"+item.buy_number);
        },
        
        //加购
        addCart(){
            if (this.shortof_counts === 0) {
                this.$emit(
                    "addCart",
                    this.dishes,
                    this.dish_price,
                    this.member_price,
                    false,
            
                );
               
            } else {
                return false;
            }
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
        window.scroll(function(){
            document.getElementsByClassName("dishes-addbox").css({top: window.innerHeight + window.scrollY - document.getElementsByClassName("dishes-addbox").outerHeight() })
        })
        //初始化多少份未选与选购
        for(let i in this.dishes.optional_list){
            this.shortof_counts += Number(this.dishes.optional_list[i].max_count);
            this.shortof_count[i] = 0;
            this.shortof_countMax[i] = Number(this.dishes.optional_list[i].max_count);
            for (let j in this.dishes.optional_list[i].dishes) {
                this.dishes.optional_list[i].dishes[j].buy_number=0;
                
            }
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
#cardContainer{
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: #fff;
  padding-bottom: 80px;
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

.card-introduce{
    border-bottom: 1px solid #EFF1F2;
    padding: 15px 18px 20px 18px;
}
.card-title{
    font-size: 16px;
    color: #505050;
}
.card-price .price1{
    margin-top: 10px;
    font-size: 21px;
    color: #F46F24;
    font-weight: bold;
}
.card-price .price2{
    text-align: right;
    margin-top: 10px;
    font-size: 12px;
    font-weight: 400;
    color: #505050;
}
.card-price em{
    font-style: normal;
    padding-left: 6px;
}
.card-listbox{
    padding: 18px 0 18px 18px;
    overflow: hidden;
}
.card-listbox .title{
    font-size: 14px;
    color: #333;
}
.dishes-items li{
    width: 100%;
    height: auto;
    margin-top: 5px;
    padding: 10px 18px 10px 0;
    border-bottom: 1px solid #EFF1F2;
    overflow: hidden;
}
.dishes-items li:last-child{
    border: none;
}
.dishes-fl .dishes-pic{
    float: left;
    width: 50px;
    height: 50px;
    border-radius: 5px;
    overflow: hidden;
}
.dishes-fl .dishes-pic img{
    display: block;
    width: 100%;
    height: 100%;
}
.dishes-fl .dishes-explain{
    float: left;
    margin-left: 15px;
}
.dishes-fl .dishes-explain b{
    font-size: 14px;
    color: #505050;
}
.dishes-fl .dishes-explain span{
    display: block;
    font-size: 12px;
    margin-top: 10px;
    color: #808080;
}
.dishes-fr{
    text-align: right;
    font-size: 12px;
    color: #808080;
    margin-top: 18px;
}
.describe{
    padding-right: 18px;
    margin-top: 10px;
    color: #808080;
    font-size: 12px;
    line-height:17px;
}
.dishes-choice b{                                                                           
  font-size: 12px;
  color: #333;
  letter-spacing: 1px;
  padding-right: 10px;
  
} 
.dishes-choice span {                                                                  
  font-size: 10px;
  border: 1px solid #FE813C;
  border-radius: 2px;
  color: #FE813C;
  padding: 1px 3px;
  letter-spacing: 2px;
}      
.dishes-addbox{
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 9999;
  background:rgba(255,255,255,1);
  box-shadow:0px -2px 11px 0px rgba(219,219,219,0.5);
  width: 100%;
  height: 50px;
} 
.dishes-addbox .dishes-numTxt {
  width: 65%;
  font-size: 14px;
  color: #505050;
  line-height: 50px;
  padding-left: 15px;
}
.dishes-addbox .dishes-numTxt em{
  font-style: normal;
  padding: 0 3px;
}
.dishes-addbox .dishes-numTxt.light{
    color: #F46F24;
}

.dishes-addbox .dishes-addBtn{
  display: block;
  outline: none;
  border: none;
  width: 35%;
  line-height: 50px;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  letter-spacing: 4px;
  background: #979797;
}
.dishes-addbox .dishes-addBtn.light{
    background: #F46F24;
}
</style>