<!-- 公共会员登录组件 -->
<template>
    <div class="col-100">
         <div class="row">
            <!-- 未登录 -->
            <div class="col-100 vipBg" style="margin:0px 20px 0 20px;" v-if="memberPhone == '' || memberPhone == null">
                <button class="vipBtn"  @click.stop="vipLoginClick">
                    <img src="../../../style/images/vipCard.png" alt="" width="15" style="position: relative;top: 1px;">
                    <span class="font12 left4" style="position: relative;top: -1px;color: #F1BE30;">{{$t('vipMsg.vipLogin')}}</span>
                </button>
            </div>
      <!-- 已登录 -->
            <div class="col-100 vipBg font12" style="padding-right: 14px;margin:0px 20px 0 20px;" v-else>
                <img src="../../../style/images/UnvipCard.png" alt="" width="15" style="position: relative;top: 2px;">
                <span style="color:white" class="left10">{{member_name}} / {{memberPhone}} / {{member_grade_name}}</span>
                <button v-if="order_status == 0" class="exitBtn" style="" @click="exitClick">{{$t('vipMsg.exit')}}</button>
            </div>
        </div>
        <van-dialog v-model="vipMessageShow" show-cancel-button class=" vipDialog" confirm-button-color="#EB3C1C" :confirm-button-text="$t('shopcart.confirm')" :cancel-button-text="$t('cancel')" @confirm="confirmClick" @cancel="cancelClick"> 
          <span style="color:#505050" class="font14">{{$t('vipMsg.vip')}}：</span><input type="text" :placeholder="$t('vipMsg.vipNum')" v-model="member_phone" style="border: 1px #E5E5E5 solid;border-radius: 15px;height: 28px;padding-left: 10px;color:#666;font-size:12px;width:75%">
        </van-dialog>
         <van-dialog  v-model="vipExitShow" show-cancel-button class="vipDialog" confirm-button-color="#EB3C1C" :confirm-button-text="$t('shopcart.confirm')" :cancel-button-text="$t('cancel')" @confirm="confirmExitClick"> 
          <span class="font14 fontWeight">{{$t('vipMsg.exitVip')}}</span>
        </van-dialog>
     </div>
</template>
<script>
export default {
  name: "tags",
  props: {
    memberPhone: {
      type: String,
      default: ''
    },
    member_name: {
      type: String,
      default: ''
    },
    member_grade_name: {
      type: String,
      default: ''
    },
    discount_set: {
      type: String,
      default: ''
    },
    order_status: {
      type: Number,
      default: 0
    },
  },
  computed: {
    curentStore() {
      return this.$store.getters.curentStore;
    }
  },
  data() {
    return {
      vipMessageShow:false,
      vipExitShow:false,
      member_phone:''
    };
  },
  methods: {
    // vipLoginClick(){
    //     this.$emit("vipLogin");
    // },
    vipLoginClick(){
      this.vipMessageShow = true
      
    },
    exitClick(){
      this.vipExitShow = true
    },
    confirmClick(){
      this.getSetMember()
      
      this.member_phone=''
    },
    confirmExitClick(){
      this.member_phone=''
      this.getSetMember()
    },
    cancelClick(){
      this.member_phone=''
    },
    getSetMember(){
       if (this.$route.query.token == null) {
        this.$store.dispatch("setToken", this.$store.getters.token);
      } else {
        this.$store.dispatch("setToken", this.$route.query.token);
      }
      let data = {
        dep_id: this.curentStore.dep_id,
        member_phone: this.member_phone
      };
      let that = this;
      this.request.getSetMember(data, function(res) {
        if(res.code == "11"){
          that.toast.success("登录成功！")
          that.$emit("confirmClick");
        }else{
           that.$dialog.alert({
            message: res.msg,
            confirmButtonColor: "#EB3B1C",
            confirmButtonText:'确定'
          }).then(() => {
              
            })
        }
      })
    },
  },
  created() {
    // this.getSetMember()
  },
  mounted() {
    
  }
};
</script>
<style scoped>
.vipBg{
    background: #E4C269;
    padding: 6px 0 6px 13px;
    border-radius: 4px 4px 0 0;
}
.vipBtn{
    height: 18px;
    line-height: 18px;
    border: none;
    border-radius: 4px;
    padding-right: 8px;
    padding-left: 3px;
    background: white;
}
.exitBtn{
    float: right;
    height: 16px;
    line-height: 16px;
    border-radius: 4px;
    border: 1px #505050 solid;
    padding: 0 5px 0 5px;
    background:none;
    color:#505050
}
.vipDialog .van-dialog__content{
  margin: 28px 20px;
  text-align: center;
}

::-webkit-input-placeholder { 
    color: #aaa; 
}
:-moz-placeholder { 
    color: #aaa;
}
::-moz-placeholder { 
    color: #aaa;
} 
:-ms-input-placeholder { 
    color: #aaa;
}

</style>