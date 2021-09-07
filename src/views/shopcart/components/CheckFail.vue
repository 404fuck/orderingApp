<template>
  <div style="padding-top:100px">
    <div class="row center-style">
      <div class="col-100">
        <span class="color-red font30">168.80</span>
      </div>
      <div class="col-100 top10">
        <span>新白鹿上海爱情海店</span>
      </div>
    </div>
    <div class="row"
         style="padding-top:200px">
      <div class="col-100">
        <a href="#"
           class="button button-co button-fill color-gray">
          <img src="../../../style/images/fail.png"
               alt
               style="padding-top:10px">
        </a>
      </div>
      <div class="col-100 center-style top10">
        <span class="color-gray font16">支付失败</span>
      </div>
    </div>
    <div class="row top30">
      <div class="col-33"></div>

      <div class="col-33">
        <a href="#"
           class="button button-round color-red">继续支付</a>
      </div>
      <div class="col-33"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "checkfail"
}
</script>
<style scoped>
.button-co {
  width: 60px;
  height: 60px;
  left: 50%;
  border-radius: 50%;
  transform: translateX(-50%);
}
</style>
