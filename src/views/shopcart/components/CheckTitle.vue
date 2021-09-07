<!--
 * @Author: zzt
 * @Date: 2021-04-01 19:19:32
 * @LastEditTime: 2021-05-18 14:21:06
 * @LastEditors: Please set LastEditors
 * @Description: 确认结账
 * @FilePath: \sjoyOrderingApp\src\views\shopcart\components\CheckTitle.vue
-->
<template>
  <div>
    <div
      class="list-block contacts-block inset font14 top20"
      style="border-radius: 20px 20px 0px 0px;box-shadow: rgba(227, 227, 227, 0.5) 5px 5px 26px;"
    >
      <ul style="border-radius: 20px 20px 0 0;">
        <li class="item-content center-style row">
          <div class="col-100">
            <p class="font30 color-purered fontWeight">{{datas.total_price | price}}</p>
          </div>
        </li>
        <li class="item-content">
          <div class="item-inner row">
            <div class="col-30">
              <span class="color-lightbrown fontWeight">{{$t('shopcart.shoukuanfang')}}：</span>
            </div>
            <div class="col-70 right-style">
              <span class="color-darkbrown fontWeight">{{datas.dep_name}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="row top30">
      <div class="col-30"></div>
      <div class="col-40" @click="payClick">
        <a href="#" class="button button-round submitBtn" style>{{$t('shopcart.confirmPay')}}</a>
      </div>
      <div class="col-30"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "checktitle",
  props: {
    datas: {
      type: Object,
      default: null
    }
  },
  methods: {
    payClick() {
      this.$emit("payClick");
    }
  }
};
</script>
<style scoped>
.button {
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  color: white;
  border: 0px;
  background: linear-gradient(
    to left,
    rgb(255, 130, 55),
    rgb(244, 37, 124),
    rgb(234, 61, 21)
  );
}
</style>
