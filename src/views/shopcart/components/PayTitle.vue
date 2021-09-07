<template>
  <div>
    <!-- <div class="content-block-title" style="margin-top:15px">
      <div class="row">
        <div class="col-30">
          <span
          v-show="dianmaSett"
            class="font16 color-darkbrown fontWeight"
          >{{dishData.table_name}}{{$t('shopcart.table')}}</span>
        </div>
        <div class="col-70 right-style">
          <span class="color-gray">{{$t('shopcart.xiaofeiCount')}}：</span>
          <span class="color-red font20">{{dishData.should_pay | price}}</span>
        </div>
      </div>
    </div> -->
    <div
      class="card facebook-card"
      style="border-radius:5px;box-shadow: 5px 5px 26px rgba(227, 227, 227, 0.5);margin-top:0px"
    >  
      <!-- 查看订单 -->
      <!-- <div class="card-header row">
        <div class="col-70 color-darkbrown fontWeight" style="font-size:14px">
          <span>{{$t('shopcart.countNum')}}：</span>
          <span>{{dishData.total_dish_num}}&nbsp;{{$t('shopcart.xiang')}}</span>
        </div>
        <div class="col-30 right-style" @click="dishInfoClick">
          <a href="#" class="button button-round color-red" style="line-height:25px">{{$t('shopcart.lookOrder')}}</a>
        </div>
      </div> -->
      <div class="card-footer row">
        <div class="col-60">
          <span class="color-darkbrown fontWeight font14">{{$t('shopcart.dishTotal')}}</span>
        </div>
        <div class="col-40 right-style">
          <span class="fontWeight font14" style="color:#505050">{{dishData.dish_original_total_price | price}}</span>
        </div>
        <div class="col-100 top10" v-if="dishPmt!= undefined && dishPmt!= null && dishPmt.length>0">
            <div class="row">
              <div class="col-50 top5">
                <span class=" font12 fontWeight" style="color:#808080">{{$t('shopcart.pmtTotal')}}</span>
              </div>
              <div class="col-50 right-style top5">
                <span class=" font12 fontWeight" style="color:#808080" v-format="'#,##0.00'">-{{Number(dishData.total_dish_pmt_price)+dishData.total_off | price}}</span>
              </div>
            </div>
            <div class="row">
          <div class="col-100" v-for="(item,index) in dishPmt" :key="index">
            <ul class="font12 dishPmt" style="color:#808080">
              <li>
                <span>{{pmtValue[item.pmt_name]}}</span> 
                <span v-if="item.pmt_name == 'discount'">
                   <span v-if="item.member == '1'">
                        ({{dishData.discount_reason}} {{Number(dishData.discount_ratio*100)}}%{{$t('dish.discount')}}
                      </span>
                      <span v-else>
                        ({{Number(dishData.discount_ratio*100)}}%{{$t('dish.discount')}},{{dishData.discount_reason}} 
                      </span>
                  <span v-show="item.no_pmt_price != null">,{{$t('dish.notPrice')}}：{{item.no_pmt_price | price}}</span>)</span>
                <span v-if="item.pmt_name == 'reduce'">({{item.note}})</span>
                <span v-if="item.pmt_name == 'coupon'">({{item.note}})</span>
                <span v-if="item.pmt_name == 'point_user'">({{item.note}})</span>
                <span class="right">-{{item.pmt_price | price}}</span>
              </li>
            </ul>
          </div>
        </div>
          </div>
        <div class="col-60 top15">
          <span class="color-gray font12">
            {{$t('SST')}}
            <span>{{dishData.taxes_rate}}</span>
            %：
          </span>
        </div>
        <div class="col-40 top15 right-style">
          <span class="color-gray font12">{{dishData.sst_price | price}}</span>
        </div>
        <div class="col-60 top15">
          <span class="color-gray font12">
            {{$t('SC')}}
            <span>{{dishData.cost_rate}}</span>
            %：
          </span>
        </div>
        <div class="col-40 top15 right-style">
          <span class="color-gray font12">{{dishData.server_price | price}}</span>
        </div>
        <hr class="hrStyle">
        <div class="col-60 top15">
          <span class=" fontWeight font14" style="color: #505050;">{{$t('shopcart.after_sst')}}</span>
        </div>
        <div class="col-40 top15 right-style">
          <span class="color-purered fontWeight" style="font-size:19px">{{dishData.total_price | price}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "payment",
  computed: {
    curentStore() {
      //console.log('curentStore')
      return this.$store.getters.curentStore;
    }
  },
  props: {
    dishData: {
      type: Object,
      default: null
    },
    beforeData: {
      type: Object,
      default: null
    },
    qrcode: {
      type: String,
      default: ""
    },
    dishPmt: {
      type: Array,
      default: []
    },
  },
  data() {
    return {
      orderType: false,
      dianmaSett:true,
       //优惠名称
      pmtValue:{
        "on_sale":this.$t("shopcart.dishSpecial"),
        "member_price":this.$t("shopcart.dishVip"),
        "xoff2nd":this.$t("shopcart.twoPmt"),
        "manual_give":this.$t("shopcart.shoudongzengcai"),
        "buy_give":this.$t("shopcart.buyPmt"),
        "discount":this.$t("shopcart.orderPmt"),
        "reduce":this.$t("shopcart.customPrice"),
        "coupon":this.$t("shopcart.coupon"),
        "point_user":this.$t("shopcart.vipDiscount"),
        "manual_discount":this.$t("shopcart.shoudongOff")},
        TableCode:false
    };
  },
  methods: {
    dishInfoClick() {
      this.$emit("dishInfoClick");
    }
  },
  created() {
    // 扫桌码
    if(this.qrcode[0] == 'T'&&this.qrcode[1] == 'D'&&this.qrcode[2] == 'E'&&this.qrcode[3] == 'P'&&this.qrcode[4] == '_'){
       this.TableCode = true
      
    }
    this.orderType = this.stringutils.isAfter(this.curentStore);
    if(this.qrcode[0] == 'D'&&this.qrcode[1] == 'E'&&this.qrcode[2] == 'P'&&this.qrcode[3] == 'X'&&this.qrcode[4] == '_'){
      this.dianmaSett = false
    }
  }
};
</script>
<style scoped>
.card-header {
  height: 0px;
}
.button-round {
  border-radius: 5px;
  height: 25px;
  font-size: 12px;
  float: right;
}
.card-footer{
  padding: 18px 15px;
}
.card-footer:before{
  height: 0px !important;
}
.dishPmt{
  margin-left: 10px;
}
.dishPmt li{
  margin-top: 10px;
  /* list-style-type: disc; */
}
.dishPmt li::before{
  content: '.';
  display: inline-block;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  font-size: 10px;
  position: relative;
  top: -5px;
}
.right{
  float:right
}
.hrStyle{
  height: 1px;
    background: #EFF1F2;
    width: 100%;
    border: none;
    margin-top: 5px;
}
</style>

