<template>
    <div class="page-container">
        <div class="page myorder-page" flex="dir:top box:first">
            <nav-bar
                title="我的订单"
                :goBack="customBack.bind(this)"
                v-show="!hasToken"
            />
            <div class="page-content" flex="dir:top box:first">
                <div class="tab">
                    <div class="tab-container">
                        <div class="tab-item-container" flex="dir:left box:mean">
                            <div class="tab-item" @click="activeTab = index" v-for="(item, index) in tabs" flex="dir:left cross:center main:center" :class="{'active':index==activeTab}">
                                <span>
                                    {{item.label}}
                                    <span v-if="item.value == 1 &&  orderUnPayCount > 0" class="unpay-order">{{orderUnPayCount > 9 ? orderUnPayCount : orderUnPayCount}}</span>
                                </span>
                            </div>
                        </div>
                        <div class="after" :style="{'left':( activeTab * 25 ) + 4 + '%'}"></div>
                    </div>
                </div>
                <div class="order-list-container">
                    <transition-group :name="animate">
                        <div class="tab-all tabs" key="all" v-show="activeTab == 0">
                            <div class="no-goods" flex="dir:top cross:center" v-if="orderList.length == 0">
                                <i class="iconfont icon-goods"></i>
                                <span>没有相关订单</span>
                            </div>
                            <scroller refMark='0'>
                                <div class="order-item" v-for="(item, index) in orderList">
                                    <order-item :item="item"></order-item>
                                </div>
                                <div class="load-more" flex="dir:top cross:center" v-if="(pageAll)*pageSize < totalCountAll">
                                    <div class="start-load" v-tap="loadMoreAll" v-if="allLoad">加载更多</div>
                                    <div flex="dir:left cross:center" v-else="allLoad">加载中<mt-spinner type="fading-circle" :size="12" color="#6b6b6b"></mt-spinner></div>
                                </div>
                            </scroller>
                        </div>
                        <div class="tab-unpaid tabs" key="unpaid" v-show="activeTab == 1">
                            <div class="no-goods" flex="dir:top cross:center" v-if="unpaidList.length == 0">
                                <i class="iconfont icon-goods"></i>
                                <span>没有相关订单</span>
                            </div>
                            <scroller refMark='1'>
                                <div class="order-item" v-for="(item, index) in unpaidList">
                                    <order-item :item="item"></order-item>
                                </div>
                                <div class="load-more" flex="dir:top cross:center" v-if="(pageUnpaid)*pageSize < totalCountUnpaid">
                                    <div class="start-load" v-tap="loadMoreUnpaid" v-if="unpaidLoad">加载更多</div>
                                    <div flex="dir:left cross:center" v-else="unpaidLoad">加载中<mt-spinner type="fading-circle" :size="12" color="#6b6b6b"></mt-spinner></div>
                                </div>
                            </scroller>
                        </div>
                        <div class="tab-paid tabs" key="paid" v-show="activeTab == 2">
                            <div class="no-goods" flex="dir:top cross:center" v-if="paidList.length == 0">
                                <i class="iconfont icon-goods"></i>
                                <span>没有相关订单</span>
                            </div>
                            <scroller refMark='2'>
                                <div class="order-item" v-for="(item, index) in paidList">
                                    <order-item :item="item"></order-item>
                                </div>
                                <div class="load-more" flex="dir:top cross:center" v-if="(pagePaid)*pageSize < totalCountPaid">
                                    <div class="start-load" v-tap="loadMorePaid" v-if="paidLoad">加载更多</div>
                                    <div flex="dir:left cross:center" v-else="paidLoad">加载中<mt-spinner type="fading-circle" :size="12" color="#6b6b6b"></mt-spinner></div>
                                </div>
                            </scroller>
                        </div>
                        <div class="tab-refund tabs" key="refund" v-show="activeTab == 3">
                            <div class="no-goods" flex="dir:top cross:center" v-if="refundList.length == 0">
                                <i class="iconfont icon-goods"></i>
                                <span>没有相关订单</span>
                            </div>
                            <scroller refMark='3'>
                                <div class="order-item" v-for="(item, index) in refundList">
                                    <order-item :item="item"></order-item>
                                </div>
                                <div class="load-more" flex="dir:top cross:center main:center" v-if="(pageRefund)*pageSize < totalCountRefund">
                                    <div class="start-load" v-tap="loadMoreRefund" v-if="refundLoad">加载更多</div>
                                    <div flex="dir:left cross:center" v-else="refundLoad">加载中<mt-spinner type="fading-circle" :size="12" color="#6b6b6b"></mt-spinner></div>
                                </div>
                            </scroller>
                        </div>
                    </transition-group>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import NavBar from '../components/NavBar';
    import OrderItem  from '../components/OrderItem';
    import Tool from '../utils/Tool';
    import Scroller from '../components/Scroller';
    import { Toast } from 'mint-ui';
    import { mapState, mapMutations } from 'vuex';
    import store from '../model';
    export default {
        data () {
            return {
                hasToken: false,
                tabs:[
                    {value:0, label:'全部'},
                    {value:1, label:'待支付'},
                    {value:2, label:'已支付'},
                    {value:3, label:'退款'},
                ],
                orderList:[],
                unpaidList:[],
                paidList:[],
                refundList:[],
                activeTab:0,
                totalCountAll:0,
                totalCountUnpaid:0,
                totalCountPaid:0,
                totalCountRefund:0,
                pageAll:1,
                pageUnpaid:1,
                pagePaid:1,
                pageRefund:1,
                allLoad:true,
                unpaidLoad:true,
                paidLoad:true,
                refundLoad:true,
                pageSize:5,
                animate:'left',
            }
        },
        components:{
            NavBar,
            OrderItem,
            Scroller
        },
        computed:{
            ...mapState({
                orderUnPayCount: ({
                    mixin
                }) => mixin.orderUnPayCount,
            })
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
                        if(this.refundList.length<1){
                            this.pageRefund = 1;
                            this.totalCountRefund = 0;
                            this.orderQueryRefund();
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
                    if(data.code == 200){
                        this.orderList = data.data.data;
                        this.totalCountAll = data.data.totalCount;
                        this.$nextTick(()=>{
                            this.$children[1].$children[0].mySroller.scrollTo(0,0);
                            this.$children[1].$children[0].mySroller.y = 0;
                            this.$children[1].$children[0].scrollerInfo.y = 0;
                        })
                    }else{
                        Toast({
                            duration:1000,
                            message:data.msg,
                        })
                    }
                })
            },
            orderQueryUnPaid:function(){
                Tool.get('AaPackageOrderQuery',{
                    userId:Tool.getUserInfo('userId'),
                    status:'1',
                    page:this.pageUnpaid,
                    pageSize:this.pageSize,
                },(data)=>{
                    if(data.code == 200){
                        this.unpaidList = data.data.data;
                        this.totalCountUnpaid = data.data.totalCount;
                        this.setOrderUnPayCount(0);
                        Tool.localItem('orderUnPay',{
                            count: 0,
                            lastUpdateTime: new Date()
                        })
                        this.$nextTick(()=>{
                            this.$children[1].$children[1].mySroller.scrollTo(0,0);
                            this.$children[1].$children[1].mySroller.y = 0;
                            this.$children[1].$children[1].scrollerInfo.y = 0;
                        })
                    }else{
                        Toast({
                            duration:1000,
                            message:data.msg,
                        })
                    }
                })
            },
            orderQueryPaid:function(){
                Tool.get('AaPackageOrderQuery',{
                    userId:Tool.getUserInfo('userId'),
                    status:'2',
                    page:this.pagePaid,
                    pageSize:this.pageSize,
                },(data)=>{
                    if(data.code == 200){
                        this.paidList = data.data.data;
                        this.totalCountPaid = data.data.totalCount;
                        this.$nextTick(()=>{
                            this.$children[1].$children[2].mySroller.scrollTo(0,0);
                            this.$children[1].$children[2].mySroller.y = 0;
                            this.$children[1].$children[2].scrollerInfo.y = 0;
                        })
                    }else{
                        Toast({
                            duration:1000,
                            message:data.msg,
                        })  
                    }
                })
            },
            orderQueryRefund:function(){
                Tool.get('AaPackageOrderQuery',{
                    userId:Tool.getUserInfo('userId'),
                    status:'3',
                    page:this.pageRefund,
                    pageSize:this.pageSize,
                },(data)=>{
                    if(data.code == 200){
                        this.refundList = data.data.data;
                        this.totalCountRefund = data.data.totalCount;
                        this.$nextTick(()=>{
                            this.$children[1].$children[3].mySroller.scrollTo(0,0);
                            this.$children[1].$children[3].mySroller.y = 0;
                            this.$children[1].$children[3].scrollerInfo.y = 0;
                        })
                    }else{
                        Toast({
                            duration:1000,
                            message:data.msg,
                        })  
                    }
                })
            },
            loadMoreAll:function(){
                var self = this;
                self.pageAll ++;
                self.totalCountAll = 1000000;//保证加载更多在加载完成前一直显示
                self.allLoad = false;
                Tool.get('AaPackageOrderQuery',{
                    userId:Tool.getUserInfo('userId'),
                    status:'',
                    page:this.pageAll,
                    pageSize:this.pageSize,
                },(data)=>{
                    if(data.code == 200){
                        this.orderList = this.orderList.concat(data.data.data);
                        this.totalCountAll = data.data.totalCount;
                        self.allLoad = true;
                    }else{
                        Toast({
                            duration:1000,
                            message:data.msg,
                        })  
                    }
                },{mask:false})
            },
            loadMoreUnpaid:function(){
                var self = this;
                self.pageUnpaid ++;
                self.totalCountUnpaid = 1000000;//保证加载更多在加载完成前一直显示
                self.unpaidLoad = false;
                Tool.get('AaPackageOrderQuery',{
                    userId:Tool.getUserInfo('userId'),
                    status:1,
                    page:this.pageUnpaid,
                    pageSize:this.pageSize,
                },(data)=>{
                    if(data.code == 200){
                        this.unpaidList = this.unpaidList.concat(data.data.data);
                        this.totalCountUnpaid = data.data.totalCount;
                        self.unpaidLoad = true;
                    }else{
                        Toast({
                            duration:1000,
                            message:data.msg,
                        })  
                    }
                },{mask:false})
            },
            loadMorePaid:function(){
                var self = this;
                self.pagePaid ++;
                self.totalCountPaid = 1000000;//保证加载更多在加载完成前一直显示
                self.paidLoad = false;
                Tool.get('AaPackageOrderQuery',{
                    userId:Tool.getUserInfo('userId'),
                    status:2,
                    page:this.pagePaid,
                    pageSize:this.pageSize,
                },(data)=>{
                    if(data.code == 200){
                        this.paidList = this.paidList.concat(data.data.data);
                        this.totalCountPaid = data.data.totalCount;
                        self.paidLoad = true;
                    }else{
                        Toast({
                            duration:1000,
                            message:data.msg,
                        })  
                    }
                },{mask:false})
            },
            loadMoreRefund:function(){
                var self = this;
                self.pageRefund ++;
                self.totalCountRefund = 1000000;//保证加载更多在加载完成前一直显示
                self.refundLoad = false;
                Tool.get('AaPackageOrderQuery',{
                    userId:Tool.getUserInfo('userId'),
                    status:3,
                    page:this.pageRefund,
                    pageSize:this.pageSize,
                },(data)=>{
                    if(data.code == 200){
                        this.refundList = this.refundList.concat(data.data.data);
                        this.totalCountRefund = data.data.totalCount;
                        self.refundLoad = true;
                    }else{
                        Toast({
                            duration:1000,
                            message:data.msg,
                        })  
                    }
                },{mask:false})
            },
            customBack:function(){
                var prepage = this.$store.getters.prepage;
                if (this.$route.query.token) {
                    this.$router.go(-2);
                }
                else if(!prepage || (prepage.name != 'maintainset' && prepage.name != 'usercenter')){//这里的逻辑智能保证按正常的后退键管用。
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
                this.refundList = [];
                this.totalCountAll = 0;
                this.totalCountUnpaid = 0;
                this.totalCountPaid = 0;
                this.totalCountRefund = 0;
                this.pageAll = 1;
                this.pageUnpaid = 1;
                this.pagePaid = 1;
                this.pageRefund = 1;
            },
            ...mapMutations({
                setOrderUnPayCount: 'UPDATE_ORDERCOUNT'
            })
        },
        updated:function(){
            if(this.$children[1] && this.$children[1].$children.length > 0){
                for(var i = 0;i < this.$children[1].$children.length;i++){
                    if(this.$children[1].$children[i].refMark == this.activeTab){
                        this.$children[1].$children[i].mySroller.scrollTo(0,this.$children[1].$children[i].scrollerInfo.y);
                    }
                }
            }
        },
        activated:function(){
            if (this.$route.query.token) {
                this.hasToken = true;
            }
            else {
                this.hasToken = false;
            }
            this.resetData();
            if(this.activeTab == 0){
                this.orderQueryAll();
            }else if(this.activeTab == 1){
                this.orderQueryUnPaid();
            }else if(this.activeTab == 2){
                this.orderQueryPaid();
            }else{
                this.orderQueryRefund();
            }
        },
        beforeRouteEnter:(to,from,next)=>{
            if (to.query.token) {
                if (from.name == 'orderpay' || from.name == 'orderdetail') {
                    next();
                }
                else {
                    // Tool.removeLocalItem('userData');
                    // Tool.removeLocalItem('userInfo');
                    
                    var preCtoken = to.query.token;
                    Tool.localItem('fromOuterPage',preCtoken);
                    Tool.get('queryUserInfo',{
                        userToken:preCtoken
                    },(data) => {
                        if(data.result != -1){
                            var userInfo = data.data;
                            userInfo.token = data.data.token;
                            Tool.localItem('userInfo',userInfo);
                            next();
                        }else{
                            Toast({
                                message:"用户登录过期了",
                                duration:1000,
                            })
                            store.commit('POP_PAGE',1);//在进入login之前把已进栈但是没有被访问的页面清理出栈\
                            next({name:'login',params:{to:to.path,preCtoken:'true'}});
                            // next({name:'login'});
                        }
                    });
                }
            }
            else {
                Tool.removeLocalItem('fromOuterPage');
                Tool.routerEnter(to,from,next)
            }
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
                        .tab-item{
                            span{
                                position:relative;
                                .unpay-order{
                                    position:absolute;
                                    color:#fff;
                                    background-color:#ed3f14;
                                    line-height:1.3em;
                                    padding:0 0.3em;
                                    right:-0.3rem;
                                    top:-0.3rem;
                                    border-radius:1.2em;
                                    font-size:0.47rem;
                                }
                            }
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
                overflow:hidden;
                position:relative;
                .tabs{
                    position:absolute;
                    width:100%;
                    height:100%;
                    .no-goods{
                        margin-top:2rem;
                        width:100%;
                        overflow:auto;
                        .iconfont{
                            font-size:2.5rem;
                            color:#ccc;
                        }
                        span{
                            height:2rem;
                            line-height:2rem;
                            font-size:0.7rem;
                            color:#aaa;
                        }
                    }
                    .order-item{
                        background-color:#fff;
                        padding:0.4rem 3%;
                        margin-bottom:0.5rem;
                        box-shadow:0px 1px 2px #ccc;
                    }
                    .load-more{
                        height:1.5rem;
                        background-color:#fff;
                        line-height:1.5rem;
                        .start-load{
                            width:100%;
                            text-align:center
                        }
                    }
                }
            }
        }
    }
</style>