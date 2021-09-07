<template>
<van-tabs v-model="active">
  <van-tab title="已点评">
    <div style="padding: 10px 14px;">
        <!-- <ul class="orderUl">
            <li class="row">
              <div class="col-100 right">
                <img src="../../../../style/images/delete.png" alt="" width="13">
              </div>
                <div class="col-100">
                    <img src="../../../../style/images/avator.png" alt="" width="34" style="border-radius: 50%;">
                    <span style="display:inline-block">
                      <span class="dishTitle">小煤球爱吃鱼</span>
                      <span class="starCss">
                          <img src="../../../../style/images/lineStar.png" alt="" width="10">
                          <img src="../../../../style/images/lineStar.png" alt="" width="10">
                          <img src="../../../../style/images/lineStar.png" alt="" width="10">
                          <img src="../../../../style/images/lineStar.png" alt="" width="10">
                          <img src="../../../../style/images/lineStar.png" alt="" width="10">
                        </span>
                        <span style="float:right" class="font10">12:46 17/06/2020</span>
                    </span>
                </div>
                <div class="col-100 top15">
                  <span class="font14" style="color:#505050">一家三口来杭州旅游，住在附近，慕名而来。菜品整体很精致，好吃，服务也到</span>
                </div>
                <div class="col-100 top10">
                  <div class="row no-gap" >
                    <div class="col-33">
                      <img src="../../../../style/images/image1.png" alt="" width="100%">
                    </div>
                    <div class="col-33">
                      <img src="../../../../style/images/image1.png" alt="" width="100%">
                    </div>
                    <div class="col-33">
                      <img src="../../../../style/images/image1.png" alt="" width="100%">
                    </div>
                    <div class="col-33">
                      <img src="../../../../style/images/image1.png" alt="" width="100%">
                    </div>
                  </div>
                </div>
                <div class="col-100 font12 top20" style="padding:13px 8px 12px 11px;background:#F9F9F9;border-radius: 4px;">
                  <span style="color:#505050">老头儿油爆虾（商家)：</span>
                  <span style="color:#808080">感谢您的好评，能让亲满意而归是我们最大的欣慰也希望有机会再来！</span>
                </div>
            </li>
        </ul> -->
        <ul style="margin-top: 50%;">
          <li class="row ">
              <div class="col-100 center">
                  <div>
                      <img src='../../../../style/images/unComment.png' alt="" width="120">
                      <span class="font12" style="color:#808080;display:block">还没有写点评哦～</span>
                  </div>
              </div>
          </li>
        </ul>
    </div>
  </van-tab>
  <van-tab title="待点评">
    <div style="padding: 10px 14px;">
        <!-- <ul class="orderUl">
            <li class="row">
                <div class="col-30">
                    <img src="../../../../style/images/logo.png" alt="" width="80" style="border-radius: 4px;">
                </div>
                <div class="col-70">
                    <span class="dishTitle">重庆刘一手火锅（徐汇店)</span>
                    <span class="dishDate">徐汇区  重庆火锅 </span>
                    <p>
                        <span class="dishDate">16/07/2020 19:30 </span>
                        <button style="float: right;" class="commentBtn">去评价</button>
                    </p>
                </div>
                
            </li>
        </ul> -->
      <ul style="margin-top: 50%;">
          <li class="row ">
              <div class="col-100 center">
                  <div>
                      <img src='../../../../style/images/unComment.png' alt="" width="120">
                      <span class="font12" style="color:#808080;display:block">还没有待点评的订单哦～</span>
                  </div>
              </div>
          </li>
        </ul>
    </div>
  </van-tab>
</van-tabs>
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
      active:2
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
.dishTitle{
    color: #505050;
    font-size: 14px;
    font-weight: bold;
}
.dishDate{
    color: #808080;
    font-size: 10px;
    transform: scale(0.83);
    display: inline-block;
    position: relative;
    left: -8px;
}
.orderUl li{
    background: white;
    border-radius: 4px;
    box-shadow: 0 5px 18px rgba(227, 227, 227, 0.5);
    padding: 12px 14px;
}
.font10{
    font-size: 10px;
    transform: scale(0.83);
    display: inline-block;
    position: relative;
    left: -2px;
}
.dishInfo{
    width: 50%;
    display: inline-block;
}
.commentBtn{
    background: #EB3C1C;
    color: white;
    border-radius: 14px;
    border: none;
    padding: 5px 17px;
    font-size: 12px;

}
.starCss{
  display: block;
}
.starCss img{
  margin-right: 3px;
}
</style>