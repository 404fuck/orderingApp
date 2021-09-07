<template>
  <div>
    <div class="login-screen-title">
      <img src="../../../style/images/logo.png" width="100" style="padding-top: 70px;" />
    </div>
    <form style="margin-top: 70px;">
      <div class="content-block">
        <div class="row">
          <div class="col-100">
            <van-cell-group>
              <van-field
                v-model="phone"
                required
                clearable
                :label="$t('phone')"
                right-icon="question-o"
                :placeholder="$t('writePhone')"
              />
            </van-cell-group>
          </div>
          <div class="col-100 top10">
            <van-cell-group>
              <van-field
                v-model="imei"
                required
                clearable
                label="IMEI"
                :placeholder="$t('register.IMEI')"
              />
            </van-cell-group>
          </div>
          <div class="col-100 top10">
            <van-cell-group>
              <van-field
                v-model="pass"
                type="password"
                :label="$t('register.pwd')"
                :placeholder="$t('register.writePwd')"
                required
              />
            </van-cell-group>
          </div>
          <div class="col-100 top10">
            <van-cell-group>
              <van-field
                v-model="repass"
                type="password"
                :label="$t('register.confirmPwd')"
                :placeholder="$t('register.plConfirmPwd')"
                required
              />
            </van-cell-group>
          </div>
          <div class="col-100 top10">
            <van-cell-group>
              <van-field
                v-model="code"
                center
                clearable
                :label="$t('QR_code')"
                :placeholder="$t('writeCode')"
              >
                <van-button
                  slot="button"
                  size="small"
                  type="primary"
                  @click="sendCode"
                >{{$t('sendCode')}}</van-button>
              </van-field>
            </van-cell-group>
          </div>

          <div class="col-100 top10">
            <p class="right-style">
              {{$t('register.zhanghao')}}
              <a href>{{$t('logins')}}</a>
            </p>
          </div>
        </div>
      </div>
      <div class="content-block">
        <div class="row">
          <div class="col-33"></div>
          <div class="col-33">
            <input
              @click="register"
              type="button"
              :value="$t('register.register')"
              class="button button-big"
            />
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
  components: {},
  computed: {},
  data() {
    return {
      phone: "17521064021",
      imei: "",
      pass: "",
      repass: "",
      code: "",
      count: 0,
      token: "44159s80aKj7Kz1IMC2p1561116207578",
      timer: null
    };
  },
  methods: {
    register() {
      //验证数据
      if (!this.stringutils.isMobileNumber(this.phone)) {
        return;
      }
      if (this.stringutils.isEmpty(this.imei)) {
        this.toast.info(this.$t("register.IMEI"));
        return;
      }
      if (this.stringutils.isEmpty(this.pass)) {
        this.toast.info(this.$t("register.writePwd"));
        return;
      }
      if (this.stringutils.isEmpty(this.repass)) {
        this.toast.info(this.$t("register.plConfirmPwd"));
        return;
      }

      if (this.pass !== this.repass) {
        this.toast.fail(this.$t("register.unSamePwd"));
        return;
      }
      if (this.stringutils.isEmpty(this.code)) {
        this.toast.info(this.$t("writeCodes"));
        return;
      }

      //提交数据
      let data = {
        phone: this.phone,
        pwd: this.pass,
        confirmPwd: this.repass,
        code: this.code,
        token: this.token
      };
      let that = this;
      this.request.register(data, function(res) {
        if (res.code == "1") {
          that.toast.success(this.$t("register.registerSuccess"));
        } else {
          that.toast.fail(res.msg);
        }
      });
    },

    sendCode() {
      if (!this.stringutils.isMobileNumber(this.phone)) {
        return;
      }

      // 验证码倒计时
      if (!this.timer) {
        let data = { phone: this.phone };
        let that = this;
        this.request.sendSms(data, function(res) {
          if (res.code == "1") {
            that.toast.success(this.$t("sendSuccess"));
          } else {
            that.toast.fail(res.msg);
          }
        });

        this.count = 10;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= 60) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    }
  }
};
</script>
<style>
</style>
