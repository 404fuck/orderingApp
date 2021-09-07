
<template>
    <div id="app" class="scroll-wrapper toolbar-fixed">
        <div class="masktop" @touchmove.prevent></div>
        <router-view v-wechat-title="$route.meta.title" />
    </div>
</template>

<script>
export default {
    created() {
        this.stringutils.saveVantLang();
    },
};
</script>
<style>
@import "../../style/css/framework7.ios.css?111111";
@import "../../style/css/framework7.ios.colors.css?111111";
@import "../../style/css/font-awesome.css?111111";
@import "../../style/css/etms.css?111111";

#app{
  padding-bottom: 0 !important;
  height: 100% !important;
}
.van-swipe__indicator {
    opacity: 1 !important;
}
.van-toast{
  z-index: 99999 !important;
  font-size: 13px !important;
}
.van-checkbox__label{
  color: #808080 !important;
  font-size: 16px !important;
  position: relative !important;
}
.van-checkbox__icon--checked .van-icon{
  border-color: #EB3C1C !important;
  background-color: #EB3C1C !important;
}
.cancelWaidaiBtn{
    width:100%;
    background: #F46F24;
    border: none;
    color: white;
}
.confirmWaidaiBtn{
    width:100%;
    background: #EB3C1C;
    border: none;
    color: white;
}
.vipDialog .van-dialog__content{
  margin: 28px 20px;
  text-align: center;
}
#XCBillContent input[disabled],input:disabled,input.disabled{
    color: #808080;
    -webkit-text-fill-color: #808080;
    -webkit-opacity:1;
    opacity: 1;
}
</style>
