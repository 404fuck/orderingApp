<template>
  <div style="padding: 10px 14px;">
    <div class="row" style="background: white;border-radius: 4px;padding-bottom: 20px;">
        <div class="col-100" style="padding: 15px 17px;" @click="memberInfoClick()">
            <span><img src="../../../../style/images/avator.png" alt="" width="45"></span>
            <div class="left10" style="display:inline-block">
                <span class="font18" style="display:block">Adria</span>
                <span class="font12" style="color:rgba(0, 0, 0, 0.25)">会员资料</span>
            </div>
            <span style="float:right;position:relative;top:20px"><img src="../../../../style/images/rightBack.png" alt="" width="16" height="16"></span>
        </div>
        <div class="col-100 center top30">
            <ul class="discountsCss">
                <li @click="jifenClick()">
                    <span class="font12" style="display:block;color:#747474">积分</span>
                    <span class="font18 top5 fontWeight" style="display: inline-block;">1200</span>
                </li>
                <li @click="balanceClick()">
                    <span class="font12" style="display:block;color:#747474">余额</span>
                    <span class="font18 top5 fontWeight" style="display: inline-block;">500.00</span>
                </li>
                <li @click="couponClick()">
                    <span class="font12" style="display:block;color:#747474">优惠券</span>
                    <span class="font18 top5 fontWeight" style="display: inline-block;">10</span>
                </li>
            </ul>
        </div>
        <div class="col-100 memberBg" style="color:white">
            <span class="font14" style="margin: 12px 16px;display: inline-block;">
                <img src="../../../../style/images/UnvipCard.png" width="16" alt="" style="position: relative;top: 3px;">
                <span > 金牌会员</span>
            </span>
            <p class="center" style="margin-bottom: 50px;">
                <span style="font-size:22px">享受整单折扣</span>
                <span style="font-size:20px">10%off</span>
            </p>
        </div>
        <div class="col-100" style="text-align: center;position: relative;top: -25px;">
            <img src="../../../../style/images/fukuanButton.png" width="70" alt="">
        </div>
    </div>
    <div class="row top10" style="background: white;border-radius: 4px;">
        <div class="col-100">
            <ul class="otherMember">
                <li @click="orderClick()">
                    <img src="../../../../style/images/comment.png" alt="" width="14">
                    <span class="left10">我的订单</span>
                </li>
                <li @click="commentClick()">
                    <img src="../../../../style/images/icon_order.png" alt="" width="14">
                    <span class="left10">我的点评</span>
                </li>
            </ul>
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
    //   会员积分
   jifenClick(){
       window.location.href = "./member.html#/memberIntegral";
   },
//    账单
   balanceClick(){
       window.location.href = "./member.html#/memberBill";
    
   },
//    优惠券
   couponClick(){
       window.location.href = "./member.html#/allCoupon";
   },
//    会员资料
   memberInfoClick(){
       window.location.href = "./member.html#/memberInfo";
   },
//    我的订单
   orderClick(){
       window.location.href = "./member.html#/allOrder";
   },
//    我的点评
   commentClick(){
       window.location.href = "./member.html#/allComments";
   }
  },

  created() {
  
  },
  mounted() {

  },

};
</script>

<style scoped>
.discountsCss li{
    display: inline-block;
    width: 33%;
}
.memberBg{
    background-image: url('../../../../style/images/vipCardBg.png');
    background-size: cover;
    background-repeat: no-repeat;
    margin: 20px 15px 0 15px;
    border-radius: 8px;
}
.otherMember{
    margin: 0 14px;
}
.otherMember li{
    height: 60px;
    line-height: 60px;
    font-size: 14px;
    color: #505050;
    border-bottom: 1px #EFF1F2 solid;
}
.otherMember li:last-child{
    border-bottom: none;
    padding-bottom: 100%;
}
</style>