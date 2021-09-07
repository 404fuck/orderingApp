<!--
 * @Author: zzt
 * @Date: 2021-04-01 19:19:32
 * @LastEditTime: 2021-05-31 13:41:39
 * @LastEditors: Please set LastEditors
 * @Description: 支付方式--ipay88
 * @FilePath: \sjoyOrderingApp\src\views\shopcart\components\PayMode.vue
-->
<template>
    <div>
		<div class="payMode-card">
			<div class="payMode-header">
				{{$t('shopcart.payType')}}
			</div>
			<div class="row pay-content">
				<div class="col-35">
					<img src="../../../style/payImg/ipay88.png" width="80" height="27">
				</div>
				<div class="col-65">
					<van-field
						@click="paySelect"
						@click-right-icon="paySelect"
						v-model="currPayVal"
						right-icon="arrow"
						placeholder="请选择"
						input-align="right"
						readonly
					/>
				</div>
			</div>
		</div>
		<van-dialog
            v-model="isPopShow"
            show-cancel-button
            confirm-button-color="#EB3C1C"
            :confirm-button-text="$t('shopcart.confirm')"
            :cancel-button-text="$t('cancel')"
            @confirm="confirmClick"
            @cancel="cancelClick"
        >
            <div class="pop-content">
				<div class="row" :span="12">
                    <div 
					   class="col-50 payImg"
					   @click="payImgClick(item)"
					   :class="item.id==currID?'active':''"
					   v-for="(item,index) in payList"
					   :key="index"
					>
                        <img :src="item.img">
					</div>
				</div>
            </div>
        </van-dialog>
	</div>
</template>
<script>
export default {
    name: "PayMode",
    props: {
    },
	data(){
		return{
			isPopShow:false,
			payList:[
				{img:require('../../../style/payImg/vcash.png'),title:'Credit Card(MYR)',id:2},
				{img:require('../../../style/payImg/MayBank2U.png'),title:'MayBank2U',id:6},
				{img:require('../../../style/payImg/AllianceOnline.png'),title:'Alliance Online',id:8},
				{img:require('../../../style/payImg/AmOnline.png'),title:'AmOnline',id:10},
				{img:require('../../../style/payImg/RHBOnline.png'),title:'RHB Online',id:14},
				{img:require('../../../style/payImg/HongLeongOnline.png'),title:'Hong Leong Online',id:15},
				{img:require('../../../style/payImg/CIMBClick.png'),title:'CIMB Click',id:20},
				{img:require('../../../style/payImg/PublicBankOnline.png'),title:'Public Bank Online',id:31},
				{img:require('../../../style/payImg/BankRakyat.png'),title:'Bank Rakyat Internet Banking',id:102},
				{img:require('../../../style/payImg/AffinOnline.png'),title:'Affin Online',id:103},
				{img:require('../../../style/payImg/BSNOnline.png'),title:'BSN Online',id:124},
				{img:require('../../../style/payImg/BankIslam.png'),title:'Bank Islam',id:134},
				{img:require('../../../style/payImg/UOB.png'),title:'UOB',id:152},
				{img:require('../../../style/payImg/BankMuamalat.png'),title:'Bank Muamalat',id:166},
				{img:require('../../../style/payImg/OCBC.png'),title:'OCBC',id:167},
				{img:require('../../../style/payImg/HSBC.png'),title:'HSBC Online Banking',id:198},
				{img:require('../../../style/payImg/Boost.png'),title:'Boost Wallet',id:210},
			],
			currItem:{},
			currPayVal:"",
			currID:null,

		};
	},
	methods: {
		paySelect(){
            this.isPopShow = true;
		},
		payImgClick(item){
			this.currItem = item;
			this.currID = item.id;
		},
		confirmClick(){
			this.currPayVal = this.currItem.title;
			this.$emit("confirmPayClick",this.currID);
		},
		cancelClick(){
			this.currPayVal = "";
			this.currItem = {};
			this.currID = null;
		}
       
    },
};
</script>
<style scoped>
    .payMode-card{
		background: #fff;
		border-radius:5px;
		box-shadow: 5px 5px 26px rgba(227, 227, 227, 0.5);
		margin: 10px;
		font-size: 14px;
	}
	.payMode-header{
		padding: 0 15px;
		line-height: 43px;
		font-weight: bold;
		color: #505050;
		font-size: 14px;
		border-bottom: 1px solid #EFF1F2;
	}
    .pay-content{
		padding: 10px 15px;
	}
	.van-cell{
		padding: 3px 0 0;
		font-size: 12px;
	}
	.pop-content{
		padding: 20px;
		height:300px;
		overflow-x: hidden;
		overflow-y: auto;
	}
	.payImg{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 50px;
		line-height: 50px;
		text-align: center;
		border-radius: 6px;
        border: 1px solid #D8D7D8;
		margin-bottom: 12px;
		overflow: hidden;
	}
	.payImg.active{
		border-color: #EB3C1C;
	}
	.payImg img{
		width: 100%;
		transform: scale(0.6);
		-ms-transform: scale(0.6);
		-moz-transform: scale(0.6);
		-webkit-transform: scale(0.6);
		-o-transform: scale(0.6);
	}
</style>

