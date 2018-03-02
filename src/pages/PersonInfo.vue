<template>
    <div class="page-container">
        <div class="page personinfo-page" flex="dir:top box:justify">
            <nav-bar
                title="填写个人信息"
                rightIcon="icon-home"
                :onRight="goHome"
                :goBack="goBack.bind(this)"
            />
            <div class="page-content">
                <div class="input-container" v-show="pageConfig.fileds.length > 0" v-for="(item,index) in pageConfig.fileds">
                    <div class="input-control" v-if="item == 'vin' && pageConfig.tags[index] == '1'" flex="dir:left cross:center">
                        <inp-com title="车架号" :value="userInfo.vin" placeholder="输入车架号或选择(不限大小写)" maxlength='17' :onBlur="updateVIN.bind(this)" />
                        <!-- dir:right box:mean -->
                        <div class="diyicon"  @click="goCarMan" flex="dir:right cross:center">
                            <i class="iconfont icon-go arrow"></i>
                        </div>
                    </div>
                    <div class="input-control" v-if="item == 'motorId' && pageConfig.tags[index] == '1' && needVerify"  flex="dir:left cross:center">
                        <inp-com title="发动机号" :value="userInfo.motorId" placeholder="输入发动机号后6位" :onBlur="updateMotorId.bind(this)" maxlength='6' />
                        <!-- <div class="diyicon" @click="goCarMan">
                            <i class="iconfont icon-go arrow"></i>
                        </div> -->
                    </div>
                    <div class="input-control" v-if="item == 'contact' && pageConfig.tags[index] == '1'">
                        <inp-com title="姓名" :value="userInfo.contact" placeholder="输入姓名" :onBlur="updateContact.bind(this)" maxlength='11' />
                    </div>
                    <div class="input-control" v-if="item == 'tel' && pageConfig.tags[index] == '1'">
                        <inp-com title="手机号" :value="userInfo.tel" placeholder="输入手机号" :onBlur="updateTel.bind(this)"  maxlength='11' />
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
                    <!-- v-show="userInfo.tel != userMoblie || isValidate" -->
                    <div class="input-control-custom" v-if="item == 'tel' && pageConfig.tags[index] == '1'" flex="dir:left cross:center box:justify" v-show="isValidate">
                        <div class="label">验证码</div>
                        <input type="text" v-model="code">
                        <div class="button" flex="dir:left cross:center main:right" >
                            <span ref="onValiCode"><span ref="residueTime">60</span>秒后重发</span>
                            <span v-tap="sendSmsCode" ref="getValiCode">获取验证码</span>
                        </div>
                    </div>

                    <!-- 0211删除个人信息页面发票入口 改到我的订单里面-->
                    <!-- <div class="input-control receipt-box" v-if="item == 'receipt' && pageConfig.tags[index] == '1'" v-show="twoTags" flex="dir:left cross:center box:justify" @click="receiptPage">
                        <div  class="label" style="color:#333;font-size:0.68rem;">发票信息</div>
                        <div class="receipt" v-if="userInfo.needReceipt == '1'">不需要发票</div>
                        <div class="receipt" v-if="userInfo.needReceipt == '0' && userInfo.selectTitle=='0'">个人</div>
                        <div class="receipt" v-if="userInfo.needReceipt == '0' && userInfo.selectTitle=='1'" flex="dir:top">
                            <span>公司</span>
                            <span>{{userInfo.comName}}</span>
                        </div>
                        <i class="iconfont icon-go arrow"></i>
                    </div> -->
                    <div class="input-control lastInputBox" v-if="item == 'message' && pageConfig.tags[index] == '1'">
                        <div class="text-control" flex="dir:top">
                            <textarea rows="5" maxlength='100' placeholder="请输入100字内留言" @input="updateComment"></textarea>
                            <div class="show-length">
                                {{userInfo.message.length}}/100
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="input-container" v-show="pageConfig.fileds.length > 0">
                    <div class="input-control receipt-box"  >
                        <div flex="dir:left box:last cross:center" @click="twoTagsShow" style="padding-right:3%;">
                            <div>更多</div>
                            <i class="iconfont icon-little-arrow"></i>
                        </div>
                        
                    </div>
                </div> -->
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
    import { Toast , MessageBox } from 'mint-ui';
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
                    needReceipt:'1', //1默认不要发票
                    selectTitle:'0', // 0代表个人
                    receiptCode:'', // 识别号
                    comName:'', //公司名
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
                selectCarData:'',
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
                purchased: false,
                tagOne:true,
                twoTagsValue:true,
                // twoTags:false,
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
                }) => packageinfo.storeInfo,
                getedVehiche: ({
                    mixin
                }) => mixin.getedVehiche,
                receiptInfo: ({
                    packageinfo
                }) => packageinfo.receiptInfo,
                orderTip: ({
                    packageinfo
                }) => packageinfo.orderTip,
                twoTags: ({
                    packageinfo
                }) => packageinfo.infoTwoTags,
            })
        },
        activated:function(){
            if(this.$route.params.code) this.code = '';
            // 当通过验证并进入下一页的时候存在本地
            // 有问题 刚进入页面的时候不一定没有值，离开页面也不能清空这个本地的值，因为从子页面返回必须要有值啊!!!!!!!!!
            // 还有选择车辆之后，修改vin相应的改变=》updateVIN的问题
            // 构造值吧
            
            if(this.refereeStore && this.refereeStore.storeName){
                if (this.refereeStore.storeName=='任意服务门店') {
                    Toast({
                        message:'请选择具体某一服务门店',
                        duration:1000,
                    });
                }
                this.storeName = this.refereeStore.storeName=='任意服务门店'?'':this.refereeStore.storeName;
                this.storeId = this.refereeStore.storeName=='任意服务门店'?'':this.refereeStore.storeId;
                // this.storeId = this.refereeStore.storeId;
            }else{
                if(this.storeInfo.storeName){
                    this.storeName = this.storeInfo.storeName=='任意服务门店'?'':this.storeInfo.storeName;
                    this.storeId = this.storeInfo.storeName=='任意服务门店'?'':this.storeInfo.storeId;
                    // this.storeId = this.storeInfo.storeId;
                }else{
                    this.storeName = '';
                }
            }
            this.getPageConfig();

            if(JSON.parse(Tool.localItem('selectCarData'))){

                    this.selectCarData = JSON.parse(Tool.localItem('selectCarData'));
                    if (Tool.localItem('isSelectCarBack')) {
                        // Tool.localItem('isSelectCarBack')
                        // return false;
                    }
                    else{
                        this.userInfo.vin = this.selectCarData.vin;

                        if(this.selectCarData.dl_engine_no){
                            this.needVerify = false;
                            this.userInfo.motorId = this.selectCarData.dl_engine_no;
                            // this.userInfo.motorId = this.selectCarData.dl_engine_no;
                        }else{
                            this.needVerify = false;
                            this.userInfo.motorId = '';
                            // 都是通过验证的车辆，就不显示了
                            // updateVIN的问题
                            // 构造值
                        }
                    }
                    
                // }
            }
            else{
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

                
                $(this.$refs.onValiCode).hide();
                $(this.$refs.getValiCode).show();
                var mobile = Tool.getUserInfo('telephone'); //本地
                // if(!this.getedVehiche){ // 如果没有获取过则获取
                //     this.getMemberVehicleInfo();
                // }
                if(this.userVehicle.length <= 0 && !this.getedVehiche){ //原版
                // if(this.userVehicle.length <= 0){
                // if(this.userVehicle.length <= 0 && !this.userInfo.vin){ //从我的页面返回不会报错但是有问题
                    this.getMemberVehicleInfo();
                    // 通过这个接口取的都没有为发动机这一栏赋值，必定为空，如果不通过手动填写，那么会一直为空值
                }
                else{
                    if(this.userInfo.motorId || this.needVerify == true){
                        // 如果发动机有值，就意味着手输入的，就只取本地的
                    }else{
                        if (this.userVehicle.length > 0) {
                            // 先判断本地有没有值，有就赋值，然后判断有没有从后台拉过来存在modules中，有就继续赋值，同时因为从后台取通过了验证，所以隐藏发动机那一栏
                            this.userInfo.vin = this.userVehicle[0].vin;
                            if(this.userVehicle.length > 0 && this.userVehicle[0].vehicle_type_id == this.modelInfo.id){
                                this.needVerify = false;
                                this.userInfo.motorId = this.userVehicle[0].dl_engine_no;
                            }else{
                                this.needVerify = true;
                                this.userInfo.motorId = '';
                                // Toast({
                                //     message:'所选车型不符，请重新选择车型或手动录入vin和发动机号',
                                //     duration:3000,
                                // });
                            }
                        }
                    }
                }
            }  //临时注释
            // 判断手机号是否需要验证
            Tool.get('findLoginTimestamp',{mobile},(data)=>{
                if(data.code == 200){
                    this.isValidate = false;
                }else{
                    this.isValidate = true;
                }
            })
            // if (this.receiptInfo && this.receiptInfo.needReceipt) {
            //     this.userInfo.needReceipt = this.receiptInfo.needReceipt
            //     this.userInfo.selectTitle = this.receiptInfo.selectTitle
            //     this.userInfo.comName = this.receiptInfo.comName?this.receiptInfo.comName:this.userInfo.comName;
            //     this.userInfo.receiptCode = this.receiptInfo.receiptCode?this.receiptInfo.receiptCode:this.userInfo.receiptCode;
            // }

        },
        deactivated:function(){
            this.residueTime = 60;
            clearInterval(this.interval);
        },
        methods:{
            twoTagsShow:function(){
                this.updateTwoTags(!this.twoTags);
                // this.twoTags = !this.twoTags;
            },
            goBack:function(){
                Tool.localItem('isSelectCarBack',true);
                this.$router.back();
            },
            goCarMan: function(){
                this.$router.push({name:'carmanagement',query:{code:this.modelInfo.code}});
            },
            // receiptPage: function(){
            //     Tool.localItem('isSelectCarBack',true);
            //     this.$router.push({name:'personreceipt',params:{needReceipt:this.userInfo.needReceipt,selectTitle:this.userInfo.selectTitle}});
            // },
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
                if ((this.userVehicle.length > 0 && this.userVehicle[0].vehicle_type_id == this.modelInfo.id && this.userInfo.vin == this.userVehicle[0].vin)||(this.selectCarData && this.userInfo.vin == this.selectCarData.vin)) {

                }
                else{
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
                if(!(/^1\d{10}$/.test(this.userInfo.tel))){
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
                if(this.refereeType == 0 && !this.storeName){
                    Toast({
                        message:'请选择服务门店',
                        duration:1000,
                    });
                    return false;
                }
                this.userInfo.vin = this.userInfo.vin.toLocaleUpperCase();
                this.userInfo.motorId = this.userInfo.motorId.toLocaleUpperCase();
                if(this.pageConfig.tags[this.pageConfig.fileds.indexOf('motorId')] == '1'){
                    // 当发动机那一栏从接口带出来的时候没有值的时候不验证，如果自己手输入不管如何都需要验证

                                    // engineNo: this.selectCarData?this.selectCarData.dl_engine_no:this.userVehicle[0].dl_engine_no

                    new Promise((res,rej)=>{
                        if((this.userVehicle.length > 0 && this.userVehicle[0].vehicle_type_id == this.modelInfo.id && this.userInfo.vin == this.userVehicle[0].vin)||(this.selectCarData && this.userInfo.vin == this.selectCarData.vin)){
                            res({
                                data:{
                                    buyCarDate: this.selectCarData?this.selectCarData.buyCarDate:this.userVehicle[0].buyCarDate,
                                    engineNo:this.userInfo.motorId
                                }
                            })
                        }else{
                            Tool.get('queryVehicleInfo',{
                                vin:this.userInfo.vin,
                                engineNo:this.userInfo.motorId,
                                isMiniCar:this.modelInfo.vehicleType,
                                carSeriesName:this.modelInfo.vehicleModel,
                                carSeriesCode:this.modelInfo.code,
                                userId:Tool.getUserInfo('userId'),
                            },(data)=>{
                                if(data.code == 1){
                                    res(data);
                                }else{
                                    Toast({
                                        message:data.msg,
                                        duration:3000,
                                    })
                                }
                            })
                        }
                    }).then((pData)=>{
                        // if(this.userInfo.tel != this.userMoblie || this.isValidate){
                            // if(!this.code){
                            //     Toast({
                            //         message:'请输入验证码',
                            //         duration:1000,
                            //     })
                            //     return false;
                            // }
                            // Tool.get('verifyCode',{
                            //     code:this.code,
                            //     mobile:this.userInfo.tel,
                            // },(data) => {
                            //     if(data.code == 200){
                            //         this.userInfo.engineNo = pData.data.engineNo;
                            //         this.userInfo.mileage = Math.ceil((+new Date() - (pData.data.buyCarDate?+new Date(pData.data.buyCarDate):new Date()))/(1000*60*60*24));
                            //         this.userInfo.buyCarDate = pData.data.buyCarDate;
                            //         this.updateUserInfon(this.userInfo);
                            //         const wbProduct = this.pageSetting.wbpId;
                            //         const wbtrPhonno = this.userInfo.tel;
                            //         const buyCarDate = this.userInfo.buyCarDate;
                            //         Tool.get('productRange/determineUser',{wbtrPhonno,wbProduct,buyCarDate},data =>{
                            //             if(data.msg === '0'){
                            //                 Toast({
                            //                     message:data.data,
                            //                     duration:3000
                            //                 })
                            //             }else{
                            //                 this.$router.push({name:'confirmorder',params:this.$route.params});
                            //                 Tool.localItem('vehicleInfo',{vin:this.userInfo.vin,engineNo:this.userInfo.motorId,userName:this.userInfo.contact})
                            //             }
                            //         })
                            //     }else{
                            //         Toast({
                            //             message:data.msg,
                            //             duration:1000,
                            //         })
                            //     }
                            // })
                        // }else{
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
                                    // 先判断orderTip，再看发不发请求,再根据请求判断
                                    if (this.orderTip==true) {
                                        // 判断是否一月内已购买了一单保养套餐
                                        Tool.get('orderTip',{   
                                            userId:Tool.getUserInfo('userId'),
                                            phone:Tool.getUserInfo('telephone')
                                        },(data)=>{
                                            if(data.code == 200){  //判定购买过并且获得提示文字
                                                    // 提示并且不做操作
                                                    // MessageBox.confirm('', {
                                                    //     message: this.userMoblie,
                                                    //     title: '提示',
                                                    //     confirmButtonText: '确定',
                                                    //     showCancelButton: false
                                                    // }).then(action => {
                                                        
                                                    // }).catch(err => {
                                                        
                                                    // });
                                                    MessageBox({
                                                      title: '提示',
                                                      message: data.msg,
                                                      showCancelButton: false,
                                                      confirmButtonText: '确定',
                                                    });
                                                    this.updateOrderTip(false);
                                                
                                            }else{ //没有则不做操作
                                                this.$router.push({name:'confirmorder',params:this.$route.params});
                                                Tool.localItem('vehicleInfo',{vin:this.userInfo.vin,engineNo:this.userInfo.motorId,userName:this.userInfo.contact})
                                            }
                                        })

                                    }else{
                                        this.$router.push({name:'confirmorder',params:this.$route.params});
                                        Tool.localItem('vehicleInfo',{vin:this.userInfo.vin,engineNo:this.userInfo.motorId,userName:this.userInfo.contact})
                                    }

                                    // this.$router.push({name:'confirmorder',params:this.$route.params});
                                    // Tool.localItem('vehicleInfo',{vin:this.userInfo.vin,engineNo:this.userInfo.motorId,userName:this.userInfo.contact})
                                }
                            })
                        // }
                    })
                }else{
                    // if(this.userInfo.tel != this.userMoblie || this.isValidate){
                    //     if(!this.code){
                    //         Toast({
                    //             message:'请输入验证码',
                    //             duration:1000,
                    //         })
                    //         return false;
                    //     }
                    //     Tool.get('verifyCode',{
                    //         code:this.code,
                    //         mobile:this.userInfo.tel,
                    //     },(data) => {
                    //         if(data.code == 200){
                    //             this.userInfo.engineNo = '';
                    //             this.userInfo.mileage = 0;
                    //             this.userInfo.buyCarDate = '';
                    //             this.updateUserInfon(this.userInfo);
                    //             const wbProduct = this.pageSetting.wbpId;
                    //             const wbtrPhonno = this.userInfo.tel;
                    //             const buyCarDate = this.userInfo.buyCarDate;
                    //             Tool.get('productRange/determineUser',{wbtrPhonno,wbProduct,buyCarDate},data =>{
                    //                 if(data.msg === '0'){
                    //                     Toast({
                    //                         message:data.data,
                    //                         duration:3000
                    //                     })
                    //                 }else{
                    //                     this.$router.push({name:'confirmorder',params:this.$route.params});
                    //                     Tool.localItem('vehicleInfo',{vin:this.userInfo.vin,engineNo:this.userInfo.motorId,userName:this.userInfo.contact})
                    //                 }
                    //             })
                    //         }else{
                    //             Toast({
                    //                 message:data.msg,
                    //                 duration:1000,
                    //             })
                    //         }
                    //     })
                    // }else{
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
                                // 先判断orderTip，再看发不发请求,再根据请求判断
                                if (this.orderTip==true) {
                                    // 判断是否一月内已购买了一单保养套餐
                                    Tool.get('orderTip',{   
                                        userId:Tool.getUserInfo('userId'),
                                        phone:Tool.getUserInfo('telephone')
                                    },(data)=>{
                                        if(data.code == 200){  //判定购买过并且获得提示文字
                                                // 提示并且不做操作
                                                // MessageBox.confirm('', {
                                                //     message: this.userMoblie,
                                                //     title: '提示',
                                                //     confirmButtonText: '确定',
                                                //     showCancelButton: false
                                                // }).then(action => {
                                                    
                                                // }).catch(err => {
                                                    
                                                // });
                                                MessageBox({
                                                  title: '提示',
                                                  message: data.msg,
                                                  showCancelButton: false,
                                                  confirmButtonText: '确定',
                                                });
                                                this.updateOrderTip(false);
                                            
                                        }else{ //没有则不做操作
                                            this.$router.push({name:'confirmorder',params:this.$route.params});
                                
                                            Tool.localItem('vehicleInfo',{vin:this.userInfo.vin,engineNo:this.userInfo.motorId,userName:this.userInfo.contact})
                                        }
                                    })

                                }else{
                                    this.$router.push({name:'confirmorder',params:this.$route.params});
                                
                                    Tool.localItem('vehicleInfo',{vin:this.userInfo.vin,engineNo:this.userInfo.motorId,userName:this.userInfo.contact})
                                }
                                // this.$router.push({name:'confirmorder',params:this.$route.params});
                                
                                // Tool.localItem('vehicleInfo',{vin:this.userInfo.vin,engineNo:this.userInfo.motorId,userName:this.userInfo.contact})
                            }
                        })
                    // }
                }
                Tool.localItem('isSelectCarBack',true);
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
                if (this.selectCarData && $(e.target).val() == this.selectCarData.vin) {
                    this.needVerify = false;
                    this.userInfo.motorId = this.selectCarData.dl_engine_no;
                }
                else if(this.userVehicle.length > 0 && $(e.target).val() == this.userVehicle[0].vin){
                    this.needVerify = false;
                    this.userInfo.motorId = this.userVehicle[0].dl_engine_no;
                }
                else {
                    this.userInfo.motorId = '';
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
                if(!(/^1\d{10}$/.test(this.userInfo.tel))){
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
                var CXCode = this.modelInfo.code;
                Tool.get('getCarNumberList',{
                    userId,
                    oid,
                    CXCode
                    // userToken:this.userToken
                },data => {
                    if(data.code == 200 && data.data && data.data.length > 0){
                        // 返回有值的时候保存
                        this.addUservehicle(data.data);
                    }
                    this.hasgetedViheche(true);
                    if(this.userVehicle.length > 0){
                        this.userInfo.vin = this.userVehicle[0].vin;
                        this.userInfo.motorId = this.userVehicle[0].dl_engine_no;
                        // 接口修改之后这个返回的如果有值只会是匹配的，另一种情况就是没有值
                        // if(this.userVehicle.length > 0 && this.userVehicle[0].vehilceSeries == this.modelInfo.code){
                            this.needVerify = false;
                        // }else{
                            // this.needVerify = true;
                            // Toast({
                            //     message:'车架号和所选车型不匹配',
                            //     duration:3000,
                            // });
                        // }
                    }
                    else{
                        this.userInfo.vin='';
                        this.userInfo.motorId = '';
                        this.needVerify = true;
                    }
                })
            },
            goStore:function(){
                const wbpId = this.pageSetting.wbpId;
                Tool.localItem('isSelectCarBack',true);
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
                hasgetedViheche: 'UPDATE_GETEDVEHICHE',
                setReceiptInfo: 'SET_RECEIPT_INFO',
                updateOrderTip: 'UPDATE_ORDERTIP',
                updateTwoTags:'UPDATE_TWOTAGS',
            })
        },
        beforeRouteEnter:(to,from,next)=>{
            Tool.routerEnter(to,from,next)
        },
        beforeRouteLeave:function(to,from,next){
            if(to.name == 'carmanagement' || to.path == '/carmanagement');
            else{
                // this.selectCarData='';
            }
            next();
        },
        created:function(){
            if($.isEmptyObject(this.modelInfo)) {
                this.$router.push({name:'maintainset'});
            }
            this.userInfo.tel = Tool.getUserInfo('telephone');
            this.userMoblie = Tool.getUserInfo('telephone');
            // this.setReceiptInfo({needReceipt:'1',selectTitle:'1',receiver:'',receMobile:'',zip:'',selectAddr:'',addressCont:'',comName:'',receiptCode:''});
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
                    position:relative;
                    padding-right: 3%;
                    margin-bottom:1px;
                    background-color:#ffffff;
                    .diyicon{
                        width: 7%;
                        text-align:right;
                        position: absolute;
                        right: 0px;
                        height: 100%;
                        .arrow{
                            color: #cfcfcf;
                            margin: 0;
                            margin-right: 0.2rem;
                            font-size: 0.8rem;
                        }
                    }
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
                    &.lastInputBox{
                        padding-right: 0;
                    }
                }
                .receipt-box{
                    background-color:#ffffff;
                    padding-left: 3%;
                    min-height:1.8rem;
                    line-height:1.8rem;
                    .receipt{
                        text-align: right;
                        padding-top: 0.1rem;
                        padding-bottom: 0.1rem;
                    }
                    .iconmore{
                        text-align: right;
                        padding-top: 0.1rem;
                        padding-bottom: 0.1rem; 
                    }
                    .icon-go{
                        color: #cfcfcf;
                        margin: 0;
                        margin-right: 0.2rem;
                        font-size: 0.7rem;
                    }
                    span{
                        display: inline-block;
                        height: 0.9rem;
                        line-height: 0.9rem;
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
                        font-size:0.67rem;
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
                    font-size:0.67rem;
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
                font-size:0.67rem;
            }
        }
    }
</style>