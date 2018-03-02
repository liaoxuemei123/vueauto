<template>
	<div class="page-container">
		<div class="forget-page page" flex="dir:top box:first">
			<nav-bar
                title="找回密码"
            />
			<div class="page-content" flex="dir:top">
				<div class = "forGetPassWordTitle">
				    <div>短信验证码已发送到</div>
				    <div id = 'mobile'>{{mobile}}</div>
				    <div>请查收</div>
				    <i class="iconfont icon-sms"></i>
				</div>
				<div class = "login_box">
				  	<div class = "login_box_row" style = "padding-right:110px;font-size: 15px;" >
				  		<div class = "left h3">验证码</div>
				  		<div class="inputbox"> <input class="h3" type="text" placeholder="请输入短信验证码"  id = "reg_codes" :value="code" @blur="updateCode" /></div>
				  		<button class = "retry btn-xs" @click="onGetCheckCodes">发送验证玛</button>
				  	</div>
				</div>
				<div class="button-control  active"  id ="login_login" >
	                <btn-com
	                    title="下一步"
	                    :onClick="nextStep"
	                    :class="btnAble?'ableC':'disableC'"
	                />
	            </div>
			</div>
			
		</div>
	</div>
</template>
<script>
	import NavBar from '../components/NavBar.vue';
	import Tool from '../utils/Tool.js';
	import errorMsg from '../utils/error_msg';
	import { Toast } from 'mint-ui';
	import BtnCom from '../components/BtnCom';
	import InpCom from '../components/InpCom';
	export default{
		data (){
			return{
				type:"",
				pickCode:"",
				mobile:"188****0601",
				biz:"",
				code:"",
			}
		},
		components:{
            NavBar,
            InpCom,
            BtnCom
		},
		methods:{
			updateCode:function(e){
				this.code = $(e.target).val();
			},
			//校验手机号码的格式
			checkTalNumeberFormat: function(e) {
				var me = this;

				if (me.mobile.length !== 11) {
					Dialog.showToast('手机号码格式不正确哦！');
					return
				} else {
					return true;
				}

			},
			isTalNUmeberReg: function() {
				var isReg = false;
				if (isReg) {
					return true;
				}
			},
			nextStep: function(){
				var me = this;
				if (me.type === 'changePassWord') {
					// me.changePassWordCheck(); //修改密码先不管
				} else {
					if (me.isTalNUmeberReg()) {
						Toast({
                            duration:1000,
                            message:"该手机号码注册过哦",
                        })
						return;
					}
					if (me.checkTalNumeberFormat()) { //格式正确
						me.checkSMSCode();
					}
				}
			},
			checkSMSCode: function() { //验证短信验证码
				var me = this;
				var el = document.querySelector('.retry');
				var	data = {
					phone: this.mobile,
					biz: this.biz,
					code: this.code,
				};
				Tool.post('checkSMSCode',{
					data: data,
				},(data)=>{
                	if (data.result == 0) {
                		this.$router.push({name:'findpwdconfirm',params:{
							type: 'forGetPassWord',
							pickCode:this.pickCode,
							mobile:this.mobile,
							smsCode:this.code,
						}});
					} else {
						Toast({
                            duration:1000,
                            message:data.result,
                        })
					}
				})
			},
			onGetCheckCodes: function() { //获取短信验证码
				var me = this;
				var el = document.querySelector('.retry');
				var	data = {
						phone: this.mobile,
						biz: this.biz,
						picCode:this.pickCode
					};

				me.countdown = 60;
				Tool.post('sendSMSCode',{
					data: data,
				},(data)=>{
					if(data.result == 0){
						Toast({
                            duration:1000,
                            message:"获取验证码成功",
                        })
                	} else if(data.result == "105"){
						Toast({
                            duration:1000,
                            message:data.result,
                        })
					}
                	else{
                        me.codeDisabled = true;
                		Toast({
                            duration:1000,
                            message:"图片验证码失效,请重新输入!",
                        })
						this.$router.back();
                	}
				})
				me.countDown(el); //显示倒计时
			},
			countDown: function(val) { //倒计时
				var me = this;
				if (me.countdown == 0) {
					val.removeAttribute('disabled');
					val.textContent = '再次发送';
					return
				} else {
					val.setAttribute('disabled', true);
					val.textContent = '再次发送(' + me.countdown + ')';
					me.countdown--;
				}
				me.t = setTimeout(function() {
					me.countDown(val)
				}, 1000)
			},
		},
		activated:function(){
            this.type = this.$route.params.type;
            this.pickCode = this.$route.params.pickCode;
            this.mobile = this.$route.params.mobile?this.$route.params.mobile:this.mobile;
            this.biz = 2; //业务场景，1：修改密码(注册等其他场景)，2：忘记密码(找回密码)
            this.onGetCheckCodes(); //获取短信验证码
        },
        deactivated:function(){
            clearInterval(this.t); // 清除定时器
            this.countdown=0;
        }
	}
</script>
<style lang="less" scoped>
	.page-container{
        height:100%;
        position:absolute;
        width:100%;
    }
    .page{
        height:100%;
        position:absolute;
        width:100%;
        .ableC{
	    	background-color:#0394d6!important;
	    }
	    .disableC{
	    	background-color:#e6e6e6!important;
	    }
    }

    .page-container{
        height:100%;
        position:absolute;
        width:100%;
        .forGetPassWordTitle{
        	padding: 15px 80px 5px 10px;
		    background-color: #03aaf4;
		    color: #fffdff;
		    font-size: 0.8125rem;
		    position: relative;
			div{
			  	padding: 0px 0px 10px 0px;
			}
        }
        #mobile{
		  	font-size: 1.0625rem;
		}
		.login_box{
			padding: 0px 0px 0px 10px;
			background-color:white;
			.login_box_row{
				padding-left: 70px;
				position: relative;
				.retry{
					position: absolute;
				    right: 10px;
				    padding: 9px 0px 9px 0px;
				    border-radius: 5px;
				    color: #878787;
				    font-size: 12px;
				    width: 88px;
				    top: 50%;
				    transform: translateY(-50%);
				    -webkit-transform: translateY(-50%);
				}
				.left{
					position: absolute;
				  	left: 10px;
				  	color:#2d2d2d;
				  	height: 100%;
				  	padding: 15px 0px 15px 0px;
				}
				.inputbox{
					#reg_codes{
						padding: 15px 0px 15px 0px;
					    margin: 0px;
					    border: 0px;
					    height: 100%;
					    line-height: 24px;
					}
				}
			}
		}
        .button-control{
        	padding: 20px 10px;
        	color: white;
        	font-size: 1rem;
        }
    }
</style>