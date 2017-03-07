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
                <div class="order-list-container">
                    <div class="order-list">
                        <div class="order-item" v-for="(item, index) in orderList">
                            <order-item :item="item"></order-item>
                        </div>
                        <div class="load-more" @click="loadMore" v-if="(page)*pageSize < totalCount">
                            加载更多。。。
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import NavBar from '../components/NavBar';
    import OrderItem  from '../components/OrderItem';
    import Tool from '../utils/Tool';
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
                orderList:[],
                activeTab:0,
                totalCount:0,
                page:1,
                pageSize:5,
            }
        },
        components:{
            NavBar,
            OrderItem
        },
        methods:{
            orderQuery:function(){
                Tool.get('AaPackageOrderQuery',{
                    userId:1,
                    status:'',
                    page:this.page,
                    pageSize:this.pageSize,
                },(data)=>{
                    this.orderList = data.data.data;
                    this.totalCount = data.data.totalCount;
                })
            },
            loadMore:function(){
                var self = this;
                self.page ++;
                self.totalCount = 1000000;//保证加载更多在加载完成前一直显示
            }
        },
        activated:function(){
            this.orderQuery();
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
            .order-list-container{
                overflow:auto;
                .order-list{
                    .order-item{
                        background-color:#fff;
                        padding:0.4rem 5%;
                        margin-bottom:0.5rem;
                        box-shadow:0px 1px 2px #ccc;
                    }
                    .load-more{
                        height:1.5rem;
                        background-color:#fff;
                        text-align:center;
                        line-height:1.5rem;
                    }
                }
            }
        }
    }
</style>