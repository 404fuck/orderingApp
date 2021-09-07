<template>
  <div class="main-layout">
    <div class="row no-gutter">
      <div class="col-10"> 
        <div @click="backClick" style="margin-left:8px">
          <van-icon name="arrow-left"
                    class="font20 top18" />
        </div>
      </div>
      <div class="col-90 center">
        <p class="center color-darkbrown"
           style="font-weight: bold;">{{$t('lotsDish')}}</p>
      </div>
    </div>

    <div  v-if="dishList!=null" 
         class="dish-list">
      <RecommItem1 v-for="(dishitem, index) in dishList"
                   :key="index"
                   :dishtag ="dishitem.type_id"
                   :dishes="dishitem"
                   :canGoPlay="dishitem.canGoPlay"
                   @addCart="addCart"
                   @delCart="delCart"
                   @showFoodDetail="showFoodDetail" />
    </div>

    <div v-if="showType==false&&dishList==null"
         class="noresult">
      <img src="../../../../style/images/noresult.png"
           class="closeImg"
           @click="isShowFoodDetail=false" />
      <div class="noresult-text">{{$t('noDish')}}</div>
    </div>
<CopyURL/>
<!-- 固定套餐详情 -->
    <van-popup
      :overlay="true"
      :style="{height:'100%',width:'100%',padding:'0'}"
      v-model="isShowFixedFoodDetail"
      get-container="#app"
      >
        <FoodFixedDetail
            v-if="isShowFixedFoodDetail"
            :dishes="curentDishes"
            @addCart="addCart"
            @delCart="delCart"
        ></FoodFixedDetail>
        <img
          src="../../../../style/images/backimg.png"
          class="closeImg2"
          @click="isShowFixedFoodDetail=false"
          width="30"
          height="30"
        />
    </van-popup>
    <!-- 自选套餐详情 -->
    <van-popup
      :overlay="true"
      :style="{height:'100%',width:'100%',padding:'0'}"
      v-model="isShowFoodOptionalDetail"
      get-container="#app"
      >
        <FoodOptionalDetail
            v-if="isShowFoodOptionalDetail"
            :dishes="curentDishes"
            @addCart="addCart"
            @delCart="delCart"
        ></FoodOptionalDetail>
        <img
          src="../../../../style/images/backimg.png"
          class="closeImg2"
          @click="isShowFoodOptionalDetail=false"
          width="30"
          height="30"
        />
    </van-popup>
    <!-- 菜品详情 -->
    <van-popup v-model="isShowFoodDetail"
               get-container="#app"
               @close="dismissFoodDetail">
      <div class="popupcontent">
        <div class="fooddetail">
          <FoodDetail v-if="isShowFoodDetail"
                      :dishes="curentDishes"
                      :tagsList = "tagsList"
                      @addCart="addCart"
                      @delCart="delCart"
                      @onSpecialItemClick="onSpecialItemClick"
                      @onTagItemClick="onTagItemClick"
                      @onSelectItemClick="onSelectItemClick"></FoodDetail>
        </div>
        <img src="../../../../style/images/close.png"
             class="closeImg"
             @click="isShowFoodDetail=false"
             width="32" />
      </div>
    </van-popup>
  </div>
