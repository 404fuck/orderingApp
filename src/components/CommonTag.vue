<!-- 公共选择口味组件 -->
<template>
    <div class="col-100 color-gray specificBtn">
        <div class="row no-gutter top10">
            <div
                class="col-100 font12 left"
                style="text-align: justify; word-break: break-all"
            >
                <span v-if="items.need_i18n == '0'">{{
                    items.taste_name
                }}</span>
                <span v-else>
                    <span v-if="$store.getters.language == 'zh_CN'">{{
                        items.taste_name_zh
                    }}</span>
                    <span v-else-if="$store.getters.language == 'en_US'">{{
                        items.taste_name_en
                    }}</span>
                    <span v-else>{{ items.taste_name_my }}</span>
                </span>
                <span v-if="items.single_multiple == '1'" class="mulStyle">{{
                    $t("dish.multiple")
                }}</span>
            </div>
            <div class="col-100 top10">
                <ul style="position: relative; top: -3px">
                    <li
                        v-for="(item, index) in items.taste_list"
                        class="liItem font12"
                        @click="clickItem(index)"
                        :key="index"
                    >
                        <a  class="button" :class="item.checked == true ? 'active' : ''">
                            <span v-if="item.need_i18n == '0'">{{item.name}}</span>
                            <span v-else>
                                <span v-if="$store.getters.language == 'zh_CN'">{{ item.name_zh }}</span>
                                <span  v-else-if="$store.getters.language == 'en_US'" >{{ item.name_en }}</span>
                                <span v-else>{{ item.name_my }}</span>
                            </span>
							<span v-if="Number(item.the_price)!=0"> {{item.the_price | price}}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "CommonTag",
    computed: {
        language: {
            get() {
                return this.$store.getters.language;
            },
        },
    },
    props: {
        items: {
            type: Object,
            default: null,
        },
        selectItem: {
            type: Object,
            default: null,      
        },
        curentIndex: {
            type:Number,
            default: 0,
        },
        huixuanFlag: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            selectIndex: -1,
            childItem: "",
            flag : 0,
        };
    },
    methods: {
        // 单选 -- 默认必选
        ExclusiveChoice(index) {
            if(this.childItem[index].checked==true){
                this.toast.info('口味必选，至少选择一种口味');
                return false;
            }
            for (let loop in this.childItem) {
                this.childItem[loop].checked = false;
            }
            this.childItem[index].checked = true;
        },
        // 单选 -- 默认不必选
        ExclusiveChoiceNo(index) {
            if(this.childItem[index].checked==true){
                this.childItem[index].checked = false;
                return false;
            }
            for (let loop in this.childItem) {
                this.childItem[loop].checked = false;
            }
            this.childItem[index].checked = true;
        },
        clickItem(index) {
            this.selectIndex = index;
            let selectItemA = {};
            if (this.items.single_multiple == 1) {
                // 多选
                this.childItem[index].checked = !this.childItem[index].checked;
                //默认必选
                if(this.items.mandatory==1){
                    let isNoCheckedDuo = this.childItem.every(item=> item.checked !=true);//判断每一项子类是否全没选
                    if(isNoCheckedDuo){
                        this.toast.info('口味必选，至少选择一种口味');
                        this.childItem[index].checked= true;
                        return false;
                    }
                }
            } else {
                //单选
                if(this.items.mandatory==1){
                    this.ExclusiveChoice(index);
                }else{
                    this.ExclusiveChoiceNo(index)
                }
            }
            selectItemA["taste_name"] = this.items.taste_name;
            selectItemA["taste_name_en"] = this.items.taste_name_en;
            selectItemA["taste_name_my"] = this.items.taste_name_my;
            selectItemA["taste_name_zh"] = this.items.taste_name_zh;
            selectItemA["need_i18n"] = this.items.need_i18n;
            selectItemA["single_multiple"] = this.items.single_multiple;
            selectItemA["is_sys"] = this.items.is_sys;
            selectItemA["taste_list"] = this.childItem;
            this.$emit("onTagItemClick", this.curentIndex, selectItemA);
        },
    },
    mounted(){
        this.childItem = this.items.taste_list;
        //默认不在购物车状态不回显
        if(this.huixuanFlag == false){
            for (let index in this.childItem) {
                this.childItem[index].checked = false;
            }
            // 必选
            if (this.items.mandatory == 1) {
                this.childItem[0].checked = true;
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
    padding: 0px 15px;
    height: 30px;
    line-height: 30px;
}

.liItem {
    margin: 0 8px 8px 0;
    display: inline-block;
}
.mulStyle {
    color: #eb3b1c;
    border: 1px #eb3b1c solid;
    border-radius: 4px;
    padding: 1px 6px;
    font-size: 10px;
    transform: scale(0.83);
    display: inline-block;
    margin-left: 10px;
}
</style>