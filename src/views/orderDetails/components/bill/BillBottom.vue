<template>
  <div class="card facebook-card"
       style="box-shadow: 5px 5px 26px rgba(227, 227, 227, 0.5);border-radius:5px;margin-bottom: 88px;">
    <div class="card-header row font12">
      <div class="col-50 color-lightbrown">{{$t('shopcart.orderID')}}：</div>
      <div class="col-50 right-style color-darkbrown">{{dishData.order_id_show}}</div>
      <div class="col-50 color-lightbrown top10">{{$t('shopcart.checkTime')}}：</div>
      <div class="col-50 right-style color-darkbrown top10">{{dishData.pay_time}}</div>
    </div>
    <div class="card-content">
      <div class="card-content-inner row top10">
        <div class="col-100 center">
          <a href="#"
             @click="backMenuClick"
             class="button color-gray button-round font12"
             :class="dishData.comment_status == 1?'color-red':''"
             style="width: 30%;display: inline-block;">{{$t('backMenu')}}</a>
          <a href="#"
          v-if="dishData.comment_status != 1"
             class="button button-round font12"
             :class="dishData.order_status == '5' || dishData.order_status == '4'?'color-gray':'color-red'"
             style="width: 30%;display: inline-block;margin-left:10px">
             <span v-if="dishData.order_status == '5' || dishData.order_status == '4'">{{$t('shopcart.qupingjia')}}</span>
             <span v-else @click="addComment">{{$t('shopcart.qupingjia')}}</span>
             </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "billbottom",
  props: {
    dishData: {
      type: Object,
      default: null
    }
  },
  methods: {
    backMenuClick () {
      window.location.href = "./start.html#/storeHome";
    },
    addComment () {
      // alert(this.dishData.order_id_show)
      window.location.href = "./shopcart.html#/Appraise?order_id=" + this.dishData.order_id_show;
      // if (this.stringutils.isOSXMAC()) {
      //   window.webkit.messageHandlers.addComment.postMessage({
      //     order_id: this.dishData.order_id_show,
      //     dept_logo: this.dishData.dept_logo,
      //     dept_name: this.dishData.dep_name
      //   });
      // } else {
      //   window.android.addComment(
      //     this.dishData.order_id_show,
      //     this.dishData.dept_logo,
      //     this.dishData.dep_name
      //   );
      // }
    }
  }
};
</script>
<style scoped>
.card-header {
  height: 0px;
}
.card-header:after{
  height:0px !important
}
</style>


