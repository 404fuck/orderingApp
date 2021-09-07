<!--
 * @Author: zzt
 * @Date: 2021-04-01 19:19:32
 * @LastEditTime: 2021-07-14 11:56:24
 * @LastEditors: Please set LastEditors
 * @Description: 修改就餐人数弹窗
 * @FilePath: \sjoyOrderingApp\src\views\shopcart\components\CartTitle.vue
-->
<template>
    <div>
        <div
            class="card facebook-card"
            style="
                margin-top: 0px;
                border-radius: 5px;
                box-shadow: 5px 5px 26px rgba(227, 227, 227, 0.5);
            "
        >
            <div class="card-header row">
                <div class="col-50 font14" >
                    <span v-if="qrcode.substring(0, 4) == 'DEPX'">{{storeTakeOut=='0'?$t('start.tangshi'):storeTakeOut=='1'?$t('start.ziqu'):$t('start.waisong')}}</span>
                </div>
                <div class="col-50 right-style">
                    <span
                        class="color-purered clear-button"
                        @click="clearCartClick"
                        style="display: inline-block; height: 20px"
                    >
                        <i class="fa fa-trash font20"></i>&nbsp;
                        <span class="font14 color-purered">{{
                            $t("shopcart.clearCart")
                        }}</span>
                    </span>
                </div>
            </div>
            <div class="card-content">
                <div class="card-content-inner" style="padding-top: 0px">
                    <div class="row no-gutter">
                        <div
                            class="col-50 color-lightbrown fontWeight"
                            v-show="tableText"
                        >
                            <span class="font14"
                                >{{ $t("shopcart.tableID") }}：</span
                            >
                            <span class="font16">{{
                                titleData.table_name
                            }}</span>
                        </div>
                        <div
                            class="col-50"
                            v-show="eatCount"
                            style="height: 19px; line-height: 19px"
                        >
                            <span class="color-lightbrown font14 fontWeight"
                                >{{ $t("shopcart.eatCount") }}：</span
                            >
                            <span
                                class="color-lightbrown font16 fontWeight"
                                v-if="titleData.diner_num < 10"
                                >0{{ titleData.diner_num }}</span
                            >
                            <span
                                class="color-lightbrown font16 fontWeight"
                                v-else
                                >{{ titleData.diner_num }}</span
                            >
                            <!-- <input
								class="color-lightbrown font16 fontWeight center"
								style="width:20%;border:none;background: none;opacity: 1;color: #808080;"
								
								type="text"
								disabled
								v-model="keyboardText"
							/> -->
                            <span class="color-lightbrown font14 fontWeight">{{
                                $t("shopcart.person")
                            }}</span>
                            <span
                                @click="changeDinerNumClick"
                                style="margin-left: 12px"
                            >
                                <img
                                    src="../../../style/images/edit.png"
                                    width="14"
                                    alt
                                />
                            </span>
                        </div>

                        <div
                            class="col-100 fontWeight"
                            style="padding-top: 10px"
                        >
                            <span
                                class="color-lightbrown font12"
                                style="line-height: 30px"
                                >{{ $t("note") }}：</span
                            >
                            <input
                                class="font12"
                                ref="input"
                                type="text"
                                v-model="remark"
                                style="
                                    width: 85%;
                                    height: 30px;
                                    border: 1px #e5e5e5 solid;
                                    text-indent: 10px;
                                    color: #808080;
                                "
                            />
                        </div>
                        <!-- 是否外带 -->
                        <div class="col-100 top10">
                            <!-- <img :src="getImgUrl(imgList[orderStatus])"  :key="orderStatus" alt="" width="15" @click="changeStatus()"><span class="color-lightbrown font16 left5">外带</span> -->
                            <!-- <van-checkbox v-model="waidaiChecked" @change="showWaidai" shape="square" class="color-lightbrown">外带</van-checkbox> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer row">
                <div class="col-50">
                    <span class="color-lightbrown font12"
                        >{{ titleData.total_dish_num }}&nbsp;{{
                            $t("shopcart.dishNum")
                        }}</span
                    >
                </div>
                <div class="col-50 right-style">
                    <span class="color-purered"
                        >{{ $t("shopcart.countNum") }}：</span
                    >
                    <span class="font20 color-purered fontWeight">{{
                        titleData.total_price | price
                    }}</span>
                </div>
            </div>

            <van-number-keyboard
                :show="showKeyboard"
                :close-button-text="$t('shopcart.success')"
                @close="closeKeyboard"
                @blur="dismissKeyboard"
                @input="onInput"
                @show="showKeyboardClick"
                :z-index="2020"
                @delete="onDelete"
            />
        </div>
        <van-dialog
            v-model="updateNum"
            show-cancel-button
            confirm-button-color="#EB3C1C"
            :confirm-button-text="$t('shopcart.confirm')"
            :cancel-button-text="$t('cancel')"
            @confirm="confirmExitClick"
            @cancel="cancelClick"
        >
            <div class="row" style="color: #505050; padding: 20px 24px;line-height:30px;">
                <div class="col-100 center font14">{{$t('shopcart.editCount')}}</div>
                <div class="col-100 top30" style="font-size: 13px">
                    <span style="float: left">{{$t('shopcart.editTxt')}}</span>
                    <input
                        v-model="inputNum"
                        @input="onInput"
                        type="number"
                        max="99"
                        min="1"
                        style="
                            width: 23%;
                            float: right;
                            text-align:right;
                            border: 1px #e5e5e5 solid;
                            border-radius: 4px;
                            height: 28px;
                            padding:0 15px;
                        "
                    />
                </div>
            </div>
        </van-dialog>
    </div>
