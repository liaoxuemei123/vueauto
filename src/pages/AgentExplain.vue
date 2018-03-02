<!--微信H5支付页面-->
<template>
    <div class="page-container">
        <div class="wechat-page page" flex="dir:top box:first">
            <nav-bar
                title="说明"
            />
            <div class="page-content">
                <p>1、   经纪人通过实名认证后，将获取专属的保养套餐推荐二维码；</p>
<p>2、  被推荐人通过该二维码成功购买且7日内未退款，经纪人将获取一定的现金奖励，奖励标准50元/单；</p>
<p>3、  发放时间：次月发放。经纪人需正确填写各项实名认证信息，该信息将作为现金发放的依据。如因信息错误，导致奖励发放有误，由经纪人自行负责。</p>
<p>4、  活动时间：2018年1月1日至2018年12月31日。</p>
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
            padding: 10% 5% 10% 5% ;
            background-color:#f0f0f0;
            p{
                text-indent:1rem;
                font-size: 0.64rem;
                margin: 0;
                line-height: 36px;
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
            
        },
        
        activated:function(){
            
        },
        deactivated:function(){
            clearInterval(this.timmer);
        }
    }
</script>