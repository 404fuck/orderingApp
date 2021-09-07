<!--
 * @Author: your name
 * @Date: 2021-04-01 19:19:32
 * @LastEditTime: 2021-06-26 17:30:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sjoyOrderingApp\src\views\shopcart\pages\FinishCheck\index.vue
-->
<template>
  <div class="main-layout">
    <CheckFinish :data="getTitle()"></CheckFinish>
    <!-- 支付失败 -->
    <!-- <CheckFail></CheckFail> -->
  </div>
</template>

<script>
import CheckFinish from "../../components/CheckFinish";
// 支付失败
// import CheckFail from "../../components/CheckFail";
export default {
  name: "layout",
  computed:{
      language: {
          get() {
              return this.$store.getters.language;
          },
          set(val) {},
      },
      token() {
          return this.$store.getters.token;
      },
      curentStore() {
        return this.$store.getters.curentStore;
		  },
      qrcode(){
        return this.$store.getters.qrcode;
      },
  },
  components: {
    CheckFinish
    // CheckFail
  },
  
  methods: {
    getTitle() {
      return {
        dep_name: this.$route.query.dep_name,
        total_price: this.$route.query.total_price
      };
    }
  },
  created() {
    setTimeout(function() {
      let strUrl = `./orderDetails.html#/?order_id=${this.$route.query.order_id}&token=${this.token}&dep_id=${this.curentStore.dep_id}&qr_code=${this.qrcode}&lang=${this.language}`;
      strUrl = strUrl.replace(/\s+/g, "");
      window.location.href = strUrl;
    }, 2000);
  }
};
</script>
<style>
</style>