<!--
 * @Author: zzt
 * @Date: 2021-06-23 10:53:52
 * @LastEditTime: 2021-07-14 14:11:49
 * @LastEditors: Please set LastEditors
 * @Description: 预约时间展示与修改
 * @FilePath: \sjoyOrderingApp\src\components\YuYuePanel.vue
-->
<template>
    <div class="yuyue-panel">
        <div class="row">
            <div class="col-100">
                <span>{{$t('start.yuyueTime')}}：&nbsp;{{yuYueTime}}</span>
                <img src="../style/images/edit.png" style="padding-left:10px" width="12" height="12" @click="editYuYueClick">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "YuYuePanel",
    props: {
       
    },
    computed: {
        yuYueTime(){
            return this.$store.getters.yuYueTime;
        },
    },
    data() {
        return {
            
        };
    },
    methods: {
        editYuYueClick(){
            this.$emit("editYuYueClick");
        },
    },

    created() {
        
    },
    watch: {
        
    },
};
</script>

<style>
.yuyue-panel{
    margin: 10px;
    padding: 10px 14px;
    background: #fff;
    border-radius: 5px;
    color: #808080;
    font-size: 12px;
    line-height: 16px;
}
    


</style>