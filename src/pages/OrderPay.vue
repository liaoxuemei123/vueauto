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
                        <span class="value">{{order.setName}}</span>
                    </div>
                    <div class="order-price" flex="dir:left cross:center">
                        <span class="title">订单金额：</span>
                        <span class="value">{{order.price}}</span>
                    </div>
                </div>
                <div class="payment-mode">
                    <div class="payment-item" flex="dir:left cross:center box:justify" @click="paymentMode=1">
                        <div class="pay-url">
                            <img src="../assets/payment-union.jpg" alt="">
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
                            <img src="../assets/payment-wepay.jpg" alt="">
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
                    <div class="payment-item" flex="dir:left cross:center box:justify" @click="paymentMode=3">
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
                    </div>
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
    export default {
        data () {
            return {
                order:{
                    setName:"D套餐（买三送一）",
                    price:450,
                },
                paymentMode:1,
            }
        },
        components:{
            NavBar,
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
                background: radial-gradient(rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 0.1rem, #fff 0.2rem);
                background-size: 0.6rem 1.2rem;
                background-position: 0rem 0.4rem;
                padding: 0.6rem 0.6rem 1rem 0.6rem;
                font-size: 0.64rem;
                color: #333;
                position: relative;
                z-index: 0;
            }
            .order-info:before{
                background-color: #fff;
                content: '';
                position: absolute;
                top:0;
                bottom:0.2rem;
                left:0;
                right:0;
                z-index: -1;
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