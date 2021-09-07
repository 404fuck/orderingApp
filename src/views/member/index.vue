<template>
    <div id="app" class="scroll-wrapper toolbar-fixed">
        <div class="masktop" @touchmove.prevent></div>
        <!-- <keep-alive> -->
            <router-view v-wechat-title="$route.meta.title" />
        <!-- </keep-alive> -->
        
    </div>
</template>

<script>
export default {
    methods: {
        appRefreshDish(dish_id, operation, order_id, body) {
            this.stringutils.refreshDishNum(dish_id, operation, order_id, body);
        }
    },
    mounted() {
        window.appRefreshDish = this.appRefreshDish;
    }
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
.van-stepper__minus, .van-stepper__plus{
  margin: 0px !important;
  background-color: #F6F6F6 !important;
  height: 35px !important;
}
.van-stepper{
  color: #6D7278 !important;
  position: relative;
  top: -5px;
  margin-right: 10px;
  width: 42%;
  background: #f6f6f6;
  border-radius: 10px;
}
.van-stepper__minus{
  border-radius: 6px 0 0 6px;
}
.van-stepper__plus{
  border-radius: 0 6px 6px 0;
}
.van-stepper__input{
  margin: 0px !important;
  height: 33px !important;
  background-color: #F6F6F6 !important;
}
.van-stepper__minus::after, .van-stepper__minus::before, .van-stepper__plus::after, .van-stepper__plus::before{
  background-color: #ADADAD !important;
}
.colordisplay .van-stepper__minus{
  background-color:rgba(235, 60, 28, 0) !important;
}
.colordisplay .van-stepper__plus{
  background-color:rgba(235, 60, 28, 0) !important;
}
.colordisplay .van-stepper__input{
  background-color:rgba(235, 60, 28, 0) !important;
  color: #EB3C1C !important;
}
.colordisplay {
    background-color:rgba(235, 60, 28, 0.1) !important;
    border-color: red;
}
</style>