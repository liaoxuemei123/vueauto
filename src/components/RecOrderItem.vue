<template>
    <div class="order-container">
        <div class="header" flex="dir:left cross:center main:justify">
            <div class="order-time">
                {{item.create_date | dateFilter}}
            </div>
            <div class="order-state">
                {{item.STATUS | stateFilter}}
            </div>
        </div>
        <div class="body">
            <div class="order-info" flex="dir:top box:mean">
               <!--  <div class="order-name" flex="dir:left cross:center">
                    <span class="package-name">{{item.packageName}}</span>
                </div> -->
                <!-- <div class="car-info" flex="dir:left cross:center">
                    <span class="car-type">车型：{{item.carType}}</span>
                    <span class="engine-oil">机油：{{item.engineOil}}</span>
                </div> -->
                <div class="car-info" flex="dir:left cross:center">
                    <span class="car-type">订单号：{{item.orderNo}}</span>
                    <span class="engine-oil">购买人：{{item.linkMan}}</span>
                </div>
            </div>
            <!-- <div class="price-info" flex="dir:left main:right cross:center">
                <div class="order-total" flex="dir:left">
                    <div class="title">合计:￥</div>
                    <div class="label">{{item.orderPrice}}</div>
                </div>
                <div class="order-price" flex="dir:left" v-if="item.STATUS != 1">
                    <div class="title">实付:￥</div>
                    <div class="label">{{item.orderPrice}}</div>
                </div>
            </div> -->
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
                    case 0:
                        return "已关闭";
                        break;
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
            },
            dateFilter:function(val){
                return Tool.formatDate(new Date(val),'time');
            },
        },
        methods:{
           
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
                height:2rem;
                border-bottom:1px solid #efefef;
                .order-name{
                    .package-range{
                        font-size:0.57rem;
                        margin-left:0.2rem;
                        color:#fc4c1d;
                    }
                }
                .car-info{
                    font-size:0.625rem;
                    .car-type{
                        margin-right:0.4rem;
                    }
                    .engine-oil{
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
    }
</style>