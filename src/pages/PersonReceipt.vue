<template>
	<div class="page-container">
		<div class="receipt-page page" flex="dir:top box:justify">
            <nav-bar
                title="发票信息"
            />
            <div class="page-content">
                <div class="referee-control" flex="dir:left box:mean">
                    <div class="select-item" v-for="item in referees" @click="needReceipt = item.value">
                        <i class="iconfont" :class="needReceipt == item.value ?'icon-select' : 'icon-circle'"></i>{{item.name}}
                    </div>
                </div>
                <span style="color:red;font-size: 0.57rem;display:inline-block;margin-bottom:1px;background-color: #fff;padding-left:3%;padding-top: 0.2rem;padding-bottom: 0.2rem;" v-if="needReceipt == '0'">*发票将在购买7个工作日后进行邮寄（退款除外），春节期间因快递停运，发票将在节后邮寄。请正确填写下列信息，否则将无法开具发票。</span>
                <div class="meal-list-container" v-if="needReceipt == '0'">
	                <!-- <div class="title"  v-tap.prevent="toggleMeal">
	                    <span>开票抬头</span>
	                    <i class="iconfont" :class="mealListShow?'icon-up':'icon-down'"></i>
	                    <span class="selected-oil" v-if="receiptTitle[selectTitle]">{{receiptTitle[selectTitle]}}</span>
	                </div>
	                <div class="meal-list" v-if="mealListShow">
	                    <div class="meal-item" v-tap.prevent="selectedMeal.bind(this,index)" v-for="(item,index) in receiptTitle" flex="dir:left cross:center">
	                        <i class="iconfont icon-select" v-if="selectTitle == index"></i>
	                        <i class="iconfont icon-circle active" v-else="selectTitle == index"></i>
	                        <div class="oil-item">{{item}}</div>
	                    </div>
	                </div> -->
	            </div>
                <div class="input-control" v-if="selectTitle == '1' && needReceipt == '0'">
                    <div class="text-control" flex="dir:left box:first">
                        <div class="name">公司名称</div>
                        <textarea rows="3" maxlength='40' placeholder="请输入公司全称" :value="comName" @input="updateComment"></textarea>
                        <div class="show-length">
                            {{comName.length}}/20
                        </div>
                    </div>
                </div>
	            <div class="input-control" v-if="selectTitle == '1' && needReceipt == '0'">
                    <inp-com title="纳税人识别号" :value="receiptCode" maxlength="20" placeholder="请输入纳税人识别号" :onBlur="updateCode.bind(this)" /> 
                </div>
                <div class="des"  v-if="selectTitle == '1' && needReceipt == '0'">*请仔细确认填写的纳税人识别号码是否正确，一旦提交无法修改</div>
                
                <div v-if="needReceipt == '0'">
                	<div class="input-control">
                        <inp-com
                            title="收票人姓名"
                            maxlength='15'
                            placeholder="姓名"
                            :value="receiver"
                            :onBlur="updateReceiver.bind(this)"
                        />
                    </div>
                    <div class="input-control">
                        <inp-com
                            title="手机号码"
                            maxlength='11'
                            placeholder="手机号码"
                            :value="receMobile"
                            :onBlur="updateReceMobile.bind(this)"
                        />
                    </div>
                    <div class="input-control">
                        <inp-com
                            title="邮政编码"
                            maxlength='6'
                            placeholder="邮政编码"
                            :value="zip"
                            :onBlur="updateZip.bind(this)"
                        />
                    </div>
                    <div class="input-control" @click="cityShow = !cityShow">
                        <inp-com
                            type="text" 
                            title="所在地区"
                            readonly
                            placeholder="请选择所在地区"
                            :value="selectAddr"
                            :rightArrow="true"
                            :readonly="true"
                        />
                    </div>
                    <div class="input-control">
	                    <div class="text-control" flex="dir:left box:first">
	                		<div class="name">详细地址</div>
	                        <textarea rows="7" maxlength='100' placeholder="请填写详细地址，1到100个字符" :value="addressCont" @input="updateAddressCont"></textarea>
	                        <div class="show-length">
	                            {{addressCont.length}}/20
	                        </div>
	                    </div>
	                </div>
                    
                </div>
            </div>
            <div class="button-control">
                <div class="sure-button" @click="sureGo">
                    确定
                </div>
            </div>
        </div>
        <transition name="fade">
            <div class="down-list-mask" v-if="cityShow" @click="cityShow=false"></div>
        </transition>
        <transition name="slide-up">
            <div class="down-list" v-show="cityShow">
                <div class="toolbar" flex="dir:left box:mean">
                    <div class="cancel" @click="cityShow=false" flex="dir:left cross:center main:left">
                        取消
                    </div>
                    <div class="sure" @click="selectCity" flex="dir:left cross:center main:right">
                        确定
                    </div>
                </div>
                <mt-picker :slots="citylist" @change="onCityChange" valueKey="name"></mt-picker>
            </div>
        </transition>
	</div>
