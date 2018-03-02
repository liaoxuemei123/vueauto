<template>
	<div class="page-container">
		<div class="forget-page page" flex="dir:top box:first">
			<nav-bar
                title="找回密码"
            />
			<div class="page-content" flex="dir:top">
				<div class="find-box">
					<div class="login_box_row tel-input" flex="dir:left box:first cross:center">
						<div class="input-label">
							 <i class="iconfont icon-liebiaoqiehuan1 active"></i>
				            <i class="iconfont"></i><span>手机号</span>
				        </div>
				        <div flex="dir:left box:last cross:center">
				            <input type="tel" maxlength="11" placeholder="请输入已注册的手机号" @input="userChange" :value="tempPhone">
	                    	<div class="close-container" v-show="closeContainerShow" @click="clearInput"><i class="iconfont  icon-close"></i></div>
				        </div>
					</div>
					<div class="login_box_row picCodeRow"  flex="dir:left box:first cross:center" v-if="picCodeShow">
						<div class="input-label">
				            <i class="iconfont"></i><span>验证码</span>
				        </div>
				        <div flex="dir:left box:last cross:center">
				            <input type="tel" maxlength="4" id = "userPassword"  placeholder="请输入四位验证码"  @input="checkImgCodes" :value="pickCode">
				        </div>
	                	<div class = "retry border-l" @click="changeImg"><img src="../assets/changan_sy.png"></div>
					</div>
				</div>
				<div class="button-control"  id ="login_login" :disabled="nextDisabled?true:false">
	                <btn-com
	                    title="下一步"
	                    :onClick="checkTalNumeberFormat"
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
				picCodeShow:false,
				closeContainerShow:false,
				btnAble:false,
				tempPhone:"",
				pickCode:"",
				nextDisabled:true, // 不要这个参数，只通过btnAble等来辨别
				// src:"../assets/changan_sy.png",
			}
		},
		components:{
            NavBar,
            InpCom,
            BtnCom
		},
		methods:{
			checkTalNumeberFormat:function(){
				var me = this;
				if (this.btnAble==false) {
					return;
				}
				if (this.tempPhone.length !== 11) {
					Toast({
	                    message:"手机号码格式不正确哦！",
	                    duration:1000,
	                })
					// $target.focus();
					return
				}
				if (!me.pickCode) {
					Toast({
	                    message:"图片验证码不能为空哦！",
	                    duration:1000,
	                })
					return
				};

				//手机格式正确；校验验证码
				me.checkCodes();
			},
			userChange: function(e){
				var target = $(e.currentTarget);
				var value = target.val(),
					me = this;
				if(value){
					this.closeContainerShow = true;
				}else{
					this.closeContainerShow = false;
					// this.nextDisabled = true;
					this.btnAble = false;
				}

				var reg = /^1\d{10}$/;
				if(!reg.test(value)){
					this.tempPhone = value;
					// this.nextDisabled = true;
					this.btnAble = false;
					return;
				}
				if(me.tempPhone !== value){
					this.tempPhone = value;
					this.checkPhone(value,function(isSuccess){
						if(isSuccess){
							me.changeImg();
							this.picCodeShow = true;
							this.btnAble = true;
						}else{
							// this.nextDisabled = true;
							this.btnAble = false;
						}
					});
				}else{
					// this.nextDisabled = true;
					this.btnAble = false;
				}
			},
			checkIMgCode:function(imgCode){
				if (imgCode === '') {
					Toast({
	                    message:"图片验证码不能为空！",
	                    duration:1000,
	                }) 
					return false;
				};
				if (imgCode.length < 4) {
					Toast({
	                    message:"图片验证码格式输入错误！",
	                    duration:1000,
	                })
					return false;
				};

				return true;

			},
			checkImgCodes:function(e){
				var me = this;
				if (this.pickCode.length !== 4) {
					var isDisabled = $('#login_login').hasClass('active');
						if (!isDisabled) {
							this.btnAble = false;
							// this.nextDisabled = true;
						};
					return
				}
				if(!me.checkIMgCode(this.pickCode)) {
					return false;
				}

				Tool.post('checkImgCodes',{
					picCode:this.pickCode,
					phone:this.tempPhone
				},(data)=>{
					if(data.result == 0){
                    	this.btnAble = true;
                    	// this.nextDisabled = false;
                	}
                	else{
                		Toast({
                            duration:1000,
                            message:data.result,
                        })
                	}
				})
			},
			changeImg: function() {
				var me = this;
				var	ranDom = Math.random();

				if(!this.tempPhone) return;
				this.code = '';
				this.src = MyClient.PATH_GET_IMG_SRC + phone + '&random=' + ranDom;
				// 根据随机数获取验证码
			},
			clearInput: function(e){
				var target = $(e.currentTarget);
					target.prev('input').val('');

				this.tempPhone = "";
				//清空手机号底部按钮不可操作
				this.btnAble = false;
				// this.nextDisabled = false;
				setTimeout(function(){
					target.hide();
				},500);
			},
			checkPhone: function(phone,callback){
            	var me = this;
				Tool.post('checkPhoen',{
					phone:this.tempPhone
				},(data)=>{
					if (data.result === 'true') {
						if(callback)callback(true);
					} else {
						//如果手机号没有注册则隐藏图片验证码输入框
						Toast({
                            duration:5000,
                            message:'手机号码还没有注册过哦!',
                        })
					}
				})
            },
            checkCodes: function() {
				// butterfly.navigate('my-secondcar/forget-password-two.html', {
				// 			type: 'forGetPassWord',
				// 			pickCode:this.pickCode,
				// 			mobile:mobile,
				// 			isPopupView:true
				// 		});
				this.$router.push({name:'forgetpasswordtwo',params:{
					type: 'forGetPassWord',
					pickCode:this.pickCode,
					mobile:this.tempPhone,
				}});

			},
		},
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
        .find-box{
			padding: 0px 0px 0px 10px;
		    background-color: white;
		    margin-top: 10px;
		    height: auto;
		    .login_box_row{
	        	height: 2.5rem;
		        line-height: 2.5rem;
		        background-color:#fff;
		        position: relative;
		        width: 100%;
		        border-bottom: 1px solid #eeeeee;
	    		.input-label{
		            width:20%;
		            text-align: center;
		        }
		        input{
		            border:none;
		            height:100%;
		            width:90%;
    				line-height: 24px;
		            background-color:transparent;
		            font-size:0.6rem;
		            text-align:left;
		            padding:0.2rem 10% 0.2rem 0%;
		            outline: none;
		        }
		        span{
		            font-size:0.68rem;
		            color:#333;
		            line-height: 24px;
		        }
		        .close-container{
				    width: 40px;
				    height: 100%;
				    position: absolute;
				    right: 0;
				    top: 0;
				}
	    		.retry{
	    			position: absolute;
				    right: 10px;
				    top:50%;
				    transform: translateY(-50%);
				    color: #878787;
				    width: 82.5px;
				    img{
				    	width: 100%;
				    	height:28.5px;
				    	vertical-align: middle;
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