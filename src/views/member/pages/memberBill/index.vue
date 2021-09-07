<template>
  <div class="row " style="padding: 10px 14px;">
        <div class="col-100 center balanceBg" style="color:white;padding: 35px 15px 10px 15px;">
            <span style="display:block;font-size:36px">500.00</span>
            <span class="font12">账户余额</span>
            <p class="font12 left left15">永久有效</p>
        </div>
        <div class="col-100 center">
          <div class="verticalCenter">
            <img src='../../../../style/images/unBill.png' alt="" width="96">
            <span class="font12" style="color:#808080;display:block">还没有账单明细哦～</span>
          </div>
        </div>
        <!-- <div class="col-100">
            <ul class="memberBillCss">
                <li>
                    <div class="font14">
                        <span class="fontWeight" style="color:#505050">门店消费</span>
                        <span style="color:#42CD3C;float:right">-300</span>
                    </div>
                    <p class="font12" style="color:#ADADAD">
                        <span>门店消费</span>
                        <span>25/12/2020  21:11:59</span>
                    </p>
                </li>
                <li>
                    <div class="font14">
                        <span class="fontWeight" style="color:#505050">充值</span>
                        <span style="color:#EB3C1C;float:right">+500</span>
                    </div>
                    <p class="font12" style="color:#ADADAD">
                        <span>充值</span>
                        <span>25/12/2020  21:11:59</span>
                    </p>
                </li>
            </ul>
        </div> -->
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
.balanceBg{
    background-image: url('../../../../style/images/zhangdanBg.png');
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 8px;
}
.memberBillCss li{
    height: 72px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 15px;
    margin-top: 12px;
    border-radius: 4px;
    box-shadow: 5px 5px 26px rgba(227, 227, 227, 0.5);
}
</style>