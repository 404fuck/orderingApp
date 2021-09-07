<!--
 * @Author: zzt
 * @Date: 2021-05-15 14:34:34
 * @LastEditTime: 2021-05-20 14:47:29
 * @LastEditors: Please set LastEditors
 * @Description: websoket消息推送
 * @FilePath: \sjoyOrderingApp\src\components\Socket.vue
-->
<template>
    <div class="notify-wrap">
        <ul class="notify-list">
            <li v-for="(item, index) in getWebSocketArr" :key="index">
                <span class="name">{{ item.name }} </span>
                <span class="addNum">{{ item.addNum }}</span>
                <span class="content">{{ getContType(item.msg_type,item.content) }} </span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "Socket",
    props: {
        getWebSocketArr:{
            type:Array,
            default:[],
        },
    },

    data() {
        return {};
    },
    methods: {
        getContType(type,content){
            if(type=="0"){
                return  this.$t('socketAdd');
            }else if(type=="1"){
                return this.$t('socketPurch')+content;
            }else if(type=="2"){
                return 'x1 '+content;
            }else if(type=="3"){
                return '-1 '+content;
            }else if(type=="4"){
                return this.$t('socketModified');
            }else if(type=="5"){
                return this.$t('socketCleared');
            }else if(type=="6"){
                return this.$t('socketSubmit');
            }else{
                return false;
            }
           
            
        }
    },

    created() {},
    watch: {
        getWebSocketArr(){
            for (let i=0;i<this.getWebSocketArr.length;i++) {
                setTimeout(() => {
                    this.getWebSocketArr.splice(i,1)
                }, 3000);
            }
           
        }
    },
};
</script>

<style>
.notify-wrap {
    position: fixed;
    z-index: 1000;
    left: 10px;
    bottom: 50px;
    overflow-x: hidden;
    overflow-y: auto;
}
.notify-list li {
    max-width: 240px;
    margin-top: 15px;
    height: 24px;
    line-height: 24px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 12px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: #fff;
    font-size: 12px;
    padding: 0 10px;
}
.notify-list li .name {
    color: #ff7f39;
}
</style>



