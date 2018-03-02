<template>
	<div class="page-container">
		<div class="forget-page page" flex="dir:top box:first">
			<nav-bar
                title="找回密码"
            />
			<div class="page-content" flex="dir:top">
				<div class="pwd-box">
					<div class="login_box_row tel-input" flex="dir:left box:first cross:center">
						<div class="input-label">
				            <i class="iconfont"></i><span>新密码</span>
				        </div>
				        <div flex="dir:left box:last cross:center">
				            <input type="text" maxlength="16" class="newpwd" placeholder="8-16位字母+数字或符号的组合" @input="userChange1" :value="newpwd" @blur="updateNewpwd">
	                    	<div class="close-container" v-show="closeContainerShow1" @click="clearInput"><i class="iconfont  icon-close"></i></div>
				        </div>
					</div>
					<div class="login_box_row picCodeRow"  flex="dir:left box:first cross:center">
						<div class="input-label">
				            <i class="iconfont"></i><span>确认密码</span>
				        </div>
				        <div flex="dir:left box:last cross:center">
				            <input type="text" maxlength="16" class="confirmpwd"  placeholder="再次确认密码"  @input="userChange2" :value="confirmpwd"  @blur="updateCon">
				            <div class="close-container" v-show="closeContainerShow2" @click="clearInput"><i class="iconfont  icon-close"></i></div>
				        </div>
					</div>
				</div>
				<div class='passText' v-show="passTextDisplay"><span class='tiSi'>请输入8-16位字母+数字或符号的组合</span></div>
				<div class="button-control  active"  id ="login_login" >
	                <btn-com
	                	class="ableC"
	                    title="下一步"
	                    :onClick="onVerifyPwd"
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
				closeContainerShow1:false,
				closeContainerShow2:false,
				passTextDisplay:false,
				newpwd:"",
				confirmpwd:"",
				pickCode:"",
				mobile:"",
				smsCode:"",
				dataForget:{},
				btnAble:true, //用于为插件
			}
		},
		components:{
            NavBar,
            BtnCom,
            InpCom,
		},
		methods:{
			updateNewpwd: function(e){
				this.newpwd = $(e.target).val();
			},
			updateCon:function(e){
				this.confirmpwd = $(e.target).val();
			},
			userChange1: function(e){
				var target = $(e.currentTarget);
				var value = target.val();
				this.passTextDisplay = true;
				
				if(value){
					this.closeContainerShow1 = true;
				}else{
					this.closeContainerShow1 = false;
				}
			},
			userChange2: function(e){
				var target = $(e.currentTarget);
				var value = target.val();
				this.passTextDisplay = true;
				
				if(value){
					this.closeContainerShow2 = true;
				}else{
					this.closeContainerShow2 = false;
				}
			},
			clearInput: function(e){
				var target = $(e.currentTarget);
					target.prev('input').val('');
				setTimeout(function(){
					target.hide();
				},500);
			},
			//确认密码
			onVerifyPwd: function() {
				var me = this;
				var result = me.checkPassWord(this.newpwd);
				if(!result) return;
				//验证密码是否相等
				if (me.mode=='forGetPassWord'&&this.confirmpwd !== this.newpwd) {
					Toast({
	                    message:"密码输入不一致!",
	                    duration:1000,
	                })
					return
				};
				me.forGetPassWord();
			},
			//最后提交忘记密码
			forGetPassWord: function() {
				var me = this;
				me.dataForget = {
					mobile: me.mobile,
					smsCode: me.smsCode,
					picCode: me.pickCode,
					password: this.newpwd
				};


				if (password ==='') {
					Toast({
	                    message:"密码不能为空哦!",
	                    duration:1000,
	                })
					return
				};
                //如果公钥获取成功才才去做找回密码操作
                me.getPassWordPubMod();
			},
			//对忘记密码的密码做加密处理
			getPassWordPubMod:function(){
				var me=this;
				Tool.post('generatePublicKey',{
					picCode:this.pickCode,
					phone:this.mobile
				},(data)=>{
					if(data.result == 0){
                    	var mod=data.data.mod;
                        var exp=data.data.exp;
                        var publicKey=RSAUtils.getKeyPair(data.data.exp, '', data.data.mod);
                        var txtKey=RSAUtils.encryptedString(publicKey, encodeURIComponent(me.dataForget.password));
                        me.dataForget.mod=mod;
                        me.dataForget.password=txtKey;
                        //此处再去请求找回密码接口
                        me.goRequestPassWord();
                	}
                	else{
                		Toast({
                            duration:1000,
                            message:data.result,
                        })
                	}
				})
			},
			//请求忘记密码接口
			goRequestPassWord:function(){
				var me=this;
				Tool.post('forGetPassWord',{
					data: me.dataForget,
				},(data)=>{
					if(data.result == 0){
						Toast({
                            duration:1000,
                            message:"找回密码成功,请重新登录",
                        })
                        this.$router.go(-3);
						// butterfly.back('my-secondcar/login.html');
                	}
                	else{
                		Toast({
                            duration:1000,
                            message:data.result,
                        })
                	}
				})
			},
			//密码验证 格式验证  8-16个字符，由字母，数字和符号的两种以上组合。
			checkPassWord: function(val) {
				var me = this,
					passWord = val;

				//验证密码长度
				if (passWord && passWord.length < 8) {
					Toast({
                        duration:1000,
                        message:"密码长度必须为8-16位",
                    })
					return false;
				}

				//验证密码是否符合规范
				if (me.checkString(passWord) > 1) {
					console.log('密码组合符合规范' + me.checkString(passWord));
					return true;
				} else {
					Toast({
                        duration:1000,
                        message:"8-16个字符,由字母,数字和符号的两种以上组合",
                    })
					return false;
				}
			},
			checkString: function(passWord) {
				var str = 0;
				if (passWord && passWord.length > 7) {
					if (passWord.search(/[a-zA-Z]/) >= 0) { //包含字母
						str += 1;
					}
					if (passWord.search(/[0-9]/) >= 0) { //包含数字
						str += 1;
					}
					if (passWord.search(/['!@^#$%&'()*+,\-./:;<=>?@\[\\\]^_`]/) >= 0) { //包含指定特殊符号
						str += 1;
					}
				};
				return str;

			},
		},
		activated:function(){
            this.pickCode = this.$route.params.pickCode;
            this.mobile = this.$route.params.mobile;
            this.smsCode = this.$route.params.smsCode;
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
        .pwd-box{
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
		            text-align: left;
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
	        }
        }
        .passText{
		    padding: 14px 10px;
		    color:#fd5d5d;
		    .tiSi{
			    position: absolute;
			    right: 10px;
			}
		}
        .button-control{
        	padding: 20px 10px;
        	color: white;
        	font-size: 1rem;
        }
    }
</style>