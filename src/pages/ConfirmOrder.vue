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
                <div class="bottom">
                    <div class="explain-item" flex="dir:left cross:top">
                        <div class="check title">检查：</div>
                        <div>{{explain.check}}</div>
                    </div>
                    <div class="explain-item" flex="dir:left cross:top">
                        <div class="change title">更换：</div>
                        <div>{{explain.change}}</div>
                    </div>
                    <div class="explain-item" flex="dir:left cross:top">
                        <div class="validate title">到期时间：</div>
                        <div>{{explain.validate}}</div>
                    </div>
                    <div class="explain-item" flex="dir:left cross:top">
                        <div class="VIN title">VIN：</div>
                        <div>{{explain.VIN}}</div>
                    </div>
                </div>
            </div>
            <div class="user-info">
                <div class="input-control">
                    <inp-com title="车架号" icon="icon-store"/>
                </div>
                <div class="input-control">
                    <inp-com title="姓名" icon="icon-contact"/>
                </div>
                <div class="input-control">
                    <inp-com title="手机号" icon="icon-phone"/>
                </div>
                <div class="input-control">
                    <inp-com title="留言" icon="icon-comment"/>
                </div>
            </div>
            <div class="tips">
                提示：支付七天过后不能退单。一旦使用套餐不能退单。
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
                },
                explain:{
                    check:"冷却液检查、制动液检查、空气滤清器、制动系统检查、空气滤清器清器、驻车系统检查、燃油滤清器、机油滤清器",
                    change:"机油、机油滤清器、汽油滤清器、燃油滤清器",
                    validate:"2020-02-16",
                    VIN:"20170216274381"
                },
                order:{
                    price:450,
                    originFee:460,
                    benifitFee:10,
                }
            }
        },
        components:{
            NavBar,
            InpCom,
        },
        methods:{
            goPay:function(){
                this.pushPage({name:'orderpay',vue:this});
            },
            ...mapMutations([
                'pushPage'
            ])
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
            .set-info{
                background-color:#fff;
                padding:0.3rem 3%;
                width:94%;
                margin-bottom:0.5rem;
                box-shadow:0px 2px 3px #ccc;
                .top{
                    height:2.56rem;
                    margin-bottom:0.6rem;
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
                .bottom{
                    font-size:0.51rem;
                    color:#5b5b5b;
                    line-height:1.7em;
                    .check{
                        width: 3rem;
                    }
                    .title{
                        font-weight:600;
                    }
                }
            }
            .user-info{
                box-shadow:0px 2px 3px #ccc;
                .input-control + div{
                    border-top:1px solid #efefef;
                }
            }
            .tips{
                margin:0.5rem 0.5rem;
                color:#f9745a;
                font-size:0.51rem;
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
                background-color:#fc4c1d;
                text-align:center;
            }
        }
    }
</style>