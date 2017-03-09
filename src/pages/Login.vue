<template>
  <div class="page-container">
	<div class="login-page page"  flex="dir:top box:first">
		<nav-bar 
            title="长安通行证登录"
        />
        <div class="page-content">
           <div class="person-picture"></div>
           <div class="form-group">
                <img src="../assets/user-name.png" class="name-picture">
                <input type="text" placeholder="长安商城用户名" class="user-name">
           </div>
           <div class="form-group">
                 <img src="../assets/user-pwd.png" class="pwd-picture">
                <input type="text" placeholder="长安商城用户密码" class="user-pwd">
           </div>

           <div class="login-btn">登录</div>
           <div class="register-btn">注册</div>
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
            	}
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