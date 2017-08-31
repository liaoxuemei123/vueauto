<!--微信H5支付页面-->
<template>
    <div class="page-container">
        <div class="wechat-page page" flex="dir:top box:first">
            <nav-bar
                title="支付结果"
            />
            <div class="page-content">
                <div class="please-wait" flex="dir:left cross:center">
                    订单正在处理中，请耐心等待结果
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
<style lang="less">
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
    export default {
        data () {
            return {
                orderNo:'',
            }
        },
        components:{
            NavBar
        },
        methods:{
            backToHome:function(e){
                this.$router.push({name:'maintainset'});
            },
            viewOrderDetail:function(e){
                const id = 
                this.$router.push({path:'orderdetail/'+this.orderNo});
            },
            
        },
        activated:function(){
            this.orderNo = this.$route.query.orderNo;
        },
    }
</script>