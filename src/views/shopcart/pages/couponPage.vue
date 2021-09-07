<template>
    <div>
        <div class="navbar">
            <div class="navbar-inner">
                <div class="left" @click="back">
                    <i class="font20 van-icon van-icon-arrow-left" style="color:#979797"></i>
                </div>
                <div class="center">{{$t('couponPage.yhq')}}</div>
                <div class="right"></div>
            </div>
        </div>

        <div
            v-for="(item,index) in data"
            :key="index"
            class="list-block"
            style="border-radius: 0pt 4pt 4pt 0pt;margin: 20px 13px;background:none;"
        >
            <img
                v-show="selectData != null && item._id == selectData._id"
                style="width: 26px;height: 26px;right: 13px;position: absolute;"
                src="../../../style/images/coupon_select.png"
            />
            <div class="row no-gutter">
                <div class="col-25 font10 center sale_left" style="padding-top:20px">
                    <div style="font-size:32px;">{{item.coupon_value | price}}</div>
                    <span>{{[$t('couponPage.mjq')][item.coupon_type]}}</span>
                </div>
                <div
                    class="col-75"
                    style="height: 98px;background: white;margin-top: -4px;padding-top: 15px;"
                >
                    <div class="row left15" @click="selectItemClick(item)">
                        <div class="col-70">
                            <div class="row">
                                <div class="col-100">
                                    <b class="font14" style="display:block">{{item.dep_name}}</b>
                                    <span
                                        class="font12"
                                    >{{item.coupon_value + $t('couponPage.yyhq')}}</span>
                                </div>
                                <div
                                    class="col-100 font10 color-lightbrown center"
                                    style="position: relative;top: 10px;left: -5px;"
                                >
                                    <span>{{$t('couponPage.yxqz')}}</span>
                                    <span>&nbsp;{{item.coupon_deadline}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-30">
                            <qriously :value="item.coupon_code" :size="60" />
                        </div>
                    </div>

                    <div class="row no-gutter" style="text-align:right;padding: 0px 12px;">
                        <div
                            class="col-100 font10"
                            style="color:#EB3C1C"
                            @click="item.showNote = !item.showNote"
                        >
                            <span v-text="btnText">{{$t('couponPage.sysm')}}</span>
                            <span class="left5">
                                <img
                                    src="../../../style/images/coupon_down.png"
                                    alt
                                    width="10"
                                    v-show="!item.showNote"
                                />
                                <img
                                    src="../../../style/images/coupon_up.png"
                                    alt
                                    width="10"
                                    v-show="item.showNote"
                                />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div
                v-show="item.showNote"
                class="row"
                style="background: rgba(227, 227, 227, 0.5);padding: 5px 13px;height: 40px;line-height: 20px;border-radius: 0 0 4px 4px;"
            >
                <div class="col-100 font10 color-lightbrown">{{item.note[language]}}</div>
            </div>
        </div>

        <div
            class="row"
            style="position: fixed;bottom: 0px;width: 100%;background: #FFFFFF;padding: 10px 10px;"
        >
            <div class="col-75 top5 left10">
                <span
                    v-if="selectData.coupon_value != 0"
                    class="font10 color-lightbrown"
                >{{selectData.coupon_value + $t('couponPage.yhq') +$t('couponPage.man')+selectData.lowest_money +$t('couponPage.less')+selectData.coupon_value +' )'}}</span>
                <span v-else class="font10 color-lightbrown">{{$t('couponPage.wxzyhq')}}</span>
            </div>
            <div class="col-25">
                <button
                    class="button button-round"
                    style="background: #EB3C1C;color: white;border-color: #EB3C1C;"
                    @click="confirmuseClick"
                >{{$t('shopcart.true')}}</button>
            </div>
        </div>
    </div>
</template>
<script>
import QRCode from "qrcodejs2";
export default {
    components: {},
    computed: {
        curentStore() {
            //console.log('curentStore')
            return this.$store.getters.curentStore;
        },
        language: {
            get() {
                return this.$store.getters.language;
            },
            set(val) {},
        },
    },
    data() {
        return {
            btnText: this.$t("couponPage.sysm"),
            data: null,
            selectData: {
                coupon_value: 0.0,
                lowest_money: 0.0,
                coupon_code: "",
            },
        };
    },
    methods: {
        selectItemClick(item) {
            if (item._id == this.selectData._id) {
                this.selectData = {
                    coupon_value: 0.0,
                    lowest_money: 0.0,
                    coupon_code: "",
                };
            } else {
                this.selectData = item;
            }
        },
        openClick() {
            this.show = !this.show;
            this.downIcon = !this.downIcon;
        },
        back() {
            this.$router.go(-1);
        },
        deptakenlist() {
            let data = {
                company_id: this.curentStore.company_id,
                dep_id: this.curentStore.dep_id,
            };
            let that = this;
            this.request.deptakenlist(data, function (res) {
                if (res.code == "1") {
                    for (let i in res.data) {
                        res.data[i].showNote = false;
                    }
                    that.data = res.data;
                    that.getData();
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        confirmuseClick() {
            this.confirmuse(this.selectData.coupon_code);
        },
        confirmuse(id) {
            let data = {
                company_id: this.curentStore.company_id,
                dep_id: this.curentStore.dep_id,
                table_id: this.curentStore.tb_id,
                coupon_code: id,
            };
            let that = this;
            this.request.confirmuse(data, function (res) {
                if (res.code == "1") {
                    that.$router.back(-1);
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        getOrderInfo() {
            let data = {
                dep_id: this.curentStore.dep_id,
                param: this.curentStore.tb_id,
                company_id: this.curentStore.company_id,
            };
            let that = this;

            this.request.orderDetails(data, function (res) {
                if (res.code == "1") {
                    if (res.data.taken_coupon != 0) {
                        that.selectItemClick(res.data.taken_coupon);
                    }
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        getCopyOrderInfo() {
            let data = {
                dep_id: this.curentStore.dep_id,
                param: this.curentStore.tb_id,
            };
            let that = this;
            this.request.payOrder(data, function (res) {
                if (res.code == "1") {
                    if (res.data.taken_coupon != 0) {
                        that.selectItemClick(res.data.taken_coupon);
                    }
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
        getData() {
            let bl = this.stringutils.isAfter(this.curentStore);
            if (bl) {
                //餐后支付
                this.getOrderInfo();
            } else {
                // this.getCopyOrderInfo();
                this.getOrderInfo();
            }
        },
    },
    created() {
        this.deptakenlist();
    },
};
</script>
<style scoped>
.messageImg {
    background-image: url("../../../style/images/coupon_select.png");
    background-repeat: no-repeat;
    background-repeat: no-repeat;
    background-position: top right;
    background-size: 26px 26px;
}
.sale_left {
    display: inline-block;
    height: 90px;
    width: 90px;
    text-align: center;
    background: #eb3c1c;
    color: white;
    border-radius: 4px 0 0 4px;
}
.sale_right {
    display: inline-block;
    flex: 1;
    background: white;
}
.box {
    display: flex;
}
</style>
