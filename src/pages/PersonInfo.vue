<template>
    <div class="page-container">
        <div class="page personinfo-page" flex="dir:top box:justify">
            <nav-bar
                title="填写个人信息"
                rightIcon="icon-home"
                :onRight="goHome"
            />
            <div class="page-content">
                <div class="input-container">
                    <div class="input-control">
                        <inp-com title="车架号" :value="userInfo.vin" placeholder="输入车架号(不限大小写)" maxlength='17' :onBlur="updateVIN.bind(this)"/>
                    </div>
                    <div class="input-control">
                        <inp-com title="发动机号后六位" :value="userInfo.motorId" placeholder="输入发动机号后六位" :onBlur="updateMotorId.bind(this)" :maxlength="'6'"/>
                    </div>
                    <div class="input-control">
                        <inp-com title="姓名" :value="userInfo.contact" placeholder="输入姓名" :onBlur="updateContact.bind(this)"/>
                    </div>
                    <div class="input-control" >
                        <inp-com title="手机号" :value="userInfo.tel" placeholder="输入手机号" :onBlur="updateTel.bind(this)" />
                    </div>
                    <div class="input-control-custom" flex="dir:left cross:center box:justify" v-if="userInfo.tel != userMoblie">
                        <div class="label">验证码</div>
                        <input type="number" v-model="code">
                        <div class="button" flex="dir:left cross:center main:right" >
                            <span v-if="getCodeState">{{residueTime}}秒后重发</span>
                            <span v-tap="sendSmsCode" v-else="getCodeState">获取验证码</span>
                        </div>
                    </div>
                    <div class="input-control">
                        <inp-com title="备注" :readonly="true" />
                        <div class="text-control" flex="dir:top">
                        <textarea rows="5" maxlength='100' placeholder="请输入100字内留言" @input="updateComment"></textarea>
                        <div class="show-length">
                            {{userInfo.message.length}}/100
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div class="button-control" @click="nextPage">
                <div class="next-button">
                    下一步
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import NavBar from '../components/NavBar';
    import InpCom from '../components/InpCom';
    import { mapState } from 'vuex';
    import { Toast } from 'mint-ui';
    import Tool from '../utils/Tool'
    export default {
        data () {
            return {
                userInfo:{
                    vin:'',
                    motorId:'',
                    contact:'',
                    tel:'',
                    message:'',
                },
                userMoblie:'',
                getCodeState:false,
                residueTime:60,
                code:'',
            }
        },
        components:{
            NavBar,
            InpCom
        },
        computed:{
            ...mapState([
                'packageInfo'
            ])
        },
        methods:{
            nextPage:function(){
                if(!this.userInfo.vin){
                    Toast({
                        message:'请输入车架号',
                        duration:1000,
                    });
                    return false;
                }
                if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]{17}$/.test(this.userInfo.vin)){
                    Toast({
                        message:'车架号输入有误',
                        duration:1000,
                    });
                    return false;
                }
                if(!this.userInfo.motorId){
                    Toast({
                        message:'请输入发动机号',
                        duration:1000,
                    });
                    return false;
                }
                if(this.userInfo.motorId.length != 6){
                    Toast({
                        message:'请输入发动机号后6位',
                        duration:1000,
                    });
                    return false;
                }
                if(!this.userInfo.contact){
                    Toast({
                        message:'请输入联系人',
                        duration:1000,
                    });
                    return false;
                }
                if(!this.userInfo.tel){
                    Toast({
                        message:'请输入手机号',
                        duration:1000,
                    });
                    return false;
                }
                if(!(/^1[34578]\d{9}$/.test(this.userInfo.tel))){
                    Toast({
                        message:'手机号有误',
                        duration:1000,
                    });
                    return false;
                }
                this.userInfo.vin = this.userInfo.vin.toLocaleUpperCase();
                // new Promise((res,rej)=>{
                //     Tool.get('queryVehicleInfo',{
                //         vin:this.userInfo.vin,
                //         engineNo:this.userInfo.motorId,
                //         isMiniCar:this.packageInfo.modelInfo.vehicleType,
                //     },(data)=>{
                //         if(data.code == 200){
                //             res(data);
                //         }else{
                //             Toast({
                //                 message:data.msg,
                //                 duration:1000,
                //             })
                //             rej();
                //         }
                //     })
                // }).then((pData)=>{
                    if(this.userInfo.tel != this.userMoblie){
                        if(!this.code){
                            Toast({
                                message:'请输入验证码',
                                duration:1000,
                            })
                            return false;
                        }
                        Tool.get('verifyCode',{
                            code:this.code,
                            mobile:this.userInfo.tel,
                        },(data) => {
                            if(data.code == 200){
                                this.$store.commit('SET_PACKAGE_USERINFO',this.userInfo);
                                this.$router.push({name:'confirmorder'});
                            }
                        })
                    }else{
                        this.$store.commit('SET_PACKAGE_USERINFO',this.userInfo);
                        this.$router.push({name:'confirmorder'});
                    }
                //})
            },
            goHome:function(){
                this.$router.go(-2)
            },
            updateComment:function(e){
                this.userInfo.message = $(e.target).val();
            },
            updateVIN:function(e){
                this.userInfo.vin = $(e.target).val();
            },
            updateMotorId:function(e){
                this.userInfo.motorId = $(e.target).val();
            },
            updateContact:function(e){
                this.userInfo.contact = $(e.target).val();
            },
            updateTel:function(e){
                this.userInfo.tel = $(e.target).val();
            },
            sendSmsCode:function(e){
                Tool.get('wbSendSmsCode',{
					mobile:this.userInfo.tel,
				},(data)=>{
					this.getCodeState = true;
					var a = setInterval(()=>{
						this.residueTime -- ;
						while(this.residueTime < 1){
							this.getCodeState = false;
							this.residueTime = 60;
							clearInterval(a);
						}
					},1000)
				})
            }
        },
        beforeRouteEnter:(to,from,next)=>{
            Tool.routerEnter(to,from,next)
        },
        created:function(){
            this.userInfo.tel = Tool.getUserInfo('telephone');
            this.userMoblie = Tool.getUserInfo('telephone');
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
        .page-content{
            background-color: #efefef;
            height:100%;
            overflow: auto;
            .input-container{
                box-shadow:0px 2px 5px #ccc;
                .input-control{
                    margin-bottom:1px;
                    .text-control{
                        position:relative;
                        textarea{
                            resize:none;
                            outline:none;
                            border:none;
                            padding:0;
                            background-color:#f8f8f8;
                            font-size:0.58rem;
                            padding:0.43rem 0.43rem 0.43rem 1.28rem;
                        }
                        .show-length{
                            position:absolute;
                            bottom:0.43rem;
                            right:0.43rem;
                            font-size:0.51rem;
                            color:#08a9ef;
                        }
                    }
                }
                .input-control-custom{
                    height:1.9rem;
                    background-color:#fff;
                    margin-bottom:1px;
                    padding:0rem 0.5rem;
                    font-size:0.68rem;
                    .label{
                        margin-right:1rem;
                    }
                    input{
                        outline:none;
                        border:none;
                        font-size:0.58rem;
                        text-align:right;
                    }
                    .button{
                        width:4rem;
                        text-align:right;
                        font-size:0.58rem;
                        height:1.9rem;
                        span{
                            color:#ff3b2f;
                            border:1px solid #ff3b2f;
                            padding:0.2rem 0.3rem;
                            border-radius:3px;
                        }
                    }
                }
            }
        }
        .button-control{
            .next-button{
                text-align:center;
                color:#fff;
                background-color:#389cf2;
                height:2.1rem;
                line-height:2.1rem;
                font-size:0.68rem;
            }
        }
    }
</style>