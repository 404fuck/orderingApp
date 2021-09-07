<!--分类按钮-->
<template>
  <div>
    <a
      class="floating-button acolor-pink row open-panel"
      style=" width: 60px;height: 60px;   background: #ff7f39"
      data-panel="left"
    >
      <div class="col-100 center">
        <img src="../style/images/menu.png" width="20" alt style="position: relative;top: 5px;" />
      </div>
      <div class="col-100 center font12" style="position: relative;top: -5px;">
        <span>{{$t('type')}}</span>
      </div>
    </a>
  </div>
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
.floating-button {
  top: 50% !important;
  left: 100px !important;
}
</style>