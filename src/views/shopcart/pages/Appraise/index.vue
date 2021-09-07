<template>
  <div class="main-layout">
    <div class="row" style="border-radius: 10px; background: white; box-shadow: 0 5px 18px 4px #E3E3E3; margin: 30px 15px 15px; text-align: center; padding-bottom: 27px;">
      <div class="col-100">
        <p class="fontWeight" style="color:#505050">{{$t('shangjia')}}</p>
      </div>
      <div class="col-100">
          <h6 style="font-size:16px" v-text="generateText"></h6>
          <van-rate class="top10"
            v-model="requestData.generate"
            @change="onGenerateChange"
            :size="24"
            color="#F52B79"
            void-icon="star"
            void-color="#D3D9E2"
            />
      </div>
      <div class="col-100 top20">
          <span class="font12 appraiseSpan" style="color:#6D7278;margin-right:10px">{{$t('taste')}}</span>
          <van-rate style="display: inline-block;"
            v-model="requestData.taste"
            @change="onTasteChange"
            :size="13"
            color="#F52B79"
            void-icon="star"
            void-color="#D3D9E2"
            />
            <span v-text="tasteText" class="font12 littleSpan" style="color:rgba(0, 0, 0, 0.25)"></span>
      </div>
      <div class="col-100 top10">
          <span class="font12 appraiseSpan" style="color:#6D7278;margin-right:10px">{{$t('Enviro')}}</span>
          <van-rate
          style="display: inline-block;"
            v-model="requestData.environment"
            @change="onEnvironmentChange"
            :size="13"
            color="#F52B79"
            void-icon="star"
            void-color="#D3D9E2"
            />
            <span v-text="environmentText" class="font12 littleSpan" style="color:rgba(0, 0, 0, 0.25)"></span>
      </div>
      <div class="col-100 top10">
          <span class="font12 appraiseSpan" style="color:#6D7278;margin-right:10px">{{$t('service')}}</span>
          <van-rate style="display: inline-block;" 
          v-model="requestData.service"
          @change="onServiceChange"
            :size="13"
            color="#F52B79"
            void-icon="star"
            void-color="#D3D9E2"
            />
            <span v-text="serviceText" class="font12 littleSpan" style="color:rgba(0, 0, 0, 0.25)"></span>
      </div>
    </div>
    <div class="row" style="border-radius: 10px; background: white; box-shadow: 0 5px 18px 4px #E3E3E3; margin: 15px; text-align: center; padding-bottom: 27px;">
      <div class="col-100" style="background:#F8F8F8;margin:18px 14px;padding: 0 12px;">
          <textarea v-model="requestData.comment" :placeholder="$t('textMiaoshu')" name="" id="" cols="30" rows="8" style="border: none;background: none;"></textarea>
      </div>
      <div class="col-100 left" style="padding: 0 14px;">
        <span class="font14 fontWeight" style="color:#505050">{{$t('renjun')}}</span>
        <input v-model="requestData.people_avg" class="font14" type="number" :placeholder="$t('renjunTip')" style="border:none;color:color:#505050">
      </div>
    </div>
    <div class="row">
      <div class="col-100">
        <button class="button button-round submitBtn" @click="submitBtn">{{$t('submit')}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  name: "Appraise",
  components: {
    
  },
  data() {
    return {
      generateText:'总体',
      tasteText:'',
      environmentText:'',
      serviceText:'',
      requestData:{
        anonymous: 1,//是否匿名,0否,1是
        comment: "",//评论内容
        dly_sts: 0,//是否外卖
        environment: 0,//环境得分
        generate: 0,//综合得分
        people_avg: '',//人均价格 
        service: 0,//服务得分
        taste: 0,//口味得分
      }
    };
  },
  computed: {
    curentStore() {
      return this.$store.getters.curentStore;
    },
  },
  methods: {
    onGenerateChange(value){
      if(value == 1 || value == 0){
        this.generateText = this.$t("bumanyi")
      }else if(value == 2){
        this.generateText = this.$t("yiban")
      }else if(value == 3){
        this.generateText = this.$t("bucuo")
      }else if(value == 4){
        this.generateText = this.$t("manyi")
      }else{
        this.generateText = this.$t("chaobang")
        this.requestData.taste = 5
        this.requestData.service = 5
        this.requestData.environment = 5
        this.tasteText = this.$t("chaobang")
        this.environmentText = this.$t("chaobang")
        this.serviceText = this.$t("chaobang")
      }
    },
    onTasteChange(value){
      if(value == 1 || value == 0){
        this.tasteText = this.$t("bujia")
      }else if(value == 2){
        this.tasteText = this.$t("yiban")
      }else if(value == 3){
        this.tasteText = this.$t("bucuo")
      }else if(value == 4){
        this.tasteText = this.$t("manyi")
      }else{
        this.tasteText = this.$t("chaobang")
      }
    },
    onEnvironmentChange(value){
      if(value == 1 || value == 0){
        this.environmentText = this.$t("bujia")
      }else if(value == 2){
        this.environmentText = this.$t("yiban")
      }else if(value == 3){
        this.environmentText = this.$t("bucuo")
      }else if(value == 4){
        this.environmentText = this.$t("manyi")
      }else{
        this.environmentText = this.$t("chaobang")
      }
    },
    onServiceChange(value){
      if(value == 1 || value == 0){
        this.serviceText = this.$t("bujia")
      }else if(value == 2){
        this.serviceText = this.$t("yiban")
      }else if(value == 3){
        this.serviceText = this.$t("bucuo")
      }else if(value == 4){
        this.serviceText = this.$t("manyi")
      }else{
        this.serviceText = this.$t("chaobang")
      }
    },
    submitBtn(){
      if(this.requestData.taste == 0){
        this.toast.fail(this.$t("tasteTip"));
      }else if(this.requestData.environment == 0){
        this.toast.fail('请给环境评分！');
      }else if(this.requestData.service == 0){
        this.toast.fail('请给服务评分！');
      }else if(this.requestData.generate == 0){
        this.toast.fail('请评价店铺！');
      }else if(this.requestData.comment == ''){
        this.toast.fail('请输入评价内容！');
      }else if(this.requestData.people_avg == ''){
        this.toast.fail('请输入人均价格！');
      }else{
        this.submitAppraise();
      }
      
    },
    submitAppraise(){
      this.requestData.company_id = this.curentStore.company_id
      this.requestData.dept_id = this.curentStore.dep_id
      this.requestData.order_id = this.$route.query.order_id
      let that = this
      this.request.addcomment(this.requestData, function (res) {
        if(res.code == "1"){
          window.location.href = "./shopcart.html#/AppraiseFinish?order_id=" + that.requestData.order_id;
        }else{
          that.toast.fail(res.msg);
        }
      })
    }
  },
  created() {
    
  },
};
</script>
<style scoped>
.submitBtn{
  background: linear-gradient(to bottom left, #FF8237 , #F4257C,#EA3D15);
  color: white;
  border: none;
  height: 40px;
  width: 180px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 60px;
}
.row textarea{
  height: auto !important;
  resize: none;
}
.van-rate__item{
  padding: 0 4px !important;
}
.appraiseSpan{
  width: 68px;
  display: inline-block;
}
.littleSpan{
  width: 55px;
  display: inline-block;
}
</style>