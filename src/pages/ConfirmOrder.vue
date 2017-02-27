<template>
    <div class="page confirm-order-page" flex="dir:top box:justify">
        <nav-bar
            title="确认订单"
        />
        <div class="page-content">
            <div class="set-info">
                <div class="top" flex="dir:left box:first">
                    <div class="store-url" flex="dir:left cross:center">
                        <img :src="setInfo.url">
                    </div>
                    <div class="set-detail" flex="dir:top box:mean">
                        <div class="line" flex="dir:left cross:center main:justify">
                            <span class="set-name">{{setInfo.setName}}</span>
                            <span class="price">￥{{setInfo.price}}</span>
                        </div>
                        <div class="line" flex="dir:left cross:center main:justify">
                            <span class="set-des1">{{setInfo.des1}}</span>
                        </div>
                        <div class="line" flex="dir:left cross:center main:justify">
                            <span class="set-des2">{{setInfo.des2}}</span>
                        </div>
                    </div>
                </div>
                <div class="explain">
                    <div class="explain-item" flex="dir:left cross:top">
                        <div class="check title">保养权益：</div>
                        <div>{{explain.check}}</div>
                    </div>
                    <div class="explain-item" flex="dir:left cross:top">
                        <div class="change title">保养项目：</div>
                        <div>{{explain.change}}</div>
                    </div>
                    <div class="explain-item" flex="dir:left cross:top">
                        <div class="validate title">使用范围：</div>
                        <div>{{explain.range}}</div>
                    </div>
                    <div class="explain-item" flex="dir:left cross:top">
                        <div class="VIN title">到期时间：</div>
                        <div>{{explain.validate}}</div>
                    </div>
                </div>
                <div class="bottom" flex="dir:left box:mean">
                    <div class="car-series" flex="dir:left cross:center">
                        <div class="title"><i class="iconfont icon-car"></i>车型：</div>
                        <div class="value">{{setInfo.carSeries}}</div>
                    </div>
                    <div class="vin-code" flex="dir:left cross:center">
                        <div class="title"><i class="iconfont icon-contact"></i>VIN：</div>
                        <div class="value">{{setInfo.VIN}}</div>
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
                    <span class="price">￥{{order.price}}</span>
                </div>
                <div class="benifit-info" flex="dir:left main:left cross:center">
                    <span class="origin-fee">(保养费:￥{{order.originFee}} </span>
                    <span class="benifit-fee">优惠金额:￥{{order.benifitFee}})</span>
                </div>
            </div>
            <div class="button pay" @click="goPay">
                立即支付
            </div>
        </div>
    </div>
</template>
<script>
    import NavBar from "../components/NavBar";
    import InpCom from "../components/InpCom";
    import { mapMutations } from 'vuex';
    export default {
        data () {
            return {
                setInfo:{
                    url:"https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png",
                    setName:"逸动V7/D套餐（买三送一）",
                    price:460,
                    des1:"检查8项，更换4项。",
                    des2:"4次基础保养有效期3年",
                    carSeries:'逸动V7',
                    VIN:121321321321,
                },
                explain:{
                    check:"四次基础保养",
                    change:"机油、机油滤清器、汽油滤清器、燃油滤清器",
                    validate:"2020-02-16",
                    range:"全国使用"
                },
                order:{
                    price:450,
                    originFee:460,
                    benifitFee:10,
                },
                sure:false
            }
        },
        components:{
            NavBar,
            InpCom,
        },
        methods:{
            goPay:function(){
                this.$router.push({name:'orderpay'});
            }
        }
    }
</script>
<style lang="less" scoped>
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
                    .car-series,.vin-code{
                        font-size:0.57rem;
                        color:#333;
                        line-height:2em;
                        .iconfont{
                            font-size:0.57rem;
                            margin-right:0.2rem;
                            color:#fc4c1d;
                        }
                        .value{
                            color:#666;
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