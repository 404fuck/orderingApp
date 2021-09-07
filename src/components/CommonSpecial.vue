
<!-- 公共选择规格组件 -->
<template>
    <div class="col-100 color-gray specificBtn">
        <div class="row no-gutter top20">
            <div
                class="col-100 font12 left"
                style="text-align: justify; word-break: break-all"
            >
                {{ $t("guige") }}
            </div>
            <div class="col-100 top10">
                <ul style="position: relative; top: -1px">
                    <li
                        v-for="(item, index) in tagList"
                        class="liItem font12"
                        @click="clickItem(index)"
                        :key="index"
                    >
                        <a
                            class="button lineheight16"
                            :class="index == selectIndex ? 'active' : ''"
                            >{{ item.spec_unit }}</a
                        >
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "CommonSpecial",
    props: {
        special: {
            type: String,
            default: "",
        },
        selectSpecial: {
            type: String,
            default: "",
		},
		selectIndex: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
			tagList: [],
        };
    },
    methods: {
        clickItem(index) {
            let special = this.tagList[index];
            this.$emit("onSpecialItemClick", special,index);
        },
    },
    mounted() {
        if (this.special) {
            this.tagList = JSON.parse(this.special);
        }
        if (this.selectSpecial) {
            let selectTag = JSON.parse(this.selectSpecial);
            for (let g in selectTag) {
                for (let i in this.tagList) {
                    // alert(this.tagList[i].spec_unit )
                    // alert('1--'+this.tagList[i].spec_unit +'2--'+selectTag[0].spec_unit)
                    if (this.tagList[i].spec_unit === selectTag[0].spec_unit) {
                        this.clickItem(i);
                        break;
                    }
                }
            }
        }
    },
};
</script>
<style scoped>
input::-webkit-input-placeholder {
    color: #d8d8d8;
    font-size: 12px;
    padding-left: 5px;
}
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
    padding: 7px 33px;
    height: 30px;
    text-align: center;
}

.liItem {
    margin: 0 8px 8px 0;
    display: inline-block;
}
</style>