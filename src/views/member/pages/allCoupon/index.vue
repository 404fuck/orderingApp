<template>
  <div style="padding: 10px 14px;">
    <!-- <ul class="orderUl">
        <li class="row no-gutter">
            <div class="col-30" style="color:white">
                <span style="font-size:54px">20</span>
                <span class="font10" style="margin-bottom: 13px;">满100.00使用</span>
            </div>
            <div class="col-70">
                <div style="display: inline-block;">
                    <span style="color:#474744;display:block">
                        <span class="font18" >20.00 </span><span class="font16">优惠券 </span>
                    </span>
                    <span class="font12" style="color:#808080">有效期至  25/12/2020</span>
                </div>
                <div style="display: inline-block;float: right;">
                    <span style="float:right"><img src="../../../../style/images/yiguoqi.png" alt="" width="60"></span>
                </div>
                
                <div class="top20" style="color:#ADADAD" >
                    <span class="font10" style="left:-20px">仅限堂食，不可叠加使用，不与其他优惠同享</span>
                </div>
            </div>
        </li>
    </ul> -->
    <ul class="verticalCenter">
        <li class="row ">
            <div class="col-100 center">
                <div class="">
                    <img src='../../../../style/images/unCoupon.png' alt="" width="120">
                    <span class="font12" style="color:#808080;display:block">没有优惠券哦～</span>
                </div>
            </div>
        </li>
    </ul>
   <div class="row">
       <div class="col-100 center" style="position: absolute;bottom: 10px;">
            <span class="font12" style="color:#808080;">查看无效券 <span style="color:rgba(0, 0, 0, 0.25);margin-left:3px">>></span></span>
       </div>
   </div>
  </div>
</template>
<script>

export default {
  name: "index",
  components: {
    
  },
  computed: {
    language: {
      get() {
        return this.$store.getters.language;
      },
      set(val) {}
    },
    curentStore() {
      return this.$store.getters.curentStore;
    },
  
  },
  data() {
    return {
      
    };
  },
  methods: {
   
  },

  created() {
  
  },
  mounted() {

  },

};
</script>

<style scoped>

.orderUl li{
    box-shadow: 5px 5px 26px rgba(227, 227, 227, 0.5);
    background-image: url('../../../../style/images/couponBg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    
}
.orderUl .col-30{
    text-align: center;
    padding: 10px 0px 0px 0px;
    
}
.orderUl .col-70{
    padding: 10px 12px;
}
.font10{
    font-size: 10px;
    transform: scale(0.83);
    display: inline-block;
    position: relative;
    left: -2px;
}
</style>