<template>
  <div class="row payBtn no-gutter">
    <div class="col-40" @click="addDishClick">
      <div class="button button-fill color-orange">{{$t('continue')}}</div>
    </div>
    <div class="col-60" @click="payClick">
      <div class="button button-fill color-red firstBtn">
        <span>{{dishData.total_price | price}}</span>
        &nbsp;&nbsp;
        <span>{{$t('shopcart.lijizhifu')}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "paybtn",
  props: {
    dishData: {
      type: Object,
      default: null
    }
  },
  methods: {
    payClick() {
      if (!this.dishData.total_price) {
        return;
      }
      this.$emit("payClick");
    },
    addDishClick() {
      window.location.href = "./start.html#/storeHome?token="+this.$route.query.token;
    }
  }
};
</script>
<style>
.payBtn {
  position: fixed;
  bottom: 0px;
  width: 100%;
}

.payBtn .button {
  border-radius: inherit;
  height: 60px;
  line-height: 60px;
  font-size: 18px;
}
</style>
