<template>
    <div class="page-container">
        <div class="page order-pay-page" flex="dir:top box:justify">
            <nav-bar
                title="确认购买"
            />
            <div class="page-content">
                <div class="order-info" flex="dir:top box:mean">
                    <div class="order-name" flex="dir:left cross:center">
                        <span class="title">订单名称：</span>
                        <span class="value">{{packageInfo.setInfo.packageName}}</span>
                    </div>
                    <div class="order-price" flex="dir:left cross:center">
                        <span class="title">订单金额：</span>
                        <span class="value">{{packageInfo.setDetail.price}}</span>
                    </div>
                </div>
                <div class="payment-mode">
                    <div class="payment-item" flex="dir:left cross:center box:justify" @click="paymentMode=1">
                        <div class="pay-url">
                            <img src="../assets/payment-wepay.jpg" alt="">
                        </div>
                        <div class="payment-info" flex="dir:top box:mean">
                            <span class="mode" flex="dir:left cross:center">微信支付</span>
                            <span class="comment" flex="dir:left cross:center">推荐安装微信5.0及以上版本使用</span>
                        </div>
                        <div class="selector">
                            <i class="iconfont icon-select" v-if="paymentMode==1"></i>
                            <i class="iconfont icon-circle" v-else="paymentMode==1"></i>
                        </div>
                    </div>
                    <div class="payment-item" flex="dir:left cross:center box:justify" @click="paymentMode=2">
                        <div class="pay-url">
                            <img src="../assets/payment-union.jpg" alt="">
                        </div>
                        <div class="payment-info" flex="dir:top box:mean">
                            <span class="mode" flex="dir:left cross:center">银联支付</span>
                            <span class="comment" flex="dir:left cross:center">支持储蓄卡信用卡</span>
                        </div>
                        <div class="selector">
                            <i class="iconfont icon-select" v-if="paymentMode==2"></i>
                            <i class="iconfont icon-circle" v-else="paymentMode==2"></i>
                        </div>
                    </div>
                    <!--<div class="payment-item" flex="dir:left cross:center box:justify" @click="paymentMode=3">
                        <div class="pay-url">
                            <img src="../assets/payment-alipay.jpg" alt="">
                        </div>
                        <div class="payment-info" flex="dir:top box:mean">
                            <span class="mode" flex="dir:left cross:center">支付宝支付</span>
                            <span class="comment" flex="dir:left cross:center">推荐有支付宝账号的用户使用</span>
                        </div>
                        <div class="selector">
                            <i class="iconfont icon-select" v-if="paymentMode==3"></i>
                            <i class="iconfont icon-circle" v-else="paymentMode==3"></i>
                        </div>
                    </div>-->
                </div>
            </div>
            <div class="button-control">
                <div class="sure-pay">
                    确认支付
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import NavBar from '../components/NavBar';
    import Tool from '../utils/Tool';
    import { mapState } from 'vuex';
    export default {
        data () {
            return {
                paymentMode:1,
            }
        },
        computed:{
            ...mapState([
                'packageInfo'
            ])
        },
        components:{
            NavBar,
        },
        beforeRouteLeave:function(to,from,next){
            if(to.name == 'confirmorder'){
                next({name:'maintainset'});//防止2次下单
            }
            next();
        },
        activated:function(){

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
            .order-info{
                height: 3rem;
                overflow: hidden;
                background: #fff;
                padding: 0.6rem 0.6rem 0.4rem 0.6rem;
                font-size: 0.64rem;
                color: #333;
                position: relative;
                z-index: 0;
                &:after{
                    position:absolute;
                    z-index:1;
                    left:0;
                    right:0;
                    bottom:0rem;
                    display: block;
                    content: "";
                    height: 10px;
                    background: #ffffff;
                    background-image: -webkit-gradient(linear,50% 0,0 100%, from(transparent), color-stop(.5,transparent), color-stop(.5,#EFEFEE), to(#EFEFEE) ), -webkit-gradient(linear,50% 0,100% 100%, from(transparent), color-stop(.5,transparent), color-stop(.5,#efefef), to(#efefef) );
                    background-size: 12px 5px;
                    background-repeat: repeat-x;
                    background-position: 0 100%;
                }
            }
            .payment-mode{
                margin-top:0.4rem;
                box-shadow:0px 2px 3px #ccc;
                .payment-item{
                    height:2.56rem;
                    background-color:#fff;
                    margin-bottom:1px;
                    .pay-url{
                        height:1.8rem;
                        margin:0rem 0.6rem;
                        img{
                            width:3rem;
                            height:1.8rem;
                        }
                    }
                    .payment-info{
                        height:2rem;
                        .mode{
                            color:#222;
                            font-size:0.64rem;
                        }
                        .comment{
                            color:#999;
                            font-size:0.51rem;
                        }
                    }
                    .selector{
                        margin:0rem 0.6rem;
                        color:#dadada;
                        .icon-select{
                            color:#fc4c1d;
                        }
                    }

                }
            }
        }
        .button-control{
            .sure-pay{
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