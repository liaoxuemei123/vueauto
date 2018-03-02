<template>
    <div class="page-container">
        <div class="index-page page" flex="dir:top box:justify">
            <nav-bar 
                title="添加预约订单"
                rightIcon="icon-history"
                rightContent="预约历史"
                :buttonWidth=0.28
                :onRight="goHistory"
            />
            <div class="page-content">
                <mt-datetime-picker
                    ref="datepicker"
                    type="datetime"
                    v-model="pickerV"
                    @confirm="onDateConfirm"
                    month-format="{value}月"
                    date-format="{value}日"
                    hour-format="{value}时"
                    minute-format="{value}分"
                    :startHour='startHour'
                    :endHour='endHour'
                    :startDate="startDate"
                    :endDate="endDate"
                    >
                </mt-datetime-picker>
                <div class="input-control">
                    <inp-com title="车牌号" type="text" icon="icon-plate" :readonly="true" placeholder="请输入车牌号" :onClick="selectPlate.bind(this)" :value="subscribeInfo.carInfo.plate"/>
                </div>
                <div class="input-control">
                    <inp-com title="预约时间" :readonly="true" type="text" icon="icon-time" placeholder="请选择到店时间" :onClick="selectTime" :value="subscribeInfo.showTime"/>
                </div>
                <div class="input-control">
                    <inp-com title="服务门店选择" type="text" icon="icon-store" :readonly="true" placeholder="请选择服务商" :onClick="goStore" :value="subscribeInfo.storeInfo.storeName"/>
                </div>
                <div class="input-control">
                    <inp-com title="当前里程" type="text" icon="icon-mile" placeholder="请输入里程KM" :onBlur="updateMile.bind(this)" :value="subscribeInfo.mile | mileFilter"/>
                    <transition name="drop-down">
                        <div class="explain" v-if="subscribeInfo.fcmc.exchange.length>0">
                            <div class="atention" flex="dir:left">保养推荐：<div class="red">以下保养项目按照官方保养守则推荐具体以到店为准</div></div>
                            <div class='fcmc-list'>
                                <div class="fcmc-title">
                                    <span><i class="iconfont icon-title" v-if="subscribeInfo.fcmc.exchange.length > 0"></i>更换</span>
                                </div>
                                <div class="fcmc-item" v-for="(item,index) in subscribeInfo.fcmc.exchange" flex="dir:left box:last" v-if="index < 4 || fcmcExpand">
                                    <div class="info"><i class="iconfont icon-startstroke"></i>{{item}}</div>
                                </div>
                                <div class="fcmc-title" v-if="fcmcExpand">
                                    <span><i class="iconfont icon-title"></i>检查、清洗、调整</span>
                                </div>
                                <div class="fcmc-item" v-for="(item,index) in subscribeInfo.fcmc.check" flex="dir:left box:last" v-if="fcmcExpand">
                                    <div class="info"><i class="iconfont icon-startstroke"></i>{{item}}</div>
                                </div>
                                <div class="expand" @click="fcmcExpand = !fcmcExpand">
                                    <div v-if="fcmcExpand">收起<i class="iconfont icon-up"></i></div>
                                    <div v-else="fcmcExpand">展开更多<i class="iconfont icon-down"></i></div>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
                <div class="input-control">
                    <inp-com title="联系人" type="text" icon="icon-contact" placeholder="请输入联系人" :onBlur="updateContact.bind(this)" :value="subscribeInfo.contact"/>
                </div>
                <div class="input-control">
                    <inp-com title="联系电话" type="tel" icon="icon-phone" placeholder="请输入联系电话" :onBlur="updatePhone.bind(this)" :value="subscribeInfo.phone"/>
                </div>
                <div class="input-control" flex="dir:top">
                    <inp-com title="预约描述" :onClick="expandDes" type="text" icon="icon-comment" :readonly='true'/>
                    <div class="text-control" flex="dir:top"  v-if="desExpand">
                        <textarea rows="5" maxlength='100' placeholder="请描述您的保养或维修需求" @input="updateDes" :value="subscribeInfo.description"></textarea>
                        <div class="show-length">
                            {{subscribeInfo.description.length}}/100
                        </div>
                    </div>
                </div>
            </div>
            <div class="button-control">
                <btn-com
                    title="确定预约"
                    :onClick="addOrder"
                    background="#00bffe"
                />
            </div>
        </div>
        <transition name="fade">
            <div class="order-notice-mask" v-if="confirmShow" @click="confirmShow=false"></div>
        </transition>
        <transition name="slide-up">
            <div class="order-notice" v-if="confirmShow" flex="dir:top box:last">
                <div class="content">
                    亲爱的车主，请再次核对您的预约需求信息，点击确认后服务门店将尽快为您安排预约并短信反馈结果
                </div>
                <div class="toolbar" flex="dir:left box:mean cross:center">
                    <div class="confirm-button button" @click="cancelOrder">
                        取消
                    </div>
                    <div class="cancel-button button" @click="submitOrder">
                        确定
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    import NavBar from '../components/NavBar';
    import BtnCom from '../components/BtnCom';
    import InpCom from '../components/InpCom';
    import { mapMutations, mapState } from 'vuex';
    import Tool from '../utils/Tool';
    import { Picker, Toast } from 'mint-ui';
    export default{
        data () {
            return {
                fcmc:{
                    exchange:[],
                    check:[],
                },
                fcmcExpand:false,
                des:'1212',
                desExpand:false,
                mobile:'',
                confirmShow:false,
                submitData:'',
                pickerValue:''
            }
        },
        computed:{
            'startDate':function(){
                var now = new Date();
                // if((now.getHours() >= 17 && now.getMinutes()) > 30 || now.getHours() > 17){
                    // var tomorrow = new Date(new Date(Tool.formatDate(now)).getTime() + 25 * 1000 * 60 * 60);
                    // return tomorrow;
                var tomorrow = new Date(new Date(Tool.formatDate(now)).getTime() + 25 * 1000 * 60 * 60);
                return tomorrow;
            },
            'pickerV': {
                get: function(){
                    var now = new Date();
                    if((now.getHours() >= 17 && now.getMinutes()) > 30 || now.getHours() > 17){
                        var tomorrow = new Date(new Date(Tool.formatDate(now)).getTime() + 25 * 1000 * 60 * 60);
                        return Tool.formatDate(tomorrow,'time');
                    }
                    return Tool.getCurrentDate('time');
                },
                set: function (newValue) {
                  this.pickerValue = newValue
                }
            },
            'endDate':function(){
                var year = new Date().getFullYear();
                return new Date(new Date().getTime() + (30*24*60*60*1000));
            },
            'startHour':function(){
                return 8;
            },
            'endHour':function(){
                return 18;
            },
            ...mapState({
                subscribeInfo:({
                    subscribe
                }) => subscribe,
            })
        },
        filters:{
            mileFilter:function(val){
                val = (val + '').replace(/[a-zA-Z]/g,'');
                if(val){
                    return val + 'KM';
                }else{
                    return val;
                }
            }
        },
        mounted:function(){
            if(this.$route.query.userToken){
                var userToken = this.$route.query.userToken;
                Tool.get('queryUserInfo',{
                    userToken
                },(data) => {
                    // data = JSON.parse(JSON.parse(data));
                    if(data.result != -1){
                        var userInfo = data.data;
                        // userInfo.userToken = data.data.token;
                        Tool.localItem('userCache',userInfo);
                    }else{
                        Tool.removeLocalItem('userCache');
                        Toast({
                            message:"用户登录过期了",
                            duration:1000,
                        })
                    }
                });
            }
        },
        activated:function(){
            
            if(Tool.localItem('userCache')){
                this.mobile = JSON.parse(Tool.localItem('userCache')).mobile;	
                if(JSON.parse(Tool.localItem('userCache')).nickName)
                    this.subscribeInfo.contact = JSON.parse(Tool.localItem('userCache')).nickName;
                if(JSON.parse(Tool.localItem('userCache')).mobile)
                    this.subscribeInfo.phone = this.mobile;
            }
            if(this.subscribeInfo.carInfo.mileage)
                this.subscribeInfo.mile = this.subscribeInfo.carInfo.mileage;
            if(this.subscribeInfo.carInfo && this.subscribeInfo.carInfo.plate && this.subscribeInfo.mile){
                Tool.get('getCommoditys',{
                    mileage:this.subscribeInfo.mile.replace(/[a-zA-Z]/g,''),
                    cartype:this.subscribeInfo.carInfo.seriesName,
                    LQSQ:this.subscribeInfo.carInfo.lqsq
                },(data) => {
                    if(data.code == 200){
                        this.subscribeInfo.fcmc.exchange = data.data['1'];
                        this.subscribeInfo.fcmc.check = data.data['2'];
                    }else{
                        this.subscribeInfo.fcmc = '';
                    }
                })
            }
        },
        methods:{
            goStore:function(){
                this.$router.push({name:'storeorder'});
            },
            selectTime:function(){
                this.$refs.datepicker.open();
            },
            updateMile:function(e){
                var self = this;
                var target = $(e.target);
                this.subscribeInfo.mile = target.val();
                if(!self.subscribeInfo.carInfo.vehicleTypeId){
                    Toast({
                        message:'请选择爱车',
                        position:'bottom',
                        duration:1000,
                    });
                    return false;
                }
                if(!this.subscribeInfo.mile.replace(/[a-zA-Z]/g,'')) return false;
                Tool.get('getCommoditys',{
                    mileage:this.subscribeInfo.mile.replace(/[a-zA-Z]/g,''),
                    cartype:self.subscribeInfo.carInfo.seriesName,
                    LQSQ:self.subscribeInfo.carInfo.lqsq
                },function(data){
                    if(data.code == 200){
                        self.subscribeInfo.fcmc.exchange = data.data['1'];
                        self.subscribeInfo.fcmc.check = data.data['2'];
                    }else{
                        self.subscribeInfo.fcmc = '';
                    }
                })
            },
            updateContact:function(e){
                var target = $(e.target);
                this.subscribeInfo.contact = target.val();
            },
            updatePhone:function(e){
                var target = $(e.target);
                this.subscribeInfo.phone = target.val();
            },
            updateDes:function(e){
                var target = $(e.target);
                this.subscribeInfo.description = target.val();
            },
            expandDes:function(){
                this.desExpand = true;
            },
            onDateConfirm:function(val){
                var now = new Date();
                var nowDate = now.getDate();//获取当前日
                var nowHour = now.getHours();
                var minute = now.getMinutes();
                // debugger
                // if (now.getFullYear()==new Date(val).getFullYear() && now.getMonth()==new Date(val).getMonth() && new Date(val).getDate()<=nowDate || now.getFullYear()>new Date(val).getFullYear() || now.getMonth()>new Date(val).getMonth()) {
                //     Toast({
                //         message:'只能预约第二天之后的时间',
                //         duration:1000
                //     })
                //     return false;
                // };

                // if (nowHour < 17 || (nowHour == 17 && minute<=30)) {
                //     // 当天17:30前客户只能预约第二天9:00后的时间保养；
                //     if (new Date(val).getDate()) {}
                // }else{
                //     // 当天17:30—24:00客户只能预约第二天14:00后的时间保养；
                // }
                var torrTime = new Date(new Date(Tool.formatDate(now)).getTime() + 30 * 1000 * 60 * 60);
                // torrTime = torrTime.getTime();
                // console.log(torrTime+' xx ');
                // console.log(new Date(val).getTime()+' xx ');

                if (nowHour>17 || (nowHour==17 && minute>30)) {
                    // if(new Date(val).getHours() < 14){
                    if (new Date(val).getTime()<torrTime) {
                        Toast({
                            message:'预约时间不能小于14:00',
                            duration:1000
                        })
                        return false;
                    }
                }
                if((new Date(val).getHours() >= 17 && new Date(val).getMinutes() > 30) || (new Date(val).getHours() >= 18)){
                    Toast({
                        message:'预约时间不能大于17:30',
                        duration:1000
                    })
                    return false;
                }else if(new Date(val).getHours() < 9){
                    Toast({
                        message:'预约时间不能小于9:00',
                        duration:1000
                    })
                    return false;
                };
                this.subscribeInfo.time = new Date(val).getTime();
                this.subscribeInfo.showTime = Tool.formatDate(val,'time');
            },
            selectPlate:function(val){
                this.$router.push({name:'selectplate'})
            },
            cancelOrder:function(){
                this.confirmShow = false;
                this.submitData = '';
            },
            submitOrder:function(data){
                this.confirmShow = false;
                Tool.post('ReservationOrderAdd',this.submitData,(res)=>{
                    Toast({
                        message:'您已成功提交预约申请',
                        duration:1000,
                    });
                    // this.$store.commit('RESET_ALL');
                    this.submitData = '';
                })
            },
            addOrder:function(data){
                var self = this;
                var data = {}
                data.carNumber = this.subscribeInfo.carInfo.plate;
                data.reservationDateTimestamp = this.subscribeInfo.time;
                data.userId = this.mobile;
                data.dealerId = this.subscribeInfo.storeInfo.id;
                data.mileage = this.subscribeInfo.mile.replace(/[a-zA-Z]/g,'');
                data.linkman = this.subscribeInfo.contact;
                data.mobilePhone = this.subscribeInfo.phone;
                data.Describe = this.subscribeInfo.description;
                data.seriesName = this.subscribeInfo.carInfo.seriesName;
                data.vin = this.subscribeInfo.carInfo.vin || '';
                if(!data.carNumber){
                    Toast({
                        message:'请输入车牌号',
                        position:'bottom',
                        duration:1000,
                    });
                    return false;
                }
                if(!data.reservationDateTimestamp){
                    Toast({
                        message:'请选择保养时间',
                        position:'bottom',
                        duration:1000,
                    });
                    return false;
                }
                if(!data.dealerId){
                    Toast({
                        message:'请选择服务商',
                        position:'bottom',
                        duration:1000,
                    });
                    return false;
                }
                if(!data.mileage){
                    Toast({
                        message:'请输入里程',
                        position:'bottom',
                        duration:1000,
                    });
                    return false;
                }
                if(!data.linkman){
                    Toast({
                        message:'请输入联系人',
                        position:'bottom',
                        duration:1000,
                    });
                    return false;
                }
                if(!data.mobilePhone){
                    Toast({
                        message:'请输入电话号码',
                        position:'bottom',
                        duration:1000,
                    });
                    return false;
                }
                if(!(/^1\d{10}$/.test(data.mobilePhone))){
                    Toast({
                        message:'手机号码不正确',
                        position:'bottom',
                        duration:1000,
                    });
                    return false;
                }
                this.submitData = data;
                this.confirmShow = true;
            },
            goHistory:function(){
                this.$router.push({name:'orderhistory'});
            },
            ...mapMutations([
                'updateSubscribeInfo',
            ])
        },
        beforeRouteLeave:function(to,from,next){
            if(!Tool.localItem('userCache')&&(to.name == 'orderhistory' || to.path == '/orderhistory' || to.name == 'selectplate' || to.path == '/selectplate' ||to.name == 'storeorder' || to.path == '/storeorder')){
                Toast({
                    message:'用户登录过期了',
                    duration:1000,
                });
                return;
            }
            else{
                next();
            }
        },
        components:{
            NavBar,
            BtnCom,
            InpCom,
        }
    }