</template>
<script>
import Swiper from "../../../../components/Swiper";
import RecommItem from "../../../../components/RecommItem";
import RecommItem1 from "../../../../components/RecommItem1";
// 弹出菜品详情
import FoodDetail from "../../../../components/FoodDetail";
// 弹出固定套餐详情
import FoodFixedDetail from "../../../../components/FoodFixedDetail";
//  弹出自选套餐详情
import FoodOptionalDetail from "../../../../components/FoodOptionalDetail";
import CopyURL from "../../../../components/CopyURL";
import {
  Dialog
} from 'vant';
export default {
  name: "search",
  components: {
    Swiper,
    RecommItem1,
    FoodDetail,
    CopyURL,
    FoodFixedDetail,
    FoodOptionalDetail,
  },
  computed: {
    curentStore () {
      //console.log('curentStore')
      return this.$store.getters.curentStore;
    },
    dinersNum () {
      return function () {
        return this.$store.getters.dinersNum;
      };
    },
    getDishNum (dish_id) {
      return function (dish_id) {
        return this.$store.getters.dishNums[dish_id] | 0;
      };
    },
    getTotalDishNum () {
      return function () {
        return this.$store.getters.totalNum | 0;
      };
    }
  },
  data () {
    return {
      showType: true,
      dep_id: "",
      searchText: "",
      hotDatas: {},
      dishList: null,

      curentDishPrice: 0, //当前加购菜品价格
      curentMemberPrice: 0, //当前加购菜品会员价

      special: null,
      charactor: null,
      selectArray: null,
      isShowFoodDetail: false, //是否展示菜品详情
      isShowFixedFoodDetail:false,//是否展示固定套餐菜品详情
      isShowFoodOptionalDetail:false,//是否展示自选套餐菜品详情
      curentDishes: {}, //当前菜品详情
      shoppingCartDetail: {}, //购车详细信息
      tempDishList: {}, //购车详细信息
      tempRecommandDishList: {}, //购车详细信息
      childItem:'',
      tagsList:[]
    };
  },
  methods: {
    getShowSpecial(dishes) {
      //判断是否展示规格
         return (
        dishes.weight_spec == "2" || dishes.weight_spec == "4" ||
        dishes.taste_set || (dishes.dishAdditionalSimpleVOList != null || dishes.dishAdditionalSimpleVOList.length > 0)||dishes.weight_spec == "1"
      );
     
    },
    getCanGoPlay(dishes)
    {
      var canGoPlay = false;
      var item = dishes;
      if(dishes.sell_date != "")
      {
        if(item.sell_dateChange!=true){
        item.sell_date=dishes.sell_date.split('/')
        item.sell_dateChange =true;
        item.sell_week=dishes.sell_week.replace(/[^0-9]/ig, "")
      } 
        var CurrentTime = new Date();
        var startTime = new Date(item.sell_date[0]);
        var endTime = new Date(item.sell_date[1]);
        var year=CurrentTime.getFullYear();
        var month=CurrentTime.getMonth()+1;
        var day=CurrentTime.getDay();
        var hours=CurrentTime.getHours();
        var minutes=CurrentTime.getMinutes();
        var index = 0
        var dataArry =  dishes.sell_week.replace(/[^0-9]/ig, "");
        var arryDate={"1":"周一","2":"周二","3":"周三","4":"周四","5":"周五","6":"周六","0":"周日"}
    
        for(index = 0;index < dishes.sell_week.length ;index++)
      {
        if( dishes.sell_week[index] == day){
          canGoPlay = true;
        }
      }
    if(CurrentTime.getTime()<startTime.getTime() || CurrentTime.getTime() > endTime.getTime())
    {
      canGoPlay = false;
    }
    var currCalT = hours*100+minutes;
    var startCalT =  dishes.sell_time_start.replace(/[^0-9]/ig, "")*1;
    var endCalT = dishes.sell_time_end.replace(/[^0-9]/ig, "")*1;
    if(currCalT < startCalT || currCalT > endCalT)
    {
      canGoPlay = false;
    }
    }
    else{

      canGoPlay = true;
    }
    return canGoPlay;
    },
    addCart (dishes, dish_price, member_price,salepmt_price, showDetail, weight) {
      
      this.isShowFoodDetail = false;
      this.isShowFixedFoodDetail = false;
      this.isShowFoodOptionalDetail = false;
      this.curentDishPrice = Number(dish_price);
      this.curentMemberPrice = Number(member_price);
      this.curentSalepmtPrice = Number(salepmt_price); 
      this.optional_dish = dishes.optional_list;
      var id = dishes.dish_id;
      this.isShowSpecial = this.getShowSpecial(dishes);
      if (showDetail && this.isShowSpecial) {
        this.showFoodDetail(dishes);
      } else {
        this.addDish(dishes, weight);
      }
    },
    delCart (dishes) {
      this.isShowSpecial = this.getShowSpecial(dishes);
      if (this.isShowSpecial) {
        this.toast.info(this.$t("setShopcart"));
        return;
      }
      this.lessDish(dishes);
    },
    onSpecialItemClick (special) {
      //this.toast.info(JSON.stringify(special))
      this.special = special;
    },
    onTagItemClick (charactor) {
      this.charactor = charactor;
      //this.toast.info(JSON.stringify(charactor))
    },
    onSelectItemClick (selectArray) {
      this.selectArray = selectArray;
      //this.toast.info(JSON.stringify(selectArray))
    },
    addDish (dishes, weight) {
      var map = {};
      var price = {
        dish_price: this.curentDishPrice,
        member_price: this.curentMemberPrice
      };
      if (dishes.weight_spec == "2") {
        if (this.special) {
          map["spec_detail"] = JSON.stringify(this.special);
        }
      } else if (dishes.weight_spec == "1") {
        map["spec_detail"] = weight;
      }
      if (this.charactor) {
        map["taste_set"] =this.charactor;
      }
      if (this.selectArray) {
        map["dish_additional"] = this.selectArray;
      }
      if (dishes.weight_spec == "4") {
        if(this.optional_dish){
          map["optional_detail"] = this.optional_dish;
        }
      }

      let id = dishes.dish_id;

      let data = {
        dep_id: this.dep_id,
        company_id: this.curentStore.company_id,
        param: this.curentStore.tb_id, //桌子id
        str_param: id, //菜品id
        param2: 1, //菜品数量
        map: map
      };
      let that = this;
      var num = this.getDishNum(id);
      this.request.addDish(data, function (res) {
        if (res.code == "101") {
          that.updateDishCartId(id, res.msg);
          that.addTotal(dishes.least_number);
          that.refreshDishList();
          // that.stringutils.setDishNum(id, ++num)
          // that.addTotal(1);
          // that.reload(dishType)
          that.toast.success(that.$t("addShopcart"));
          // that.isShowFoodDetail = false
        }else if(res.code == -102 || res.code == -103){
          that.refreshDishList();
        }else {
          that.toast.fail(res.msg);
        }
      });
    },
    dismissFoodDetail () {
      this.charactor = null;
      this.special = null;
      this.selectArray = null;
    },
    // 菜品标签和规则列表查询
    tagspeclist(){
      let data ={
        dep_id: this.dep_id,
        dict_type: "DISH_TAG"
      }
      let that = this
      this.request.tagspeclist(data,function(res){
        if(res.code == "1"){
          that.tagsList = res.data
        }else{
          that.toast.fail(res.msg);
        }
      })
    },
    lessDish (info) {
      //减少菜品

      let data = {
        dep_id: this.curentStore.dep_id,
        param: this.curentStore.tb_id, //桌子id
        str_param: info.cart_id, //菜品id
        param2: 1 //菜品数量
      };
      let that = this;
      var num = this.getDishNum(info.dish_id);
      this.request.delDish(data, function (res) {
        if (res.code >0) {
          that.stringutils.setDishNum(info.dish_id, --num)
          that.addTotal(info.least_number);
        } else {
          that.toast.fail(res.msg);
        }
      });
    },
    //展示菜品详情
    showFoodDetail (dishes) {
      if (dishes.weight_spec == "3") {
        this.isShowFixedFoodDetail = true;
      } else if(dishes.weight_spec == "4") {
         this.isShowFoodOptionalDetail = true;
      }else{
         this.isShowFoodDetail = true;
      }
      this.curentDishes = dishes;
      if(dishes.sell_date != "" && dishes.sell_dateChange !=true){
        dishes.sell_date=dishes.sell_date.split('/')
        dishes.sell_dateChange =true;
        dishes.sell_week=dishes.sell_week.replace(/[^0-9]/ig, "")
      } 
      //初始化规格等信息
      if (dishes.weight_spec == "2" && dishes.spec_detail) {
        var specialList = JSON.parse(dishes.spec_detail);
        this.special = specialList[0];
      } else {
        this.special = null;
      }
      //初始化口味等信息
      if (dishes.taste_set) {
        var taste_set = dishes.taste_set;
        this.charactor = [];
        //初始化charactor
        for (let index = 0; index < taste_set.length; index++) {
          const element = taste_set[index];
          this.charactor[index] = this.getItem(element);
        }
      } else {
        this.charactor = null;
      }
    },

    getItem (item) {
      var selectItem = {};
      this.childItem = item.taste_list;
      for(var index in this.childItem)
      {
        this.childItem[index].checked = false;
      }
      selectItem["taste_name"] =item.taste_name;
      selectItem["taste_name_en"] = item.taste_name_en;
      selectItem["taste_name_my"] = item.taste_name_my;
      selectItem["taste_name_zh"] = item.taste_name_zh;
      selectItem["need_i18n"] = item.need_i18n;
      selectItem["single_multiple"] = item.single_multiple;
      selectItem["is_sys"] = item.is_sys;
      selectItem["taste_list"] = this.childItem;

      return selectItem;
    },
    publishStorage(tempDishList, shoppingCartDetail) {
      //初始化菜品信息
      var dic = {};
      var dontCanGoPlayArray =JSON.parse(JSON.stringify(tempDishList));
      var CanGoPlayArray = JSON.parse(JSON.stringify(tempDishList));
      var tempDishList1 = JSON.parse(JSON.stringify(tempDishList));
      
      var canGoPlayArry = 0;
      var dontCanGoPlayArry = 0;
      var countNum = 0;
      var setNum= 0;
      var    dontCanGoPlayNum = 0;
      var    CanGoPlayNum = 0;
      if (this.tempDishList != null) {
        for (var n in tempDishList) {
          canGoPlayArry = {};
          dontCanGoPlayArry = {};
          dontCanGoPlayNum = 0;
          CanGoPlayNum = 0;
          for (var m in tempDishList[n].dishSimpleVOS) {
            const item = tempDishList[n].dishSimpleVOS[m];
            dic[item.dish_id] = 0;
            tempDishList[n].dishSimpleVOS[m].canGoPlay=this.getCanGoPlay(tempDishList[n].dishSimpleVOS[m]);
            if( tempDishList[n].dishSimpleVOS[m].canGoPlay == true)
            {
              canGoPlayArry[dontCanGoPlayNum++] = tempDishList[n].dishSimpleVOS[m];
            }
            else
            {
             dontCanGoPlayArry[CanGoPlayNum++] = tempDishList[n].dishSimpleVOS[m];
            }
          }
          
      for(var index in canGoPlayArry)
      {
tempDishList[n].dishSimpleVOS[setNum++]=canGoPlayArry[index];
      }
      for(var index in dontCanGoPlayArry){
tempDishList[n].dishSimpleVOS[setNum++]=dontCanGoPlayArry[index];

      }
      setNum= 0;
        }

        // alert("countNum="+countNum+"tempDishList1="+tempDishList1.length)
      }
      //更新购物车缓存
      if (
        shoppingCartDetail != null &&
        shoppingCartDetail.shopping_cart_dishes_vo != null
      ) {
        var shopping_cart_dishes_vo =
          shoppingCartDetail.shopping_cart_dishes_vo;
        var totalNum = 0;
        var countNum = 0
        for (const key in shopping_cart_dishes_vo) {
          if (shopping_cart_dishes_vo.hasOwnProperty(key)) {
            const item = shopping_cart_dishes_vo[key];
            this.updateDishCartId(item.dish_id, key);
            if(item.weight_spec == "2" )
            { 
              var specialList = JSON.parse(item.spec_detail);
              if(dic[specialList[0].id] == null)
              {
                dic[specialList[0].id] = 0;
              }
              dic[specialList[0].id] += item.dish_num;
            }
              dic[item.dish_id] += item.dish_num;
              // alert(dic[item.dish_id]+"id="+item.dish_id);
            totalNum = Number(totalNum) + Number(item.dish_num);
          }
        }
        this.$store.dispatch("setTotalNum", totalNum);
      } else {
        this.$store.dispatch("setTotalNum", 0);
      }
      this.$store.dispatch("setDishNums", dic);
    },
    getHotDish () {
      let data = {
        dep_id: this.curentStore.dep_id,
         param1: this.curentStore.tb_id,
        company_id: this.curentStore.company_id
      };
      let that = this;
      this.request.hotDish(data, function (res) {
        if (res.code == "1") {
          if (res.data != null) {
            that.showType = false;
            that.dishList = res.data.recommandVos;
            that.tempDishList = res.data;
            for (let i in that.dishList) {
              that.dishList[i].canGoPlay=that.getCanGoPlay(that.dishList[i]);
            }
          }else{
            that.showType = true;
          }
        } else {
          that.toast.fail(res.msg);
        }
      });
    },
    addTotal(num) {
      var totalNum = this.getTotalDishNum();
      this.$store.dispatch("setTotalNum", Number(totalNum));
    },
    getDishList() {
      let data = {
        dep_id: this.dep_id,
        company_id: this.curentStore.company_id,
        param: this.$store.getters.dinersNum,
        param1: this.curentStore.tb_id,
        map: {
          take_out: parseInt(this.$store.getters.take_out),
          appoint_time: ""
        }
      };
      let that = this;

      this.request.dishList(data, function(res) {
        if (res.code == "1") {
          if (res.data != null) {
            //更新购物车缓存
            that.menuList=[];
            that.tempDishList={};
            that.shoppingCartDetail={};
            

            that.tempDishList = res.data.dishList;
            for(let idx=0,len=res.data.dishList.length;idx<len;idx++)
            {
              that.menuList.push(res.data.dishList[idx]);
            }
            that.salesList = res.data.dishList;//促销菜品列表
            that.tempRecommandDishList = res.data.recommandDishList;
            that.shoppingCartDetail = res.data.shoppingCartDetail;
            that.generateDishList(res.data.dishList);
            that.recommandDishList = res.data.recommandDishList;// 店家推荐热销
            var canGoPlayArry={};
            var dontCanGoPlayArry={};
            var canGoPlayNum=0;
            var dontCanGoPlayNum=0;
            var setNum=0;
             
      for (let i in that.recommandDishList) {
        that.recommandDishList[i].canGoPlay=that.getCanGoPlay(that.recommandDishList[i]);
        if(that.recommandDishList[i].canGoPlay == true)
        {
          canGoPlayArry[canGoPlayNum++]=that.recommandDishList[i];
        }
        else{
          dontCanGoPlayArry[dontCanGoPlayNum++]= that.recommandDishList[i];
        }
      }
      for(var n in canGoPlayArry)
      {
that.recommandDishList[setNum++]=canGoPlayArry[n];
      }
      for(var n in dontCanGoPlayArry){
that.recommandDishList[setNum++]=dontCanGoPlayArry[n];

      }
            
            that.publishStorage(that.tempDishList, that.shoppingCartDetail);
          }
        } else {
          that.toast.fail(res.msg);
        }
      });
    },
    refreshDishList() {
      let data = {
        dep_id: this.dep_id,
        company_id: this.curentStore.company_id,
        param: this.$store.getters.dinersNum,
        param1: this.curentStore.tb_id,
        map: {
          take_out: parseInt(this.$store.getters.take_out),
          appoint_time: ""
        }
      };
      let that = this;

      this.request.dishList(data, function(res) {
        if (res.code == "1") {
          if (res.data != null) {
            that.publishStorage(res.data.dishList, res.data.shoppingCartDetail);
          }
        } else {
          that.toast.fail(res.msg);
        }
      });
    },
    backClick () {
      window.history.go(-1);
    },
    updateDishCartId(id, cart_id) {
      
      for(let t in this.dishTypeList){
      let list = this.dishTypeList[t].list
      for(let a in list){
        let dishes = list[a].dishSimpleVOS;
        for(let d in dishes){
          if (dishes[d].dish_id === id) {
          dishes[d].dish_id_cart = cart_id;
          }
        }
      }
      }
      for (let i in this.recommandDishList) {
        if (this.recommandDishList[i].dish_id === id) {
          this.recommandDishList[i].dish_id_cart = cart_id;
        }
      }
    },
    generateDishList(dishList) {
      //对菜品分类处理

      var dishTypeList = [];
      var index = 0;
      for (var idx in dishList) {
        var element = dishList[idx];
        var type = element.type_id;
        const typeName = element.type_name;
        const typeName_en = element.type_name_en;

        var typeObj = {};
        var list = [];
        list.push(element);
        typeObj["type"] = type;
        typeObj["typeName"] = typeName;
        typeObj["typeName_en"] = typeName_en;
        typeObj["list"] = list;
        typeObj["index"] = index;
        dishTypeList[type] = typeObj;
        index++;
      }
      //第一个 加上切换
      index = 0;
      for (var i in dishTypeList) {
        dishTypeList[i].index = index;
        index++;
      }
      this.dishTypeList = dishTypeList;
    }
  },
  created () {
    if (this.curentStore) {
      this.dep_id = this.curentStore.dep_id;
      this.getHotDish();
      this.getDishList();
    }
  }
};
</script>
<style scoped>
.van-search__content {
  background-color: white;
}

.van-popup {
  background-color: transparent;
  width: 90%;
  padding: 80px 0;
  overflow: hidden;
}

.mainType {
  float: left;
  top: 10%;
  left: 10%;
}

.closeImg {
  margin-top: 20px;
  margin-bottom: 20px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}

.swipe {
  padding: 10px;
}

.van-swipe {
  border-radius: 10px;
}

.botom {
  height: 55px;
  position: absolute;
  bottom: 0;
}

.clearFloat {
  clear: both;
}

.dish-list {
  margin-bottom: 50px;
}

.noresult {
  padding-top: 150px;
  padding-bottom: 150px;
}

.noresult-text {
  color: #808080;
  margin-bottom: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, 0);
}
.closeImg2{
  position: absolute;
  top: 10px;
  left: 18px;
  z-index: 99999;
}
</style>