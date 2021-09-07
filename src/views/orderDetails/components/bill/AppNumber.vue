<template>
  <div class="card facebook-card">
    <div class="card-header row">
      <div class="col-100 center-style top20">
        <span class="color-black font18">您的取餐号为：</span>
        <span class="color-red font20">1601</span>
      </div>
      <div class="col-100 center-style top20">
        <span class="colorText font16">就餐时间：</span>
        <span class="color-red font18">2019 06 08 15:30</span>
      </div>
      <div class="col-100 center-style top20">
        <span class="colorText font14">请凭此号到取餐区取餐</span>
      </div>
      <div class="col-100 top10">
        <hr>
      </div>
      <div class="col-50 font14">
        <span class="colorText">桌号</span>
        <span class="colorText">D9</span>
        &nbsp;&nbsp;&nbsp;
        <span class="colorText">人数</span>
        <span class="colorText">4</span>
      </div>
      <div class="col-50 right-style font14">
        <span class="colorText">下单时间：</span>
        <span class="colorText">13:56</span>
      </div>
      <div class="col-100 top10 font14">
        <span class="colorText">备注：</span>
        <span class="colorText">无</span>
      </div>
    </div>
    <div class="card-content">
      <div class="card-content-inner">
        <div class="row top10 font14">
          <div class="col-50 color-black">
            <span>应付：</span>
            <span>168.80</span>
          </div>
          <div class="col-50 right-style color-black">
            <span>实付：</span>
            <span>168.80</span>
          </div>
        </div>
        <div class="row top10 font14">
          <div class="col-50 colorText">
            <span>消费金额：</span>
          </div>
          <div class="col-50 right-style colorText">
            <span>168.80</span>
          </div>
        </div>
        <div class="row top10 font14">
          <div class="col-50 colorText">
            <span>优惠金额：</span>
          </div>
          <div class="col-50 right-style color-red">
            <span>20.00</span>
          </div>
        </div>
        <div class="row top10 font14">
          <div class="col-50 colorText">
            <span>其他费用：</span>
          </div>
          <div class="col-50 right-style colorText">
            <span>0.00</span>
          </div>
        </div>
        <div class="row top10 font14">
          <div class="col-50 color-black">
            <span>应付金额：</span>
          </div>
          <div class="col-50 right-style color-black">
            <span>168.80</span>
          </div>
        </div>
        <div class="row top10 font14">
          <div class="col-50 color-black">
            <span>实付金额：</span>
          </div>
          <div class="col-50 right-style color-black">
            <span>168.80</span>
          </div>
        </div>
        <div class="row top10 font14">
          <div class="col-50 colorText">
            <span>付款人：</span>
          </div>
          <div class="col-50 right-style colorText">
            <span>芒果先生</span>
          </div>
        </div>
        <div class="row top10 font14">
          <div class="col-100 center-style">
            <span class="font14 colorText">
              收起付款详情
              <i class="fa fa-chevron-down"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AppNumber"
};
</script>
<style>
hr {
  width: 100%;
}
.colorText {
  color: #808080 !important;
}
</style>
