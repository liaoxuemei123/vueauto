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
            <div class="order-name">{{item.packageName}}</div>
            <div class="order-info" flex="dir:left main:right cross:center">
                <div class="order-total" flex="dir:left">
                    <div class="title">合计:￥</div>
                    <div class="label">{{item.orderPrice}}</div>
                </div>
                <div class="order-price" flex="dir:left">
                    <div class="title">实付:￥</div>
                    <div class="label">{{item.orderPrice}}</div>
                </div>
            </div>
            
        </div>
        <div class="footer">
            <div class="oprater" flex="dir:left cross:center main:right">
                <div class="pay" v-if="item.status == 1" @click="goPay(item.orderNo)">去支付</div>
                <div class="cancel" v-if="item.status == 2">退单</div>
                <!--<div class="evaluate" @click="goEvaluate" v-if="item.status == 4">去评价</div>-->
                <div class="detail" @click="viewDetail(item.orderNo)">查看详情</div>
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
                        return "未支付";
                        break;
                    case 2:
                        return "已支付";
                        break;
                    case 3:
                        return "待评价";
                        break;
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
            .order-name{
                height:2.4rem;
                line-height:2.4rem;
                border-bottom:1px solid #efefef;
            }
            .order-info{
                height:1.5rem;
                font-size:0.58rem;
                border-bottom:1px solid #efefef;
                .order-total{
                    margin-right:0.5rem;
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