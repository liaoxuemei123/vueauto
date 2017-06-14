<template>
    <div class="page-container"><!-- 本页暂时没有使用 -->
        <div class="page unionpay-page" flex="dir:top box:first">
            <union-nav
                title="银联支付"
                :goBack="goBack"
            />
            <div class="page-content" flex="dir:top box:mean">
                <iframe :src="href">

                </iframe>
            </div>
        </div>
    </div>
</template>
<script>
    import UnionNav from '../components/UnionNav';
    export default {
        data () {
            return {
                href:''
            }
        },
        components:{
            UnionNav
        },
        methods:{
            goBack:function(){
                this.$router.push({path:'/orderpay/'+this.orderNo});
            }
        },
        activated:function(){
            this.href = this.$route.query.href;
            this.orderNo = this.$route.query.orderNo
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
            iframe{
                border:none;
                height:100%;
            }
        }
    }
</style>