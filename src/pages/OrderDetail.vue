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
                    <!--   -->
                    <div class="lotteryDraw"  v-if="choujTime==true && this.ordSt == 2" @click="lotteryDraw">新&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;抽&nbsp;&nbsp;&nbsp;奖</div>
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
    import { Toast } from 'mint-ui';
    export default {
        data () {
            return{
                orderInfo: {},
                useList: [],
                popupVisible: true,
                token:'',
                oid:'',
                first:'',
                choujTime:false,
                startTime : 1516928400000, //'2017/11/01 00:00:00'1516928400
                endTime : 1519833599000, //'2017/11/30 23:59:59'
                ordSt:-1,
            }
        },
        computed:{
            ...mapState({
                modelInfo: ({
                    packageinfo
                }) => packageinfo.modelInfo,
            })
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
                        // this.$nextTick(()=>{
                        //     this.goChouJ(data.data.PackageOrder.qd, data.data.PackageOrder.orderType,data.data.PackageOrder.status);
                        // })
                        this.orderInfo = data.data.PackageOrder;
                        this.orderInfo.wbpByxm = data.data.Package.wbpByxm;
                        this.useList = data.data.PackageOrderDetail;
                        this.$nextTick(()=>{
                            this.ordSt = this.orderInfo.status
                        })
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
            goChouJ: function(qd, orderType, status){
                var self = this;
                if (orderType == 0 &&window.first == '1' && status == '2') {
                    // self.$router.push({path:'/orderdetail/'+orderNo,query:{wbyQd:qd}});
                    const oid = this.oid;
                    // const url = `http://wx91660942fa7be4c2.wx1.cdh5.cn/test/4215/orderList.php?token=${oid}`;
                    // const url = `http://wx.cdh5.cn/4215/orderList.php?token=${oid}`;
                    const url = `http://wx.cdh5.cn/4215/orderList.php`;
                    // var token = {:2}
                    var form = $("<form method='post'></form>");
                    form.attr({"action":'http://wx.cdh5.cn/4215/orderList.php'});
                    var input = $("<input type='hidden'>");
                    input.attr({"name":'token'});
                    input.val(oid);
                    form.append(input);
                    $(document.body).append(form);
                    form.submit();
                    // 将oid作为token传过去
                    // window.location.href = url;
                } //轿车
            },
            lotteryDraw:function(){
                var nowDate = new Date();
                nowDate = nowDate.getTime();
                if(nowDate>=this.startTime && nowDate<=this.endTime) {
                    this.choujTime = true;
                    // https://cms.changan.com.cn/jeecms/newYearLuckDraw/main/index.html 
                    // window.location.href = "https://cms.changan.com.cn/jeecms/deLuckDraw/main/index.html?biz=4&src=23"
                    window.location.href = "https://cms.changan.com.cn/jeecms/newYearLuckDraw/main/index.html"
                }
                else {
                    Toast({
                        message:"抽奖已于2018-02-28 23:59:59结束",
                        duration:3000,
                    })
                    this.choujTime = false;
                }

            },
            customBack:function(){
                var prepage = this.$store.getters.prepage;
                if(!prepage || prepage.name != 'myorder'){
                    this.$store.commit('INSERT_PAGE',{path:'/myorder',index:prepage?prepage.index+1:1,name:'myorder'});
                    if (Tool.localItem('fromOuterPage')) {
                        this.$router.push({name:'myorder', query:{token:Tool.localItem('fromOuterPage')}})
                    }
                    else this.$router.push({name:'myorder'})
                }else{
                    this.$router.back();
                }
            },
            ...mapMutations({
                setQd:'SET_QD',
            })
        },
        beforeRouteEnter:function(to,from,next){
            if(from.name == 'myorder' || from.path == '/myorder' || !from.name){
                window.first = '';
            }else{
                window.first = '1';
            }
            Tool.routerEnter(to,from,next);
        },
        created:function(){
            const qd = this.$route.query.wbyQd;
            if(qd != 'undefined' && !!qd){
                this.setQd(qd);
            }
            // this.getOrderDetail(this.$route.params.id);
        },
        activated:function(){
            this.getOrderDetail(this.$route.params.id);
            this.token = Tool.localItem('userInfo') ? JSON.parse(Tool.localItem('userInfo')).token :'';
            this.oid = Tool.localItem('userInfo') ? JSON.parse(Tool.localItem('userInfo')).oid :'';
            var nowDate = new Date();
            nowDate = nowDate.getTime();
            if(nowDate>=this.startTime && nowDate<=this.endTime) this.choujTime = true;
            else this.choujTime = false;
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
                .lotteryDraw{
                    padding: 0.2rem 0;
                    color:white;
                    background-color:red;
                    text-align: center;
                    font-size: 0.67rem;
                    height:1.7rem;
                    line-height: 1.92rem;
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