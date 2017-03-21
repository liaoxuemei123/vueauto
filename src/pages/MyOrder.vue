<template>
    <div class="page-container">
        <div class="page myorder-page" flex="dir:top box:first">
            <nav-bar
                title="我的订单"
                :goBack="customBack.bind(this)"
            />
            <div class="page-content" flex="dir:top box:first">
                <div class="tab">
                    <div class="tab-container">
                        <div class="tab-item-container" flex="dir:left box:mean">
                            <div class="tab-item" @click="activeTab = index" v-for="(item, index) in tabs" flex="dir:left cross:center main:center" :class="{'active':index==activeTab}">
                                {{item.label}}
                            </div>
                        </div>
                        <div class="after" :style="{'left':( activeTab * 33 ) + 7 + '%'}"></div>
                    </div>
                </div>
                <div class="order-list-container">
                    <transition :name="animate">
                        <div class="tab-all tabs" key="all" v-if="activeTab == 0">
                            <div class="order-list">
                                <div class="order-item" v-for="(item, index) in orderList">
                                    <order-item :item="item"></order-item>
                                </div>
                                <div class="load-more" @click="loadMoreAll" v-if="(pageAll)*pageSize < totalCountAll">
                                    加载更多。。。
                                </div>
                            </div>
                        </div>
                        <div class="tab-unpaid tabs" key="unpaid" v-if="activeTab == 1">
                            <div class="order-list">
                                <div class="order-item" v-for="(item, index) in unpaidList">
                                    <order-item :item="item"></order-item>
                                </div>
                                <div class="load-more" @click="loadMoreUnpaid" v-if="(pageUnpaid)*pageSize < totalCountUnpaid">
                                    加载更多。。。
                                </div>
                            </div>
                        </div>
                        <div class="tab-paid tabs" key="paid" v-if="activeTab == 2">
                            <div class="order-list">
                                <div class="order-item" v-for="(item, index) in paidList">
                                    <order-item :item="item"></order-item>
                                </div>
                                <div class="load-more" @click="loadMorePaid" v-if="(pagePaid)*pageSize < totalCountPaid">
                                    加载更多。。。
                                </div>
                            </div>
                        </div>
                        <div class="tab-unevaluate tabs" key="unevaluate" v-if="activeTab == 3">
                            <div class="order-list">
                                <div class="order-item" v-for="(item, index) in unevalList">
                                    <order-item :item="item"></order-item>
                                </div>
                                <div class="load-more" @click="loadMoreUnEval" v-if="(pageUnEval)*pageSize < totalCountUnEval">
                                    加载更多。。。
                                </div>
                            </div>
                        </div>
                    </transition>
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
                    {value:1, label:'待支付'},
                    {value:2, label:'已支付'},
                ],
                orderList:[],
                unpaidList:[],
                paidList:[],
                unevalList:[],
                activeTab:0,
                totalCountAll:0,
                totalCountUnpaid:0,
                totalCountPaid:0,
                totalCountUnEval:0,
                pageAll:1,
                pageUnpaid:1,
                pagePaid:1,
                pageUnEval:1,
                pageSize:5,
                animate:'left',
            }
        },
        components:{
            NavBar,
            OrderItem
        },
        watch:{
            'activeTab':function(newdata,old){
                if(newdata >old){
                    this.animate = 'left'
                }else{
                    this.animate = 'right'
                }
                switch(newdata){
                    case 1:
                        if(this.unpaidList.length<1){
                            this.pageUnpaid = 1;
                            this.totalCountUnpaid = 0;
                            this.orderQueryUnPaid();
                        }
                        break;
                    case 2:
                        if(this.paidList.length<1){
                            this.pagePaid = 1;
                            this.totalCountPaid = 0;
                            this.orderQueryPaid();
                        }
                        break;
                    case 3:
                        if(this.unevalList.length<1){
                            this.pageUnEval = 1;
                            this.totalCountUnEval = 0;
                            this.orderQueryUnEval();
                        }
                        break;
                    case 0:
                        if(this.orderList.length<1){
                            this.pageAll = 1;
                            this.totalCountAll = 0;
                            this.orderQueryAll();
                        }
                        break;
                }
            }
        },
        methods:{
            orderQueryAll:function(){
                Tool.get('AaPackageOrderQuery',{
                    userId:Tool.getUserInfo('userId'),
                    status:'',
                    page:this.pageAll,
                    pageSize:this.pageSize,
                },(data)=>{
                    this.orderList = data.data.data;
                    this.totalCountAll = data.data.totalCount;
                })
            },
            orderQueryUnPaid:function(){
                Tool.get('AaPackageOrderQuery',{
                    userId:Tool.getUserInfo('userId'),
                    status:'1',
                    page:this.pageUnpaid,
                    pageSize:this.pageSize,
                },(data)=>{
                    this.unpaidList = data.data.data;
                    this.totalCountUnpaid = data.data.totalCount;
                })
            },
            orderQueryPaid:function(){
                Tool.get('AaPackageOrderQuery',{
                    userId:Tool.getUserInfo('userId'),
                    status:'2',
                    page:this.pagePaid,
                    pageSize:this.pageSize,
                },(data)=>{
                    this.paidList = data.data.data;
                    this.totalCountPaid = data.data.totalCount;
                })
            },
            orderQueryUnEval:function(){
                Tool.get('AaPackageOrderQuery',{
                    userId:Tool.getUserInfo('userId'),
                    status:'3',
                    page:this.pageUnEval,
                    pageSize:this.pageSize,
                },(data)=>{
                    this.unevalList = data.data.data;
                    this.totalCountUnEval = data.data.totalCount;
                })
            },
            loadMoreAll:function(){
                var self = this;
                self.pageAll ++;
                self.totalCountAll = 1000000;//保证加载更多在加载完成前一直显示
                Tool.get('AaPackageOrderQuery',{
                    userId:Tool.getUserInfo('userId'),
                    status:'',
                    page:this.pageAll,
                    pageSize:this.pageSize,
                },(data)=>{
                    this.orderList = this.orderList.concat(data.data.data);
                    this.totalCountAll = data.data.totalCount;
                })
            },
            loadMoreUnpaid:function(){
                var self = this;
                self.pageUnpaid ++;
                self.totalCountUnpaid = 1000000;//保证加载更多在加载完成前一直显示
                Tool.get('AaPackageOrderQuery',{
                    userId:Tool.getUserInfo('userId'),
                    status:1,
                    page:this.pageUnpaid,
                    pageSize:this.pageSize,
                },(data)=>{
                    this.unpaidList = this.unpaidList.concat(data.data.data);
                    this.totalCountUnpaid = data.data.totalCount;
                })
            },
            loadMorePaid:function(){
                var self = this;
                self.pagePaid ++;
                self.totalCountPaid = 1000000;//保证加载更多在加载完成前一直显示
                Tool.get('AaPackageOrderQuery',{
                    userId:Tool.getUserInfo('userId'),
                    status:2,
                    page:this.pagePaid,
                    pageSize:this.pageSize,
                },(data)=>{
                    this.paidList = this.paidList.concat(data.data.data);
                    this.totalCountPaid = data.data.totalCount;
                })
            },
            loadMoreUnEval:function(){
                var self = this;
                self.pageUnEval ++;
                self.totalCountUnEval = 1000000;//保证加载更多在加载完成前一直显示
                Tool.get('AaPackageOrderQuery',{
                    userId:Tool.getUserInfo('userId'),
                    status:3,
                    page:this.pageUnEval,
                    pageSize:this.pageSize,
                },(data)=>{
                    this.unevalList = this.unevalList.concat(data.data.data);
                    this.totalCountUnEval = data.data.totalCount;
                })
            },
            customBack:function(){
                var prepage = this.$store.getters.prepage;
                if(!prepage || prepage.name != 'maintainset'){//这里的逻辑智能保证按正常的后退键管用。
                    this.$store.commit('INSERT_PAGE',{path:'/maintainset',index:0,name:'maintainset'});
                    this.$router.push({name:'maintainset'})
                }else{
                    this.$router.back();
                }
            },
            resetData:function(){
                this.orderList = [];
                this.unpaidList = [];
                this.paidList = [];
                this.unevalList = [];
                this.totalCountAll = 0;
                this.totalCountUnpaid = 0;
                this.totalCountPaid = 0;
                this.totalCountUnEval = 0;
                this.pageAll = 1;
                this.pageUnpaid = 1;
                this.pagePaid = 1;
                this.pageUnEval = 1;
            },
        },
        activated:function(){
            if(this.activeTab == 0){
                this.orderQueryAll();
            }else if(this.activeTab == 1){
                this.orderQueryUnPaid();
            }else{
                this.orderQueryPaid();
            }
            this.resetData();
        },
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
            position:relative;
            .tab{
                background-color:#fff;
                padding:0rem 1rem;
                border-bottom: 1px solid #ccc;
                margin-bottom:0.2rem;
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
                    width:20%;
                    height:2px;
                    background-color:#379df2;
                    position:absolute;
                    bottom:0;
                    transition:all .3s ease;
                }
            }
            .order-list-container{
                overflow:auto;
                position:relative;
                .tabs{
                    position:absolute;
                    width:100%;
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
    }
</style>