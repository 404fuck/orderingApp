<!-- 弹出固定套餐详情-->
<template>
    <div id="cardContainer">
        <div class="card-picture">
            <img :src="dishes.dish_image" :key="dishes.dish_image" alt :onerror="errorImg01"/>
        </div>
        <div class="card-introduce">
            <h3 class="card-title">{{dishes.dish_name}}</h3>
            <div class="row">
                <div class="col-60 card-price">
                    <div class="price1">{{dishes.dish_price|price}}</div>
                </div>
                <div class="col-40 top20">
                   <a
                    class="button button-round button-fill color-red"
                    @click="addCart"
                  >{{$t('shopcart.confirm')}}</a>
                </div>
            </div>
        </div>
        <div class="card-listbox">
            <div class="title">包含菜品：</div>
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
                     <div class="col-20 dishes-fr" v-else>{{item.least_number}}</div>
                </li>
            </ul>
            <div class="title top10" v-show="dishes.dish_note != ''">{{$t('dishDetail')}}</div>
            <div class="describe">{{dishes.dish_note}}</div>
        </div>
    </div>
</template>
<script>
export default {
    name: "CartDishFixedDetail",
    components: {
        
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
    },
  },
  
  data() {
    return {
     errorImg01:'this.onerror=null;this.src="' + require('../../../style/images/defaultImg4.png') + '"'
    };
  },
  methods: {
    addCart() {
        
        this.$emit(
            "addCart",
            false,
        );

    },
  },
};
</script>
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