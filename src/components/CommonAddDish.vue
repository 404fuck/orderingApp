<!-- 公共选择加料组件 -->
<template>
    <div class="col-100 color-gray specificBtn top10">
        <div class="row no-gutter">
            <div
                class="col-100 font12 left"
                style="text-align: justify; word-break: break-all"
            >
                {{ title }}
            </div>
            <div class="col-100 top10">
                <span
                    v-for="(item, index) in tagArray"
                    :key="index"
                    style="display: inine-block"
                >
                    <div
                        class="inblock"
                        style="position: relative"
                        :class="
                            item.max_num > 1 && selectFlag[index] == true
                                ? 'block'
                                : 'inblock'
                        "
                    >
                        <div style="display: inline-block" class="liItem">
                            <a
                                @click="clickItem(index)"
                                class="button lineheight30 font10"
                                :id="'choice' + index"
                                ref="aId"
                                >{{ item.add_name }} {{ item.price | price }}</a
                            >
                        </div>
                        <!-- 重复加料 -->
                        <div
                            class="commonstepper"
                            style="display: inline-block"
                            v-show="
                                item.max_num > 1 && selectFlag[index] == true
                            "
                        >
                            <img
                                v-show="item.adt_num >= 1"
                                src="../style/images/less.png"
                                alt
                                width="16"
                                height="16"
                                @click="lessJialiao(index)"
                            />
                            <span class="text" v-show="item.adt_num >= 1">{{
                                item.adt_num
                            }}</span>
                            <img
                                v-if="item.adt_num < item.max_num"
                                src="../style/images/add.png"
                                alt
                                width="16"
                                height="16"
                                @click="addJialiao(index)"
                            />
                            <img
                                v-else
                                src="../style/images/addGray.png"
                                alt
                                width="16"
                                height="16"
                            />
                        </div>
                    </div>
                </span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "CommonAddDish",
    props: {
        title: {
            type: String,
            default: null,
        },
        tagArray: {
            type: Array,
            default: [],
        },
        selectTagArray: {
            type: Array,
            default: [],
        },
        huixuanFlag: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            selectArray: [],
            selectFlag: [],
        };
    },
    methods: {
        lessJialiao(index) {
            if (
                this.selectFlag[index] == true &&
                this.tagArray[index].adt_num > 1
            ) {
                this.tagArray[index].adt_num--;
                this.$emit("onSelectItemClick", this.selectArray);
            }
        },
        addJialiao(index) {
            if (
                this.selectFlag[index] == true &&
                this.tagArray[index].adt_num < this.tagArray[index].max_num
            ) {
                this.tagArray[index].adt_num++;
                this.$emit("onSelectItemClick", this.selectArray);
            }
        },
        clickItem(index) {
            this.selectFlag[index] = !this.selectFlag[index];
            if (this.selectFlag[index] == false) {
                this.tagArray[index].adt_num = 0;
            } else if (this.tagArray[index].adt_num == 0) {
                this.tagArray[index].adt_num = 1;
            }
            let classList = this.$refs.aId[index].classList;
            if (classList.contains("active")) {
                // 选中再取消
                classList.remove("active");
            } else {
                // 添加类
                classList.add("active");
            }
            this.$emit("onSelectItemClick", this.selectArray);
        },
    },
    mounted() {
        //默认不在购物车状态不回显
        if(this.huixuanFlag == false){
            for (let index in this.tagArray) {
                this.tagArray[index].adt_num = 0;
                this.selectFlag[index] = false;
                this.selectArray.push(this.tagArray[index]);
                this.$emit("onSelectItemClick", this.selectArray);
            }
        }else{
            for (let index in this.selectTagArray) {
                if (this.selectTagArray[index].adt_num > 0) {
                    this.tagArray[index].adt_num = this.selectTagArray[index].adt_num;
                    this.clickItem(index);
                }
                this.selectArray.push(this.selectTagArray[index]);
                this.$emit("onSelectItemClick", this.selectArray);
            }
        }
    },
    created() {
       
        
         
    },
};
</script>
<style scoped>
.liItem a.active {
    background: none;
    background: rgba(235, 60, 28, 0.1);
    color: #eb3b1c;
    font-size: 10px;
    border: none;
}

.liItem a {
    background: #f4f5f6;
    color: #808080;
    font-size: 10px;
    border: none;
}

.liItem {
    margin: 0 8px 8px 0;
}
.inblock {
    display: inline-block;
}
.block {
    display: block;
}
.text {
    margin: auto 3px;
    display: inline-block;
    position: relative;
    top: -2px;
}
.commonstepper {
    text-align: center;
    position: absolute;
    margin: 0 8px 8px 0;
    top: 5px;
}
</style>