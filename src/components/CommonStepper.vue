<!-- 公共步进组建 -->
<template>
  <div class="commonstepper" style="display: inline-flex;float: right;">
    
    <!-- 普通菜 -->
      <span style="position:relative" v-if="dishes.weight_spec  == 0|| dishes.weight_spec  == 3 ">
         <span v-if="(dishes.dishAdditionalSimpleVOList == null || dishes.dishAdditionalSimpleVOList .length <1) && (dishes.taste_set == null || dishes.taste_set.length <1)">
            <!-- <img
              v-show="dishNums[dishId]>0"
              src="../style/images/less.png"
              alt
              width="16"
              height="16"
              @click.stop="less"
            /> -->
            <span v-if="canGoPlay==false || dishNums[dishId]>=99">
              <img src="../style/images/addGray.png" alt width="24" height="24" />
            </span>
            <span v-else>
              <img  src="../style/images/add.png" alt width="24" height="24" @click.stop="add" />
            </span>
            <span
              class="addText"
              v-show="dishNums[dishId]>0"
            >
            {{dishNums[dishId]}}
              <!-- <input type="number" oninput="if(value>99)value=99;if(value<1)value=1" v-model="dishNums[dishId]" min="1" max="99" @click.stop="" class="inputNum" @change="handleChangeName(dishNums[dishId])"> -->
            </span>
            
         </span>
         <span v-else>
           <span>
          <span class="czStyle"  @click.stop="add">{{$t('dish.selectSpecil')}}</span>
          <span class="cztext" v-show="dishNums[dishId]>0">
            <span v-if="dishNums[dishId]>= 99" style="position: relative;top: -3px;">…</span>
            <span v-else>{{dishNums[dishId]}}</span>
          </span>
        </span>
         </span>
      </span>
      <!-- 称重菜 -->
      <span class="top5" v-else-if="dishes.weight_spec  == 1"  style="position:relative">
        <span class="czStyle" @click.stop="add">{{$t('dish.chengzhong')}}</span>
        <span class="cztext" v-show="dishNums[dishId]>0">
          <span v-if="dishNums[dishId]>= 99" style="position: relative;top: -3px;">…</span>
          <span v-else>{{dishNums[dishId]}}</span>
        </span>
      </span>
      <!-- 规格菜 -->
      <span class="top5" v-else-if="dishes.weight_spec  == '2'" style="position:relative">
        <span>
          <span class="czStyle"  @click.stop="add">{{$t('dish.selectSpecil')}}</span>
          <span class="cztext" v-show="dishNums[dishId]>0">
            <span v-if="dishNums[dishId]>= 99" style="position: relative;top: -3px;">…</span>
            <span v-else>{{dishNums[dishId]}}</span>
          </span>
        </span>
      </span>
      <!-- 自选套餐 -->
      <span class="top5" v-else-if="dishes.weight_spec  == 4"  style="position:relative">
        <span class="czStyle" @click.stop="add">{{$t('dish.selectDish')}}</span>
        <span class="cztext" v-show="dishNums[dishId]>0">
          <span v-if="dishNums[dishId]>= 99" style="position: relative;top: -3px;">…</span>
          <span v-else>{{dishNums[dishId]}}</span>
        </span>
      </span>
    </div>
</template>
<script>
export default {
  name: "commonstepper",
  props: {
    dishes: {
      type: Object,
      default: null
    },
    dishId: {
      default: 0
    },
    salepmType:{
      type: String,
      default: ''
    },
    canGoPlay:{
      type: Boolean,
      default: false
    },
  },
  computed: {
    dishNums: {
      get() {
        return  this.$store.getters.dishNums;
      },
      set(val) {}
    }
  },
  data() {
    return {
      selectName:1,
      defaultPhoneHeight:'', //屏幕默认高度
      nowPhoneHeight:'' ,//屏幕现在的高度
    };
  },
  methods: {
    less() {
      this.$emit("delCart");
    },
    add() {
      this.$emit("addCart");
    },
    handleChangeName(value){
      if (value === 0) {
        return false;
      }
      this.$emit("updateDishNum", value);
    }

  },
  created(){
  },
  mounted(){
    this.defaultPhoneHeight = window.innerHeight
    window.onresize = ()=>{
        this.nowPhoneHeight = window.innerHeight
    }
  },
  watch: {
    nowPhoneHeight(){
      if(this.defaultPhoneHeight != this.nowPhoneHeight){
          //手机键盘被唤起了。
    }else{
          //手机键盘被关闭了。
    }
    },
    selectName (curVal, oldVal) {
  // 实现input连续输入，只发一次请求
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.handleChangeName(curVal)
    }, 500)
    
  },
  },
};
</script>
<style scoped>
.addText{
  background: #FE813C;
    color: white;
    border-radius: 50%;
    font-size: 10px;
    transform: scale(0.8);
    display: inline-block;
    position: absolute;
    right: -7px;
    margin-top: -6px;
    padding: 1px;
    min-width: 14px;
    min-height: 14px;
    line-height: 14px;
}
.commonstepper {
  text-align: center;
}
.czStyle{
  background: #EB3C1C;
  border-radius: 10px;
  color: white;
  padding: 1px 7px;
  font-size: 12px;
  display: inline-block;
  transform: scale(0.9);
  height: 22px;
  line-height: 22px;
}
.cztext{
  width: 14px;
    height: 14px;
    background: #FE813C;
    color: white;
    border-radius: 50%;
    font-size: 10px;
    transform: scale(0.8);
    display: inline-block;
    position: absolute;
    right: -4px;
    top: -6px;
    line-height: 14px;
}
.inputNum{
  width: 30px;
  height: 24px;
  border: 1px #cccccc solid;
  text-align: center;
  border-radius: 4px;
}
</style>