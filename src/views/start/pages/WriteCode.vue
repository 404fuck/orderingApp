<template>
  <div class="box writeCode">
    <div class="card">
      <div class="card-header font14 center">{{$t('PIN.Order PIN')}}</div>
      <div class="card-content">
        <div class="card-content-inner">
          <van-password-input
            class="van-password-input"
            :value="value"
            :length="4"
            :gutter="15"
            :focused="showKeyboard"
            :mask="false"
            @focus="showKeyboard = true"
          />
          <div class="row" style="padding: 10px;">
            <div class="col-50 left-style">
              <span class="font12 top10" style="color:#808080;">{{$t('PIN.Forget PIN')}}</span>
            </div>
            <div class="col-50 right-style">
              <span class="font12 top10" style="color:#FE813C;">
                <img
                  src="../../../style/images/bell.png"
                  alt
                  width="14"
                  height="14"
                  style="position: relative;top: 2px;"
                />
                <span style="margin-left:2px" @click="forgotCLick">{{$t('PIN.Attendant call')}}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer font14 center" style="color:#EB3B1C" @click="sendCodeClick">{{$t('PIN.Confirm')}}</div>
    </div>
    <van-number-keyboard
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false"
    />
  </div>
</template>
<script>
export default {
  name: "startpage",
  computed: {
    curentStore() {
      return this.$store.getters.curentStore;
    }
  },
  data() {
    return {
      value: "",
      showKeyboard: true
    };
  },
  methods: {
    onInput(key) {
      this.value = (this.value + key).slice(0, 4);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    forgotCLick() {
      this.callBell("【" + this.curentStore.tb_name + "桌】呼叫忘记安全码");
    },
    callBell(name){
      let data = {
        dep_id: this.curentStore.dep_id,
        company_id: this.curentStore.company_id,
        param: this.curentStore.tb_id,
        str_param: this.curentStore.tb_name,
        str_param1: name,
        str_param2:6
      };
      let that = this;

      this.request.callSafeKey(data, function(res) {
        if (res.code == "1") {
          that.toast.info(that.$t("bellSuccess"));
          that.isShowService = false;
        } else {
          that.toast.fail(res.msg);
        }
      });
    },
    // callBell(name) {
    //   let data = {
    //     dep_id: this.curentStore.dep_id,
    //     company_id: this.curentStore.company_id,
    //     param: this.curentStore.tb_id,
    //     str_param: this.curentStore.tb_name,
    //     str_param1: name,
    //     str_param2:6
    //   };
    //   let that = this;

    //   this.request.callBell(data, function(res) {
    //     if (res.code == "1") {
    //       that.toast.info(that.$t("bellSuccess"));
    //       that.isShowService = false;
    //     } else {
    //       that.toast.fail(res.msg);
    //     }
    //   });
    // },
    sendCodeClick() {
      if (this.value != null && this.value.length == 4) {
        this.showKeyboard = false;
        this.$emit("sendCodeClick", this.value);
      }
      this.value=''
    },
    closeClick() {
      this.showKeyboard = false;
      this.$emit("closeClick");
    }
  },
  created() {
  }
};
</script>

<style scoped>
.card {
  width: 75%;
  margin-right: 50px;
  position: absolute;
  top: 40%;
  transform: translateY(-40%);
  margin-left: 50px;
  text-align: center;
  box-shadow: none !important;
  border-radius: 6px;
}
.card-header {
  height: 55px !important;
}
.card-header:after {
  background-color: #eff1f2 !important;
}
.card-header,
.card-footer {
  display: inherit;
}
.closeImg {
  margin-top: 20px;
  margin-bottom: 20px;
  position: absolute;
  left: 50%;
  top: 70%;
  transform: translate(-50%, -70%);
}
.box {
  position: absolute;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
}
</style>