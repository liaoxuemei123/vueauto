<template>
  <div class="page-container">
	<div class="login-page page"  flex="dir:top box:first">
		<nav-bar 
            title="长安通行证登录"
        />
        <div class="page-content" :style="{'background-image':'url('+require('../assets/bg.png')+')'}">
           <div class="person-picture" :style="{'background-image':'url('+require('../assets/person-picture.png')+')'}"></div>
           <div class="form-group">
                <img src="../assets/user-name.png" class="name-picture">
                <input type="text" placeholder="长安商城用户名" class="user-name" v-model="tel">
           </div>
           <div class="form-group">
                 <img src="../assets/user-pwd.png" class="pwd-picture">
                <input type="password" placeholder="长安商城用户密码" class="user-pwd" v-model="password">
           </div>

           <div class="login-btn" @click="login">登录</div>
           <div class="register-btn" @click="register">注册</div>
		   <transition name="slide-up">
		   		<p class="tips" v-if="forgetPassword">
					<a href="https://cloud.mall.changan.com.cn/caecapp/main/index.html#my/forget-password.html">找回密码</a>
				</p>
		   </transition>
        </div>
	</div>
  </div>
</template>
<script>
	import NavBar from '../components/NavBar';
	import Tool from '../utils/Tool';
	import En from '../utils/Encryption';
	import { Toast } from 'mint-ui';
	import errorMsg from '../utils/error_msg';
 	export default{
		data (){
			return{
				tel:'',
				password:'',
				forgetPassword:false,
			}
		},
		components:{
			NavBar,
		},
		methods:{
			register:function(){
				this.$router.push({name:'register',params:this.$route.params});
			},
			login:function(){
				this.tel = this.tel.replace(/\s/g,'');
				if(!this.tel){
					Toast({
						duration:1000,
						message:'请输入用户名'
					})
					return false;
				}
				if(!this.password){
					Toast({
						duration:1000,
						message:'请输入密码'
					})
					return false;
				}
				var self = this;
				En.createPassword(this.password).then((pData)=>{
					Tool.post('loginCode',{
						mobile:this.tel,
						password:pData.password,
						mod:pData.mod,
						additional:pData.additional,
					},(data)=>{
						if(data.success){
							
							if(data.data.result != '0'){
								Toast({
									duration:1000,
									message:errorMsg[data.data.result]
								})
							}else{
								Toast({
									duration:1000,
									message:'登录成功'
								})
							}
							// self.$router.go(-2);
							Tool.localItem("userInfo",data.data);
							Tool.removeLocalItem('oid');
							if(self.$route.params.to){
								if (self.$route.params.preCtoken) {
									self.$router.push({path:self.$route.params.to, query:{token:data.data.token}});
								}
								else self.$router.push({path:self.$route.params.to});
							}else{
								self.$router.push({name:'maintainset'});
							}
						}else{
							Toast({
								duration:1000,
								message:'账号密码错误'
							})
							self.forgetPassword = true;
						}
					})
				})
				
			}
		},
		activated:function(){
			this.forgetPassword = true;
		},
		deactivated:function(){
			this.forgetPassword = false;
		},
		beforeRouteEnter:(to,from,next)=>{
			next();
		}
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
            	margin-top: 20px;
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
            	.name-picture,.pwd-picture{
            		height: 1rem;
				    margin-left: 5%;
				    margin-right: 5%;
            	}
            	.user-name,.user-pwd{
            		width: 80%;
            		border:none;
            		padding-left: 5%;
            		outline: none;
					background:transparent;
            	}
            }
            .login-btn{
               height: 1.5rem;
            	width: 70%;
            	margin-left: 15%;
            	margin-right: 15%;
            	margin-top: 0.386rem;
				border: 1px solid #03A9F4;
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
			.tips{
				color:#03A9F4;
				margin:1rem 15%;
				a{
					color:#03A9F4;
				}
			}
        }
    }
 </style>