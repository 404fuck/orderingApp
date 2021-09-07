<!--
 * @Author: your name
 * @Date: 2021-04-01 19:19:32
 * @LastEditTime: 2021-06-28 11:48:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sjoyOrderingApp\src\views\shopcart\pages\AppraiseFinish\index.vue
-->
<template>
  <div >
    <div class="row">
        <div class="col-100" style="margin: 14px 18px;">
            <span @click="orderBack" class="font16" style="color:#808080">
                <img src="../../../../style/images/orderBack.png" alt="" width="8">
                {{$t('orderDetails')}}</span>
        </div>
    </div>
    <div class="row center-style" style="padding-top:100px">
      <div class="col-100">
        <img src="../../../../style/images/finish.png" alt="" width="48">
      </div>
      <div class="col-100 top10">
        <span class="font16" style="color:#505050">{{$t('finish')}}</span>
        <p class="font12" style="color:#747474">
            {{$t('finishThank')}}<br>
{{$t('finishThank1')}}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "checkfinish",
  props: {
    data: {
      type: Object,
      default: null
    }
  },
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
  methods: {
      orderBack(){
          let strUrl = `./orderDetails.html#/?order_id=${this.$route.query.order_id}&token=${this.token}&dep_id=${this.curentStore.dep_id}&qr_code=${this.qrcode}&lang=${this.language}`;
          strUrl = strUrl.replace(/\s+/g, "");
          window.location.href = strUrl;
          
      }
  }
};
</script>
<style scope>
.button-co {
  width: 60px;
  height: 60px;
  left: 50%;
  border-radius: 50%;
  transform: translateX(-50%);
}
</style>
