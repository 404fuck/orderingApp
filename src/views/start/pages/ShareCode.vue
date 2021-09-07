
<template>
  <div class="row" style="margin-top: 10px;margin-right: 10px;position: relative;top: 10%;">
    <div class="col-100" style="text-align: right;padding-right: 40px;">
      <img src="../../../style/images/arrow.png" alt="" width="100">
    </div>
      <div class="col-20"></div>
      <div class="col-80 font16 center dotted">
        <span class="fontWeight">{{$t('Copy and share')}}</span>
     <br />
        <span>
          
          {{$t('tablemate')}}
        </span>
      </div>
      <div class="col-30"></div>
      <div class="col-70 center" style="margin-top:40px">
        <button class="button btn" @click="closeClick">{{$t('DONE')}}</button>
      </div>
      
    </div>
</template>
<script>
export default {
  name: "ShareCode",
  data() {
    return {
      show:false
    };
  },
  methods: {
    closeClick() {
      this.$emit("closeClick");
      
    },
    saveLang() {
      let language = "en_US"
      if (this.$route.query.lang != undefined) {
        
          this.$store.dispatch("setLanguage", this.$route.query.lang);
        this.$i18n.locale = this.$route.query.lang;
        
        this.$Local(this.$route.query.lang);
        language = this.$route.query.lang
        
        } 
       else {
        if (this.language != undefined && this.language.length > 0) {
        if(this.$store.getters.scan_language == '1'){
            this.$store.dispatch("setLanguage", "en_US");
            this.$i18n.locale = "en_US";
            this.$Local("en_US");
            language="en_US"
          }else if(this.$store.getters.scan_language == '2'){
            this.$store.dispatch("setLanguage", "zh_CN");
            this.$i18n.locale = "zh_CN";
            this.$Local("zh_CN");
            language="zh_CN"
          }else if(this.$store.getters.scan_language == '3'){
            this.$store.dispatch("setLanguage", "ms_MY");
            this.$i18n.locale = "en_US";
            this.$Local("en_US");
            language="ms_MY"
          } else{
             this.$store.dispatch("setLanguage", "en_US");
            this.$i18n.locale = "en_US";
            this.$Local("en_US");
            language="en_US"
          }
        }
      }
    },
  },
  created () {
    this.saveLang();
  },
  computed: {}
};
</script>

<style scoped>
.dotted {
  color: white;
  border: 3px white dotted;
  height: 100px;
  padding-top: 17px;
}
.btn {
  background: linear-gradient(to bottom left, #ff8237, #f4257c, #ea3d15);
  border: none;
  color: white;
  width: 80px;
  height: 30px;
  border-radius: 20px;
  font-size: 12px;
  display: inline-block;
}
</style>