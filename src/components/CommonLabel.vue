
<template>
  <div>
    <span class="tag-horizontal">
      <span class="font10" style="position: absolute;left: -5%;">&bull;</span>
      <span style="transform: scale(0.83);font-size: 10px;display: inline-block;padding:0 2px;">{{title}}</span>
    </span>
  </div>
</template>
<script>
export default {
  name: "CommonLabel",
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
.tag-horizontal {
  position: absolute;
  background: linear-gradient(to right, #f86ca1, #ff6951);
  /* padding: 0 7px; */
  display: flex;
  align-items: center;
  height: 16px;
  color: #fff;
  border-radius: 0 3px 3px 0;
  font-size: 10px;
}

.tag-horizontal::before {
  content: "";
  position: absolute;
  right: 100%;
  top: 0;
  border-color: transparent #f86ca1;
  border-width: 8px 8px 8px 0;
  border-style: solid;
}
</style>