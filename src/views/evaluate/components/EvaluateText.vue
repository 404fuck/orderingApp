<template>
  <div>
    <div class="list-block contacts-block inset"
         style="margin-top:10px;padding: 20px 0px;">
      <ul>
        <li class="item-content row no-gutter"
            style="background:#F6F8FA;margin: 0px 10px;    padding-right: 15px;">
          <div class="col-100">
            <textarea name
                      id
                      cols="30"
                      rows="10"
                      placeholder="口味赞，服务好推荐给大家"
                      style="border:0;"></textarea>
          </div>
          <div class="col-100 imgList">
            <ul style="padding: 10px 0px;background: none;">
              <li style="position: relative;top: 48px;">
                <img src="../../../style/images/image1.png"
                     alt
                     width="80">
                <i class="fa fa-close color-red"
                   style="position: absolute;left: 68px;top: -7px;"></i>
              </li>
              <li>
                <div class="inputUpload row">
                  <div class="col-100">
                    <img src="../../../style/images/camera.png"
                         alt>
                  </div>
                  <div class="col-100 color-gray">
                    <span>添加</span>
                  </div>
                  <div class="col-100 color-gray">
                    <span>图片/视频</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </li>
        <li class="item-content">
          <div class="row no-gutter lineheight30">
            <div class="col-30 font14">人均()：</div>
            <div class="col-70 font18">
              <input type="number"
                     placeholder="请输入人均消费金额"
                     style="text-align:left;display:inline-block">
            </div>
          </div>
        </li>
        <li class="item-content"
            style="margin-top: -15px;">
          <div class="item-inner row no-gutter">
            <div class="col-30 font14 color-gray">匿名评价</div>
            <div class="col-70">
              <input type="checkbox"
                     name="my-checkbox"
                     value="1"
                     style="float: right;">
            </div>
          </div>
        </li>
      </ul>
    </div>
    <p class="font13 color-gray"
       style="    padding: 0px 10px;">选择匿名评价之后，商家将无法获取你的个人信息，同时你的点评也将不 会对粉丝展示。</p>
    <div class="row top30"
         style="padding-bottom: 20px;">
      <div class="col-30"></div>
      <div class="col-40">
        <a href="#"
           class="button button-round submitBtn"
           style="color: white;border: 0;background: linear-gradient(to bottom left, #FF8237 , #F4257C,#EA3D15);">提交评价</a>
      </div>
      <div class="col-30"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "evaluatetext",
  data () {
    return {
      fileList: []
    };
  }
};
</script>
<style>
.submitBtn {
  height: 40px;
  line-height: 40px;
  font-size: 16px;
}
.imgList ul li {
  display: inline-block;
  margin-right: 10px;
}
.inputUpload {
  width: 80px;
  height: 80px;
  border: 1px #c7c7c7 dashed;
  text-align: center;
  font-size: 12px;
  margin: 0px;
}
</style>
