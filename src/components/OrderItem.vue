<template>
    <div class="order-container">
        <div class="header" flex="dir:left cross:center main:justify">
            <div class="order-id">
                订单编号：{{item.orderId}}
            </div>
            <div class="order-state">
                {{item.state | stateFilter}}
            </div>
        </div>
        <div class="body">
            <div class="line">
                <div class="car-infon" flex="dir:left cross:center">
                    <div class="title">车辆信息：</div>
                    <div class="label">{{item.carSeries}}</div>
                </div>
            </div>
            <div class="line">
                <div class="order-time" flex="dir:left cross:center">
                    <div class="title">下单时间：</div>
                    <div class="label">{{item.time}}</div>
                </div>
            </div>
            <div class="line" flex="dir:left main:justify cross:baseline">
                <div class="order-price" flex="dir:left">
                    <div class="title">总额：</div>
                    <div class="label">{{item.price}}</div>
                </div>
                <div class="oprater" flex="dir:left cross:center">
                    <div class="pay" v-if="item.state == 2">去支付</div>
                    <div class="cancel" v-if="item.state == 1">退单</div>
                    <div class="detail" @click="viewDetail(item.orderId)">查看详情</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
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
                        return "已支付";
                        break;
                    case 2:
                        return "未支付";
                        break;
                    case 3:
                        return "已退单";
                        break;
                    case 4:
                        return "已评价";
                        break;
                }
            }
        },
        methods:{
            viewDetail:function(id){
                this.$router.push({path:'orderdetail/'+id});
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
            font-size:0.67rem;
            line-height:2em;
            .order-state{
                color:#389cf1;
            }
        }
        .body{
            font-size:0.58rem;
            margin:0.4rem 0;
            .oprater{
                font-size:0.51rem;
                .pay,.cancel{
                    color:#666;
                    padding:0rem 0.3rem;
                    border:1px solid #666;
                    border-radius:2px;
                    margin-left:0.2rem;
                }
                .detail{
                    color:#ff3c30;
                    padding:0rem 0.3rem;
                    border:1px solid #ff3c30;
                    border-radius:1px;
                    margin-left:0.5rem;
                }
            }
        }
    }
</style>