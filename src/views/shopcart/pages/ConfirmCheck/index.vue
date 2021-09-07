<template>
  <div class="main-layout passinputView">
    <div @click="backClick">
      <van-icon style="margin: 10px 0px 0px 10px;color:#505050;"
                name="arrow-left"
                class="font20" />
      <span style="position:relative;top:-4px;color:#808080">{{$t('cancel')}}</span>
    </div>

    <CheckTitle @payClick="payClick"
                :datas="dishData"></CheckTitle>

    <van-popup v-model="popupShow"
               style="width: 80%;border-radius: 15px;top:40%">
      <PassInput @closeClick="closeClick"
                 @pasdInputGetFocus="pasdInputGetFocus"
                 :dishData="dishData"
                 :balance="balance"
                 :value="value"></PassInput>
    </van-popup>

    <van-number-keyboard :show="showKeyboard"
                         @input="onInput"
                         @delete="onDelete"
                         @blur="showKeyboard = false"
                         :z-index="2020" />
  </div>
</template>

<script>
import CheckTitle from "../../components/CheckTitle";
// 支付密码界面
import PassInput from "../../components/PassInput";
export default {
  name: "layout",
  computed: {
    curentStore () {
      //console.log('curentStore')
      return this.$store.getters.curentStore;
    }
  },
  data () {
    return {
      value: "",
      showKeyboard: false,
      popupShow: false,
      dishData: {},

      balance: "0",
      qrcode: this.$store.getters.qrcode,
    };
  },
  components: {
    CheckTitle,
    PassInput
  },
  methods: {
    payClick () {
      // 207测试
      this.$router.push({
        path: "/FinishCheck",
        
      });
      // this.popupShow = true;
      // this.showKeyboard = true;
    },
    onInput (key) {
      this.value = this.value + key;
      if (this.value.length == 6) {
        this.payOrder();
      }
    },
    onDelete () {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    getDish () {
      return this.$route.params;
    },
    closeClick () {
      this.popupShow = false;
    },
    pasdInputGetFocus () {
      // this.popupShow = false
      this.showKeyboard = true;
    },
    payOrder () {
      let data = {
        dep_id: this.curentStore.dep_id,
        pwd: this.value,
        // table_id: this.curentStore.tb_id,
        pay_type:'27'
      };
      if(this.qrcode[0] == 'T'&&this.qrcode[1] == 'D'&&this.qrcode[2] == 'E'&&this.qrcode[3] == 'P'&&this.qrcode[4] == '_'){
        data.table_id=this.curentStore.tb_id
      }else{
        
      }
      let that = this;

      this.request.pay(data, function (res) {
        if (res.code == "1") {
          that.$router.push({
            path: "/FinishCheck",
            query: {
              order_id: res.data.order_id_show,
              dep_name: res.data.dep_name,
              total_price: res.data.total_price
            }
          });
        } else {
          that.value = "";
          that.toast.fail(res.msg);
        }
      });
    },
    backClick () {
      this.$router.go(-1);
    },
    getOrderInfo () {
      let data = {
        dep_id: this.curentStore.dep_id,
        param: this.curentStore.tb_id,
        company_id: this.curentStore.company_id,
        str_param: this.$store.getters.order_id,
      };
      let that = this;

      this.request.orderDetails(data, function (res) {
        if (res.code == "1") {
          that.dishData = res.data;
        } else {
          that.toast.fail(res.msg);
        }
      });
    },
    getCopyOrderInfo () {
      let data = {
        dep_id: this.curentStore.dep_id,
        param: this.curentStore.tb_id
      };
      let that = this;

      this.request.payOrder(data, function (res) {
        if (res.code == "1") {
          if (res.data == null) {
            return;
          }
          that.dishData = res.data;
        } else {
          that.toast.fail(res.msg);
        }
      });
    },
    findbalance () {
      let that = this;
       let data ={
        dept_id:this.curentStore.dep_id
      }
      this.request.findbalance({data}, function (res) {
        if (res.code == "1") {
          that.balance = res.data.balance;
        } else {
          that.toast.fail(res.msg);
        }
      });
    }
  },
  created () {
    this.findbalance();

    if (this.curentStore) {
      let bl = this.stringutils.isAfter(this.curentStore);
      if (bl) {
        //餐后支付
        this.getOrderInfo();
      } else {
        // this.getCopyOrderInfo();
         this.getOrderInfo();
      }
    }
  },
  watch: {
    value (curr, old) {
      if (Number(curr) / 1000000.0 > 1) {
        this.value = old;
      } else {
        this.value = curr;
      }
    }
  }
};
</script>
<style scoped>
</style>