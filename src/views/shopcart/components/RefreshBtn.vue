<!--
 * @Author: your name
 * @Date: 2021-04-01 19:19:32
 * @LastEditTime: 2021-05-18 19:53:40
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \sjoyOrderingApp\src\views\shopcart\components\RefreshBtn.vue
-->
<template>
  <div class="imgStyle"
       @click="refreshClick()">
    <a class="row top10">
      <div class="col-100 center">
        <img src="../../../style/images/refresh.png"
             width="40"
             alt
             class="posImg" />
      </div>
    </a>
  </div>
</template>
<script>
export default {
  name: "payment",
  computed: {

  },
  props: {
    
  },
  data () {
    return {
     tb_id:this.$store.getters.tb_id,
    };
  },
  methods: {
    refreshClick () {
      this.$emit("refreshClick");
    }
  },
  created () {
    
  }
};
</script>
<style scoped>
.clearFloat {
  clear: both;
}

.liItem {
  width: 50%;
  float: left;
}
.imgStyle {
  position: fixed;
  z-index: 999;
  right: 0px;
  top: 95px;
  opacity: 0.7;
}
</style>

