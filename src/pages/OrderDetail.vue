<template>
    <div class="order-detail-page page" flex="dir:top box:first">
        <nav-bar
            title="订单详情"
        />
        <div class="page-content">
            <div class="order-detail">
                <div class="header" flex="dir:left cross:center main:justify">
                    <div class="order-id">
                        订单编号：{{orderInfo.orderId}}
                    </div>
                    <div class="state">
                        {{orderInfo.state | stateFilter}}
                    </div>
                </div>
                <div class="section">
                    <div class="car">车型：{{orderInfo.carName}}</div>
                    <div class="VIN">VIN：{{orderInfo.VIN}}</div>
                    <div class="pay-time">支付时间：{{orderInfo.payTime}}</div>
                    <div class="price">总额：{{orderInfo.price}}</div>
                </div>
                <div class="section">
                    <div class="times">使用次数/总次数：{{orderInfo.time}}/{{orderInfo.totalTime}}</div>
                    <div class="deadline">到期时间：{{orderInfo.deadline}}</div>
                </div>
                <div class="bottom" flex="dir:left cross:center">
                    使用方法：到店后告知服务顾问已购买套餐即可使用
                </div>
            </div>
            <div class="use-detail">
                <div class="header">保养使用明细</div>
                <div class="use-item" v-for="(item, index) in useList">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import NavBar from '../components/NavBar'
    export default {
        data () {
            return{
                orderInfo:{
                    orderId:1,
                    state:1,
                    carName:'悦翔V7',
                    VIN:121321894124,
                    payTime:'2017-02-16 14:22:21',
                    price:400,
                    totalTime:5,
                    time:2,
                    deadline:'2018-02-16',
                },
                useList:[
                    {

                    }
                ]
            }
        },
        components:{
            NavBar,
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
            .order-detail{
                background-color:#fff;
                box-shadow:0px 1px 3px #ccc;
                .header{
                    height:1.92rem;
                    font-size:0.67rem;
                    padding:0 3%;
                    border-bottom:1px solid #efefef;
                    .state{
                        color:#389cf1;
                    }
                }
                .section{
                    margin:0 3%;
                    padding:0.4rem 0;
                    border-bottom:1px solid #efefef;
                    line-height:1.8em;
                }
                .bottom{
                    padding:0 3%;
                    height:1.7rem;
                }
            }
        }
    }
</style>