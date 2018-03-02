<!--微信H5支付页面-->
<template>
    <div class="page-container">
        <div class="wechat-page page" flex="dir:top box:first">
            <nav-bar
                title="支付结果"
                :goBack="backToHome"
            />
            <div class="page-content">
                <div class="please-wait" flex="dir:left cross:center">
                    订单正在处理中，请耐心等待结果
                </div>
                <div class="detail-box">
                    <div class="order-no">订单编号：{{orderNo}}</div>
                    <div class="total_fee">支付金额：{{total_fee | total_feeFilter}}</div>
                </div>
                <div class="operation" flex="dir:left cross:center box:mean">
                    <div class="backto-continue">
                        <span class="btn btn-success" @click="backToHome">继续购买</span>
                    </div>
                    <div class="view-orderdetaill">
                        <span class="btn btn-info" @click="viewOrderDetail">查看订单</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
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
            height:100%;
            overflow: auto;
            background-color: #fff;
            .please-wait{
                background-color: #ed3f14;
                height:6rem;
                padding:0 2rem;
                text-align:center;
                color:#eee;
                font-size:0.8rem;
                line-height:1.5em;
            }
            .detail-box{
                margin-top:1rem;
                padding-left:0.4rem;
                font-size:0.685rem;
                .order-no{
                    margin-bottom: 0.3rem;
                }
            }
            .operation{
                line-height:2.1rem;
                text-align:center;
                margin-top:1rem;
                .btn{
                    padding:0.4rem 2.4rem;
                    border-radius:0.2rem;
                    color:#eee;
                    font-size:0.67rem;
                    &.btn-success{
                        background-color:#19be6b;
                    }
                    &.btn-info{
                        background-color:#5cadff;
                    }
                }
            }
        }
    }
</style>
<script>
    import NavBar from '../components/NavBar';
    import Tool  from '../utils/Tool';
    import { mapState } from 'vuex';
    export default {
        data () {
            return {
                orderNo:'',
                total_fee:'',
                timmer:'',
            }
        },
        components:{
            NavBar
        },
        computed:{
            ...mapState({
                qd:({
                    pageconfig
                }) => pageconfig.qd
            })
        },
        methods:{
            backToHome:function(e){
                this.$router.push({name:'maintainset'});
            },
            viewOrderDetail:function(e){
                this.$router.push({path:'orderdetail/'+this.orderNo,query:{wbyQd:this.qd}});
            },
            checkState:function(){
                this.timmer = setInterval(() => {
                    Tool.get('queryOrderStatus',{orderNo:this.orderNo},data => {
                        if(data.code == 200){
                            clearInterval(this.timmer);
                            this.$router.push({path:'/orderdetail/'+this.orderNo,query:{wbyQd:this.qd}});
                        }
                    })
                },5000)
            }
        },
        filters:{
            total_feeFilter:function(val){
                val = (val?val:0)/100;
                return (val - 0).toFixed(2);
            },
        },
        activated:function(){
            // no 14968694018682809 y 14938697383862809
            this.orderNo = this.$route.query.orderNo;
            this.total_fee = this.$route.query.total_fee;
            // this.total_fee = (this.total_fee?this.total_fee:0)/100;
            // this.total_fee = (this.total_fee - 0).toFixed(2);
            this.checkState();
        },
        deactivated:function(){
            clearInterval(this.timmer);
        }
    }
</script>