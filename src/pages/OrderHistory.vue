<template>
    <div class="page-container">
        <div class="page order-history-page" flex="dir:top box:first">
            <nav-bar
                title="预约历史"
            />
            <div class="page-content"  flex="dir:top box:first">
                <div class="state-list">
                    <div class="state-container">
                        <div class="state-item-container" flex="dir:left box:mean cross:center">
                            <div class="list-item" :class="{'active':activeState == item.value}" v-for="item in state" @click="filterOrder(item.value)">
                                {{item.label}}
                            </div>
                        </div>
                        <div class="after" :style="{'left':((activeState + 1) > 3 ? 0 : (activeState + 1)) * 25 + 3 + '%' }"></div>
                    </div>
                </div>
                <div class="history-list">
                    <div class="history-item" v-for="(item,index) in history">
                        <div class="title" flex="dir:left cross:center main:justify">
                            <div class="order-num">
                                预约编号：{{item.reservationNo}}
                            </div>
                            <div class="state">
                                {{item.confirm | stateFilter}}
                            </div>
                        </div>
                        <div class="content">
                            <div class="plate">
                                车牌号：{{item.carNumber}}
                            </div>
                            <div class="plate">
                                预约服务门店：{{item.storeName}}
                            </div>
                            <div class="plate">
                                服务门店电话：<a :href="'tel:'+item.storeTel">{{item.storeTel}}</a> 
                            </div>
                            <div class="plate">
                                申请时间：{{item.reservationCreateDate}}
                            </div>
                            <div class="plate">
                                到店时间：{{item.reservationDate}}
                            </div>
                            <div class="plate">
                                里程：{{item.mileage}}
                            </div>
                            <div class="plate">
                                联系人：{{item.linkman}}{{'/' + item.mobilePhone}}
                            </div>
                            <div class="plate">
                                预约描述：{{item.describe}}
                            </div>
                            <div class="plate" v-if="item.confirm != 'N'">
                                备注：如因特殊原因无法按时到店，请提前告知服务门店
                            </div>
                        </div>
                    </div>
                    <div class="load-more" @click="loadMore" v-if="(page)*pageSize < totalCount">
                        加载更多。。。
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import NavBar from '../components/NavBar';
    import Tool from '../utils/Tool';
    export default {
        data () {
            return {
                history:[],
                state:[
                    {
                        value:3,
                        label:'全部',
                    },{
                        value:0,
                        label:'已提交',
                    },{
                        value:1,
                        label:'通过',
                    },{
                        value:2,
                        label:'未通过',
                    }
                ],
                activeState:3,
                totalCount:0,
                page:1,
                pageSize:5,
                reservationState:'',
                mobile:'',
            }
        },
        components:{
            NavBar
        },
        methods:{
            getHistory:function(){
                var self = this;
                Tool.get('ReservationOrderQuery',{
                    userId:this.mobile,
                    pageSize:self.pageSize,
                    page:self.page,
                    reservationState:self.reservationState
                },(data) => {
                    self.history = data.data.data;
                    self.totalCount = data.data.totalCount;
                })
            },
            filterOrder:function(index){
                this.activeState = index;
                this.page = 1;
                if(index == 3){
                    this.reservationState = '';
                }else{
                    this.reservationState = index;
                }
                this.getHistory();
            },
            loadMore:function(){
                var self = this;
                self.page ++;
                self.totalCount = 1000000;//保证加载更多在加载完成前一直显示
                Tool.get('ReservationOrderQuery',{
                    userId:this.mobile,
                    pageSize:self.pageSize,
                    page:self.page,
                    reservationState:self.reservationState
                },(data) => {
                    self.history = self.history.concat(data.data.data);
                    self.totalCount = data.data.totalCount;
                })
            }
        },
        activated:function(){
            if(Tool.localItem('userCache')){
                this.mobile = JSON.parse(Tool.localItem('userCache')).mobile;
                this.getHistory();
            }
        },
        filters:{
            stateFilter:function(val){
                switch(val){
                    case 'Y':
                        return '通过';
                    case 'N':
                        return '未通过';
                    default:
                        return '已提交';
                }
            }
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
            .state-list{
                height:1.9rem;
                background-color:#fff;
                padding:0 3%;
                margin-bottom:2px;
                .state-container{
                    position:relative;
                    .after{
                        position:absolute;
                        width:18%;
                        height:2px;
                        background-color:#379df2;
                        bottom:0rem;
                        transition:all .3s ease;
                    }
                    .list-item{
                        height:1.9rem;
                        line-height:1.9rem;
                        text-align:center;
                        font-size:0.67rem;
                        color:#000;
                    }
                    .list-item.active{
                        color:#379df2;
                    }
                }
            }
            .history-list{
                overflow: auto;
                .history-item{
                    background-color:#fff;
                    margin-bottom:0.5rem;
                    box-shadow:0px 1px 3px #ccc;
                    .title{
                        padding:0 3%;
                        height:1.5rem;
                        border-bottom:1px solid #efefef;
                        font-size:0.67rem;
                        font-weight:bold;
                        .state{
                            color:#ef4649;
                            font-weight:normal;
                            font-size:0.58rem;
                        }
                    }
                    .content{
                        padding:0.5rem 3%;
                        line-height:1.4em;
                    }
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
</style>