</template>

<script>
const imgList = [1, 2, 3];
import VipLogin from "../components/VipLogin";
export default {
    name: "carttitle",
    components: {
        VipLogin,
    },
    computed: {
        storeTakeOut() {
            return this.$store.getters.storeTakeOut;
        },
    },
    props: {
        titleData: {
            type: Object,
            default: null,
        },
        orderStatus: {
            type: Number,
            default: 0,
        },
        qrcode: {
            type: String,
            default: "",
        },
    },

    data() {
        return {
            remarkDisabled: true,
            remark: null,
            showKeyboard: false,
            keyboardText: "",
            focusState: false,
            keyboardBool: true,
            oncePage: true,
            waidaiChecked: false,
            imgList,
            tableText: true,
            eatCount: true,
            member_phone: this.titleData.member_phone,
            member_name: this.titleData.member_name,
            updateNum: false,
            inputNum: "",
        };
    },
    methods: {
        getImgUrl(i) {
            return require("../../../style/images/takeOut" + i + ".png");
        },
        showWaidai() {
            this.$emit("waidaiShow", this.waidaiChecked);
        },
        remarkClick() {
            if (this.remarkDisabled) {
                this.remarkDisabled = false;
                let that = this;
                setTimeout(function () {
                    that.$refs.input.focus();
                }, "300");
            } else {
                this.remarkDisabled = true;
            }
        },
        changeDinerNumClick() {
            this.updateNum = true;
            // this.showKeyboard = true;
        },
        confirmExitClick() {
            this.titleData.diner_num = this.inputNum;
            this.$emit("changeDinerNum", this.inputNum);
            this.inputNum = "";
        },
        cancelClick() {
            this.inputNum = "";
        },
        showKeyboardClick() {
            this.oncePage = true;
        },
        dismissKeyboard() {
            this.showKeyboard = false;
            if (this.keyboardBool) {
                if (this.titleData.diner_num < 10) {
                    this.keyboardText = "0" + this.titleData.diner_num;
                } else {
                    this.keyboardText = this.titleData.diner_num;
                }
            } else {
                this.keyboardBool = false;
            }
        },
        onInput(value) {
            if (this.oncePage) {
                this.keyboardText = value;
                this.oncePage = false;
            } else {
                this.keyboardText =
                    this.keyboardText.toString() + value.toString();
            }
        },
        onDelete() {
            this.keyboardText = this.keyboardText
                .toString()
                .substr(0, this.keyboardText.length - 1);
        },
        closeKeyboard() {
            if (
                Number(this.keyboardText) > 0 &&
                this.keyboardText != this.titleData.diner_num
            ) {
                this.keyboardBool = false;
                this.$emit("changeDinerNum", this.keyboardText);
            }
        },
        clearCartClick() {
            this.$emit("clearCartClick");
        },
        changeStatus() {
            this.$emit("changeStatus");
        },
    },
    directives: {
        focus: {
            //根据focusState的状态改变是否聚焦focus
            update: function (el, { value }) {
                if (value) {
                    el.focus();
                }
            },
        },
    },
    created() {
        if (
            this.qrcode[0] == "D" &&
            this.qrcode[1] == "E" &&
            this.qrcode[2] == "P" &&
            this.qrcode[3] == "X" &&
            this.qrcode[4] == "_"
        ) {
            this.tableText = false;
            this.eatCount = false;
        }
    },
    watch: {
        titleData(curr, old) {
            this.remark = curr.notes;
            if (curr.diner_num < 10) {
                this.keyboardText = "0" + curr.diner_num;
            } else {
                this.keyboardText = curr.diner_num;
            }
        },
        remark(curr, old) {
            if (old != undefined && curr != old) {
                this.$emit("updateRemark", curr);
            }
        },
        keyboardText(curr, old) {
            if (Number(curr) / 100.0 > 1) {
                this.keyboardText = old;
            } else {
                this.keyboardText = curr;
            }
        },
    },
};
</script>

<style>
.col-75 input {
    background: white !important;
    border: none !important;
}
.card-header:after {
    height: 0px !important;
}
.card-footer:before {
    width: 93% !important;
    left: 15px !important;
}
.vipDialog .van-dialog__content {
    margin: 28px 20px;
    text-align: center;
}
</style>


