<template>
    <div class="page-container">
        <div class="page myorder-page" flex="dir:top box:first">
            <nav-bar
                title="我的订单"
            />
            <div class="page-content" flex="dir:top box:first">
                <div class="tab">
                    <div class="tab-container">
                        <div class="tab-item-container" flex="dir:left box:mean">
                            <div class="tab-item" @click="activeTab = index" v-for="(item, index) in tabs" flex="dir:left cross:center main:center" :class="{'active':index==activeTab}">
                                {{item.label}}
                            </div>
                        </div>
                        <div class="after" :style="{'left':( activeTab * 20 ) + 2 + '%'}"></div>
                    </div>
                </div>
                <div class="order-list">
                    <div class="order-item" v-for="(item, index) in orderList">
                        <order-item :item="item"></order-item>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import NavBar from '../components/NavBar'
    import OrderItem  from '../components/OrderItem'
    export default {
        data () {
            return {
                tabs:[
                    {value:0, label:'全部'},
                    {value:1, label:'已支付'},
                    {value:2, label:'待支付'},
                    {value:3, label:'已退单'},
                    {value:4, label:'待评价'}
                ],
                orderList:[
                    {
                        orderId:1,
                        state:1,
                        carSeries:'悦翔V7',
                        time:'2017-02-27',
                        price:100,
                    },
                    {
                        orderId:2,
                        state:2,
                        carSeries:'悦翔V7',
                        time:'2017-02-28',
                        price:190,
                    },
                ],
                activeTab:0,
            }
        },
        components:{
            NavBar,
            OrderItem
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
            .tab{
                background-color:#fff;
                padding:0rem 1rem;
                border-bottom: 1px solid #ccc;
                .tab-container{
                    height:1.7rem;
                    position:relative;
                    .tab-item-container{
                        height:100%;
                        .tab-item.active{
                            color:#379df2;
                        }
                    }
                }
                .tab-container .after{
                    display:block;
                    width:16%;
                    height:2px;
                    background-color:#379df2;
                    position:absolute;
                    bottom:0;
                    transition:all .3s ease;
                }
            }
            .order-list{
                .order-item{
                    background-color:#fff;
                    padding:0.4rem 5%;
                    margin-bottom:0.5rem;
                    box-shadow:0px 1px 2px #ccc;
                }
            }
        }
    }
</style>