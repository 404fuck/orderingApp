<!--搜索栏-->
<template>
  <div class="list-block contacts-block inset grid-view top10" style="    margin-right: 10px;margin-left: 10px;">
    <ul class="home-icon-view font12">
      <li style="border-radius: 5px 0 0 5px;" :class="{'gird-li':bellBtn==true,'gird-li1':bellBtn==false}">
        <a class="link" @click="onItemClick(0)">
          <div class="grid-os">
            <div class="imgText">
              <img src="../style/images/hot.png" height="28" />
              <span class="color-lightbrown">{{$t('hotDish')}}</span> 
            </div>
          </div>
        </a>
      </li>
      <li :class="{'gird-li':bellBtn==true,'gird-li1':bellBtn==false}">
        <a class="link" @click="onItemClick(1)">
          <div class="grid-os">
            <div class="imgText">
              <img src="../style/images/share.png" />
              <span class="color-lightbrown">{{$t('dianguobang')}}</span>
            </div>
          </div>
        </a>
      </li>
      <li :class="{'gird-li':bellBtn==true,'gird-li1':bellBtn==false}" style="border-radius: 5px 0 0 5px;">
        <a class="link" @click="onItemClick(2)">
          <div class="grid-os">
            <div :class="{'imgText':bellBtn==true,'lastImg':bellBtn==false}">
              <img src="../style/images/searchBg.png" />
              <span class="color-lightbrown">{{$t('search')}}</span>
            </div>
          </div>
        </a>
      </li>
      <!-- 店码点餐不展示服务铃 -->
      <li :class="{'gird-li':bellBtn==true,'gird-li1':bellBtn==false}" style="border-radius: 0px 5px 5px 0px;" v-show="bellBtn">
        <a class="link" @click="onItemClick(3)">
          <div class="grid-os">
            <div class="imgText" style="border-right:none;">
              <img src="../style/images/bell.png" />
              <span class="color-lightbrown">{{$t('bell')}}</span>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "menubtn",
  data() {
    return {
      bellBtn:true
    };
  },
  props:{
    qrcode: {
      type: String,
      default: ""
    },
  },
  methods: {
    onItemClick(index) {
      this.$emit("onItemClick", index);
    }
  },
  created(){
    if(this.qrcode[0] == 'D'&&this.qrcode[1] == 'E'&&this.qrcode[2] == 'P'&&this.qrcode[3] == 'X'&&this.qrcode[4] == '_'){
      this.bellBtn = false
    }
  }
};
</script>
<style>
.imgText {
  height: 50px;
  border-right: 1px solid #e7eaec;
}
.lastImg{
  border-right:none;
}
.gird-li {
	background: white;
	display: block;
	float: left;
	width: 25%;
	height: 78px;
	text-align: center;
	margin-top: 0px;
	padding-top: 0px;
}
.gird-li1{
  background: white;
	display: block;
	float: left;
	width: 33%;
	height: 78px;
	text-align: center;
	margin-top: 0px;
	padding-top: 0px;
}
</style>


