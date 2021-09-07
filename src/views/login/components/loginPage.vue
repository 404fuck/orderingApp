<template>
  <div>
    <div class="login-screen-title">
      <img src="../../../style/images/logo.png"
           width="100"
           style="padding-top: 70px;">
    </div>
    <form style="margin-top: 70px;">
      <div class="content-block">
        <div class="row">
          <div class="col-100">
            <van-cell-group>
              <van-field v-model="phone"
                         required
                         clearable
                         :label="$t('phone')"
                         :placeholder="$t('writePhone')" />
            </van-cell-group>
          </div>
          <div class="col-100 top10">
            <van-cell-group>
              <van-field v-model="code"
                         type="number"
                         pattern="[0-9]*"
                         center
                         clearable
                         :label="$t('QR_code')"
                         :placeholder="$t('writeCode')"
                         @keyup.enter="login">
                <van-button slot="button"
                            size="small"
                            type="primary"
                            @click="sendCode"
                            :disabled="!show">
                  <span class="checkbox-text"
                        v-show="show">{{$t('sendCode')}}</span>
                  <span class="checkbox-text"
                        v-show="!show">{{count}} s</span>
                </van-button>
              </van-field>
            </van-cell-group>
          </div>
        </div>
      </div>
      <div class="content-block">
        <div class="row">
          <div class="col-33"></div>
          <div class="col-33">
            <input type="button"
                   :value="$t('logins')"
                   class="button button-big"
                   @click="login">
          </div>
          <div class="col-33"></div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  components: {

  },
  data () {
    return {
      phone: "15277706660",
      code: "",
      show: true,
      count: 0,
      timer: null,
    }
  },
  methods: {
    login () {
      //验证数据
      if (!this.stringutils.isMobileNumber(this.phone)) {
        return;
      }
      if (this.stringutils.isEmpty(this.code)) {
        this.toast.fail(this.$t('writeCodes'))
        return;
      }
      //提交数据
      let data = {
        phone: this.phone,
        verifyCode: this.code,
      }
      let that = this;
      this.request.login(data, function (res) {

        if (res.code == '1') {
          that.toast.success(this.$t('login.loginSuccess'))
          window.history.go(-1);
        } else {
          that.toast.fail(res.msg)
        }
      })
    },
    sendCode () {

      if (!this.stringutils.isMobileNumber(this.phone)) {
        return;
      }
      // 验证码倒计时
      if (!this.timer) {
        let data = {
          phone: this.phone
        };
        let that = this;
        this.request.sendsms(data, function (res) {

          if (res.code == '1') {
            that.count = 10
            that.show = false
            that.timer = setInterval(() => {
              if (that.count > 0 && that.count <= 60) {
                that.count--
              } else {
                that.show = true
                clearInterval(that.timer)
                that.timer = null
              }
            }, 1000)
            // that.toast.success('发送成功')
          } else {
            that.toast.fail(that.$t('login.sendFail'))
          }
        })

      }
    }
  },
  created () {
  },
}
</script>
<style>
</style>
