
<template>
    <div class="box">
        <div class="card">
            <div class="card-header font14 center">
                {{ $t("PIN.Order PIN") }}
            </div>
            <div class="card-content">
                <div class="card-content-inner">
                    <div class="codeCss center row">
                        <div class="col-100">
                            <span>{{ one }}</span>
                            <span>{{ two }}</span>
                            <span>{{ three }}</span>
                            <span>{{ four }}</span>
                        </div>
                    </div>
                    <span
                        class="font12 top10"
                        style="color: #808080; display: block"
                        >{{ $t("PIN.Note") }}</span
                    >
                </div>
            </div>
            <div
                class="card-footer font14 center"
                style="color: #eb3b1c"
                @click="rememberClick"
            >
                {{ $t("PIN.Noted") }}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "SafetyCode",
    components: {},
    computed: {
        curentStore() {
            return this.$store.getters.curentStore;
        },
        qrcode() {
            return this.$store.getters.qrcode;
        },
    },
    data() {
        return {
            one: "",
            two: "",
            three: "",
            four: "",
        };
    },
    methods: {
        rememberClick() {
            this.$emit("rememberClick");
        },
    },
    mounted() {
        // 只有桌码有安全码
        if (
            this.qrcode[0] == "T" &&
            this.qrcode[1] == "D" &&
            this.qrcode[2] == "E" &&
            this.qrcode[3] == "P" &&
            this.qrcode[4] == "_"
        ) {
            this.one = this.curentStore.table_key.substring(0, 1);
            this.two = this.curentStore.table_key.substring(1, 2);
            this.three = this.curentStore.table_key.substring(2, 3);
            this.four = this.curentStore.table_key.substring(3, 4);
        }
    },
    created() {
	
	},
};
</script>

<style scoped>
.card {
    margin-right: 50px;
    position: absolute;
    top: 40%;
    transform: translateY(-40%);
    margin-left: 50px;
    text-align: center;
    box-shadow: none !important;
    border-radius: 6px;
}
.card-header {
    height: 55px !important;
}
.card-header:after {
    background-color: #eff1f2 !important;
}
.card-header,
.card-footer {
    display: inherit;
}
.closeImg {
    margin-top: 20px;
    margin-bottom: 20px;
    position: absolute;
    left: 50%;
    top: 70%;
    transform: translate(-50%, -70%);
}
.box {
    position: absolute;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
}
.codeCss span {
    display: inline-block;
    margin-right: 27px;
    color: #333333;
    font-size: 26px;
    font-weight: bold;
    text-align: center;
}
.codeCss span:last-child {
    margin-right: 0px;
}
</style>