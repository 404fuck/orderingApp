<!--
 * @Author: zzt
 * @Date: 2021-06-24 14:03:11
 * @LastEditTime: 2021-07-14 14:22:01
 * @LastEditors: Please set LastEditors
 * @Description: 外送信息展示与修改
 * @FilePath: \sjoyOrderingApp\src\components\DeliveryInfoPanel.vue
-->
<template>
    <div class="delivery-panel">
        <div class="row">
            <div class="col-100 title">
                <span>{{$t('start.waisongInfo')}}</span> 
                <img src="../style/images/edit.png" v-if="isEditIcon" style="padding-left:10px" width="12" height="12" @click="editDeliveryClick">
            </div>
            <div class="col-100 top10">
                <span>{{$t('start.contact')}}：</span>
                <span>{{deliveryInfo.contacts}}</span>
            </div>
            <div class="col-100 top10">
                <span>{{$t('start.mobile')}}：</span>
                <span>{{deliveryInfo.telephone}}</span>
            </div>
            <div class="col-100 top10">
                <span>{{$t('start.address')}}：</span>
                <span>{{deliveryInfo.address}}</span>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    name: "DeliveryInfoPanel",
    components: {
        
	},
    props: {
        isEditIcon:{
            type:Boolean,
            default:true
        }
    },
    computed: {
        deliveryInfo(){
            return JSON.parse(this.$store.getters.deliveryInfo);
        },
       
    },
    data() {
        return {
           
            
        };
    },
    methods: {
        editDeliveryClick(){
            this.$emit("editDeliveryClick");
        },
    },

    created() {
        
    },
    watch: {
        
    },
};
</script>

<style>
    .delivery-panel{
        margin: 10px;
        padding: 10px 14px;
        background: #fff;
        border-radius: 5px;
        color: #808080;
        font-size: 12px;
    }
    .delivery-panel .title{
        color: #505050;
    }
</style>