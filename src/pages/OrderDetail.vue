<template>
    <div class="page-container">
        <div class="order-detail-page page" flex="dir:top box:first">
            <nav-bar
                title="订单详情"
            />
            <div class="page-content">
                <div class="order-detail">
                    <div class="header" flex="dir:left cross:center main:justify">
                        <div class="order-id">
                            订单编号：{{orderInfo.orderNo}}
                        </div>
                        <div class="state">
                            {{orderInfo.status | stateFilter}}
                        </div>
                    </div>
                    <div class="section">
                        <div class="car">车型：{{orderInfo.carType}}</div>
                        <div class="oil">机油：{{orderInfo.engineOil}}</div>
                        <div class="VIN">VIN：{{orderInfo.vin}}</div>
                        <div class="pay-time">支付时间：{{orderInfo.createDate}}</div>
                        <div class="price">总额：{{orderInfo.orderPrice}}</div>
                    </div>
                    <div class="section">
                        <div class="times">使用次数/总次数：{{orderInfo.useNumber}}/{{orderInfo.allNumber}}</div>
                        <div class="deadline">到期时间：{{orderInfo.expirationDate}}</div>
                    </div>
                    <div class="bottom" flex="dir:left cross:center">
                        使用方法：到店保养前告知服务顾问已购买套餐即可使用
                    </div>
                </div>
                <div class="use-detail">
                    <div class="header">保养使用明细</div>
                    <div class="use-list">
                        <div class="use-item" v-for="(item, index) in useList">
                            <span class="index">{{index+1}}</span>
                            <span class="info">{{item.createDate}}/{{item.storeId}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import NavBar from '../components/NavBar';
    import Tool from '../utils/Tool'
    export default {
        data () {
            return{
                orderInfo:{},
                useList:[],
                popupVisible:true
            }
        },
        components:{
            NavBar,
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
            getOrderDetail:function(id){
                Tool.get('AaPackageOrderDetail',{
                    orderNo:id
                },(data)=>{
                    if(data.code == 200){
                        this.orderInfo = data.data.PackageOrder;
                        this.useList = data.data.PackageOrderDetail;
                    }
                })
            }
        },
        beforeRouteEnter:(to,from,next)=>{
            Tool.routerEnter(to,from,next)
        },
        activated:function(){
            this.getOrderDetail(this.$route.params.id)
        }
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
            position:relative;
            .order-detail{
                background-color:#fff;
                box-shadow:1px solid #efefef;
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
            .use-detail{
                margin-top:0.5rem;
                background-color:#fff;
                .header{
                    height:1.5rem;
                    line-height:1.5rem;
                    font-size:0.67rem;
                    padding:0 3%;
                    border-bottom:1px solid #efefef;
                }
                .use-list{
                    padding:0 3%;
                    .use-item{
                        height:1.5rem;
                        line-height:1.5rem;
                        .index{
                            background-color:#f3464a;
                            color:#fff;
                            padding:0rem 0.25rem;
                            border-radius:0.5rem;
                            margin-right:0.2rem;
                        }
                    }
                    .use-item + div{
                        border-top:1px solid #efefef;
                    }
                }
            }
        }
    }
</style>