</template>
<style lang="less" scoped>
	.page-container{
        height:100%;
        position:absolute;
        width:100%;  
        .down-list-mask{
            width:100%;
            height:100%;
            background-color:rgba(0,0,0,0.5);
            position:absolute;
            z-index:1;
        }
        .down-list{
            z-index:1;
            position:absolute;
            bottom:0rem;
            width:100%;
            background-color:#fff;
            .toolbar{
                height:1.5rem;
                font-size:0.67rem;
                color:#00bffe;
                .cancel{
                    padding-left:1.5rem;
                }
                .sure{
                    padding-right:1.5rem;
                }
            }
        }
    }
	.page{
        height:100%;
        position:absolute;
        width:100%;
        .page-content{
        	background-color: #efefef;
            height:100%;
            overflow: auto;
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
            .meal-list-container{
                    background-color:#fff;
                    margin-bottom: 1px;
                    padding:0 3% 0 3%;
                    .title{
                        height:1.8rem;
                        line-height:1.8rem;
                        font-size:0.68rem;
                        .iconfont{
                            height:1.8rem;
                            line-height:1.8rem;
                            display:inline-block;
                            float:right;
                            color:#4b4b4b;
                        }
                        .selected-oil{
                            font-size:0.57rem;
                            color:#6b6b6b;
                            float:right;
                        }
                    }
                    .meal-list{
                        border-top:1px solid #d9d9d9;
                        padding-bottom:0.2rem; 
                        .meal-item{
                            height:1.5rem;
                            .iconfont{
                                font-size:0.67rem;
                                margin-right:0.4rem;
                            }
                            .icon-select{
                                color:#fc4c1d;
                            }
                            .oil-item{
                                margin-right:0.2rem;
                            }
                        }
                    }
                }
                .des{
                	background-color: #ffffff;
                	padding:0 3%;
                	color:red;
                	margin-bottom: 1px;
                	font-size: 0.57rem;
                	padding-top: 0.2rem;
                	padding-bottom: 0.2rem;
                }
                .input-control{
                    margin-bottom:1px;
                    .text-control{
                        position:relative;
                        background-color: #ffffff;
                        padding-top:0.2rem;
                        .name{
                        	padding-left: 3%;
                        	padding-right: 3%;
                        	padding-top: 0.2rem;
                        	font-size:0.68rem;
                        	width: 17%;
                        }
                        textarea{
                            resize:none;
                            outline:none;
                            border:none;
                            padding:0;
                            padding-right: 3%;
                            font-size:0.57rem;
                            padding-top: 0.3rem;
                        }
                        .show-length{
                            position:absolute;
                            bottom:0.43rem;
                            right:0.43rem;
                            font-size:0.51rem;
                            color:#08a9ef;
                            display: none;
                        }
                    }
                }
        	}
    	.button-control{
	        .sure-button{
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
<script>
    import NavBar from '../components/NavBar';
    import InpCom from '../components/InpCom';
    import { Toast } from 'mint-ui';
    import Tool  from '../utils/Tool';
    import { mapState, mapMutations } from 'vuex';
    export default {
        data () {
            return {
                receiptCode:'',
                comName:'',
                timmer:'',
                mealListShow:false,
                selectTitle:'0',
                needReceipt:'1',//默认不选择
                receiver:'',
                receMobile:'',
                zip:'',
                selectAddr:'',
                addressCont:'',
                orderNo:'',
                cityShow:false,
                citylist:[
                    {
                        flex:1,
                        defaultIndex:0,
                        values:[],
                        className:'province',
                    },{
                        divider:true,
                        content:'-'
                    },{
                        flex:1,
                        values:[],
                        className:'city'
                    }
                ],
                cityData:{},
                cityInfo:{},
                referees:[
                    {
                        name:"需要发票",
                        value:'0',
                    },
                    {
                        name: "不需要发票",
                        value: '1'
                    }
                ],
                receiptTitle:["个人","公司"],
                isSelect:false,
            }
        },
        components:{
            NavBar,
            InpCom
        },
        computed:{
            ...mapState({
                qd:({
                    pageconfig
                }) => pageconfig.qd,
                receiptInfo: ({
                    packageinfo
                }) => packageinfo.receiptInfo,
            })
        },
        methods:{
            onCityChange:function(picker,values){
                if(values[1]){
                    if(!values[0]){
                        this.cityInfo.province = this.cityData.provinces[0].name;
                        values[0] = {};
                        values[0].name = this.cityData.provinces[0].name
                        values[0].index = 0;
                    }else{
                        this.cityInfo.province = values[0].name;
                    }
                    this.cityInfo.city = values[1].name;
                    // this.cityInfo.code = values[1].id;
                    picker.setSlotValues(1,this.cityData.citys[values[0].index]);
                }
            },
            selectCity:function(){
                this.isSelect = true;
                if(!this.cityInfo.province){
                    this.cityInfo.province = this.cityData.provinces[0].name;
                    this.cityInfo.city = this.cityData.citys[0][0].name;
                    // this.cityInfo.code = this.cityData.citys[0][0].id;
                }
                this.selectAddr = this.cityInfo.province + ' ' + this.cityInfo.city;
                this.city = this.cityInfo.city;
                this.province = this.cityInfo.province;
                this.cityShow = false;
            },
            getCityList:function(callback){
                var self = this;
                Tool.get("getCitys",{},(data)=>{
                    var provinceList = [];
                    for(var i=0;i<data.data.length;i++){
                        provinceList.push({name:data.data[i].province,index:i})
                    }
                    var cityList = [];
                    for(var i=0;i<data.data.length;i++){
                        cityList[i] = [];
                        for(var j=0;j<data.data[i].city.length;j++){
                            cityList[i].push({name:data.data[i].city[j]})
                        }
                    }
                    var param = {
                        provinces:provinceList,
                        citys:cityList
                    }
                    self.cityData = param;
                    callback && callback();
                })
            },
        	sureGo:function(){
        		// 判断是否选择
        		if(this.needReceipt == 1){ // 不需要发票
                    // this.setReceiptInfo({needReceipt:this.needReceipt,selectTitle:'0'});
                    this.setReceiptInfo({needReceipt:this.needReceipt,selectTitle:'1',receiver:'',receMobile:'',zip:'',selectAddr:'',addressCont:'',comName:'',receiptCode:''});
                    this.$router.back();
        			return;
        		}
        		else{
                    if(this.selectTitle == 1 && !this.receiptCode){
                        Toast({
                            message:'请输入纳税人识别号',
                            duration:1000,
                        });
                        return false;
                    }
                    var reg = /^[a-zA-Z0-9]*$/;
                    if(this.selectTitle == 1 && (this.receiptCode.length!=15 && this.receiptCode.length!=18 && this.receiptCode.length!=20)){
                        Toast({
                            message:'纳税人识别号应由15位、18位或者20位字符组成',
                            duration:1000,
                        });
                        return false;
                    }
                    if (this.selectTitle == 1 && !reg.test(this.receiptCode)) {
                        Toast({
                            message:'纳税人识别号格式不正确',
                            duration:1000,
                        });
                        return false;
                    }
                    if(this.selectTitle == 1 && !this.comName){
                        Toast({
                            message:'请输入公司名称',
                            duration:1000,
                        });
                        return false;
                    }
        			if (!this.receiver) {
	                    Toast({
	                        message:'请输入收件人名字',
	                        duration:1000,
	                    });
                    	return false;
	                }
	                var re = /^1\d{10}$/;
	                if (!re.test(this.receMobile)) {
	                    Toast({
	                        message:'手机号码格式不正确',
	                        duration:1000,
	                    });
                    	return false;
	                }
                    var re1 = /^[0-9]{6}$/
	                if (!re1.test(this.zip)) {
	                    Toast({
	                        message:'邮编格式不正确',
	                        duration:1000,
	                    });
                    	return false;
	                }
                    if (!this.selectAddr) {
                        Toast({
                            message:'请选择所在地区',
                            duration:1000,
                        });
                        return false;
                    }
	                if (!this.addressCont || this.addressCont.length < 1) {
	                    Toast({
	                        message:'收货地址不能为空',
	                        duration:1000,
	                    });
                    	return false;
	                }
        		}
        		if (this.selectTitle=='0') {
                    this.setReceiptInfo({receiver:this.receiver,receMobile:this.receMobile,zip:this.zip,selectAddr:this.selectAddr,addressCont:this.addressCont,needReceipt:this.needReceipt,selectTitle:this.selectTitle,comName:'',receiptCode:''});
                }else{
                    this.setReceiptInfo({receiver:this.receiver,receMobile:this.receMobile,zip:this.zip,selectAddr:this.selectAddr,addressCont:this.addressCont,needReceipt:this.needReceipt,selectTitle:this.selectTitle,comName:this.comName,receiptCode:this.receiptCode});
                }
                Tool.post("ByFbdz",{
                    byfId:this.orderNo,
                    needReceipt:this.receiptInfo.needReceipt,
                    selectTitle:this.receiptInfo.selectTitle,
                    comName: this.receiptInfo.comName?this.receiptInfo.comName:"",
                    receiptCode: this.receiptInfo.receiptCode?this.receiptInfo.receiptCode:"",
                    receiver: this.receiptInfo.receiver?this.receiptInfo.receiver:"",
                    receMobile: this.receiptInfo.receMobile?this.receiptInfo.receMobile:"",
                    zip: this.receiptInfo.zip?this.receiptInfo.zip:"",
                    addressCont: (this.receiptInfo.addressCont&&this.receiptInfo.selectAddr)?(this.receiptInfo.selectAddr+' '+this.receiptInfo.addressCont):"",
                },(data)=>{
                    if(data.code == 200){
                        Toast({
                            duration:1000,
                            message:"申请成功",
                        })
                        this.$router.back();
                    }else{
                        Toast({
                            duration:1000,
                            message:data.msg,
                        })
                    }
                })
        	},
        	toggleMeal:function(){
                this.mealListShow = !this.mealListShow
            },
            selectedMeal:function(index){
                this.selectTitle = index;
                this.mealListShow = !this.mealListShow
            },

            updateReceiver:function(e){
                this.receiver = $(e.target).val();
            },
            updateReceMobile:function(e){
                this.receMobile = $(e.target).val();
            },
            updateZip:function(e){
                this.zip = $(e.target).val();
            },
            // updateSelectAddr:function(e){
            //     this.selectAddr = $(e.target).val();
            // },
            updateAddressCont:function(e){
                this.addressCont = $(e.target).val();
            },

            updateComment:function(e){
                this.comName = $(e.target).val();
            },
            updateCode:function(e){
                this.receiptCode = ($(e.target).val()).toLocaleUpperCase();
            },
            backToHome:function(e){
                this.$router.push({name:'maintainset'});
            },
            ...mapMutations({
                setReceiptInfo: 'SET_RECEIPT_INFO',
            })
            
        },
        activated:function(){
            var self = this;
            this.needReceipt = this.$route.params.needReceipt;
            this.selectTitle = this.$route.params.selectTitle;
            this.orderNo = this.$route.params.orderNo;
            self.getCityList(()=>{
                self.citylist[0].values = self.cityData.provinces;
                self.citylist[2].values = self.cityData.citys[0];
            });
            self.cityInfo = {};
            // self.selectAddr = '';
            // var receiverInfo = JSON.parse(Tool.localItem('receiverInfo'));
            // if (receiverInfo) {
            //     if(!this.receiver){
            //         this.receiver = receiverInfo.receiver;
            //     }
            //     if(!this.receMobile){
            //         this.receMobile = receiverInfo.receMobile;
            //     }
            //     if(!this.zip){
            //         this.zip = receiverInfo.zip;
            //     }
            //     if(!this.selectAddr){
            //         this.selectAddr = receiverInfo.selectAddr;
            //     }
            //     if(!this.addressCont){
            //         this.addressCont = receiverInfo.addressCont;
            //     }
            //     if(!this.comName){
            //         this.comName = receiverInfo.comName;
            //     }
            //     if(!this.receiptCode){
            //         this.receiptCode = receiverInfo.receiptCode;
            //     }

            // }
        },
        deactivated:function(){
        }
    }
</script>