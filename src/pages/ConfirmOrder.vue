<template>
    <div class="page-container">
        <div class="page confirm-order-page" flex="dir:top box:justify">
            <nav-bar
                title="确认订单"
            />
            <div class="page-content">
                <div class="set-info">
                    <div class="top" flex="dir:left box:first">
                        <div class="store-url" flex="dir:left cross:center">
                            <div class="image-container">
                                <img v-lazy="setInfo.coverUrl">
                            </div>
                        </div>
                        <div class="set-detail" flex="dir:top box:mean">
                            <div class="line" flex="dir:left cross:center main:justify">
                                <span class="set-name">{{modelInfo.seriesName}} {{setInfo.wbpName}}</span>
                                <span class="price">￥{{setDetail.price}}</span>
                            </div>
                            <div class="line" flex="dir:left cross:center main:justify">
                                <span class="set-des1">{{setInfo.wbpPdesc}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="explain">
                        <div class="explain-item" flex="dir:left cross:top box:first">
                            <div class="check title">保养权益：</div>
                            <div>{{setInfo.wbpName}}</div>
                        </div>
                        <div class="explain-item" flex="dir:left cross:top box:first">
                            <div class="change title">保养项目：</div>
                            <div>{{setInfo.wbpByxm}}</div>
                        </div>
                        <div class="explain-item" flex="dir:left cross:top box:first">
                            <div class="validate title">使用范围：</div>
                            <div>{{storeInfo.id == '111111' ? storeInfo.id : setInfo.wbpSfqgty | universalFilter}}</div>
                        </div>
                        <div class="explain-item" flex="dir:left cross:top box:first">
                            <div class="VIN title">到期时间：</div>
                            <div>{{setDetail.validate|validateFilter}}</div>
                        </div>
                    </div>
                    <div class="bottom" flex="dir:left box:mean">
                        <div class="bottom-item" flex="dir:left cross:center main:left" v-if="gmJudge('contact')">
                            <div class="title"><i class="iconfont icon-contact"></i>姓名:</div>
                            <div class="value">{{userInfo.contact}}</div>
                        </div>
                        <div class="bottom-item" flex="dir:left cross:center main:left" v-if="gmJudge('tel')">
                            <div class="title"><i class="iconfont icon-phone"></i>电话:</div>
                            <div class="value">{{userInfo.tel}}</div>
                        </div>
                    </div>
                    <div class="bottom" flex="dir:left box:mean">
                        <div class="bottom-item" flex="dir:left cross:center main:left">
                            <div class="title"><i class="iconfont icon-car"></i>车型:</div>
                            <div class="value">{{modelInfo.vehicleModel}}&nbsp;</div>
                            <div class="value">{{modelInfo.displacement}}</div>
                        </div>
                        <div class="bottom-item" flex="dir:left cross:center main:left" v-if="gmJudge('motorId')">
                            <div class="title"><i class="iconfont icon-motor"></i>发动机号:</div>
                            <div class="value">{{userInfo.engineNo}}</div>
                        </div>
                    </div>
                    <div class="bottom" flex="dir:left box:mean">
                        <div class="bottom-item" flex="dir:left cross:center main:left" v-if="gmJudge('vin')">
                            <div class="title"><i class="iconfont icon-vin custom"></i>限用车架号:</div>
                            <div class="value">{{userInfo.vin}}</div>
                        </div>
                    </div>
                </div>
                <div class="tips">
                    提示：本套餐在购买7日之内未使用可申请退款。
                </div>
                <div class="agree" flex="dir:left cross:center" >
                    <div class="sure-circle" :class="{'sure':sure}" @click="sure = !sure">
                        <i class="iconfont icon-agree"></i>
                    </div>
                    <span @click="sure = !sure">我已阅读并同意</span>
                    <span @click="licenseShow = true" class="user-license-text">《用户服务协议》</span>
                </div>
            </div>
            <div class="button-control" flex="dir:left box:first">
                <div class="pay-info" flex="dir:top box:mean">
                    <div class="pay-price" flex="dir:left main:left cross:center">
                        <span>实付:</span>
                        <span class="price">￥{{setDetail.price}}</span>
                    </div>
                    <div class="benifit-info" flex="dir:left main:left cross:center">
                        <span class="origin-fee">(保养费:￥{{setDetail.price}} </span>
                        <span class="benifit-fee">优惠金额:￥0.00)</span>
                    </div>
                </div>
                <div class="button pay" @click="goPay">
                    立即支付
                </div>
            </div>
        </div>
        <transition name="fade">
            <div class="user-license-mask" v-if="licenseShow" @click="licenseShow=false"></div>
        </transition>
        <transition name="slide-up">
            <div class="user-license" v-if="licenseShow" flex="dir:top box:justify">
                <div v-show="pageConfig.fileds.length" v-for="(item,index) in pageConfig.fileds">
                    <h5 v-if="item == 'wcxy' && pageConfig.tags[index] == 1">长安汽车基础保养套餐服务协议</h5>
                    <h5 v-if="item == 'scxy' && pageConfig.tags[index] == 1">长安欧尚基础保养套餐服务协议</h5>
                </div>
                <div class="container">
                    <span class="attention">重要须知：重庆长安车联科技有限公司在此特别提醒您仔细阅读本协议中的各项条款，您有权选择同意或者不同意本协议。</span>
                    <div class="license-choose" v-show="pageConfig.fileds.length" v-for="(item,index) in pageConfig.fileds">
                        <ul v-if="item == 'wcxy' && pageConfig.tags[index] == 1">
                            <li>1.本套餐内容包括：更换机油、机油滤清器的零件费用及对应工时费，转向、驻车、制动等系统专项检查工时费。</li>
                            <li>2.本套餐使用时，如需增加其它项目或使用更高级别机油，客户需自行承担增加的零件和工时费用。</li>
                            <li>3.本套餐仅适用于购买保养套餐时所填写的车辆（以车架号为准），车辆所有权发生转移不影响本套餐的使用。</li>
                            <li>4.购买本套餐时，请登录本人所注册的长安账号，如授权他人代买，代买人的所有操作视同为本人行为。</li>
                            <li>5.本套餐在购买7日之内未使用可申请退款。如在购买本套餐时，有赠送权益，申请退款后，所赠送权益需退回，如已使用赠送权益，需支付相应权益价值金额后才能退款。满足退款条件的订单，退款将在提出申请后5个工作日内原路退回至用户支付账户，具体到账时间以各第三方平台及银行规定为准。</li>
                            <li>6.如购买套餐时所指定服务门店发生退出长安服务网络等特殊情况，为保障车主权益，套餐使用范围将升级为“全国服务门店”。</li>
                            <li>7.本套餐中“全国服务门店”指使用服务门店选项中可查询到的当前最新的所有服务门店。</li>
                            <li>8.本套餐规定的保养次数使用完毕或保养套餐到期时，本协议终止。</li>
                        </ul>
                        <ul v-if="item == 'scxy' && pageConfig.tags[index] == 1">
                            <li>1.本套餐内容包括：更换机油、机油滤清器的零件费用及对应工时费。</li>
                            <li>2.本套餐使用时，如需增加其它项目或使用更高级别机油，客户需自行承担增加的零件和工时费用。</li>
                            <li>3.本套餐仅适用于购买保养套餐时所填写的车辆（以车架号为准），车辆所有权发生转移不影响本套餐的使用。</li>
                            <li>4.购买本套餐时，请登录本人所注册的长安账号，如授权他人代买，代买人的所有操作视同为本人行为。</li>
                            <li>5.本套餐在购买7日之内未使用可申请退款。如在购买本套餐时，有赠送权益，申请退款后，所赠送权益需退回，如已使用赠送权益，需支付相应权益价值金额后才能退款。满足退款条件的订单，退款将在提出申请后5个工作日内原路退回至用户支付账户，具体到账时间以各第三方平台及银行规定为准。</li>
                            <li>6.如购买套餐时所指定服务门店发生退出长安服务网络等特殊情况，为保障车主权益，套餐使用范围将升级为“任意服务门店”。</li>
                            <li>7.本套餐中“任意服务门店”指使用服务门店选项中可查询到的当前最新的所有服务门店。</li>
                            <li>8.本套餐规定的保养次数使用完毕或保养套餐到期时，本协议终止。</li>
                        </ul>
                    </div>
                    <footer v-show="pageConfig.fileds.length" v-for="(item,index) in pageConfig.fileds">
                        <div>重庆长安车联科技有限公司</div>
                        <!-- <div v-if="item == 'scxy' && pageConfig.tags[index] == 1">2017年7月1日</div> -->
                        <!-- <div v-if="item == 'wcxy' && pageConfig.tags[index] == 1">2017年4月1日</div> -->
                    </footer>
                </div>
                <div class="toolbar" flex="dir:left box:mean">
                    <div class="sure-button" @click="licenseDisAgree" flex="dir:left cross:center main:center">不同意</div>
                    <div class="close-button" @click="licenseAgree" flex="dir:left cross:center main:center">同意</div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    import NavBar from "../components/NavBar";
    import InpCom from "../components/InpCom";
    import { mapMutations, mapState } from 'vuex';
    import Tool from '../utils/Tool';
    import { Picker, Toast, MessageBox } from 'mint-ui';
    export default {
        data () {
            return {
                sure:false,
                licenseShow:false,
                wbpId:'',
                pageConfig:{
                    fileds:[],
                    tags:[]
                },
                agentLogo:'',
                GmConfig:{
                    fileds:[],
                    tags:[]
                }
            }
        },
        computed:{
            ...mapState({
                userInfo: ({
                    packageinfo
                }) => packageinfo.userInfo,
                modelInfo: ({
                    packageinfo
                }) => packageinfo.modelInfo,
                setInfo: ({
                    packageinfo
                }) => packageinfo.setInfo,
                setDetail: ({
                    packageinfo
                }) => packageinfo.setDetail,
                storeInfo: ({
                    packageinfo
                }) => packageinfo.storeInfo,
                pageSetting: ({
                    pageconfig
                }) => pageconfig.currentBis,
                qd: ({
                    pageconfig
                }) => pageconfig.qd,
                orderUnPayCount: ({
                    mixin
                }) => mixin.orderUnPayCount,
                protocolSure: ({
                    packageinfo
                }) => packageinfo.protocolSure,
            })
        },
        components:{
            NavBar,
            InpCom,
        },
        methods:{
            goPay:function(){
                // MessageBox.confirm('是否确认立即支付？').then(action => {
                    if(!this.sure){
                    Toast('请阅读并勾选《用户服务协议》');
                        return false;
                    }
                    this.proSure(true);
                    if(Tool.localItem('wbyQd') && Tool.localItem('wbyQd')=='JJRFX' && Tool.localItem('agentLogo')) {
                        this.agentLogo = Tool.localItem('agentLogo');
                        var oid = Tool.getUserInfo('oid');
                        Tool.get('agentIdentQuery',{
                            oid:oid
                        },(data) => {
                            if(data.code == 0){
                             // 未认证

                            }else{
                                if(data.data == this.agentLogo){
                                    this.agentLogo = ''; // 用户不能使用自己的推荐码
                                }else{

                                }
                                
                            }
                            this.submitOrder();
                        });
                    }
                    else {
                        this.agentLogo = '';
                        this.submitOrder();
                    }
                // },() => {});
            },
            submitOrder:function(){
                const expiredTime = new Date(this.setDetail.validate).getTime();
                console.log(this.setInfo.wbpId);
                // return;
                Tool.post('AaPackageOrder',{
                    userId:Tool.getUserInfo('userId'),
                    allNumber:this.setDetail.number,
                    expirationDateTimestamp:expiredTime,
                    vin:this.userInfo.vin,
                    packageId:this.setInfo.wbpId,
                    restrictFacilitator:this.storeInfo.id ? ( this.storeInfo.id == '111111' ? '' : this.storeInfo.id ) : '',
                    phone:this.userInfo.tel,
                    linkman:this.userInfo.contact,
                    orderPrice:this.setDetail.price,
                    carType:this.modelInfo.vehicleModel + ' ' + this.modelInfo.displacement,
                    setMealId:this.setDetail.mealId,
                    storeId:this.storeInfo.id ? ( this.storeInfo.id == '111111' ? '' : this.storeInfo.id ) : '',
                    engineNo:this.userInfo.engineNo,
                    mileage:this.userInfo.mileage,
                    orderType:this.modelInfo.vehicleType - 0,
                    referee:this.userInfo.referee ? ( this.userInfo.refereeId == '111111' ? '' : this.userInfo.referee ) : '',
                    refereeId:this.userInfo.refereeId ? ( this.userInfo.refereeId == '111111' ? '' : this.userInfo.refereeId ) : '',
                    refereeType:this.userInfo.refereeType,
                    refereeCode:this.agentLogo?this.agentLogo:'',
                    qd:this.qd || '',
                    
                },(data)=>{
                    if(data.code == 200){
                        this.$router.push({path:'/orderpay/'+data.data});
                        Tool.localItem('orderUnPay',{count:this.orderUnPayCount + 1,lastUpdateTime:new Date()});
                        this.setOrderUnPayCount(this.orderUnPayCount + 1);
                    }else{
                        Toast({
                            duration:1000,
                            message:data.msg,
                        })
                    }
                })
            },
            licenseDisAgree:function(){
                this.sure = false;
                this.licenseShow = false;
            },
            licenseAgree:function(){
                this.sure = true;
                this.licenseShow = false;
            },
            getPageConfig:function(e){
                this.pageConfig.tags = this.pageSetting.wbPageDetail['XY_PAGE'].wbpdFtag.split(',');
                this.pageConfig.fileds = this.pageSetting.wbPageDetail['XY_PAGE'].wbpdName.split(',');
                this.GmConfig.tags = this.pageSetting.wbPageDetail['GM_PAGE'].wbpdFtag.split(',');
                this.GmConfig.fileds = this.pageSetting.wbPageDetail['GM_PAGE'].wbpdName.split(',');
            },
            gmJudge:function(filed){
                const index = this.GmConfig.fileds.indexOf(filed);
                return !!this.GmConfig.tags[index]
            },
            ...mapMutations({
                setOrderUnPayCount: 'UPDATE_ORDERCOUNT',
                proSure: 'UPDATE_SURE',
            })
        },
        activated:function(){
            this.sure = this.protocolSure;
            var wbProduct = this.$route.params.id;
            wbProduct ? this.wbpId = wbProduct : wbProduct = this.wbpId;
            console.log(this.setInfo);
            this.getPageConfig();
        },
        created:function(){
            if($.isEmptyObject(this.modelInfo)) {
                this.$router.push({name:'maintainset'});
            }
        },
        filters:{
            universalFilter:function(val){
                if(val == '111111')
                    return '任意服务门店'
                if(val == 1){
                    return '全国服务门店使用'
                }else{
                    return '指定服务门店使用'
                }
            },
            ageFilter:function(val){
                if(val == 0){
                    return '两年以上车龄专享'
                }else{
                    return '两年以内车龄专享'
                }
            },
            validateFilter:function(val){
                return Tool.formatDate(val) + ' 18:00:00';
            }
        },
        beforeRouteEnter:(to,from,next)=>{
            if(Tool.localItem('userInfo') && Tool.getUserInfo('userId')){
                next();
            }else{
                store.commit('POP_PAGE',1);//在进入login之前把已进栈但是没有被访问的页面清理出栈
                next({name:'login',params:{to:to.path}});
            }
        },
    }
</script>
<style lang="less" scoped>
    .page-container{
        height:100%;
        position:absolute;
        width:100%;
        .user-license-mask{
            position:absolute;
            z-index:2;
            top:2rem;
            bottom:0;
            left:0;
            right:0;
            background-color:rgba(0,0,0,0.4);
        }         
        .user-license{
            font-size:0.51rem;
            line-height:1.5em;
            margin:0 5%;
            color:#666;
            width:90%;
            position:absolute;
            margin-top:4rem;
            height:20rem;
            z-index:3;
            background-color:rgba(255,255,255,1);
            h5{
                margin:0;
                font-size:0.64rem;
                text-align:center;
                color:#444;
                margin-bottom:0.2rem;
                border-bottom:1px solid #cfcfcf;
                padding:0.5rem 5% 0.2rem 5%;
            }
            .container{
                overflow:auto;
                padding:0.4rem 5%;
                ul{
                    margin:0;
                    padding:0;
                    list-style:none;
                    & li{
                        padding-left:0; 
                        text-indent:2em;
                        margin-top:0.2rem;
                    }
                }
                footer{
                    margin-top:0.2rem;
                    text-align:right;
                    color:#389cf2;
                }
            }
            .toolbar{
                height:1.5rem;
                .sure-button{
                    border-right:1px solid #efefef;
                }
                .close-button,.sure-button{
                    height:100%;
                    color:#fff;
                    background-color:#389cf2;
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
            position:relative;
            .set-info{
                background-color:#fff;
                padding:0.3rem 0rem;
                width:100%;
                margin-bottom:0.5rem;
                box-shadow:0px 2px 3px #ccc;
                .top{
                    height:2.56rem;
                    margin:0 3%;
                    padding-bottom: 0.6rem;
                    border-bottom:1px solid #ccc;
                    .store-url{
                        .image-container{
                            background-color:#ccc;
                            width:2.3rem;
                            height:2.3rem;
                            border-radius:3px;
                            overflow:hidden;
                            position:relative;
                            img{
                                width:100%;
                                height:100%;
                            }
                            img[lazy=loading] {
                                position:absolute;
                                top:37.5%;
                                left:37.5%;
                                width:25%;
                                height:25%;
                            }
                            img[lazy=error] {
                                position:absolute;
                                width:100%;
                                height:100%;
                                background-image:url("../assets/error.png");
                                background-size:50%;
                                background-position:center;
                                background-repeat:no-repeat;
                            }
                        }
                    }
                    .set-detail{
                        margin-left:0.2rem;
                        font-size:0.51rem;
                        color:#5b5b5b;
                        .set-name{
                            font-size:0.64rem;
                            font-weight:600;
                        }
                        .price{
                            color:#fc4c1d;
                            font-size:0.54rem;
                        }
                        .set-des1{
                            overflow: auto;
                            white-space: nowrap;
                        }
                        .set-des2{
                            color:#fc4c1d;
                        }
                    }
                }
                .explain{
                    margin:0.4rem 3%;
                    font-size:0.51rem;
                    color:#5b5b5b;
                    line-height:1.7em;
                    .title{
                        font-weight:600;
                        width:3.2rem;
                    }
                }
                .bottom{
                    padding:0rem 3%;
                    background-color:#f9f9f9;
                    .bottom-item{
                        font-size:0.51rem;
                        color:#333;
                        line-height:2em;
                        text-align:left;
                        .iconfont{
                            font-size:0.51rem;
                            margin-right:0.2rem;
                            color:#fc4c1d;
                        }
                        .value{
                            color:#666;
                        }
                        .custom{
                            font-size:0.7rem;
                        }
                    }
                }
            }
            .tips{
                margin:0.5rem 0.5rem;
                color:#fc4c1d;
                font-size:0.51rem;
            }
            .agree{
                margin:0.6rem 0.5rem;
                color:#ff3b2f;
                position:absolute;
                bottom:0.2rem;
                .sure-circle{
                    border:1px solid #ff3b2f;
                    width:0.51rem;
                    height:0.51rem;
                    overflow:hidden;
                    position:relative;
                    margin-right:0.2rem;
                    background-color:#fff;
                    transition:all .5s ease;
                    .iconfont{
                        font-size:0.51rem;
                        position:absolute;
                        color:#fff;
                    }
                }
                .sure-circle.sure{
                    background-color:#ff3b2f;
                }
                .user-license-text{
                    color:#389cf2;
                }
            }
        }
        .button-control{
            color:#fff;
            font-size:0.76rem;
            height:2.1rem;
            background-color:#fff;
            border-top:1px solid #ccc;
            .pay-info{
                width:10rem;
                padding:0.2rem 0.4rem;
                color:#333;
                .pay-price{
                    font-size:0.75rem;
                    font-weight:500;
                    .price{
                        color:#fc4c1d;
                    }
                }
                .benifit-info{
                    font-size:0.51rem;
                    color:#adadad;
                }
            }
            .button{
                height:2.1rem;
                line-height:2.1rem;
                background-color:#389cf2;
                text-align:center;
            }
        }
    }
</style>