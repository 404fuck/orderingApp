<!--
 * @Author: zzt
 * @Date: 2021-04-01 19:19:32
 * @LastEditTime: 2021-05-20 14:28:00
 * @LastEditors: Please set LastEditors
 * @Description: 菜单加减
 * @FilePath: \sjoyOrderingApp\src\components\CommonStepper1.vue
-->

<template>
    <div class="commonstepper" style="display: inline-flex; float: right">
        <span v-if="dishNums[dishId] > 0">
            <img
                v-show="dishNums[dishId] > 0"
                src="../style/images/less.png"
                alt
                width="24"
                height="24"
                @click.stop="less"
            />
            <span class="text" v-show="dishNums[dishId] > 0">{{
                dishNums[dishId]
            }}</span>
            <img
                src="../style/images/addGray.png"
                alt
                width="24"
                height="24"
                v-if="canGoPlay == false"
            />
            <img
                src="../style/images/add.png"
                alt
                width="24"
                height="24"
                @click.stop="add"
                v-else
            />
        </span>
        <span
            v-else
            @click.stop="add"
            style="
                background: #eb3c1c;
                color: white;
                border-radius: 15px;
                padding: 7px 16px;
                font-size: 12px;
				line-height: 16px;
            "
        >
            {{ $t("dish.jiagou") }}
        </span>
    </div>
</template>
<script>
export default {
    name: "commonstepper",
    props: {
        dishes: {
            type: Object,
            default: null,
        },
        dishId: {
            default: 0,
        },
        salepmType: {
            type: String,
            default: "",
        },
        canGoPlay: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        dishNums: {
            get() {
                return this.$store.getters.dishNums;
            },
            set(val) {},
        },
    },
    data() {
        return {};
    },
    methods: {
        less() {
            this.$emit("delCart");
        },
        add() {
            this.$emit("addCart");
        },
    },
    created() {},
};
</script>
<style scoped>
.text {
    position: relative;
    top: -7px;
    margin: 0 6px;
    display: inline-block;
}

.commonstepper {
    text-align: center;
}
.czStyle {
    background: #eb3c1c;
    border-radius: 10px;
    color: white;
    padding: 1px 7px;
    font-size: 12px;
    display: inline-block;
    transform: scale(0.9);
    height: 22px;
    line-height: 22px;
}
.cztext {
    width: 14px;
    height: 14px;
    background: #fe813c;
    color: white;
    border-radius: 50%;
    font-size: 10px;
    transform: scale(0.8);
    display: inline-block;
    position: absolute;
    right: -4px;
    top: -6px;
    line-height: 14px;
}
</style>