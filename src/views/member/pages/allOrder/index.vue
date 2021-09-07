<template>
  <div style="padding: 10px 14px;">
    <!-- <ul class="orderUl">
        <li class="row">
            <div class="col-30">
                <img src="../../../../style/images/logo.png" alt="" width="80" style="border-radius: 4px;">
            </div>
            <div class="col-70">
                <span class="dishTitle">重庆刘一手火锅（徐汇店)</span>
                <span class="dishDate">16/07/2020 19:30 </span>
                <p>
                    <span class="dishInfo">
                        <span class="font10" style="color:#808080">订单金额</span><span class="font12" style="color:#505050">99.80</span>
                    </span>
                    <span class="dishInfo">
                        <span class="font10" style="color:#808080">桌台号</span><span class="font12" style="color:#505050">D9</span>
                    </span>
                </p>
            </div>
            <div class="col-100 right">
                <button class="commentBtn">去评价</button>
            </div>
        </li>
    </ul> -->
    <ul class="verticalCenter">
        <li class="row ">
            <div class="col-100 center">
                <div>
                    <img src='../../../../style/images/unOrder.png' alt="" width="120">
                    <span class="font12" style="color:#808080;display:block">还没有订单哦～</span>
                </div>
            </div>
        </li>
    </ul>
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
</style>