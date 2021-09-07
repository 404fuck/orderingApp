<template>
    <!-- 导航菜单 -->
    <div
        class="list-block inset"
        style="border-radius: initial; box-shadow: none"
    >
        <div class="row">
            <div class="col-25" @click="actionClick(1)">
                <div class="row">
                    <div class="col-100">
                        <a href="#" class="button">
                            <img
                                src="../style/images/shopcart.png"
                                alt
                                width="25"
                                class="navImg"
                            />
                        </a>
                    </div>
                    <div class="col-100 top8 center-style">
                        <span class="color-lightbrown font14">{{
                            $t("cart")
                        }}</span>
                    </div>
                </div>
            </div>
            <div class="col-25" @click="actionClick(2)">
                <div class="row">
                    <div class="col-100">
                        <a href="#" class="button">
                            <img
                                src="../style/images/placeOrder.png"
                                alt
                                width="25"
                                class="navImg"
                            />
                        </a>
                    </div>
                    <div class="col-100 top8 center-style">
                        <span class="color-lightbrown font14">{{
                            $t("Yxiadan")
                        }}</span>
                    </div>
                </div>
            </div>
            <div class="col-25" :disabled="isPayOpen" @click="actionClick(3)">
                <div class="row">
                    <div class="col-100">
                        <a href="#" class="button" >
                            <img
                                src="../style/images/pay.png"
                                alt
                                width="25"
                                class="navImg"
                                :style="{'opacity':isPayOpen==false?'1':'0.4'}"
                            />
                        </a>
                    </div>
                    <div class="col-100 top8 center-style">
                        <span class="color-lightbrown font14">{{
                            $t("jiezhang")
                        }}</span>
                    </div>
                </div>
            </div>

            <div class="col-25" disabled @click="actionClick(4)">
                <div class="row">
                    <div class="col-100">
                        <a href="#" class="button">
                            <img
                                src="../style/images/vip.png"
                                alt
                                width="25"
                                class="navImg"
                            />
                        </a>
                    </div>
                    <div class="col-100 top8 center-style">
                        <span class="color-lightbrown font14">{{
                            $t("huiyuanzhongxin")
                        }}</span>
                    </div>
                </div>
            </div>
            <div class="col-25"></div>
        </div>

        <div class="row top30">
            <div class="col-33"></div>
            <div class="col-33">
                <a @click="backClick" class="button button-round color-gray">{{
                    $t("backMenu")
                }}</a>
            </div>
            <div class="col-33"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: "NavigationPage",
    computed: {
        curentStore() {
            return this.$store.getters.curentStore;
        },
        ipayQrcode() {
            return this.$store.getters.ipayQrcode;
        },
    },
    data() {
        return {
            isPayOpen:true,
        };
    },
    methods: {
        backClick() {
            this.$emit("naviBackClick");
            window.location.href = "./start.html#/storeHome";
        },
        actionClick(index) {
            if (index == 1) {
                window.location.href = "./shopcart.html";
            } else if (index == 2) {
                this.getOrderState();
            } else if (index == 3) {
                let that = this;
                window.location.href =
                    "./shopcart.html#/payMent?token=" +
                    that.$store.getters.token;
            } else if (index == 4) {
            }
        },
        getPayAfterBool() {
            return this.stringutils.isAfter(this.curentStore);
        },
        getPublicModel() {
            return !this.stringutils.getPublicPayModel();
        },
        getOrderState() {
            let data = {
                dep_id: this.curentStore.dep_id,
                param: this.curentStore.tb_id,
                str_param: this.$store.getters.order_id,
            };
            let that = this;
            this.request.checkorder(data, function (res) {
                if (res.code == "1") {
                    if (res.data) {
                        window.location.href = "./shopcart.html#/PlaceOrder";
                    } else {
                        that.toast.info(that.$t("noDish_detail"));
                    }
                } else {
                    that.toast.fail(res.msg);
                }
            });
        },
    },
    created() {
        // ipay88支付时结账开启
        if (String(this.ipayQrcode)=="true") {
            this.isPayOpen = false;
        }

    },
};
</script>
<style scoped>
.col-25 .button {
    height: 60px !important;
    border-radius: 50% !important;
    width: 60px !important;
    background: white !important;
    border: white !important;
    box-shadow: 1px 1px 10px #dfe0e1 !important;
    left: 50%;
    transform: translateX(-50%);
}
.navImg {
    padding-top: 15px;
}
</style>
