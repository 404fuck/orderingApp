<template>
  <div style="padding: 10px 14px;">
    <div class="row" style="background: white;border-radius: 4px;box-shadow: 5px 5px 26px #E3E3E3;">
        <div class="col-100 center top30">
            <span>
                <img src="../../../../style/images/avator.png" alt="" width="62" style="border-radius: 50%;">
                <span class="font18" style="display:block;color:#505050">Adria</span>
            </span>
        </div>
        <div class="col-100">
            <ul class="memberInfo" style="padding: 30px 15px 0 15px;">
                <li>
                    <span>手机号：</span>
                    <span style="float:right">18936902580</span>
                </li>
                <li>
                    <span>性别：</span>
                    <span style="float:right">女</span>
                </li>
                <li>
                    <span>生日：</span>
                    <span style="float:right">11/07/1988</span>
                </li>
                <li>
                    <span>邮箱：</span>
                    <span style="float:right">Adria1107@gmail.com</span>
                </li>
            </ul>
        </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "index",
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
      
    };
  },
  methods: {
   
  },

  created() {
  
  },
  mounted() {

  },

};
</script>

<style scoped>
.memberInfo li{
    height: 40px;
    line-height: 40px;
    border-bottom: 1px #EFF1F2 solid;
    font-size: 12px;
    color: #505050;
}
.memberInfo li:last-child{
    border-bottom: none;
    padding-bottom: 100%;
}
</style>