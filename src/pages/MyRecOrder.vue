<template>
    <div class="page-container">
        <div class="page rec-page" flex="dir:top box:first">
            <nav-bar
                title="我的推荐订单"
            />
            <div class="page-content" flex="dir:top box:last">
                <div class="rec-content" style="height:100%;">
                    <div class="rec-price">
                        <mt-datetime-picker
                            ref="datepicker"
                            type="date"
                            v-model="pickerV"
                            @confirm="onDateConfirm"
                            month-format="{value}月"
                            date-format="{value}日"
                            :startDate="startDate"
                            :endDate="endDate"
                            >
                        </mt-datetime-picker>
                        <div class="input-control" flex="dir:left box:last" @click="selectTime">
                            <span class="title">{{month}}(成功推荐/总推荐：{{success}}/{{totalCountAll}})</span>
                            <i class="iconfont icon-down" ></i>
                        </div>
                    </div>
                    <div class="order-list-container">
                        <!-- <transition-group :name="animate"> -->
                            <div class="tab-all tabs">
                                <div class="no-goods" flex="dir:top cross:center" v-if="orderList.length == 0">
                                    <i class="iconfont icon-goods"></i>
                                    <span>没有相关订单</span>
                                </div>
                                <scroller refMark='1'>
                                    <div class="order-item" v-for="(item, index) in orderList">
                                        <rec-order-item :item="item"></rec-order-item>
                                    </div>
                                    <div class="load-more" flex="dir:top cross:center" v-if="(pageAll)*pageSize < totalCountAll">
                                        <!-- <div class="start-load" v-tap="loadMoreAll" v-if="allLoad">加载更多</div>
                                        <div flex="dir:left cross:center" v-else="allLoad">加载中<mt-spinner type="fading-circle" :size="12" color="#6b6b6b"></mt-spinner></div> -->
                                    </div>
                                </scroller>
                            </div>
                        <!-- </transition-group> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import NavBar from '../components/NavBar';
    import Tool from '../utils/Tool';
    import { Toast,DatetimePicker  } from 'mint-ui';
    import RecOrderItem  from '../components/RecOrderItem';
    import Scroller from '../components/Scroller';
    export default{
        data () {
            return {
                month:'',
                monthTotal:0,
                message:'',
                orderNo:'',
                orderInfo:{
                    orderPrice:'0'
                },
                pageSize:5,
                orderList:[],
                allLoad:true,
                totalCountAll:0,
                success:0,
                pageAll:1,
            }
        },
        computed:{
            'startDate':function(){
                var now = new Date();
                // if((now.getHours() >= 17 && now.getMinutes()) > 30 || now.getHours() > 17){
                    // var tomorrow = new Date(new Date(Tool.formatDate(now)).getTime() + 25 * 1000 * 60 * 60);
                    // return tomorrow;
                var tomorrow = new Date(new Date(Tool.formatDate(now)).getTime() + 25 * 1000 * 60 * 60);
                return new Date('1970/01/01');
            },
            'pickerV': {
                get: function(){
                    var now = new Date();
                    if((now.getHours() >= 17 && now.getMinutes()) > 30 || now.getHours() > 17){
                        var tomorrow = new Date(new Date(Tool.formatDate(now)).getTime() + 25 * 1000 * 60 * 60);
                        return Tool.formatDate(tomorrow,'time');
                    }
                    return Tool.getCurrentDate('time');
                },
                set: function (newValue) {
                  this.pickerValue = newValue
                }
            },
            'endDate':function(){
                var year = new Date().getFullYear();
                return new Date();
            },
            'startHour':function(){
                return 8;
            },
            'endHour':function(){
                return 18;
            },
        },
        updated:function(){
            // if(this.$children[1] && this.$children[1].$children.length > 0){
            //     for(var i = 0;i < this.$children[1].$children.length;i++){
            //         if(this.$children[1].$children[i].refMark){
            //             this.$children[1].$children[i].mySroller.scrollTo(0,this.$children[1].$children[i].scrollerInfo.y);
            //         }
            //     }
            // }
        },
        methods:{
            selectTime:function(){
                this.$refs.datepicker.open();
                $('.picker-slot.picker-slot-center:eq(2)').css('display','none');
            },
            onDateConfirm:function(val){
                // this.subscribeInfo.time = new Date(val).getTime();
                this.month = Tool.formatDate(val,'time').substring(0,7);
                this.orderQueryAll(this.month);
            },
            orderQueryAll:function(month){
                    // oid:Tool.getUserInfo('oid');
                Tool.get('agentOrder',{
                    oid:Tool.localItem('oid')?Tool.localItem('oid'):Tool.getUserInfo('oid'),
                    date:month,
                },(data)=>{
                    if(data.result == 0){
                        this.orderList = data.data;
                        this.totalCountAll = data.total;
                        this.success = data.success;
                        this.$nextTick(()=>{
                            // this.$children[1].$children[0].mySroller.scrollTo(0,0);
                            // this.$children[1].$children[0].mySroller.y = 0;
                            // this.$children[1].$children[0].scrollerInfo.y = 0;
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
        },
        components:{
            NavBar,
            RecOrderItem,
            Scroller,
        },
        filters:{
            monthFilter:function(val){
                var now = new Date();
                var nowYear = now.getFullYear();
                var nowMonth = now.getMonth()+1;
                if (val.split('-')[0]==nowYear && val.split('-')[1]==nowMonth) {
                    val='本月';
                }
                return val;
            },
        },
        activated:function(){
            this.resetData();
            // if(this.activeTab == 0){
            var now = new Date();
            var nowYear = now.getFullYear();
            var nowMonth = now.getMonth()+1;
            if(Number(nowMonth<10)){
                nowMonth = '0'+nowMonth;
            }
            var benyue = nowYear+'-'+nowMonth;
            this.month = benyue;
            this.orderQueryAll(benyue);
        },
        deactivated:function(){
            this.message = '';
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
            position:relative;
            .rec-price{
                border-bottom: 1px solid #ccc;
                margin-bottom: 0.2rem;
                background-color:#fff;
                .input-control{
                    height:1.5rem;
                    line-height:1.5rem;
                    padding:0 3%;
                    background-color:#fff;
                    color:#444;
                    i{
                        text-align: right;
                    }
                }
            }
            .order-list-container{
                height: 100%;
                overflow: hidden;
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