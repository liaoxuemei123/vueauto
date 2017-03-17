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
                            <img :src="packageInfo.storeInfo.photoUrl">
                        </div>
                        <div class="set-detail" flex="dir:top box:mean">
                            <div class="line" flex="dir:left cross:center main:justify">
                                <span class="set-name">{{packageInfo.modelInfo.seriesName}} {{packageInfo.setInfo.packageName}}</span>
                                <span class="price">￥{{packageInfo.setDetail.price}}</span>
                            </div>
                            <div class="line" flex="dir:left cross:center main:justify">
                                <span class="set-des1">{{packageInfo.setInfo.packageContent}}</span>
                            </div>
                            <div class="line" flex="dir:left cross:center main:justify">
                                <span class="set-des2">{{packageInfo.setInfo.beginVehicleAge|ageFilter}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="explain">
                        <div class="explain-item" flex="dir:left cross:top">
                            <div class="check title">保养权益：</div>
                            <div>{{packageInfo.setInfo.packageName}}</div>
                        </div>
                        <div class="explain-item" flex="dir:left cross:top">
                            <div class="change title">保养项目：</div>
                            <div>{{packageInfo.setInfo.packageContent}}</div>
                        </div>
                        <div class="explain-item" flex="dir:left cross:top">
                            <div class="validate title">使用范围：</div>
                            <div>{{packageInfo.setInfo.isUniversal|universalFilter}}</div>
                        </div>
                        <div class="explain-item" flex="dir:left cross:top">
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
                            <div class="value">{{this.packageInfo.modelInfo.vehicleModel}}</div>
                        </div>
                        <div class="bottom-item" flex="dir:left cross:center main:left">
                            <div class="title"><i class="iconfont icon-motor"></i>排量:</div>
                            <div class="value">{{this.packageInfo.modelInfo.displacement}}</div>
                        </div>
                        
                    </div>
                    <div class="bottom" flex="dir:left box:mean">
                        <div class="bottom-item" flex="dir:left cross:center main:left">
                            <div class="title"><i class="iconfont icon-motor"></i>发动机号:</div>
                            <div class="value">{{packageInfo.userInfo.motorId}}</div>
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
                    提示：支付七天过后不能退单。一旦使用套餐不能退单。
                </div>
                <div class="agree" flex="dir:left cross:center" @click="sure =! sure">
                    <div class="sure-circle" :class="{'sure':sure}">
                        <i class="iconfont icon-agree"></i>
                    </div>
                    我已阅读并同意《用户服务协议》
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
                sure:true
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
                var today = Tool.formatDate(this.packageInfo.setInfo.validate);
                var end = today.substring(0,4) - 0 + 3 + today.substring(4,10);
                var endTime = new Date(end).getTime();
                Tool.post('AaPackageOrder',{
                    userId:Tool.getUserInfo('userId'),
                    allNumber:this.packageInfo.setInfo.setMealNumber,
                    expirationDateTimestamp:endTime,
                    vin:this.packageInfo.userInfo.vin,
                    packageId:this.packageInfo.setInfo.id,
                    restrictFacilitator:this.packageInfo.storeInfo.id||'',
                    phone:this.packageInfo.userInfo.tel,
                    linkman:this.packageInfo.userInfo.contact,
                    orderPrice:this.packageInfo.setDetail.price,
                    carType:this.packageInfo.modelInfo.vehicleModel + ' ' + this.packageInfo.modelInfo.displacement,
                    setMealId:this.packageInfo.setDetail.mealId,
                },(data)=>{
                    Toast(data.msg);
                    if(data.code == 200){
                        this.$router.push({name:'orderpay',params:{orderNo:data.data}});
                    }
                })
            }
        },
        activated:function(){
        },
        filters:{
            universalFilter:function(val){
                if(val){
                    return '全国服务中心通用'
                }else{
                    return '指定服务中心使用'
                }
            },
            ageFilter:function(val){
                if(val){
                    return '两年以上车龄专享'
                }else{
                    return '两年以内车龄专享'
                }
            },
            validateFilter:function(val){
                var today = Tool.formatDate(val);
                var endday = today.substring(0,4) - 0 + 3 + today.substring(4,10);
                return endday;
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
                margin:0rem 0.5rem;
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