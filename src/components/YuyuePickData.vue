<!--
 * @Author: zzt
 * @Date: 2021-05-15 14:34:34
 * @LastEditTime: 2021-07-14 14:08:29
 * @LastEditors: Please set LastEditors
 * @Description: 店码模式预约时间选择
 * @FilePath: \sjoyOrderingApp\src\components\YuyuePickData.vue
-->
<template>
    <div class="yuyue-pick-data">
        <van-popup 
            v-model="yuyueShow"
            position="bottom"
            class="yuyue-pop"
            @click-overlay="cancelClick"
        >
            <div class="yuyue-wrap">
                <div class="yuyue-title row">
                    <div class="col-20 cancel">
                        <span @click="cancelClick">{{$t('cancel')}}</span>
                    </div>
                    <div class="col-60 title">{{$t('start.yuyueTime')}}</div>
                    <div class="col-20 comfirm" @click="comfirmClick">{{$t('confirm')}}</div>
                </div>
                <ul class="yuyue-scroll col-100">
                    <li
                       v-for="(item,index) in targetArr"
                       :key="index"
                       @click="targetItemClick(item,index)"
                       :class="targetIndex==index?'active':''"
                    >{{index==0?$t('start.lijiDish'):item}}</li>
                </ul>
            </div>
        </van-popup>
    </div>
</template>

<script>
export default {
    name: "YuyuePickData",
    props: {
        yuyueShow:{
            type:Boolean,
            default:false
        },
        getSerUrl:{
            type:String,
            default:""
        }
       
    },
    computed: {
        openTimeJson(){
            return this.$store.getters.openTimeJson;
        },
        curentStore() {
            return this.$store.getters.curentStore;
        },
        token() {
            return this.$store.getters.token;
        },
    },
    data() {
        return {
            getStartTime:"",
            getEndTime:"",
            targetArr:[],
            targetIndex:0,
            targetItemVal: "",
        };
    },
    methods: {
        targetItemClick(item,index){
            this.targetIndex = index;
            this.targetItemVal = item;
        },
        cancelClick(){
            // this.$store.dispatch("setIsYuYue", false); //取消预约点餐
            this.$emit("yuyueClick");
        },
        comfirmClick(){
            if(this.targetIndex==0){
                this.targetItemVal = this.targetArr[0];
            }
            this.setAppoint();
            this.$emit("yuyueClick");
            // this.toast.info(this.targetItemVal);
        },
        setAppoint(){
            let that = this;
            let targetArr = this.targetItemVal.split('-');
            let data = {
                dep_id: this.curentStore.dep_id,
                company_id: this.curentStore.company_id,
                appoint_date: this.moment().format('YYYY-MM-DD'),
                appoint_time_start: targetArr[0],
                appoint_time_end: targetArr[1],
                token: this.token,
            };
            this.$http({
                method: "post",
                url: this.getSerUrl+':18081/capis/shoppingcart/setAppoint',
                data: data,
            }).then((ress) => {
                var res=ress.data;
                if (Number(res.code) > 0) {
                    that.toast.success(that.$t('start.yuyueYes'));
                    that.$store.dispatch("setYuYueTime", that.targetItemVal); //预约时间存入缓存
                } else {
                    that.toast.fail(res.msg);
                }

            }).catch((err) => {
                // that.toast.error(err);
            });
        },
        logicCount(){
            let openTimeObj = JSON.parse(this.openTimeJson);
            this.getStartTime = openTimeObj[0].open_time_start;
            this.getEndTime = openTimeObj[openTimeObj.length-1].open_time_end;
            // console.log(this.getStartTime);
            // console.log(this.getEndTime);
            //00:00至24:00 没增加0.5小时最多循环48次 
            let startHours = Number(this.getStartTime.substring(0,2));
            let endHours = Number(this.getEndTime.substring(0,2));
            /*
               1.endHours>startHours<24 不跨天
               2.endHours<startHours 跨天
               3.获取当前时间比较
            */
            let isThan30 = Number(this.moment().format('mm'));
            // console.log(isThan30);
            let getNowData =  Number(this.moment().format('HH:mm').substring(0,2));
            // console.log(getNowData);
            if(getNowData>=startHours){
                if(isThan30>30){
                   startHours = getNowData+0.5;
                }else{
                   startHours = getNowData;
                }
            }
            if(endHours<startHours){
                endHours+=24;
            }
            let hoursArr = [];
            let strHourArr = [];

            for(let i=0;i<48;i++){
                hoursArr.push(startHours);
                startHours+=0.5; //每次加0.5小时
                if(startHours>endHours){
                    break;
                }
            }
            for(let i=0;i<hoursArr.length;i++){
                if(hoursArr[i]>24){
                    hoursArr[i]-=24;
                }
                let curStr = String(hoursArr[i]);
                let newStr = "";
                let isStr = parseInt(hoursArr[i]) === parseFloat(hoursArr[i])?curStr:curStr.split('.')[0]; //小数取小数点前的整数
                let is30 = parseInt(hoursArr[i]) === parseFloat(hoursArr[i])?'00':'30'; //判断是小数还是整数
                if(hoursArr[i]<10){
                    newStr = '0'+isStr+':'+is30;
                }else{
                    newStr = isStr+':'+is30;
                }
                strHourArr.push(newStr);
            }
            for(let i=0;i<strHourArr.length;i++){
                let newStr = "";
                newStr = strHourArr[i]+'-'+strHourArr[i+1];
                if(!strHourArr[i+1]||strHourArr[i+1]==undefined||strHourArr[i+1]==null){
                    break;
                }
                this.targetArr.push(newStr);
            }
            // console.log(hoursArr);
            // console.log(strHourArr);
            // console.log(this.targetArr);
        }
        
    },

    created() {
        this.logicCount();
    },
    watch: {
        
    },
};
</script>

<style>
    .yuyue-pop{
        border-radius: 15px 15px 0 0;
        padding: 0;
        width:100%;
        height: 230px;
        overflow: auto;
        background:#fff;
    }
    .yuyue-pop::-webkit-scrollbar{
        display: none;
    }
    .yuyue-wrap{
        padding: 0 20px;
        background: #fff;
    }
    .yuyue-title{
        margin-top: 15px;
        line-height: 20px;
    }
    .yuyue-title .cancel{
        font-size: 12px;
        color: #505050;
        text-align: left;
    }
    .yuyue-title .title{
        font-size: 14px;
        color: #505050;
        text-align: center;
    }
    .yuyue-title .comfirm{
        font-size: 12px;
        color: #EB3C1C;
        text-align: right;
    }
    .yuyue-scroll::-webkit-scrollbar{
        display: none;
    }
    .yuyue-scroll{
        display: block;
        margin-top: 15px;
        overflow-x: hidden;
        overflow-y: scroll;
        height: 170px;
    }
    .yuyue-scroll li{
        margin-top: 15px;
        text-align: center;
        line-height: 16px;
        font-size: 12px;
        color: #505050;
    }
    .yuyue-scroll li:first-child{
        margin-top: 0;
    }
    .yuyue-scroll li.active{
        color: #EB3C1C;
    }

</style>



