<template>
  <div class="page-container">
	<div class="register-page page"  flex="dir:top box:first">
		<nav-bar 
            title="长安通行证注册"
        />
        <div class="page-content">
           <div class="person-picture"></div>
           <div class="form-group">
                <img src="../assets/user-phone.png" class="phone-picture">
                <input type="text" placeholder="请输入手机号" class="user-phone">
           </div>
           <div class="form-code">
	            <div class="code-group">
	                <img src="../assets/user-code.png" class="code-picture">
	                <input type="text" placeholder="请输入验证码" class="user-code">
	           </div>
	           <div class="get-code">获取验证码</div>
           </div>
            <div class="form-group">
                <img src="../assets/user-pwd.png" class="pwd-picture">
                <input type="text" placeholder="请输入密码" class="user-pwd">
           </div>
            <div class="form-group">
                <img src="../assets/user-pwd.png" class="pwd-picture">
                <input type="text" placeholder="请确认密码" class="user-pwd">
           </div>
           <p class="input-tip">8-16个字符，由字母、数字和符号的两种以上的组合。</p>
           <div class="register-btn">注册</div>
           <div class="login-btn">登录</div>
        </div>
	</div>
  </div>
</template>
<script>
import NavBar from '../components/NavBar';
 export default{
 	data (){
 		return{
   
 		}
 	},
 	components:{
        NavBar,
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
            background-image: url(../assets/bg.png);
            background-position: center center;
            background-size: 100% 100%;
            .person-picture{
            	/*border:solid;*/
            	height:1.546rem;
            	background-image: url(../assets/person-picture.png);
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
            	border: 1px solid #e5e5e5;
            	background-color:#03A9F4;
            	text-align: center;
            	line-height: 1.5rem;	
            	color: white;
            }
            .register-btn{
            	.login-btn;
            	background-color:red;

            }
        }
    }
    </style>