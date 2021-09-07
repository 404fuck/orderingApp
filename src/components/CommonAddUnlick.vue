<!-- 公共选择加忌口 -->
<template>
  <div class="col-100 color-gray  specificBtn">
    <div class="row no-gutter top10">
      <div class="col-100 font12 left" style="text-align: justify;word-break: break-all;">{{title}}:</div>
      <div class="col-100 top10">
        <ul style="position: relative;top: -2px;">
          <li v-for="(item,index) in tagArray"
              class="liItem font10"
              @click='clickItem(index)' :key="index">
            <a class="button lineheight30 "
               :id="'choice'+index"
               ref="aId">{{item}}</a>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  name: "tags",
  props: {
    title: {
      type: String,
      default: null
    },
    tagArray: {
      type: Array,
      default: []
    },
    selectTagArray: {
      type: Array,
      default: []
    }
  }
  , data () {
    return {
      selectArray: [],
    }
  }
  , methods: {
    clickItem (index) {

      var item = this.tagArray[index]
      var classList = this.$refs.aId[index].classList
      if (classList.contains('active')) {
        // 添加类
        classList.remove('active');
        this.selectArray.splice(this.selectArray.indexOf(item), 1);
      } else {
        // 选中再取消
        classList.add('active');
        this.selectArray.push(item)
      }

      this.$emit('onSelectItemClick', this.selectArray);
    }

  }, mounted () {
    if (this.selectTagArray.length <= 0) { return }
    for (let i in this.tagArray) {
      for (let j in this.selectTagArray) {
        if (this.tagArray[i] === this.selectTagArray[j]) {

          this.clickItem(i)
        }
      }
    }
  }
}
</script>
<style scoped>
.liItem a.active {
  background: none;
  background:rgba(235, 60, 28, 0.1);
  color:#EB3B1C;
  font-size: 10px;
  border: none;
}

.liItem a {
  background: #F4F5F6;
  color: #808080;
  font-size: 10px;
  border: none;
}

.liItem {
  margin: 0 8px 8px 0;
}
</style>