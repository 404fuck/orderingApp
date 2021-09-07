<template>
  <span class="lingxing font10 color-white"><span style="transform: scale(0.73); font-size: 10px;display: inline-block;padding: 0 2px;">{{title}}</span></span>
</template>
<script>
export default {
  name: "CommonPmt",
  props: {
    title: {
      type: String,
      default: null,
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style>
.lingxing {
    height: 16px;
    background: linear-gradient(to right, #EB3C1C, #ff6951);
    border-radius: 0 50px 50px;
}
</style>