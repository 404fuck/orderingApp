<!--
 * @Author: zzt
 * @Date: 2021-04-01 19:19:32
 * @LastEditTime: 2021-05-20 14:16:15
 * @LastEditors: Please set LastEditors
 * @Description: 购物车加减
 * @FilePath: \sjoyOrderingApp\src\views\shopcart\components\CommonStepper.vue
-->

<template>
    <div>
        <!-- 赠菜为促销菜时不可操作 -->
        <div
            v-if="
                dishData.promotion_range == '1' && dishData.salepmt_type == '4'
            "
            class="commonstepper"
            style="display: inline-flex; float: right"
        >
            <img
                v-show="num > 0"
                src="../../../style/images/lessGray.png"
                alt
                width="24"
                height="24"
            />
            <span class="text" v-show="num > 0">
                <input
                    type="number"
                    class="inputNum"
                    v-model="num"
                    disabled="disabled"
                />
            </span>
            <span class="text2" v-show="num == 0">{{
                $t("shopcart.add")
            }}</span>
            <img
                src="../../../style/images/addGray.png"
                alt
                width="24"
                height="24"
            />
        </div>
        <!-- 第二份优惠为促销菜只能减菜 -->
        <div
            v-else-if="
                dishData.promotion_range == '1' && dishData.salepmt_type == '3'
            "
            class="commonstepper"
            style="display: inline-flex; float: right"
        >
            <img
                v-show="num > 0"
                src="../../../style/images/less.png"
                alt
                width="24"
                height="24"
                @click.stop="less"
            />
            <span class="text" v-show="num > 0">
                <input
                    type="number"
                    class="inputNum"
                    v-model="num"
                    disabled="disabled"
                />
            </span>
            <span class="text2" v-show="num == 0">{{
                $t("shopcart.add")
            }}</span>
            <img
                src="../../../style/images/addGray.png"
                alt
                width="24"
                height="24"
            />
        </div>
        <div
            v-else
            class="commonstepper"
            style="display: inline-flex; float: right"
        >
            <img
                src="../../../style/images/less.png"
                alt
                width="24"
                height="24"
                @click.stop="less"
            />
            <span class="text">
                <input
                    ref="input1"
                    type="number"
                    oninput="if(value>99)value=99;"
                    class="inputNum"
                    min=""
                    max="99"
                    v-model="num"
                    @blur="inputBlur"
                    @click.stop=""
                    @keyup="sub"
                    v-on:input="handleChangeName(num)"
                />
            </span>
            <img
                v-if="num >= 99"
                src="../../../style/images/addGray.png"
                alt
                width="24"
                height="24"
            />
            <img
                v-else
                src="../../../style/images/add.png"
                alt
                width="24"
                height="24"
                @click.stop="add"
            />
        </div>
    </div>
</template>
<script>
export default {
    name: "commonstepper",
    props: {
        num: {
            type: Number,
            default: 0,
        },
        dishData: {
            type: Object,
            default: null,
        },
    },
    watch: {
        nowPhoneHeight() {
            if (this.defaultPhoneHeight != this.nowPhoneHeight) {
                //手机键盘被唤起了。
            } else {
                //手机键盘被关闭了。
            }
        },
        selectName(curVal, oldVal) {
            // 实现input连续输入，只发一次请求
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.handleChangeName(curVal);
            }, 1000);
        },
    },
    data() {
        return {
            selectName: this.num,
            result1: null,
            defaultPhoneHeight: "", //屏幕默认高度
            nowPhoneHeight: "", //屏幕现在的高度
        };
    },
    methods: {
        less() {
            this.computeNum("less");
        },
        add() {
            this.computeNum("add");
        },
        sub() {
            // alert('111')
        },
        onRodeChange() {
            // alert('111')
        },
        inputBlur() {
            if (this.num == "") {
                this.num = "0";
                this.$emit("updateDishNum", this.num);
            }
        },
        computeNum(type) {
            this.$emit("computeNum", type, this.num);
        },
        handleChangeName(value) {
            // alert(value)
            if (value === "") {
                // value = '0'
                // value = this.dishData.dish_num
                return false;
            }
            this.$emit("updateDishNum", value, this.num);
        },
    },
    created() {},
};
</script>
<style scoped>
.text {
    margin: 0 5px;
    display: inline-block;
}
.text2 {
    margin: 4px 6px;
    display: inline-block;
}
.commonstepper {
    text-align: center;
}
.posImg {
    position: relative;
    top: 5px;
}
.floatText {
    position: relative;
    top: -5px;
}
.inputNum {
    width: 30px !important;
    height: 24px !important;
    line-height: 24px !important;
    border: 1px #ccc solid !important;
    text-align: center !important;
    border-radius: 5px !important;
    color: #808080 !important;
    font-size: 12px !important;
}
</style>