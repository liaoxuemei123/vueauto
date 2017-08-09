<template>
    <div class="page-container">
        <div class="order-detail-page page" flex="dir:top box:first">
            <nav-bar
                title="订单详情"
                :goBack="customBack.bind(this)"
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
                    <div class="section dsjzs" v-if="orderInfo.status == 2">
                        <a :href="'http://mss.mall.changan.com.cn:81/jeecms/eoeLuckDraw/main/index.html?orderId='+orderInfo.orderNo+'&token='+token">参加抽奖</a>
                    </div>
                    <div class="section">
                        <div class="car">车型：{{orderInfo.carType}}</div>
                        <div class="oil">机油：{{orderInfo.engineOil}}</div>
                        <div class="VIN">VIN：{{orderInfo.vin}}</div>
                        <div class="pay-time" v-if='orderInfo.status == 2'>支付时间：{{orderInfo.payDate}}</div>
                    </div>
                    <div class="section" v-if="orderInfo.status == 2 || orderInfo.status == 1">
                        <div class="times" v-if="orderInfo.status == 2">使用次数/总次数：{{orderInfo.useNumber}}/{{orderInfo.allNumber}}</div>
                        <div class="package-item">保养项目：{{orderInfo.wbpByxm}}</div>
                        <div class="rangs">使用范围：{{orderInfo.storeName | storeNameFilter}}</div>
                        <div class="deadline">
                            <span>到期时间：{{orderInfo.expirationDate | expirationFilter}}</span>
                        </div>
                        <div class="user-phone">电话号码：{{orderInfo.phone}}</div>
                        <div class="price">总额：{{orderInfo.orderPrice | priceFilter}}</div>
                    </div>
                    <div class="bottom" flex="dir:left cross:center" v-if="orderInfo.status == 2">
                        使用方法：到店保养前告知服务顾问已购买套餐即可使用
                    </div>
                </div>
                <div class="use-detail" v-if="orderInfo.status == 2">
                    <div class="header">保养使用明细</div>
                    <div class="use-list">
                        <div class="use-item" v-for="(item, index) in useList">
                            <div class="line" flex="dir:left cross:center main:justify">
                                <div>
                                    <span class="index">{{index+1}}</span>
                                    <span class="info">使用时间:{{item.createDate}}</span>
                                </div>
                                <span class="evaluate" @click="goEvaluateDetail(index)" v-if="item.isEvaluate == 1">查看评价</span>
                                <span class="evaluate" @click="goEvaluate(index)" v-else="item.isEvaluate == 1">去评价</span>
                            </div>
                            <div class="line" flex="dir:left cross:center main:justify">
                                <div>
                                    <span class="label">使用服务门店:</span>
                                    <span class="value">{{item.storeName || '未知'}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="no-record" v-if="useList.length == 0">
                        当前无保养
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import NavBar from '../components/NavBar';
    import Tool from '../utils/Tool';
    import { mapState, mapMutations } from 'vuex';
    export default {
        data () {
            return{
                orderInfo: {},
                useList: [],
                popupVisible: true,
                token:''
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
                        return "退款中";
                        break;
                    case 4:
                        return "退款失败";
                        break;
                    case 5:
                        return "退款成功";
                        break;
                }
            },
            timeFilter:function(val){
                return Tool.formatDate(val,'fulltime');
            },
            expirationFilter:function(val){
                return val.substring(0,10) + ' 18:00:00';
            },
            storeNameFilter:function(val){
                if(val == '全国通用')
                    return '全国'
                return val;
            },
            priceFilter:function(val){
                val = (val-0).toFixed(2);
                return `￥${val}`;
            }
        },
        methods:{
            getOrderDetail:function(id){
                Tool.get('AaPackageOrderDetail',{
                    orderNo:id
                },(data)=>{
                    if(data.code == 200){
                        this.orderInfo = data.data.PackageOrder;
                        this.orderInfo.wbpByxm = data.data.Package.wbpByxm;
                        this.useList = data.data.PackageOrderDetail;
                    }
                })
            },
            goEvaluate:function(index){
                this.$router.push({name:'evaluate',query:{
                    orderNo:this.useList[index].orderNo,
                    storeId:this.useList[index].dmsId,
                    vehicleModel:this.orderInfo.carType,
                    orderDetailId:this.useList[index].id,
                }});
            },
            goEvaluateDetail:function(index){
                this.$router.push({name:'evaluatedetail',query:{
                    orderNo:this.useList[index].orderNo,
                    storeId:this.useList[index].dmsId,
                    vehicleModel:this.orderInfo.carType,
                    id:this.useList[index].id,
                }})
            },
            customBack:function(){
                var prepage = this.$store.getters.prepage;
                if(!prepage || prepage.name != 'myorder'){
                    this.$store.commit('INSERT_PAGE',{path:'/myorder',index:prepage?prepage.index+1:1,name:'myorder'});
                    this.$router.push({name:'myorder'})
                }else{
                    this.$router.back();
                }
            },
            ...mapMutations({
                setQd:'SET_QD',
            })
        },
        beforeRouteEnter:(to,from,next)=>{
            Tool.routerEnter(to,from,next);
        },
        created:function(){
            const qd = this.$route.query.wbyQd;
            if(qd != 'undefined' && !!qd){
                this.setQd(qd);
            }
        },
        activated:function(){
            this.getOrderDetail(this.$route.params.id);
            this.token = Tool.localItem('userInfo') ? JSON.parse(Tool.localItem('userInfo')).token :'';
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
                    &.dsjzs{
                        margin:0 0;
                        padding:0.4rem 3%;
                        background-color:#ff3300;
                        color:#fff;
                        text-align:center;
                        a{
                            color:#fff;
                        }
                    }
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
                        line-height:1.5rem;
                        .index{
                            background-color:#f3464a;
                            color:#fff;
                            padding:0rem 0.2rem;
                            border-radius:0.5rem;
                            margin-right:0.2rem;
                        }
                        .evaluate{
                            border:1px solid #f3464a;
                            color:#f3464a;
                            display:inline-block;
                            height:0.8rem;
                            line-height:0.8rem;
                            padding:0 0.2rem;
                            border-radius:3px;
                            font-size:0.51rem;
                        }
                        .label{
                            margin-left:1rem;
                        }
                    }
                    .use-item + div{
                        border-top:1px solid #efefef;
                    }
                }
                .no-record{
                    line-height:3em;
                    background-color:#efefef;
                    padding:0 3%;
                    font-size:0.51rem;
                }
            }
        }
    }
</style>