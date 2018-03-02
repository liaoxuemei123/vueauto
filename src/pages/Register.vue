<template>
	<div class="page-container">
		<div class="register-page page" flex="dir:top box:first">
			<nav-bar 
				title="长安通行证注册"
			/>
			<div class="page-content" :style="{'background-image':'url('+require('../assets/bg.png')+')'}">
				<div class="person-picture" :style="{'background-image':'url('+require('../assets/person-picture.png')+')'}"></div>
				<div class="form-group">
					<img src="../assets/user-phone.png" class="phone-picture">
					<input type="text" @input="inputPhone" placeholder="请输入手机号" class="user-phone" v-model="tel">
				</div>
				<div class="form-imageCode" v-if="picCodeUrl">
					<div class="code-group">
						<img src="../assets/user-code.png" class="code-picture">
						<input type="text" placeholder="图形验证码" class="image-code" v-model="picCode">
					</div>
					<div class="image-container" @click="getImageCode"><img :src="picCodeUrl" class="image-url"></div>
				</div>
				<div class="form-code">
					<div class="code-group">
						<img src="../assets/user-code.png" class="code-picture">
						<input type="text" placeholder="请输入验证码" class="user-code" v-model="smsCode">
					</div>
					<div class="get-code" v-if="getCodeState">{{residueTime}}秒后重发</div>
					<div class="get-code" v-else="getCodeState" @click="sendSmsCode">获取验证码</div>
				</div>
				<div class="form-group">
					<img src="../assets/user-pwd.png" class="pwd-picture">
					<input type="password" placeholder="请输入密码" class="user-pwd" v-model="password">
				</div>
				<div class="form-group">
					<img src="../assets/user-pwd.png" class="pwd-picture">
					<input type="password" placeholder="请确认密码" class="user-pwd" v-model="pwd">
				</div>
				<p class="input-tip">8-16个字符，由字母、数字和符号的两种以上的组合。</p>
				<div class="register-btn" @click="register">注册</div>
				<!--<div class="login-btn">登录</div>-->
			</div>
		</div>
	</div>
</template>
<script>
	import NavBar from '../components/NavBar';
	import Tool from '../utils/Tool';
	import { Toast } from 'mint-ui';
	import En from '../utils/Encryption';
	import errorMsg from '../utils/error_msg';
	export default{
		data () {
			return {
				getCodeState:false,
				residueTime:60,
				tel:'',
				smsCode:'',
				password:'',
				pwd:'',
				picCode:'',
				picCodeUrl:'',
			}
		},
		methods:{
			sendSmsCode:function(){
				if(!this.tel){
					Toast({
                        message:'请输入手机号',
                        duration:1000,
                    });
                    return false;
				}
				if(!(/^1\d{10}$/.test(this.tel))){
                    Toast({
                        message:'手机号有误',
                        duration:1000,
                    });
                    return false;
                }
				if(!this.picCode){
					Toast({
                        message:'请输入图片验证码',
                        duration:1000,
                    });
                    return false;
				}
				Tool.post('sendSMSCode',{
					phone:this.tel,
					biz:1,
					picCode:this.picCode,
				},(data)=>{
					if(data.result == 0){
						this.getCodeState = true;
						var a = setInterval(()=>{
							this.residueTime -- ;
							while(this.residueTime < 1){
								this.getCodeState = false;
								this.residueTime = 60;
								clearInterval(a);
							}
						},1000)
					}else{
						Toast({
							message:errorMsg[data.result],
							duration:1000,
						});
						this.picCode = '';
					}
					this.picCodeUrl = Tool.target + 'picCode?phone='+this.tel + '&theImg=' + Math.random();
				})
			},
			inputPhone:function(){
				if(!(/^1\d{10}$/.test(this.tel))){
                    return false;
                }else{
					this.getImageCode();
				}
			},
			register:function(){
				if(!this.tel){
					Toast({
                        message:'请输入手机号',
                        duration:1000,
                    });
                    return false;
				}
				if(!(/^1\d{10}$/.test(this.tel))){
                    Toast({
                        message:'手机号有误',
                        duration:1000,
                    });
                    return false;
                }
				if(!this.smsCode){
					Toast({
                        message:'请输入验证码',
                        duration:1000,
                    });
                    return false;
				}
				if(this.password != this.pwd || !this.password || !this.pwd){
					Toast({
                        message:'两次输入密码不一致或输入为空',
                        duration:1000,
                    });
                    return false;
				}
				if(!(/^(?=.*[a-zA-Z]){8,16}(?=.*[0-9]){8,16}.{8,16}$/.test(this.password))){
					Toast({
                        message:'密码应为8-16的字符或数字',
                        duration:1000,
                    });
                    return false;
				}
				En.createPassword(this.password).then((pData)=>{
					Tool.post('registerCode',{
						mobile:this.tel,
						code:this.smsCode,
						password:pData.password,
						mod:pData.mod,
						additional:pData.additional
					},(data)=>{
						if(data.success){
							Toast({
								message:'注册成功',
								duration:1000,
							});
							Tool.localItem("userInfo",data.data);
							if(this.$route.params.to){
								this.$router.push({path:this.$route.params.to});
							}else{
								this.$router.push({name:'maintainset'});
							}
						}else{
							Toast({
								message:data.message,
								duration:1000,
							});
						}
					})
				})
			},
			getImageCode:function(){
				this.picCodeUrl = Tool.target + 'picCode?phone='+this.tel + '&theImg=' + Math.random();
			},
			resetParam:function(){
				this.getCodeState = false,
				this.tel = '';
				this.smsCode = '';
				this.password = '';
				this.pwd = '';
				this.picCode = '';
			}
		},
		activated:function(){
			this.resetParam();
		},
		deactivated:function(){
			this.picCodeUrl = '';
		},
		components:{
			NavBar,
		},
	}
