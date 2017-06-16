<template>
    <div class="order-container">
        <div class="header" flex="dir:left cross:center main:justify">
            <div class="order-time">
                {{item.createDate}}
            </div>
            <div class="order-state">
                {{item.status | stateFilter}}
            </div>
        </div>
        <div class="body">
            <div class="order-info" flex="dir:top box:mean">
                <div class="order-name" flex="dir:left cross:center">
                    <span class="package-name">{{item.packageName}}</span>
                    <span class="package-range">{{item.isUniversal | universalFilter}}</span>
                </div>
                <div class="car-info" flex="dir:left cross:center">
                    <span class="car-type">车型：{{item.carType}}</span>
                    <span class="engine-oil">机油：{{item.engineOil}}</span>
                </div>
            </div>
            <div class="price-info" flex="dir:left main:right cross:center">
                <div class="order-total" flex="dir:left">
                    <div class="title">合计:￥</div>
                    <div class="label">{{item.orderPrice}}</div>
                </div>
                <div class="order-price" flex="dir:left" v-if="item.status != 1">
                    <div class="title">实付:￥</div>
                    <div class="label">{{item.orderPrice}}</div>
                </div>
            </div>
            
        </div>
        <div class="footer">
            <div class="oprater" flex="dir:left cross:center main:right">
                <div class="pay" v-if="item.status == 1" v-tap="goPay.bind(this,item.orderNo)">去支付</div>
                <div class="cancel" v-if="item.status == 2 && new Date().getTime() - item.paySuccessDate < 604800000 && !item.isOrderDetail" v-tap="refund.bind(this,item.orderNo)">退款</div>
                <!--<div class="evaluate" @click="goEvaluate" v-if="item.status == 4">去评价</div>-->
                <div class="detail" v-tap="viewDetail.bind(this,item.orderNo)" v-if="item.status != 1">查看详情</div>
            </div>
        </div>
    </div>
</template>
<script>
    import Tool from '../utils/Tool'
    export default {
        data () {
            return {

            }
        },
        props:{
            item:{
                type:Object,
                default:{}
            }
        },
        filters:{
            stateFilter:function(val){
                switch(val){
                    case 1:
                        return "未支付";
                        break;
                    case 2:
                        return "已支付";
                        break;
                    case 3:
                        return "退款中";
                        break;
                    case 4:
                        return "退款失败";
                        break;
                    case 5:
                        return "退款成功";
                        break;
                }
            },
            universalFilter:function(val){
                if(val == 1){
                    return '全国服务门店使用'
                }else{
                    return '指定服务门店使用'
                }
            }
        },
        methods:{
            viewDetail:function(id){
                this.$router.push({path:'orderdetail/'+id});
            },
            goEvaluate:function(){
                this.$router.push({path:'evaluate'});
            },
            goPay:function(orderNo){
                this.$router.push({path:'/orderpay/'+orderNo});
            },
            refund:function(orderNo){
                this.$router.push({path:'/refund/'+orderNo})
            }
        }
    }
</script>
<style lang="less" scoped>
    .order-container{
        font-size:0.58rem;
        line-height:1.5em;
        color:#222;
        .header{
            border-bottom:1px solid #efefef;
            font-size:0.58rem;
            line-height:2em;
            .order-time{
                color:#888;
            }
            .order-state{
                color:#389cf1;
            }
        }
        .body{
            font-size:0.67rem;
            .order-info{
                padding:0.2rem 0;
                height:2.6rem;
                border-bottom:1px solid #efefef;
                .order-name{
                    .package-range{
                        font-size:0.57rem;
                        margin-left:0.2rem;
                        color:#fc4c1d;
                    }
                }
                .car-info{
                    font-size:0.57rem;
                    .car-type{
                        margin-right:0.4rem;
                    }
                    .engine-oil{
                        font-size:0.51rem;
                        color:#888;
                    }
                }
            }
            .price-info{
                height:1.5rem;
                font-size:0.54rem;
                border-bottom:1px solid #efefef;
                .order-price{
                    margin-left:0.5rem;
                }
            }
        }
        .footer{
            font-size:0.51rem;
            color:#4b4b4b;
            .oprater{
                height:1.5rem;
                &>div{
                    margin-left:0.5rem;
                }
                &>div{
                    padding:0.05rem 0.5rem;
                    border:1px solid #aaa;
                    border-radius:0.2rem;
                }
            }
        }
    }
</style>