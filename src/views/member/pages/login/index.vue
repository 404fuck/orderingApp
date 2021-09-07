<template>
  <div style="padding-bottom:0px;z-index:-1;padding: 0 27px;" class="codeStyle">
    <div class="row loginCss" v-if="memberMsg">
        <div class="col-100 center" style="font-size:24px">门店会员登录</div>
        <div class="col-100" style="margin-top: 38px;">
            <span>会员手机号：</span><input type="number" placeholder="请输入手机号" style="padding-bottom:7px">
        </div>
        <div class="col-100" style="margin-top: 28px;">
            <span>验证码：</span><span style="border-bottom: 1px rgba(0, 0, 0, 0.1) solid;padding-bottom:7px"><input type="number" placeholder="请输入验证码" style="width: 40%;border-bottom:none"><span>|</span><span style="color:#EB3C1C;margin-left:8px">获取验证码</span></span>
        </div>
        <div class="col-100 top20">
            <span style="color:#FE813C" @click="unMemberLogin()">Mjoyfood账号登录</span>
        </div>
        <div class="col-100" style="margin-top: 40px;text-align: center;">
            <button class="loginBtn" @click="memberLogin()">登录</button>
        </div>
    </div>
    <div class="row loginCss" v-if="unMemberMsg">
        <div class="col-100 center" style="font-size:24px">门店会员登录</div>
        <div class="col-100" style="margin-top: 38px;">
            <span>用户名：</span><input type="number" placeholder="请输入用户名" style="padding-bottom:7px;width: 80%;">
        </div>
        <div class="col-100" style="margin-top: 28px;">
            <span>密&nbsp;&nbsp;&nbsp;码：</span><input type="number" placeholder="请输入密码" style="padding-bottom:7px;width: 80%;">
        </div>
        <div class="col-100 top20">
            <span style="color:#FE813C" @click="memberLogin()">会员手机号登录</span>
        </div>
        <div class="col-100" style="margin-top: 40px;text-align: center;">
            <button class="loginBtn" @click="unMemberLogin()">登录</button>
        </div>
    </div>
    <van-dialog v-model="memberError" :confirm-button-text="$t('shopcart.confirm')" confirm-button-color="#EB3B1C"  @confirm="confirmClick"> 
        <span class=" vipDialog">非本门店会员</span>
    </van-dialog>
  </div>
</template>
<script>

export default {
  name: "login",
  components: {
    
  },
  computed: {
    language: {
      get() {
        return this.$store.getters.language;
      },
      set(val) {}
    },
    curentStore() {
      return this.$store.getters.curentStore;
    },
  
  },
  data() {
    return {
      memberMsg:true,
      unMemberMsg:false,
      memberError:false
    };
  },
  methods: {
    //   MjoyFood账号登录
      unMemberLogin(){
          this.unMemberMsg = true
          this.memberMsg = false
      },
    //   会员手机号登录
      memberLogin(){
          this.unMemberMsg = false
          this.memberMsg = true
      },
    //   会员登录（登录按钮）
    memberLogin(){
        this.memberError = true
        this.unMemberMsg = false
        this.memberMsg = false
    },
    confirmClick(){
        this.memberError = false
        this.memberMsg = true
    }
  },

  created() {
  
  },
  mounted() {

  },

};
</script>

<style scoped>
.codeStyle{
  background-image: url('../../../../style/images/bg.png');
  background-size: cover;
  background-repeat: no-repeat;
  padding-bottom: 0px !important;
  height: 100%;
}
.loginCss{
    background: white;
    border-radius: 10px;
    padding: 30px 40px;
    font-size: 12px;
    position: relative;
    top: 96px;
}
.loginBtn{
    background: #EB3C1C;
    border: none;
    color: white;
    border-radius: 14px;
    padding: 4px 23px;
}
input{
    border: none;
    border-bottom: 1px rgba(0, 0, 0, 0.1) solid;
}
.vipDialog{
    margin: 30px;
    display: block;
    text-align: center;
}
</style>