<template>
    <div class="page-container">
        <div class="page unionpay-page" flex="dir:top box:first">
            <nav-bar
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
    import NavBar from '../components/NavBar';
    export default {
        data () {
            return {
                href:''
            }
        },
        components:{
            NavBar
        },
        methods:{
            goBack:function(){
                console.log(this.orderNo);
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
            overflow: hidden;
            position:relative;
            iframe{
                border:none;
            }
        }
    }
</style>