<!--复制链接-->
<template>
    <div class="copyURL">
        <div class="imgStyle" @click="popText">
            <a class="row">
                <div class="col-100 center">
                    <img
                        src="../style/images/shareURL.png"
                        width="40"
                        alt
                        class="posImg"
                    />
                </div>
            </a>
        </div>
        <van-popup
            class="van-popup"
            v-model="showTigs"
            style="width: 100%; height: 100%"
        >
            <div class="card">
                <div class="card-content card-content-padding">
                    <div class="row center" style="padding: 20px 0px">
                        <div class="col-100">
                            {{ $t("copyURL.copy") }}
                        </div>
                        <div class="col-100">
                            {{ $t("copyURL.copys") }}
                        </div>
                    </div>
                </div>
                <div class="card-footer row center no-gutter">
                    <div class="col-50 cancelBtn" @click="cancelPop">
                        {{ $t("cancel") }}
                    </div>
                    <div
                        class="col-50 copyBtn"
                        v-clipboard:copy="getUrl('showUrl')"
                        v-clipboard:success="copy"
                        v-clipboard:error="onError"
                    >
                        {{ $t("copyURL.copyURL") }}
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>
<script>
export default {
    name: "CopyURL",
    props: {
        orderTb_id: {
            type: Number,
            default: 0,
        },
        tb_id: {
            type: String,
            default: "0",
        },
        orderTb_name: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
			showTigs: false,
			qrcode:this.$store.getters.qrcode,
        };
    },

    methods: {
        popText() {
            if (this.tb_id != this.orderTb_id) {
                this.$dialog
                    .alert({
                        message:
                            this.$t("hint1") +
                            this.orderTb_name +
                            this.$t("hint2"),
                        confirmButtonColor: "#EB3B1C",
                    })
                    .then(() => {
                        // on close
                    });
            } else {
                this.showTigs = true;
            }
        },
        cancelPop() {
            this.showTigs = false;
        },
        copy(e) {
            console.log(e.text);
            this.showTigs = false;
            this.toast.success(this.$t("copyURL.copySuccess"));
        },
        onError(e) {
            console.log(e);
        },
        // coolie拿到主页面的url
        getUrl(name) {
            var showUrl = "";
            var objName = name;
            var arrStr = document.cookie.split("; ");
            for (var i = 0; i < arrStr.length; i++) {
                var temp = arrStr[i].split("===");
                if (temp[0] == objName) {
                    showUrl = decodeURI(temp[1]);
                }
            }

            return showUrl;
        },
	},
	
};
</script>
<style scoped>
.clearFloat {
    clear: both;
}

.liItem {
    width: 50%;
    float: left;
}
.imgStyle {
    position: fixed;
    z-index: 999;
    right: 0px;
    top: 50px;
    opacity: 0.7;
}
.posImg {
    position: relative;
    top: 5px;
}
.card {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 6px;
    margin: 0px 50px;
}
.card-header,
.card-footer {
    min-height: 0% !important;
    padding: 0px;
}
.card-content {
    text-align: center;
    color: #505050;
    font-size: 15px;
    height: 80px;
}
.cancelBtn {
    height: 45px;
    line-height: 45px;
    color: #808080;
    border-right: 1px #ececec solid;
}
.copyBtn {
    height: 45px;
    line-height: 45px;
    color: #eb3b1c;
}
.copyURL .van-popup {
    background-color: rgb(255, 0, 255, 0) !important;
}
</style>


