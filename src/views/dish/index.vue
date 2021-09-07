<template>
    <div id="app" class="scroll-wrapper toolbar-fixed">
        <keep-alive>
            <router-view v-wechat-title="$route.meta.title" />
        </keep-alive>
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
</style>