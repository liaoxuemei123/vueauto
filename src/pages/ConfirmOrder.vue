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
                            <img :src="packageInfo.setInfo.packageImage">
                        </div>
                        <div class="set-detail" flex="dir:top box:mean">
                            <div class="line" flex="dir:left cross:center main:justify">
                                <span class="set-name">{{packageInfo.modelInfo.seriesName}} {{packageInfo.setInfo.packageName}}</span>
                                <span class="price">￥{{packageInfo.setDetail.price}}</span>
                            </div>
                            <div class="line" flex="dir:left cross:center main:justify">
                                <span class="set-des1">{{packageInfo.setInfo.packageContent}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="explain">
                        <div class="explain-item" flex="dir:left cross:top box:first">
                            <div class="check title">保养权益：</div>
                            <div>{{packageInfo.setInfo.packageName}}</div>
                        </div>
                        <div class="explain-item" flex="dir:left cross:top box:first">
                            <div class="change title">保养项目：</div>
                            <div>{{packageInfo.setInfo.packageContent}}</div>
                        </div>
                        <div class="explain-item" flex="dir:left cross:top box:first">
                            <div class="validate title">使用范围：</div>
                            <div>{{packageInfo.setInfo.isUniversal|universalFilter}}</div>
                        </div>
                        <div class="explain-item" flex="dir:left cross:top box:first">
                            <div class="VIN title">到期时间：</div>
                            <div>{{packageInfo.setInfo.validate|validateFilter}}</div>
                        </div>
                    </div>
                    <div class="bottom" flex="dir:left box:mean">
                        <div class="bottom-item" flex="dir:left cross:center main:left">
                            <div class="title"><i class="iconfont icon-contact"></i>姓名:</div>
                            <div class="value">{{packageInfo.userInfo.contact}}</div>
                        </div>
                        <div class="bottom-item" flex="dir:left cross:center main:left">
                            <div class="title"><i class="iconfont icon-phone"></i>电话:</div>
                            <div class="value">{{packageInfo.userInfo.tel}}</div>
                        </div>
                        
                    </div>
                    <div class="bottom" flex="dir:left box:mean">
                        <div class="bottom-item" flex="dir:left cross:center main:left">
                            <div class="title"><i class="iconfont icon-car"></i>车型:</div>
                            <div class="value">{{this.packageInfo.modelInfo.vehicleModel}}&nbsp;</div>
                            <div class="value">{{this.packageInfo.modelInfo.displacement}}</div>
                        </div>
                        <div class="bottom-item" flex="dir:left cross:center main:left">
                            <div class="title"><i class="iconfont icon-motor"></i>发动机号:</div>
                            <div class="value">{{packageInfo.userInfo.engineNo}}</div>
                        </div>
                    </div>
                    <div class="bottom" flex="dir:left box:mean">
                        <div class="bottom-item" flex="dir:left cross:center main:left">
                            <div class="title"><i class="iconfont icon-vin custom"></i>限用车架号:</div>
                            <div class="value">{{packageInfo.userInfo.vin}}</div>
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
                        <span class="price">￥{{packageInfo.setDetail.price}}</span>
                    </div>
                    <div class="benifit-info" flex="dir:left main:left cross:center">
                        <span class="origin-fee">(保养费:￥{{packageInfo.setDetail.price}} </span>
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
                <h5>长安汽车基础保养套餐服务协议</h5>
                <div class="container">
                    <span class="attention">重要须知：重庆长安汽车股份有限公司在此特别提醒您仔细阅读本协议中的各个条款，您有权选择同意或者不同意本协议。</span>
                    <ul>
                        <li>1.本套餐内容包括：更换机油、机油滤清器、汽油滤清器的零件费用及对应工时费，转向、驻车、制动等系统专项检查工时费。</li>
                        <li>2.本套餐使用时，如需增加其它项目，客户需自行承担增加的零件和工时费用。</li>
                        <li>3.本套餐仅适用于签订协议时所登记的车辆（以VIN码为准），车辆所有权发生转移不影响维保套餐的使用。</li>
                        <li>4.本套餐在购买7日之内未使用可申请退款。套餐金额将在提出申请10个工作日内退回客户当初购买套餐所使用账户中。</li>
                        <li>5.本套餐规定的保养次数使用完毕或协议有效期满时，本协议终止。</li>
                    </ul>
                    <footer>
                        <div>重庆长安汽车股份有限公司</div>
                        <div>2017年4月1日</div>
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
    import { Toast } from 'mint-ui';
    export default {
        data () {
            return {
                sure:true,
                licenseShow:false,
            }
        },
        computed:{
            ...mapState([
                'packageInfo'
            ])
        },
        components:{
            NavBar,
            InpCom,
        },
        methods:{
            goPay:function(){
                if(!this.sure){
                    Toast('请阅读并同意《用户服务协议》');
                    return false;
                }
                this.submitOrder();
            },
            submitOrder:function(){
                // var today = Tool.formatDate(this.packageInfo.setInfo.validate);
                // var end = today.substring(0,4) - 0 + 3 + today.substring(4,10);
                // var endTime = new Date(end).getTime()+36000000;
                Tool.post('AaPackageOrder',{
                    userId:Tool.getUserInfo('userId'),
                    allNumber:this.packageInfo.setInfo.setMealNumber,
                    expirationDateTimestamp:this.packageInfo.setInfo.validate,
                    vin:this.packageInfo.userInfo.vin,
                    packageId:this.packageInfo.setInfo.id,
                    restrictFacilitator:this.packageInfo.storeInfo.id||'',
                    phone:this.packageInfo.userInfo.tel,
                    linkman:this.packageInfo.userInfo.contact,
                    orderPrice:this.packageInfo.setDetail.price,
                    carType:this.packageInfo.modelInfo.vehicleModel + ' ' + this.packageInfo.modelInfo.displacement,
                    setMealId:this.packageInfo.setDetail.mealId,
                    storeId:this.packageInfo.storeInfo.id || '',
                    engineNo:this.packageInfo.userInfo.engineNo
                },(data)=>{
                    if(data.code == 200){
                        this.$router.push({path:'/orderpay/'+data.data});
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
            }
        },
        activated:function(){
            console.log(this.packageInfo.userInfo);
        },
        filters:{
            universalFilter:function(val){
                if(val == 1){
                    return '全国4S店使用（暂开通河南）'
                }else{
                    return '指定4S店使用'
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
            Tool.routerEnter(to,from,next)
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
                        img{
                            width:2.3rem;
                            height:2.3rem;
                            border-radius:3px;
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
                        width:3rem;
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