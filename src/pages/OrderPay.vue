<template>
    <div class="page-container">
        <div class="page order-pay-page" flex="dir:top box:justify">
            <nav-bar
                title="确认购买"
                :goBack="goBack"
            />
            <div class="page-content">
                <div class="order-info" flex="dir:top box:mean">
                    <div class="order-name" flex="dir:left cross:center">
                        <span class="title">订单名称：</span>
                        <span class="value">{{orderInfo.packageName}}</span>
                    </div>
                    <div class="order-price" flex="dir:left cross:center">
                        <span class="title">订单金额：</span>
                        <span class="value">{{orderInfo.orderPrice|priceFilter}}</span>
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
                    <!-- <div class="payment-item" flex="dir:left cross:center box:justify" @click="paymentMode=3">
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
                    </div> -->
                </div>
            </div>
            <div class="button-control">
                <div class="sure-pay" @click="pay">
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
    import { Toast } from 'mint-ui';
    export default {
        data () {
            return {
                paymentMode:1,
                orderNo:'',
                orderType:'',
                orderInfo:{
                    packageName:'',
                    orderPrice:'',
                },
                isBack:false,
            }
        },
        computed:{
            ...mapState({
                qd: ({
                    pageconfig
                }) => pageconfig.qd,
            })
        },
        filters:{
            priceFilter:function(val){
                return (val - 0).toFixed(2);
            }
        },
        methods:{
            pay:function(){
                var self = this;
                Tool.get('checkOrder',{orderId:this.orderNo,total_fee:this.orderInfo.orderPrice},data => {
                    if(data.code == 200){
                        if(this.paymentMode == 1){
                            if(!Tool.isWeChat()) {
                                this.weChatH5();
                            }else{
                                // 访问  https://cloud.mall.changan.com.cn/wx_authorize/    就等于访问：https://open.weixin.qq.com/connect/oauth2/authorize
                                window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx22b47ca6974f3e71&redirect_uri=https://cloud.mall.changan.com.cn%2Fmaintainpackage%2F%23%2Forderpay%2F" + self.orderNo + "&response_type=code&scope=snsapi_base&state=" + self.orderNo + ',' + self.orderInfo.packageName + ',' + self.qd + "#wechat_redirect";
                            }
                        }
                        else if(this.paymentMode == 3){
                            if(Tool.isWeChat()) {
                                var alipayUrl = encodeURIComponent(Tool.target+"aliPay?out_trade_no="+this.orderNo+"&total_amount="+this.orderInfo.orderPrice+"&subject="+this.orderInfo.packageName+"");
                                this.$router.push({path:'/alipaytip',query:{goto:alipayUrl}});
                                // 在微信中打开支付宝支付
                            }else{
                                window.location.href = Tool.target+"aliPay?out_trade_no="+this.orderNo+"&total_amount="+this.orderInfo.orderPrice+"&subject="+this.orderInfo.packageName+"";
                            }
                        }
                        else{
                            //let href = "http://service.mall.changan.com.cn/maintenance-plug/unionPay/frontConsume?orderId="+this.orderNo;
                            //this.$router.push({path:'/unionpay',query:{href,orderNo:this.orderNo}})
                            window.location.href = "https://cloud.mall.changan.com.cn/maintenance-plug/unionPay/frontConsume?orderId="+this.orderNo;
                        }
                    }else{
                        Toast({
                            message: data.msg,
                            duration: 1000,
                        })
                    }
                })
            },
            weChatH5:function(){
                const total_fee = ( this.orderInfo.orderPrice - 0 ) * 100,
                    body = this.orderInfo.packageName,
                    orderNo = this.orderNo,
                    ip = userAddress,
                    redirect_url = encodeURIComponent("https://cloud.mall.changan.com.cn/maintainpackage/#/wechath5?orderNo="+this.orderNo+"&total_fee="+total_fee);
                const url = `${Tool.target}weixinH5pay?total_fee=${total_fee}&body=${body}&OutTradeNo=${orderNo}&ip=${ip}&redirect_url=${redirect_url}`;
                // window.location.href = url;
                window.open(url, '_self', 'location=no');
            },
            goBack:function(){
                this.$router.go(-1);
                this.isBack = true;
            },
            startPay:function(){
                var self = this;
                var params = window.location.href.split("?")[1];
                if(params){
                    params = params.split('#')[0];
                    var items = params.split('&');
                    var code = '';
                    var orderNo = '';
                    var packageName = '';
                    var qd = '';
                    for(var i=0;i<items.length;i++){
                        var key = items[i].split("=")[0];
                        var value = items[i].split("=")[1];
                        if(key == "code"){//获取微信认证返回的code
                            code = value;
                        }
                        if(key == "state"){//获取状态
                            Tool.urldecode(value,'utf-8',(str)=>{
                                var temp =  str.split(',')
                                orderNo = temp[0];
                                packageName = temp[1];
                                qd = temp[2];
                                if(orderNo && packageName){
                                    new Promise((res,rej)=>{
                                        Tool.get('AaPackageOrderDetail',{orderNo},(data)=>{//获取订单详情
                                            if(data.code == 200){
                                                self.orderInfo = data.data.PackageOrder;
                                                self.orderInfo.packageName = packageName;
                                                res(data);
                                            }else{
                                                rej();
                                            }
                                        })
                                    }).then((pData)=>{
                                        return new Promise((res,rej)=>{
                                            if(code){
                                                Tool.get('getOpenId',{code},(data) => {//调起支付
                                                    if(data.code == 200){
                                                        var openid = data.data.accessToken.openid;
                                                        var payData = {
                                                            total_fee:( self.orderInfo.orderPrice - 0 ) * 100,
                                                            body:self.orderInfo.packageName,
                                                            openid:openid,
                                                            orderId:orderNo
                                                        }
                                                        res(payData)
                                                    }else{
                                                        rej();
                                                    }
                                                })
                                            }else{
                                                rej();
                                            }
                                        })
                                    }).then((pData)=>{
                                        return new Promise((res,rej)=>{
                                            Tool.get('packageOrderPay',pData,(data)=>{//
                                                if(data.code == 200){
                                                    res(data.data);
                                                }else{
                                                    Toast({
                                                        message:'支付参数出错',
                                                        duration:1000,
                                                    })
                                                }
                                            });
                                        })
                                    }).then((pData)=>{
                                        return new Promise((res,rej)=>{
                                            function onBridgeReady(){//微信调起支付
                                                WeixinJSBridge.invoke(
                                                'getBrandWCPayRequest', {
                                                        "appId":pData.payRequestVo.appId,
                                                        "timeStamp":pData.payRequestVo.timeStamp,     
                                                        "nonceStr":pData.payRequestVo.nonceStr,
                                                        "package":"prepay_id=" + pData.payRequestVo.prepay_id,   
                                                        "signType":"MD5",
                                                        "paySign":pData.payRequestVo.paySign, 
                                                    },
                                                    function(data){     
                                                        if(data.err_msg == "get_brand_wcpay_request:ok") {
                                                            res(data);
                                                        }else if(data.err_msg == "get_brand_wcpay_request:cancel"){
                                                            rej();
                                                            Toast({
                                                                message:'支付被取消',
                                                                duration:1000,
                                                            })
                                                            if(qd != 'undefined'){
                                                                self.$router.push({name:'maintainset'});
                                                            }else{
                                                                self.$router.push({name:'maintainset'});
                                                            }
                                                            
                                                        }else{
                                                            rej();
                                                            Toast({
                                                                message:'支付出错',
                                                                duration:1000,
                                                            })
                                                            if(qd != 'undefined'){
                                                                self.$router.push({path:'/maintainset',query:{wbyQd:qd}});
                                                            }else{
                                                                self.$router.push({name:'maintainset'});
                                                            }
                                                            
                                                        }
                                                    }
                                                );
                                            }
                                            if (typeof WeixinJSBridge == "undefined"){
                                                if( document.addEventListener ){
                                                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                                                }else if (document.attachEvent){
                                                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
                                                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                                                }
                                            }else{
                                                onBridgeReady();
                                            }
                                        })
                                    }).then((pData)=>{
                                        // Tool.get('payCallback',{"out_trade_no":orderNo,"result_code":"SUCCESS"},(data)=>{
                                            // if(data.code == 200){
                                        Toast({
                                            message:'支付成功',
                                            duration:1000,
                                        })
                                        self.$router.push({path:'/orderdetail/'+orderNo,query:{wbyQd:qd}});
                                            // }
                                        // })
                                    })
                                }
                            });
                        }
                    }
                }
            }
        },
        components:{
            NavBar,
        },
        activated:function(){
            var self = this;
            this.isBack = false;
            if(this.$route.params && this.$route.params.id){
                this.orderNo = this.$route.params.id;
                Tool.get('AaPackageOrderDetail',{
                    orderNo:this.orderNo
                },(data)=>{
                    this.orderInfo = data.data.PackageOrder;
                })
            }
        },
        created:function(){
            this.startPay();//支付界面只有在第一次进入的时候才触发支付，否则不做操作
        },
        // beforeRouteLeave:function(to,from,next){
        //     if(this.isBack){
        //         if(to.name == 'confirmorder' || to.path == '/confirmorder'){
        //             next({name:'maintainset'});//防止2次下单
        //         }
        //     }
        //     next();
        // },
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