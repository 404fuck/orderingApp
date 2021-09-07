<template>
  <div>
    <div class="list-block contacts-block inset sevicebOX" style="border-radius: 15px;">
      <p class="font18 color-black center-style callSevice">{{$t('hujiaoServe')}}</p>
      <hr />

      <div class="serviceBtn" style="padding: 15px 15px 0 15px ">
        <ul >
          <li
            v-for="(item,index) in serviceArray"
            class="top5 "
            style="display:inline-block;margin-right:5px;width:30%"
            @click="clickItem(index)"
            :key="index"
          >
            <a v-if="item.value !=''"
              class="button itembtn button-round font12"
              :class="item.select ? 'color-red':'color-gray'"
              ref="aService"
            >{{item.value}} </a>
          </li>
        </ul>
      </div>

      <div class="row inputBtn padding15">
        <div class="col-100">
          <a class="button button-round color-gray">
            <input
              type="text"
              v-model="serveValue"
              :placeholder="$t('writeFuwu')"
              style="text-align:center;height: 40px;font-size:15px"
            />
          </a>
        </div>
      </div>
      <div class="row top20" @click="onService">
        <div class="col-100 center-style">
          <a
            class="button"
            style="background: linear-gradient(to bottom left, #FF8237 , #F4257C,#EA3D15);border: 0;border-radius: 50%;width: 60px;height: 60px;left: 50%;transform: translateX(-50%);"
          >
            <img src="../style/images/bells.png" alt width="30" style="padding-top:15px" />
          </a>
        </div>

        <div class="col-100 center-style top5">
          <span class="font16 confirBtn">{{$t('confirmHujiao')}}</span>
        </div>
      </div>
    </div>
    <div class="row top30 center-style" @click="close">
      <div class="col-100">
        <img src="../style/images/close.png" alt width="32" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "servicepage",
  props: {
    data: {
      type: Array,
      default: null
    },
    serviceArray: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      serveValue: "",
      selectArray: []
    };
  },
  methods: {
    clickItem(index) {
      for (let i in this.serviceArray) {
        this.serviceArray[i].select = false;
      }
      this.serviceArray[index].select = true;
    },
    close() {
      this.$emit("closeService");
    },
    onService() {
      if (this.serveValue.length > 0) {
        this.$emit("onService", this.serveValue);
      } else {
        for (var i in this.serviceArray) {
          if (this.serviceArray[i].select) {
            this.$emit("onService", this.serviceArray[i].value);
          }
        }
      }
    }
  }
};
</script>
<style scoped>
.serviceBtn a {
  height: 35px;
  line-height: 35px;
}

hr {
  background: #eff1f2;
  height: 1px;
  border: none;
}

.inputBtn a {
  height: 40px;
  line-height: 40px;
}

.confirBtn {
  color: #eb3b1c;
}

.callSevice {
  font-weight: bold;
  padding-top: 30px;
}

.sevicebOX {
  margin-top: 20px;
  padding-bottom: 30px;
}

.liItem {
  float: left;
  margin: 5px;
}

.itembtn {
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 27px !important;
}
</style>