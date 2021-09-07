<template>
  <div class="card payCoupon">
    <div class="card-header font14 color-darkbrown fontWeight">{{$t('couponPage.yhq')}}</div>
    <div class="card-content">
      <div class="card-content-inner">
        <div class="list-block">
          <ul>
            <li>
              <a @click="couponClick"
                 class="item-link item-content">
                <div class="item-inner row">
                  <div class="item-title col-30 font12 color-lightbrown">{{$t('couponPage.yhq')}}</div>
                  <div v-if="couponCount == 0"
                       class="col-70 right-style color-purered font14">{{$t('couponPage.noCoupon')}}</div>
                  <div v-else-if='dishData.coupon != 0'
                       class="col-70 right-style color-purered font14">-{{dishData.coupon | price}}</div>
                  <div v-else
                       class="col-70 right-style color-purered font14">{{couponCount}}&nbsp;{{$t('couponPage.keyong')}}</div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "payCoupon",
  methods: {
    couponClick () {
      this.$router.push({ path: "/couponPage" });
    }
  },
  props: {
    dishData: {
      type: Object,
      default: null
    },
    couponCount: {
      type: Number,
      default: 0
    }
  }
};
</script>
<style scoped>
.card-header{
  height: 44px !important;
}
</style>

