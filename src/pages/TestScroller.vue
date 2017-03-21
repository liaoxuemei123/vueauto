<template>
    <div class="page-container">
        <div class="page scroller-page" flex="dir:top box:first">
            <nav-bar
                title="测试Scroller"
            />
            <div class="page-content">
                <scroller>
                    <div class="item" v-for="(item,index) in orderList">
                        <order-item :item="item"></order-item>
                    </div>
                </scroller>
            </div>
        </div>
    </div>
</template>
<script>
    import Scroller from '../components/Scroller';
    import NavBar from '../components/NavBar';
    import OrderItem from '../components/OrderItem';
    import Tool from '../utils/Tool';
    export default {
        data () {
            return {
                orderList:[],
            }
        },
        components:{
            Scroller,
            NavBar,
            OrderItem
        },
        activated:function(){
            Tool.get('AaPackageOrderQuery',{
                userId:Tool.getUserInfo('userId'),
                status:'',
                page:1,
                pageSize:20,
            },(data)=>{
                this.orderList = data.data.data;
            });
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
        }
    }
</style>