</script>
<style scoped lang="less">
    .page-container{
        height:100%;
        position:absolute;
        width:100%;
        .order-notice-mask{
            position:absolute;
            z-index:2;
            top:2rem;
            bottom:0;
            left:0;
            right:0;
            background-color:rgba(0,0,0,0.4);
        }
        .order-notice{
            height:6rem;
            width:60%;
            margin:0 20%;
            position:absolute;
            z-index:3;
            top:50%;
            margin-top:-5rem;
            background-color:#fff;
            font-size:0.67rem;
            .content{
                padding:0.5rem;
                text-align:left;
                line-height:1.5em;
            }
            .toolbar{
                height:1rem;
                .button{
                    background-color:rgb(0, 191, 254);
                    color:#fff;
                    line-height:1rem;
                    text-align:center;
                }
                .confirm-button{
                    margin-right:1px;
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
            .input-control{
                overflow:hidden;
                border-radius:3px;
                box-shadow:0px 2px 3px #ccc;
                .explain{
                    background-color:#f8f8f8;
                    padding:0.43rem 0.43rem 1rem 0.8rem;
                    font-size:0.51rem;
                    color:#6b6b6b;
                    line-height: 1.5em;
                    position:relative;
                    .atention{
                        white-space:nowrap;
                        text-overflow:ellipsis;
                        margin-bottom:0.2rem;
                        .red{
                            color:#fc4c1d;
                            font-size:0.51rem;
                            text-overflow: ellipsis;
                        }
                    }
                    .fcmc-list{
                        .fcmc-title{
                            color:#00bffe;
                            .iconfont{
                                font-size:0.54rem;
                            }
                        }
                        .fcmc-item{
                            white-space:nowrap;
                            display:inline-block;
                            width:45%;
                            .info{
                                text-overflow:ellipsis;
                                .iconfont{
                                    font-size:0.54rem;
                                }
                            }
                        }
                        .expand{
                            width:3rem;
                            text-align:right;
                            color:#fc4c1d;
                            position:absolute;
                            bottom:0.2rem;
                            right:0.43rem;
                            .iconfont{
                                font-size:0.51rem;
                            }
                        }
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
               
            }
        }
        .button-control{
            margin:0.3rem;
            color:#fff;
            font-size:0.77rem;
            overflow:hidden;
            border-radius:3px;
        }
    }
</style>