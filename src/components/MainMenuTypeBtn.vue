<!--首页分类按钮-->
<template>
  <a
    class="floating-button acolor-pink row open-panel"
    style=" width: 60px;height: 60px; background: #ff7f39"
    data-panel="left"
  >
    <div class="col-100 center">
      <img src="../style/images/menu.png" alt width="20" style="position: relative;top: 5px;" />
    </div>
    <div class="col-100 center" style="position: relative;top: -5px;font-size:12px">
      <span>{{$t('type')}}</span>
    </div>
  </a>
</template>
<script>
export default {
  name: "menutypebtn",
  data() {
    return {};
  }
};
</script>
<style scoped>
a {
  position: fixed;
}

.floating-button {
  top: 50% !important;
  left: -14px !important;
}
</style>