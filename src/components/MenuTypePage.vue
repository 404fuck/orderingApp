<template>
  <div>
    <div class="type-content list-block contacts-block" style="box-shadow: 13px 20px 22px 0px rgba(128, 128, 128, 0.5)">
      <div class="list-group">
        <ul>
          <li>
            <div class="item-content">
              <div class="item-title" style="font-size:14px">{{$t('type')}}</div>
            </div>
          </li>
          <li @click="onItemClick(4)">
            <div class="item-content" style="margin-left:0px">
              <div class="item-title close-panel">
                <img src="../style/images/hot.png" width="20" />&nbsp;
                <span class="color-red font12">{{$t('bendianxiaoshoubang')}}</span>
              </div>
            </div>
          </li>
          <li @click="onItemClick(5)">
            <div class="item-content" style="margin-left:0px">
              <div class="item-title close-panel">
                <img src="../style/images/share.png" width="18" />&nbsp;
                <span class="color-red font12">{{$t('wodianguodecai')}}</span>
              </div>
            </div>
          </li>
          <!-- <li>
            <div class="item-content" style="margin-left:0px">
              <div class="item-title close-panel font14" style="font-weight: bold;">本店推荐</div>
            </div>
          </li>-->

          <li
            v-for="(item, index) in dishTypeList"
            :key="index"
            @click="onTypeItemClick(item,index)"
            class="top5"
          >
            <div class="item-content row menuStyle" :class="{active:selected==index}" v-if="item.type_id != -2">
              <div class="item-title col-100 close-panel font12 top5">{{item.type_name_en}}</div>
              <div
                class="item-title col-100 close-panel font12"
                style="display:block;margin-top:2px"
              >{{item.type_name}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <MenuTypeBtn @click.native="clickMenuType" class="menuTypeBtn"></MenuTypeBtn>
  </div>
</template>
<script>
import MenuTypeBtn from "./MenuTypeBtn";
export default {
  name: "menutypepage",
  props: {
    dishTypeList: Array
  },
  data() {
    return {
      selected: null
    };
  },
  components: {
    MenuTypeBtn
  },
  methods: {
    clickMenuType() {
      this.$emit("clickMenuType", false);
    },
    onItemClick(index) {
      this.$emit("onItemClick", index);
    },
    onTypeItemClick(item, index) {
      this.selected = index;
      this.$emit("onTypeItemClick", item.type_id);
    }
  }
};
</script>
<style scoped>
.type-content {
  width: 40%;
  max-width: 450px;
  height: 100%;
}
.list-group {
  max-height: 83%;
  overflow-y: auto;
}
.item-content {
  padding-right: 15px;
  /* margin-left: 20px; */
  padding-bottom: 10px;
}
.active {
  background: #ff7f39;
  color: white;
}

.list-block {
  padding-top: 44px;
  width: 130px;
  bottom: 0px;
  position: absolute;
  top: 0px;
}
/* .menuStyle{
  color: #808080;
} */
</style>