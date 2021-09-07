<template>
  <div class="layout">
    {{$t('userCenter')}}
    <router-view></router-view>
  </div>
</template>
  <script>
export default {
  name: "layout",
  data() {
    return {};
  }
};
</script>
  <style scoped>
.layout {
  min-height: calc(100vh - 84px);
  position: relative;
  overflow: hidden;
}
</style>