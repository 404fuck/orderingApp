<template>
  <div class="selectlanguage row">
    <div v-if="order_mode=='3' || orderSourceStar"
      @click="showPop"
      class="col-100"
      style="text-align: center;margin-top: 10px;margin-right: 10px;background: white; height: 26px;line-height: 26px;border-radius: 6px;"
    >
    <img :src="getImgUrl(imgList[imgIndex])" alt="" width="18" style="position: relative;left: -8px;top: 4px;">
      <span style="margin-right:5px;color:#5C6268">{{title}}</span>
      <img src="../style/images/lang.png" alt width="15" />
    </div>
    <div v-else-if="!orderSourceStar"
      @click="showPop"
      class="col-100"
      style="text-align: right;margin-top: 10px;margin-right: 10px;"
    >
      <div style=" text-align:center;background: #F6F6F6;width:40%;float: right;border-radius: 6px;height: 26px;line-height: 26px;">
        <img :src="getImgUrl(imgList[imgIndex])" alt="" width="18" style="position: relative;left: -8px;top: 4px;">
        <span style="margin-right:5px;">{{title}}</span>
      <img src="../style/images/lang.png" alt width="15" /></div>
    </div>
    <van-popup v-model="show" :overlay="true">
      <div class="popBackDiv">
        <div
          class="langTitle fontWeight"
          style="padding-top: 20px;height: 30px;"
        >{{langMap[language].name}}</div>
        <div
          class="lineDiv row"
          v-for="(item,index) in langList"
          :key="index"
          @click="lineClick(langList,index)"
        >
          <div class="col-80 langTitle">{{item.title}}</div>
          <img
            v-show="item.key == language"
            class="col-20 langImg"
            src="../style/images/check_true.png"
            alt
          />
          <img
            v-show="item.key != language"
            class="col-20 langImg"
            src="../style/images/check_false.png"
            alt
          />
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
const imgList = [1,2,3]
export default {
  components: {},
  name: "swiper",
  computed: {
    language: {
      get() {
        return this.$store.getters.language;
      },
      set(val) {}
    }
  },
  props: {
    order_mode: {
      type: String,
      default: '0'
    },
    fixToken: {
      type: String,
      default: ""
    },
    order_source: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      imgList,
      imgIndex:0,
      checked: true,
      defIndex: 0,
      columns: ["English", "简体中文", "Malay"],
      show: false,
      langList: [
        { key: "en_US", title: "English", name: "LANGUAGE" },
        { key: "zh_CN", title: "简体中文", name: "语言选择" },
        { key: "ms_MY", title: "Malay", name: "LANGUAGE" }
      ],
      langMap: {
        en_US: { title: "English", name: "LANGUAGE" },
        zh_CN: { title: "简体中文", name: "语言选择" },
        ms_MY: { title: "Malay", name: "LANGUAGE" }
      },
      title: "",
      orderSourceStar:false
    };
  },
  methods: {
    langClick() {
      this.$emit("langClick");
    },
    lineClick(langList, index) {
      this.changeLang(this.langList[index].key);
      this.title = this.getTitle();
      this.show = false;
    },
    getImgUrl(i){
      return require("../style/images/lang"+i+".png")
    },
    getTitle() {
      for (var i in this.langList) {
        if (this.langList[i].key == this.language) {
          this.defIndex = i;
          return this.langList[i].title;
        }
      }
      
      return "";
    },
    changeLang(language) {
      this.$store.dispatch("setLanguage", language);
      if(this.language == "en_US"){
            this.imgIndex = 0
          }else if(this.language == "zh_CN"){
            this.imgIndex = 1
          }else{
            this.imgIndex = 2
          }
        this.title=this.langList[this.imgIndex].title
      this.$i18n.locale = language;
      this.$Local(language);
    },
    onCancel() {
      this.show = false;
    },
    showPop() {
      this.show = true;
    }
  },
  created() {
    this.title = this.getTitle();
    if(this.title == "English"){
      this.imgIndex = 0
    }else if(this.title == "简体中文"){
      this.imgIndex = 1
    }else{
      this.imgIndex = 2
    }
    if(this.order_source[0] == 'e'&&this.order_source[1] == 'x'&&this.order_source[2] == 'p'&&this.order_source[3] == 'l'&&this.order_source[4] == 'o'&&this.order_source[5] == 'r'&&this.order_source[6] == 'e'&&this.order_source[7] == 'r'&&this.order_source[8] == '_'){
      this.orderSourceStar = true
    }else{
      this.orderSourceStar = false
    }
  }
};
</script>

<style scoped>
.van-swipe img {
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 90px;
}

.card-header {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 222px;
  border-radius: 12px 12px 0px 0px;
}

.inset ul {
  clear: both;
}
.clear-button {
  float: right;
  position: relative;
  top: 13px;
  right: 10px;
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

.liItem {
  width: 50%;
  float: left;
}

.langStyle {
  background: none;
  border: none;
  line-height: 30px;
  font-size: 14px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url("../style/images/lang.png") no-repeat scroll right center
    transparent;
  background-size: 10px 6px;
  padding-right: 14px;
  width: auto;
  margin: 0;
  text-align-last: right;
}
select::-ms-expand {
  display: none;
}
option {
  text-align: center;
}

.popBackDiv {
  background-color: white;
  width: 90%;
  margin: auto;
  border-radius: 8px;
}
.lineDiv {
  line-height: 60px;
  height: 60px;
  border-bottom: 1px #e4e4e4 solid;
}
.lineDiv:last-of-type {
  border-bottom: none;
}
.langTitle {
  padding-left: 15px;
}
.langImg {
  position: relative;
  top: 20px;
  padding-right: 15px;
  width: 35px;
}
</style>
