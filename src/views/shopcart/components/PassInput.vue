
<!--支付密码界面-->
<template>
  <div>
    <div class="card" style="margin:0px">
      <div class="card-content">
        <div class="card-content-inner">
          <div class="row">
            <div class="col-100">
              <img
                src="../../../style/images/clo.png"
                alt
                width="20"
                class="closeBtn"
                @click="closeClick"
              />

              <span
                class="font14 left10 fontWeight"
                style="position:relative;top:-10px;color:#505050"
              >{{$t('shopcart.writePaypwd')}}</span>
            </div>
          </div>
          <div class="row center-style top30">
            <div class="col-100">
              <span class="color-purered font30 fontWeight">{{dishData.total_price | price}}</span>
            </div>
            <div class="col-100">
              <span class="fontWeight" style="color:#505050">{{dishData.dep_name}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer row">
        <div class="col-100">
          <div class="list-block">
            <ul>
              <li>
                <a href="#" class="item-link item-content" style="padding:0px;">
                  <div class="item-inner row">
                    <div
                      class="item-title col-100"
                      style="color: rgb(87, 87, 87);
    font-weight: bold;
    font-size: 16px;"
                    >{{$t('shopcart.payType')}}：</div>
                    <div class="col-100 right top5" style="color:#808080;font-size:14px">
                      {{$t('shopcart.wallet')}}
                      <span>（ {{$t('shopcart.shengyu')}} {{balance | price}}）</span>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-100 top10">
          <van-password-input
            class="van-password-input"
            :value="value"
            @focus="pasdInputGetFocus"
            style="margin:0px"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "passinput",
  props: {
    value: {
      type: String,
      default: null
    },
    dishData: {
      type: Object,
      default: null
    },
    balance: {
      type: String,
      default: null
    }
  },
  methods: {
    closeClick() {
      this.$emit("closeClick");
    },
    pasdInputGetFocus() {
      this.$emit("pasdInputGetFocus");
    }
  }
};
</script>
<style scoped>
.list-block .item-link .item-inner,
.list-block .list-button .item-inner {
  background-position: calc(100% - 1px) center !important;
  padding-right: 15px !important;
}
.closeBtn {
  position: relative;
  top: -5px;
}
.van-password-input ul li {
  margin: 0px;
}
</style>
