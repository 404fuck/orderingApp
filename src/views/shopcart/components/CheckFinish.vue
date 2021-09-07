<template>
  <div style="padding-top:100px">
    <div class="row center-style">
      <div class="col-100">
        <span class="color-red font30">{{data.total_price | price}}</span>
      </div>
      <div class="col-100 top10">
        <span>{{data.dep_name}}</span>
      </div>
    </div>
    <div class="row" style="padding-top:200px">
      <div class="col-100">
        <a href="#" class="button button-co button-fill color-red">
          <img src="../../../style/images/ture.png" alt style="padding-top:15px" width="30" />
        </a>
      </div>
      <div class="col-100 center-style top10">
        <span class="color-red font16">{{$t('shopcart.paySuccess')}}</span>
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
