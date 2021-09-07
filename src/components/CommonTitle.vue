<template>
  <div class="commontitle">
    <div
      class="content-block-title lineheight20 row"
      style="margin-top: 25px;font-weight: bold;color: #333333;border-left: 5px #FF7F39 solid;padding-left: 5px;"
    >
      <div class="col-60">{{title.type_name_en}}</div>
      <div class="col-60">{{title.type_name}}</div>
      <div v-show="showRight" class="col-40 right-style" @click="changeType">
        <img src="../style/images/list.png" alt width="18" />
        <span class="listName font12">{{$t('qiehuanList')}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "commontitle",
  props: {
    title: {
      type: Object,
      default: null
    },
    showType: {
      default: 1
    },
    showRight: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      type: this.showType
    };
  },
  methods: {
    changeType() {
      if (this.type == 1) {
        this.type = 2;
      } else {
        this.type = 1;
      }

      this.$emit("changeType", this.type);
    }
  }
};
</script>
<style>
.listName {
  color: #808080;
  position: relative;
  top: -5px;
  font-weight: normal;
}
</style>