<!-- 弹出菜品规格详情-->
<template>
  <div class="card demo-card-header-pic">
    <div style="background-image:url(../style/images/star.png)"
         valign="bottom"
         class="card-header color-white no-border"></div>
    <div class="card-content">
      <div class="card-content-inner row">
        <div class="col-100">
          <div class="row">
            <div class="col-60">
              <span>
                <b class="font16">松果巧克力蛋糕</b>&nbsp;&nbsp;&nbsp;
              </span>
            </div>
            <div class="col-40 right-style">
              <span>
                <img src="../style/images/shar.png"
                     style="position:relative;top:3px"
                     width="16"> &nbsp;
                <span>分享</span>
              </span>
            </div>
          </div>
        </div>
        <div class="col-100 color-gray">主厨最新力荐新品。</div>
        <div class="col-100 color-gray top20 specificBtn">
          <div class="row">
            <div class="col-20">
              规&nbsp;&nbsp;&nbsp;格：
            </div>
            <div class="col-20">
              <a href="#"
                 class="button button-round lineheight25 active"
                 style="height:25px;">小份</a>
            </div>
            <div class="col-20">
              <a href="#"
                 class="button button-round lineheight25"
                 style="height:25px;">大份</a>
            </div>
            <div class="col-40"></div>
          </div>
        </div>
        <div class="col-100 color-gray top20 specificBtn">
          <div class="row">
            <div class="col-20">
              辣&nbsp;&nbsp;&nbsp;度：
            </div>
            <div class="col-20">
              <a href="#"
                 class="button button-round lineheight25 active"
                 style="height:25px;">不辣</a>
            </div>
            <div class="col-20">
              <a href="#"
                 class="button button-round  lineheight25"
                 style="height:25px;">微辣</a>
            </div>
            <div class="col-20">
              <a href="#"
                 class="button button-round  lineheight25"
                 style="height:25px;">中辣</a>
            </div>
            <div class="col-20">
              <a href="#"
                 class="button button-round lineheight25"
                 style="height:25px;">重辣</a>
            </div>
          </div>
        </div>
        <div class="col-100 color-gray top20 specificBtn">
          <div class="row">
            <div class="col-20">
              口&nbsp;&nbsp;&nbsp;味：
            </div>
            <div class="col-25">
              <a href="#"
                 class="button button-round lineheight25 active"
                 style="height:25px;">番茄味</a>
            </div>
            <div class="col-25">
              <a href="#"
                 class="button button-round  lineheight25"
                 style="height:25px;">烧烤味</a>
            </div>
            <div class="col-20">
              <a href="#"
                 class="button button-round lineheight25"
                 style="height:25px;">原味</a>
            </div>
            <div class="col-10">

            </div>
          </div>
        </div>
        <div class="col-100 color-red font20 top20">28.80</div>
        <div class="col-100">
          <div class="row">
            <div class="col-70 top10">
              <span class="color-gray font14-">会员价：</span>
              <span class="color-black font14">18.88</span>
            </div>
            <div class="col-30">
              <a href="#"
                 class="button button-round  button-fill color-red"
                 style="width: 82px;height: 30px;font-size: 12px;float: right;line-height: 30px;">加购</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer row">
      <div class="col-100 color-black font15">菜品描述</div>
      <div class="col-100 color-gray">
        <p>本菜品主要由巧克力，松果，奶油巧克力，松果 奶油巧克力，松果，奶油</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "specificDetail",
};
</script>

<style>
.specificBtn a.active {
  border-color: red;
  color: red;
  background: none;
}

.specificBtn a {
  border-color: gray;
  color: gray;
}
</style>