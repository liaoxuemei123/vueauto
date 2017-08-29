<template>
    <div class="page-container">
        <div class="page personinfo-page" flex="dir:top box:justify">
            <nav-bar
                title="填写个人信息"
                rightIcon="icon-home"
                :onRight="goHome"
            />
            <div class="page-content">
                <div class="input-container" v-show="pageConfig.fileds.length > 0" v-for="(item,index) in pageConfig.fileds">
                    <div class="input-control" v-if="item == 'vin' && pageConfig.tags[index] == '1'">
                        <inp-com title="车架号" :value="userInfo.vin" placeholder="输入车架号(不限大小写)" maxlength='17' :onBlur="updateVIN.bind(this)"/>
                    </div>
                    <div class="input-control" v-if="item == 'motorId' && pageConfig.tags[index] == '1' && needVerify">
                        <inp-com title="发动机号" :value="userInfo.motorId" placeholder="输入发动机号后6位" :onBlur="updateMotorId.bind(this)" maxlength='6'/>
                    </div>
                    <div class="input-control" v-if="item == 'contact' && pageConfig.tags[index] == '1'">
                        <inp-com title="姓名" :value="userInfo.contact" placeholder="输入姓名" :onBlur="updateContact.bind(this)"/>
                    </div>
                    <div class="input-control" v-if="item == 'tel' && pageConfig.tags[index] == '1'">
                        <inp-com title="手机号" :value="userInfo.tel" placeholder="输入手机号" :onBlur="updateTel.bind(this)" />
                    </div>
                    <div class="referee-control" v-if="item == 'referee' && pageConfig.tags[index] == '1'" flex="dir:left box:first">
                        <div class="label">推荐类型</div>
                        <div class="select-item" v-for="item in referees" @click="refereeType = item.value">
                            <i class="iconfont" :class="refereeType == item.value ?'icon-select' : 'icon-circle'"></i>{{item.name}}
                        </div>
                    </div>
                    <div class="input-control" v-if="refereeType == 1 && item == 'referee' && pageConfig.tags[index] == '1'">
                        <inp-com
                            title="推荐人"
                            placeholder="填写推荐人手机号"
                            :value="refereePhone"
                            :onBlur="updatePhone.bind(this)"
                        />
                    </div>
                    <div class="input-control" v-if="refereeType == 0 && item == 'referee' && pageConfig.tags[index] == '1'">
                        <inp-com
                            title="推荐服务门店"
                            placeholder="请选择服务门店"
                            :rightArrow="true"
                            :readonly="true"
                            :onClick="goStore.bind(this)"
                            :value="storeName"
                        />
                    </div>
                    <div class="input-control-custom" v-if="item == 'tel' && pageConfig.tags[index] == '1'" flex="dir:left cross:center box:justify" v-show="userInfo.tel != userMoblie || isValidate">
                        <div class="label">验证码</div>
                        <input type="text" v-model="code">
                        <div class="button" flex="dir:left cross:center main:right" >
                            <span ref="onValiCode"><span ref="residueTime">60</span>秒后重发</span>
                            <span v-tap="sendSmsCode" ref="getValiCode">获取验证码</span>
                        </div>
                    </div>
                    <div class="input-control" v-if="item == 'message' && pageConfig.tags[index] == '1'">
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
    import { mapState, mapMutations } from 'vuex';
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
                    engineNo:'',
                    buyCarDate:'',
                },
                refereeType:-1,//默认不选择
                referees:[
                    {
                        name:"服务门店",
                        value:0,
                    },
                    // {
                    //     name:"个人",
                    //     value:1
                    // }
                    {
                        name: "无",
                        value: 2
                    }
                ],
                storeName:"",
                refereePhone:"",
                userMoblie:'',
                residueTime:60,
                code:'',
                isValidate:false,
                pageConfig:{
                    tags:[],
                    fileds:[],
                },
                interval: '',//计时器
                needVerify: true,
            }
        },
        components:{
            NavBar,
            InpCom
        },
        computed:{
            'refereeTip':function(){
                const tips = this.userInfo.refereeType == 0 ? '填写推荐人手机号' : '填写经销商号';
                return tips;
            },
            ...mapState({
                modelInfo: ({
                    packageinfo
                }) => packageinfo.modelInfo,
                pUserInfo: ({
                    packageinfo
                }) => packageinfo.userInfo,
                pageSetting: ({
                    pageconfig
                }) => pageconfig.currentBis,
                userVehicle: ({
                    packageinfo
                }) => packageinfo.userVehicle,
                refereeStore: ({
                    packageinfo
                }) => packageinfo.refereeStore,
                storeInfo: ({
                    packageinfo
                }) => packageinfo.storeInfo
            })
        },
        activated:function(){
            if(this.$route.params.code) this.code = '';
            var vehicleInfo = JSON.parse(Tool.localItem('vehicleInfo'));
            if(vehicleInfo && !this.userInfo.motorId){
                if(!this.userInfo.vin){
                    this.userInfo.vin = vehicleInfo.vin;
                }
                if(!this.userInfo.motorId){
                    this.userInfo.motorId = vehicleInfo.engineNo;
                }
                if(!this.userInfo.contact){
                    this.userInfo.contact = vehicleInfo.userName;
                }
            }
            if(this.refereeStore && this.refereeStore.storeName){
                this.storeName = this.refereeStore.storeName;
                this.storeId = this.refereeStore.storeId;
            }else{
                if(this.storeInfo.storeName){
                    this.storeName = this.storeInfo.storeName;
                    this.storeId = this.storeInfo.storeId;
                }else{
                    this.storeName = '';
                }
            }
            $(this.$refs.onValiCode).hide();
            $(this.$refs.getValiCode).show();
            var mobile = Tool.getUserInfo('telephone');
            this.getPageConfig();
            if(this.userVehicle.length <= 0 || !this.userInfo.motorId){
                this.getMemberVehicleInfo();
            }else{
                if(this.userInfo.motorId){

                }else{
                    this.userInfo.vin = this.userVehicle[0].vin;
                    this.userInfo.motorId = '';
                    if(this.userVehicle.length > 0 && this.userVehicle[0].vehilceSeries == this.modelInfo.code){
                        this.needVerify = false;
                    }else{
                        this.needVerify = true;
                        Toast({
                            message:'所选车型不符，请重新选择车型或手动录入vin和发动机号',
                            duration:3000,
                        });
                    }
                }
            }
            Tool.get('findLoginTimestamp',{mobile},(data)=>{
                if(data.code == 200){
                    this.isValidate = false;
                }else{
                    this.isValidate = true;
                }
            })
        },
        deactivated:function(){
            this.residueTime = 60;
            clearInterval(this.interval);
        },
        methods:{
            nextPage:function(){
                if(!this.userInfo.vin && this.pageConfig.tags[this.pageConfig.fileds.indexOf('vin')] == '1'){
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
                if(this.userVehicle.length > 0 && this.userVehicle[0].vehilceSeries == this.modelInfo.code && this.userInfo.vin == this.userVehicle[0].vin){
                    
                }else{
                    if(!this.userInfo.motorId && this.pageConfig.tags[this.pageConfig.fileds.indexOf('motorId')] == '1'){
                        Toast({
                            message:'请输入发动机号',
                            duration:1000,
                        });
                        return false;
                    }
                }
                if(!this.userInfo.contact && this.pageConfig.tags[this.pageConfig.fileds.indexOf('contact')] == '1'){
                    Toast({
                        message:'请输入姓名',
                        duration:1000,
                    });
                    return false;
                }
                if(!this.userInfo.tel && this.pageConfig.tags[this.pageConfig.fileds.indexOf('tel')] == '1'){
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
                if(this.refereeType == -1){
                    Toast({
                        message:'请选择推荐人',
                        duration:1000,
                    });
                    return false;
                }
                this.userInfo.vin = this.userInfo.vin.toLocaleUpperCase();
                this.userInfo.motorId = this.userInfo.motorId.toLocaleUpperCase();
                if(this.pageConfig.tags[this.pageConfig.fileds.indexOf('motorId')] == '1'){
                    new Promise((res,rej)=>{
                        if(this.userVehicle.length > 0 && this.userVehicle[0].vehilceSeries == this.modelInfo.code && this.userInfo.vin == this.userVehicle[0].vin){
                            res({
                                data:{
                                    buyCarDate: this.userVehicle[0].purchaseDate,
                                    engineNo: ''
                                }
                            })
                        }else{
                            Tool.get('queryVehicleInfo',{
                                vin:this.userInfo.vin,
                                engineNo:this.userInfo.motorId,
                                isMiniCar:this.modelInfo.vehicleType,
                                carSeriesName:this.modelInfo.vehicleModel,
                                carSeriesCode:this.modelInfo.code,
                            },(data)=>{
                                if(data.code == 1){
                                    res(data);
                                }else{
                                    Toast({
                                        message:data.msg,
                                        duration:1000,
                                    })
                                }
                            })
                        }
                    }).then((pData)=>{
                        if(this.userInfo.tel != this.userMoblie || this.isValidate){
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
                                    this.userInfo.engineNo = pData.data.engineNo;
                                    this.userInfo.mileage = Math.ceil((+new Date() - (pData.data.buyCarDate?+new Date(pData.data.buyCarDate):new Date()))/(1000*60*60*24));
                                    this.userInfo.buyCarDate = pData.data.buyCarDate;
                                    this.updateUserInfon(this.userInfo);
                                    const wbProduct = this.pageSetting.wbpId;
                                    const wbtrPhonno = this.userInfo.tel;
                                    const buyCarDate = this.userInfo.buyCarDate;
                                    Tool.get('productRange/determineUser',{wbtrPhonno,wbProduct,buyCarDate},data =>{
                                        if(data.msg === '0'){
                                            Toast({
                                                message:data.data,
                                                duration:3000
                                            })
                                        }else{
                                            this.$router.push({name:'confirmorder',params:this.$route.params});
                                            Tool.localItem('vehicleInfo',{vin:this.userInfo.vin,engineNo:this.userInfo.motorId,userName:this.userInfo.contact})
                                        }
                                    })
                                }else{
                                    Toast({
                                        message:data.msg,
                                        duration:1000,
                                    })
                                }
                            })
                        }else{
                            this.userInfo.engineNo = pData.data.engineNo;
                            this.userInfo.mileage = Math.ceil((+new Date() - (pData.data.buyCarDate?+new Date(pData.data.buyCarDate):new Date()))/(1000*60*60*24));
                            this.userInfo.buyCarDate = pData.data.buyCarDate;
                            this.updateUserInfon(this.userInfo);
                            const wbProduct = this.pageSetting.wbpId;
                            const wbtrPhonno = this.userInfo.tel;
                            const buyCarDate = this.userInfo.buyCarDate;
                            Tool.get('productRange/determineUser',{wbtrPhonno,wbProduct,buyCarDate},data =>{
                                if(data.msg === '0'){
                                    Toast({
                                        message:data.data,
                                        duration:3000
                                    })
                                }else{
                                    this.$router.push({name:'confirmorder',params:this.$route.params});
                                    Tool.localItem('vehicleInfo',{vin:this.userInfo.vin,engineNo:this.userInfo.motorId,userName:this.userInfo.contact})
                                }
                            })
                        }
                    })
                }else{
                    if(this.userInfo.tel != this.userMoblie || this.isValidate){
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
                                this.userInfo.engineNo = '';
                                this.userInfo.mileage = 0;
                                this.userInfo.buyCarDate = '';
                                this.updateUserInfon(this.userInfo);
                                const wbProduct = this.pageSetting.wbpId;
                                const wbtrPhonno = this.userInfo.tel;
                                const buyCarDate = this.userInfo.buyCarDate;
                                Tool.get('productRange/determineUser',{wbtrPhonno,wbProduct,buyCarDate},data =>{
                                    if(data.msg === '0'){
                                        Toast({
                                            message:data.data,
                                            duration:3000
                                        })
                                    }else{
                                        this.$router.push({name:'confirmorder',params:this.$route.params});
                                        Tool.localItem('vehicleInfo',{vin:this.userInfo.vin,engineNo:this.userInfo.motorId,userName:this.userInfo.contact})
                                    }
                                })
                            }else{
                                Toast({
                                    message:data.msg,
                                    duration:1000,
                                })
                            }
                        })
                    }else{
                        this.userInfo.engineNo = '';
                        this.userInfo.mileage = 0;
                        this.userInfo.buyCarDate = '';
                        this.updateUserInfon(this.userInfo);
                        const wbProduct = this.pageSetting.wbpId;
                        const wbtrPhonno = this.userInfo.tel;
                        const buyCarDate = this.userInfo.buyCarDate;
                        Tool.get('productRange/determineUser',{wbtrPhonno,wbProduct,buyCarDate},data =>{
                            if(data.msg === '0'){
                                Toast({
                                    message:data.data,
                                    duration:3000
                                })
                            }else{
                                this.$router.push({name:'confirmorder',params:this.$route.params});
                                Tool.localItem('vehicleInfo',{vin:this.userInfo.vin,engineNo:this.userInfo.motorId,userName:this.userInfo.contact})
                            }
                        })
                    }
                }
                this.submitReferee();
            },
            goHome:function(){
                this.$router.go(-2)
            },
            updateComment:function(e){
                this.userInfo.message = $(e.target).val();
            },
            updateVIN:function(e){
                this.userInfo.vin = $(e.target).val();
                if(this.userVehicle.length > 0 && $(e.target).val() == this.userVehicle[0].vin){
                    this.needVerify = false;
                }else{
                    this.needVerify = true;
                }
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
            getPageConfig:function(e){
                this.pageConfig.tags = this.pageSetting.wbPageDetail['GM_PAGE'].wbpdFtag.split(',');
                this.pageConfig.fileds = this.pageSetting.wbPageDetail['GM_PAGE'].wbpdName.split(',');
                this.$nextTick(() => {
                    $(this.$refs.onValiCode).hide();
                    $(this.$refs.getValiCode).show();
                })
            },
            sendSmsCode:function(e){
                if(!(/^1[34578]\d{9}$/.test(this.userInfo.tel))){
                    Toast({
                        message:'手机号有误',
                        duration:1000,
                    });
                    return false;
                }
                Tool.get('wbSendSmsCode',{
					mobile:this.userInfo.tel,
				},(data)=>{
                    $(this.$refs.getValiCode).hide();
                    $(this.$refs.onValiCode).show();
					this.getCodeState = true;
					this.interval = setInterval(()=>{
						this.residueTime -- ;
                        $(this.$refs.residueTime).text(this.residueTime);
						while(this.residueTime < 1){
							this.getCodeState = false;
							this.residueTime = 60;
                            $(this.$refs.residueTime).text(60);
                            $(this.$refs.getValiCode).show();
                            $(this.$refs.onValiCode).hide();
							clearInterval(this.interval);
						}
					},1000)
				})
            },
            getMemberVehicleInfo:function(){
                var oid = Tool.getUserInfo('oid');
                var userId = Tool.getUserInfo('userId');
                Tool.get('getMemberVehicleInfo',{
                    oid,userId
                },data => {
                    if(data.code == 200 && data.data && data.data.vehicleInfo && data.data.vehicleInfo.length > 0){
                        this.addUservehicle(data.data.vehicleInfo);
                    }
                    if(this.userVehicle.length > 0){
                        this.userInfo.vin = this.userVehicle[0].vin;
                        this.userInfo.motorId = '';
                        if(this.userVehicle.length > 0 && this.userVehicle[0].vehilceSeries == this.modelInfo.code){
                            this.needVerify = false;
                        }else{
                            this.needVerify = true;
                            Toast({
                                message:'所选车型不符，请重新选择车型或手动录入vin和发动机号',
                                duration:3000,
                            });
                        }
                    }
                })
            },
            goStore:function(){
                const wbpId = this.pageSetting.wbpId;
                this.$router.push({name:'store',params:{wbpId}});
            },
            submitReferee:function(){
                if(this.refereeType == 0){
                    this.setUserInfo({refereeType:this.refereeType,referee:this.storeName,refereeId:this.storeId})
                }else if(this.refereeType == 1){
                    this.setUserInfo({refereeType:this.refereeType,referee:this.refereePhone,refereeId:''})
                }else{
                    this.setUserInfo({refereeType:this.refereeType,referee:'',refereeId:''})
                }
            },
            ...mapMutations({
                updateUserInfon: 'UPDATE_USER_INFO',
                addUservehicle: 'ADD_USERVEHICLE',
                setUserInfo:'UPDATE_USER_INFO',
            })
        },
        beforeRouteEnter:(to,from,next)=>{
            Tool.routerEnter(to,from,next)
        },
        created:function(){
            if($.isEmptyObject(this.modelInfo)) {
                this.$router.push({name:'maintainset'});
            }
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
                .referee-control{
                    height:1.8rem;
                    line-height:1.8rem;
                    background-color:#fff;
                    padding:0 3%;
                    margin-bottom:1px;
                    .label{
                        width:40%;
                        font-size:0.68rem;
                    }
                    .select-item{
                        width:3rem;
                        .iconfont{
                            color:#ccc;
                            margin-right:0.1rem;
                        }
                        .icon-select{
                            color:#fc4c1d;
                        }
                    }
                }
                .input-control-custom{
                    height:1.9rem;
                    background-color:#fff;
                    margin-bottom:1px;
                    padding:0rem 1rem 0 0.5rem;
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
                        &>span{
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