</script>
<style lang="less" scoped>
.page{
	height:100%;
	position:absolute;
	width:100%;
	.page-content{
		height:100%;
		overflow: auto;
		background-position: center center;
		background-size: 100% 100%;
		.person-picture{
			/*border:solid;*/
			height:1.546rem;
			background-repeat: no-repeat;
			background-size: 10%;
			background-position: center center;
			margin-top: 1rem;
		}

		.form-group{
			height: 1.5rem;
			width: 70%;
			margin-left: 15%;
			margin-right: 15%;
			margin-top: 0.386rem;
			background:transparent;
			border: 1px solid #e5e5e5;
			display: flex;
			flex-direction: row;
			align-items: center;
			.phone-picture,.pwd-picture{
				height: 1rem;
				margin-left: 5%;
				margin-right: 5%;
			}
			.user-phone,.user-pwd{
				width: 80%;
				padding-left: 5%;
				border:none;
				outline: none;
				background:transparent;
			}
		}
		.form-imageCode{
			height: 1.5rem;
			width: 70%;
			margin-left: 15%;
			margin-right: 15%;
			margin-top: 0.386rem;
			background:transparent;
			display: flex;
			flex-direction: row;
			align-items: center;
			.code-group{
				width: 60%;
				height: 1.5rem;
				border: 1px solid #e5e5e5;
				display: flex;
				flex-direction: row;
				align-items: center;
				outline:none;
				.code-picture{
					height: 1rem;
					margin-left: 8%;
					margin-right: 5%;
				}
				.image-code{
					width: 100%;
					padding-left: 12%;
					border:none;
					outline: none;
					background:transparent;
				}
			}
			.image-container{
				height: 1.5rem;
				width: 35%;
				border: 1px solid #e5e5e5;
				line-height: 1.5rem;
				text-align: center;
				margin-left: 5%;
				background-color: #e5e5e5;
				.image-url{
					width:100%;
					height:100%;
				}
			}
		}
		.form-code{
			height: 1.5rem;
			width: 70%;
			margin-left: 15%;
			margin-right: 15%;
			margin-top: 0.386rem;
			background:transparent;
			display: flex;
			flex-direction: row;
			align-items: center;
			/*border:solid;*/
			.code-group{
				width: 60%;
				height: 1.5rem;
				border: 1px solid #e5e5e5;
				display: flex;
				flex-direction: row;
				align-items: center;
			.code-picture{
				height: 1rem;
				margin-left: 8%;
				margin-right: 5%;
			}
			.user-code{
				width: 100%;
				padding-left: 12%;
				border:none;
				outline: none;
				background:transparent;
			}
		}
		.get-code{
			height: 1.5rem;
			width: 35%;
			border: 1px solid #e5e5e5;
			line-height: 1.5rem;
			text-align: center;
			margin-left: 5%;
			background-color: #e5e5e5;
		}	
	}
		.input-tip{
			width: 70%;
			padding-left: 15%;
			color: red;
		}
		.login-btn{
			height: 1.5rem;
			width: 70%;
			margin-left: 15%;
			margin-right: 15%;
			margin-top: 0.386rem;
			background-color:#03A9F4;
			text-align: center;
			line-height: 1.5rem;	
			color: white;
		}
		.register-btn{
			.login-btn;
			border: 1px solid red;
			background-color:red;

		}
	}
}
</style>